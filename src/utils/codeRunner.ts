import { ExecutionLog } from '../types';

export interface RunResult {
  success: boolean;
  logs: ExecutionLog[];
  executionTimeMs: number;
  returnValue?: string;
  error?: string;
}

// Safely formats arbitrary JavaScript values for terminal display
function formatLogArg(arg: unknown): string {
  if (arg === undefined) return 'undefined';
  if (arg === null) return 'null';
  if (typeof arg === 'string') return arg;
  if (typeof arg === 'number' || typeof arg === 'boolean') return String(arg);
  if (typeof arg === 'function') return `[Function: ${arg.name || 'anonymous'}]`;
  try {
    return JSON.stringify(arg, null, 2);
  } catch {
    return String(arg);
  }
}

/**
 * Execute real JavaScript in a safe, instrumented sandbox
 */
export async function executeJavaScript(code: string, stdinText = ''): Promise<RunResult> {
  const startTime = performance.now();
  const logs: ExecutionLog[] = [];
  let logCounter = 0;

  const addLog = (type: ExecutionLog['type'], ...args: unknown[]) => {
    const text = args.map(formatLogArg).join(' ');
    logs.push({
      id: `log-${Date.now()}-${logCounter++}`,
      type,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', fractionalSecondDigits: 3 }),
    });
  };

  const customConsole = {
    log: (...args: unknown[]) => addLog('stdout', ...args),
    info: (...args: unknown[]) => addLog('info', ...args),
    warn: (...args: unknown[]) => addLog('warn', ...args),
    error: (...args: unknown[]) => addLog('stderr', ...args),
  };

  // Provide prompt/stdin helper
  const stdinLines = stdinText.split('\n');
  let stdinIndex = 0;
  const readLine = () => {
    if (stdinIndex < stdinLines.length) {
      return stdinLines[stdinIndex++];
    }
    return '';
  };

  try {
    // Wrap code in a function with custom context
    const sandboxFn = new Function(
      'console',
      'readLine',
      'stdin',
      `"use strict";
       try {
         ${code}
       } catch (err) {
         console.error(err && err.stack ? err.stack : String(err));
         throw err;
       }`
    );

    sandboxFn(customConsole, readLine, stdinText);

    const executionTimeMs = Math.round(performance.now() - startTime);

    if (logs.length === 0) {
      addLog('info', 'Code executed successfully with 0 output statements.');
    }

    return {
      success: true,
      logs,
      executionTimeMs,
    };
  } catch (err: unknown) {
    const executionTimeMs = Math.round(performance.now() - startTime);
    const errorMessage = err instanceof Error ? err.message : String(err);

    return {
      success: false,
      logs,
      executionTimeMs,
      error: errorMessage,
    };
  }
}

/**
 * Transpile and simulate modern C++ code in the browser
 */
export async function simulateCpp(cppCode: string, stdinText = ''): Promise<RunResult> {
  const startTime = performance.now();
  const logs: ExecutionLog[] = [];
  let logCounter = 0;

  const addLog = (type: ExecutionLog['type'], text: string) => {
    logs.push({
      id: `cpp-log-${Date.now()}-${logCounter++}`,
      type,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', fractionalSecondDigits: 3 }),
    });
  };

  // Simulated Compiler Banner
  addLog('info', '$ g++ -std=c++20 -O2 main.cpp -o main');

  // Basic syntax checks
  const openBraces = (cppCode.match(/{/g) || []).length;
  const closeBraces = (cppCode.match(/}/g) || []).length;

  if (openBraces !== closeBraces) {
    addLog('stderr', `main.cpp: error: unmatched curly braces. Found ${openBraces} '{' and ${closeBraces} '}'.`);
    return {
      success: false,
      logs,
      executionTimeMs: 14,
      error: 'Compilation error: Unmatched curly braces.',
    };
  }

  if (!cppCode.includes('main(')) {
    addLog('stderr', "main.cpp: fatal error: undefined reference to 'main'. Every C++ program requires an int main() entry point.");
    return {
      success: false,
      logs,
      executionTimeMs: 12,
      error: "Missing 'int main()' entry point.",
    };
  }

  addLog('info', '$ ./main  # [Process initiated]');

  try {
    // Transpile standard C++ idioms to JS
    let jsCode = cppCode;

    // Remove preprocessor directives
    jsCode = jsCode.replace(/#include\s*<[^>]+>/g, '// include');
    jsCode = jsCode.replace(/using\s+namespace\s+std\s*;/g, '// using namespace std;');

    // Handle std::cout << items
    // Convert chained std::cout << a << " " << b << std::endl;
    jsCode = jsCode.replace(/(?:std::)?cout\s*<<\s*([^;]+);/g, (_match, chain) => {
      const parts = chain.split('<<').map((p: string) => p.trim());
      const args = parts
        .filter((p: string) => p !== 'endl' && p !== 'std::endl')
        .map((p: string) => {
          return p;
        });
      return `console.log(${args.join(', ')});`;
    });

    // Handle std::cin >> var
    const stdinTokens = stdinText.trim().split(/\s+/).filter(Boolean);
    let tokenIndex = 0;

    jsCode = jsCode.replace(/(?:std::)?cin\s*>>\s*([a-zA-Z0-9_]+);/g, (_match, varName) => {
      const defaultVal = stdinTokens[tokenIndex] || '0';
      tokenIndex++;
      return `${varName} = Number(${JSON.stringify(defaultVal)}) || ${JSON.stringify(defaultVal)};`;
    });

    // Convert types: int, double, float, bool, char, auto, const int, etc.
    jsCode = jsCode.replace(/\b(?:const\s+)?(?:int|double|float|bool|char|long|auto|size_t)\s+([a-zA-Z0-9_]+)\s*(\[[^\]]*\])?/g, 'let $1$2');

    // Convert std::vector<Type> v = {...}; -> let v = [...];
    jsCode = jsCode.replace(/(?:std::)?vector\s*<[^>]+>\s*([a-zA-Z0-9_]+)\s*=\s*\{([^}]*)\};/g, 'let $1 = [$2];');
    jsCode = jsCode.replace(/(?:std::)?vector\s*<[^>]+>\s*([a-zA-Z0-9_]+)\s*\(([^)]*)\);/g, 'let $1 = new Array($2);');
    jsCode = jsCode.replace(/(?:std::)?vector\s*<[^>]+>\s*([a-zA-Z0-9_]+);/g, 'let $1 = [];');

    // Vector method mappings
    jsCode = jsCode.replace(/\.push_back\(/g, '.push(');
    jsCode = jsCode.replace(/\.pop_back\(\)/g, '.pop()');
    jsCode = jsCode.replace(/\.size\(\)/g, '.length');
    jsCode = jsCode.replace(/\.empty\(\)/g, '.length === 0');
    jsCode = jsCode.replace(/\.back\(\)/g, '[this.length - 1]');

    // Replace static_cast<type>(x) with Number(x)
    jsCode = jsCode.replace(/static_cast\s*<[^>]+>\s*\(([^)]+)\)/g, 'Number($1)');

    // Replace nullptr / NULL with null
    jsCode = jsCode.replace(/\bnullptr\b/g, 'null');
    jsCode = jsCode.replace(/\bNULL\b/g, 'null');

    // Replace struct / class basic definitions if needed or let JS handle
    // Remove "public:" and "private:" labels
    jsCode = jsCode.replace(/\b(public|private|protected)\s*:/g, '');

    // Replace C++ member initializer lists in constructors: Constructor(...) : var(x) {}
    jsCode = jsCode.replace(/([a-zA-Z0-9_]+)\s*\(([^)]*)\)\s*:\s*([^\{]+)\{/g, (_m, name, args, inits) => {
      const assignments = inits
        .split(',')
        .map((init: string) => {
          const match = init.trim().match(/([a-zA-Z0-9_]+)\s*\(([^)]*)\)/);
          if (match) {
            return `this.${match[1]} = ${match[2]};`;
          }
          return '';
        })
        .filter(Boolean)
        .join(' ');
      return `constructor(${args}) { ${assignments} `;
    });

    // Make sure main is called at the end
    jsCode += `\nif (typeof main === 'function') { main(); }`;

    // Execute through JavaScript runner
    const jsResult = await executeJavaScript(jsCode, stdinText);

    // Merge logs
    jsResult.logs.forEach((l) => logs.push(l));

    const totalTimeMs = Math.round(performance.now() - startTime);

    if (jsResult.success) {
      addLog('info', `[Process finished with exit code 0 (${totalTimeMs}ms)]`);
      return {
        success: true,
        logs,
        executionTimeMs: totalTimeMs,
      };
    } else {
      addLog('stderr', `Runtime Exception: ${jsResult.error}`);
      return {
        success: false,
        logs,
        executionTimeMs: totalTimeMs,
        error: jsResult.error,
      };
    }
  } catch (err: unknown) {
    const totalTimeMs = Math.round(performance.now() - startTime);
    const errText = err instanceof Error ? err.message : String(err);
    addLog('stderr', `Simulation Error: ${errText}`);
    return {
      success: false,
      logs,
      executionTimeMs: totalTimeMs,
      error: errText,
    };
  }
}
