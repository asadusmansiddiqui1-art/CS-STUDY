import { jsPDF } from 'jspdf';
import {
  drawChapterHeader,
  drawSectionHeader,
  drawCalloutBox,
  drawCodeBlock,
  drawTable,
  PDF_COLORS
} from './pdfGeneratorUtils';
import { megaCurriculum } from '../data/megaCurriculumData';

interface SafeChapterData {
  title: string;
  subtitle: string;
  abstractText: string;
  theoreticalFoundations: string[];
  codeListing: { title: string; code: string; language: 'cpp' | 'javascript'; explanation: string } | null;
  memoryOrArchitectureDiagram: string;
  complexityAnalysis: { tableHeaders: string[]; colWidths: number[]; rows: string[][] } | null;
  examProblems: { examType: string; difficulty: string; question: string; solution: string }[];
}

function safeChapter(
  subj: any,
  index: number,
  fallbackTitle: string,
  fallbackSubtitle: string,
  fallbackTheoreticalFoundations: string[],
  fallbackCodeListing?: { title: string; code: string; language: 'cpp' | 'javascript'; explanation: string } | null,
  fallbackDiagram?: string | null
): SafeChapterData {
  if (subj && subj.chapters && subj.chapters[index]) {
    const ch = subj.chapters[index];
    return {
      title: ch.title || fallbackTitle,
      subtitle: ch.subtitle || fallbackSubtitle,
      abstractText: ch.abstractText || `${fallbackTitle}: Comprehensive academic treatment of formal models, runtime behavior, and engineering trade-offs.`,
      theoreticalFoundations: (ch.theoreticalFoundations && ch.theoreticalFoundations.length > 0) ? ch.theoreticalFoundations : fallbackTheoreticalFoundations,
      codeListing: ch.codeListing || fallbackCodeListing || null,
      memoryOrArchitectureDiagram: ch.memoryOrArchitectureDiagram || fallbackDiagram || '',
      complexityAnalysis: ch.complexityAnalysis || null,
      examProblems: ch.examProblems || []
    };
  }
  return {
    title: fallbackTitle,
    subtitle: fallbackSubtitle,
    abstractText: `${fallbackTitle}: Rigorous undergraduate examination of computational principles, systems mechanics, and design methodologies.`,
    theoreticalFoundations: fallbackTheoreticalFoundations,
    codeListing: fallbackCodeListing || null,
    memoryOrArchitectureDiagram: fallbackDiagram || '',
    complexityAnalysis: null,
    examProblems: []
  };
}

/**
 * Renders Disciplines I through VI for the Master Degree Mega-Book
 * Total Pages: Exactly 162 Pages (Pages 37 to 198 of 216)
 */
export async function renderDisciplinesIThroughVI(
  doc: jsPDF,
  nextPage: (headerLeft: string, headerRight: string, statusLabel?: string) => Promise<number>,
  contentWidth: number
): Promise<void> {
  const pf = megaCurriculum.pf;
  const dsa = megaCurriculum.dsa;
  const db = megaCurriculum.db;
  const os = megaCurriculum.os;
  const net = megaCurriculum.cn || (megaCurriculum as any).net;
  const se = megaCurriculum.se;

  // Chapter resolution with guaranteed fallback safety
  const pfCh0 = safeChapter(pf, 0, 'Machine Architecture, Compilation Pipelines & Memory Representation', 'Von Neumann Model, Hex Offsets & Hardware Interfacing', [
    'Von Neumann machine model dictates sequential instruction execution where instructions and data reside in common memory.',
    'Compilation transforms source text through Lexical Analysis, AST parsing, SSA intermediate representation, and machine code emission.'
  ]);
  const pfCh1 = safeChapter(pf, 1, 'Control Structures, Loop Invariants & Algorithmic Branching', 'Branch Prediction, Dijkstra Guarded Commands & Loop Induction', [
    'Control flow constructs form directed execution graphs evaluated sequentially by the CPU program counter.',
    'Loop correctness is proven via mathematical induction using initialization, maintenance, and termination invariants.'
  ]);
  const pfCh2 = safeChapter(pf, 2, 'Pointers, Pointer Arithmetic & Dynamic Heap Management', 'Memory Addressing, Dynamic Multidimensional Arrays & Allocator Stride', [
    'A pointer variable stores the physical virtual memory address of another memory cell in bytes.',
    'Heap memory is requested at runtime via the operating system sbrk/mmap system calls and managed by free-list allocators.'
  ]);
  const pfCh3 = safeChapter(pf, 3, 'Memory Alignment, Struct Padding & Hardware Boundaries', 'Cache Line Optimization, Byte Packing & Struct Layout', [
    'CPUs fetch data in natural boundary alignments (4-byte or 8-byte words) for single-cycle bus transfers.',
    'Compiler struct padding inserts unused byte offsets to ensure aligned field offsets, impacting cache efficiency.'
  ], {
    title: 'Hardware Alignment & Struct Packing in C++',
    code: '// Unoptimized Struct (24 bytes due to padding)\nstruct UnalignedData {\n    char a;      // 1 byte + 7 bytes padding\n    double b;    // 8 bytes\n    int c;       // 4 bytes + 4 bytes padding\n};\n\n// Optimized Struct (16 bytes, zero waste)\nstruct AlignedData {\n    double b;    // 8 bytes\n    int c;       // 4 bytes\n    char a;      // 1 byte + 3 bytes tail padding\n};',
    language: 'cpp',
    explanation: 'Ordering struct fields in descending order of byte width minimizes compiler padding gaps from 11 bytes to 3 bytes.'
  }, 'Cache Line (64 Bytes) --> [ Field B (8B) ][ Field C (4B) ][ Field A (1B) ][ Pad (3B) ]');
  const pfCh4 = safeChapter(pf, 4, 'File Streams, Binary Serialization & Call Stack Mechanics', 'Persistent Storage Primitives, Inode Buffering & Stack Frame Lifetime', [
    'Binary streams write raw memory byte representations directly to disk, avoiding human-readable formatting overhead.',
    'Activation records on the call stack store return addresses, previous frame pointers (RBP), and local auto variables.'
  ], {
    title: 'High-Throughput Binary Stream Serialization in C++',
    code: '#include <fstream>\nstruct Record { int id; double score; };\n\nvoid saveRecord(const Record& rec, const char* filename) {\n    std::ofstream file(filename, std::ios::binary | std::ios::out);\n    if (file.is_open()) {\n        file.write(reinterpret_cast<const char*>(&rec), sizeof(Record));\n        file.close();\n    }\n}',
    language: 'cpp',
    explanation: 'Direct binary I/O bypasses text parsing overhead, writing raw byte blocks in a single OS kernel write syscall.'
  });

  // =============================================================
  // DISCIPLINE I: PROGRAMMING FUNDAMENTALS (28 PAGES: 37 TO 64)
  // =============================================================
  for (let p = 37; p <= 64; p++) {
    let y = await nextPage(
      'Discipline I: Programming Fundamentals',
      `CS-101 (Page ${p - 36}/28)`,
      `Drafting CS-101: Programming Fundamentals (Page ${p} of 216)...`
    );

    if (p === 37) {
      y = drawChapterHeader(doc, y, 'Discipline I', 'CS-101: Programming Fundamentals', 'Foundations of Imperative Computing, Pointers & Memory Management');
      y = drawCalloutBox(doc, y, 'concept', 'COURSE OVERVIEW & PEDAGOGICAL MISSION', pf.courseOverview);
      y = drawSectionHeader(doc, y, '1.0', 'Accredited Program Learning Outcomes');
      pf.learningOutcomes.forEach((lo: string, idx: number) => {
        y = drawCalloutBox(doc, y, 'tip', `Outcome 1.${idx + 1}`, lo);
      });
    } else if (p === 38) {
      y = drawChapterHeader(doc, y, 'Chapter 1', pfCh0.title, pfCh0.subtitle);
      const splitText = doc.splitTextToSize(pfCh0.abstractText, contentWidth);
      doc.text(splitText, 14, y);
      y += splitText.length * 4.2 + 4;
      y = drawCalloutBox(doc, y, 'architecture', 'RUNTIME MEMORY SEGMENTATION', pfCh0.memoryOrArchitectureDiagram);
      pfCh0.theoreticalFoundations.forEach((tf: string, idx: number) => {
        y = drawCalloutBox(doc, y, 'concept', `Theoretical Foundation 1.${idx + 1}`, tf);
      });
    } else if (p === 39) {
      y = drawSectionHeader(doc, y, '1.1', 'Source-to-Binary Compilation Pipeline');
      if (pfCh0.codeListing) {
        y = drawCodeBlock(doc, y, pfCh0.codeListing.title, pfCh0.codeListing.code, pfCh0.codeListing.language);
        y = drawCalloutBox(doc, y, 'concept', 'COMPILER PIPELINE ANALYSIS', pfCh0.codeListing.explanation);
      }
    } else if (p === 40) {
      y = drawSectionHeader(doc, y, '1.2', 'Primitive Type Representation & Bitwidth Analysis');
      if (pfCh0.complexityAnalysis) {
        y = drawTable(doc, y, pfCh0.complexityAnalysis.tableHeaders, pfCh0.complexityAnalysis.colWidths, pfCh0.complexityAnalysis.rows);
      }
      y = drawCalloutBox(doc, y, 'tip', 'INTEGER OVERFLOW INVARIANTS', 'In C/C++, signed integer overflow invokes Undefined Behavior (UB), allowing the compiler to assume it never occurs and optimize away safety checks. Always use unsigned types or explicit range checks.');
    } else if (p === 41) {
      y = drawChapterHeader(doc, y, 'Chapter 2', pfCh1.title, pfCh1.subtitle);
      const splitText = doc.splitTextToSize(pfCh1.abstractText, contentWidth);
      doc.text(splitText, 14, y);
      y += splitText.length * 4.2 + 4;
      pfCh1.theoreticalFoundations.forEach((tf: string, idx: number) => {
        y = drawCalloutBox(doc, y, 'concept', `Theoretical Foundation 2.${idx + 1}`, tf);
      });
    } else if (p === 42) {
      y = drawSectionHeader(doc, y, '2.1', 'Structured Iteration & Algorithmic Invariant Proofs');
      if (pfCh1.codeListing) {
        y = drawCodeBlock(doc, y, pfCh1.codeListing.title, pfCh1.codeListing.code, pfCh1.codeListing.language);
        y = drawCalloutBox(doc, y, 'concept', 'INVARIANT VERIFICATION', pfCh1.codeListing.explanation);
      }
    } else if (p === 43) {
      y = drawSectionHeader(doc, y, '2.2', 'Branch Prediction & Hardware Pipeline Stalls');
      y = drawCalloutBox(doc, y, 'architecture', 'HARDWARE BRANCH PREDICTOR', 'Modern superscalar CPUs speculatively execute instructions ahead of conditional branches. If a branch is mispredicted, the entire pipeline must be flushed, causing a 15-20 cycle penalty. Sorting data before processing can yield a 3x speedup.');
      y = drawCalloutBox(doc, y, 'tip', 'LOOP UNROLLING OPTIMIZATION', 'Loop unrolling reduces loop control branching overhead and enables SIMD vectorization. Compilers apply this automatically at -O3 optimization level.');
    } else if (p === 44) {
      y = drawChapterHeader(doc, y, 'Chapter 3', pfCh2.title, pfCh2.subtitle);
      const splitText = doc.splitTextToSize(pfCh2.abstractText, contentWidth);
      doc.text(splitText, 14, y);
      y += splitText.length * 4.2 + 4;
      y = drawCalloutBox(doc, y, 'architecture', 'HEAP & STACK VIRTUAL MEMORY MODEL', pfCh2.memoryOrArchitectureDiagram);
      pfCh2.theoreticalFoundations.forEach((tf: string, idx: number) => {
        y = drawCalloutBox(doc, y, 'concept', `Theoretical Foundation 3.${idx + 1}`, tf);
      });
    } else if (p === 45) {
      y = drawSectionHeader(doc, y, '3.1', 'Dynamic Heap Matrix Allocation: Flat vs Fragmented');
      if (pfCh2.codeListing) {
        y = drawCodeBlock(doc, y, pfCh2.codeListing.title, pfCh2.codeListing.code, pfCh2.codeListing.language);
        y = drawCalloutBox(doc, y, 'concept', 'MEMORY ALLOCATOR ANALYSIS', pfCh2.codeListing.explanation);
      }
    } else if (p === 46) {
      y = drawSectionHeader(doc, y, '3.2', 'Memory Locality: Cache Hits vs Cache Misses');
      y = drawTable(
        doc,
        y,
        ['Memory Strategy', 'Spatial Locality', 'Deallocation Complexity', 'Heap Overhead'],
        [45, 45, 45, 45],
        [
          ['Array of Pointers (int**)', 'Poor (disjoint rows)', 'O(N) row-by-row free loops', 'High (multiple malloc blocks)'],
          ['Single Flat Array (int*)', 'Optimal (100% contiguous)', 'Single free(ptr) call', 'Very Low (single memory chunk)'],
          ['Vector of Vectors', 'Poor (heap indirect)', 'Automatic via RAII destructors', 'Moderate heap overhead']
        ]
      );
      y = drawCalloutBox(doc, y, 'tip', 'PERFORMANCE PROTOCOL', 'In high-performance numerical computing and graphics pipelines, always prefer single flat 1D contiguous allocations accessed via index formula (row * cols + col).');
    } else if (p === 47) {
      y = drawSectionHeader(doc, y, '3.3', 'Pointer Arithmetic & Memory Boundaries');
      y = drawCalloutBox(doc, y, 'concept', 'POINTER STRIDE SCALING RULE', 'Adding integer k to pointer ptr of type T* advances the physical hardware memory address by k * sizeof(T) bytes. For char*, sizeof is 1 byte; for int*, sizeof is 4 bytes; for double*, sizeof is 8 bytes.');
      y = drawCalloutBox(doc, y, 'exam', 'COMMON EXAM TRAP: DANGLING POINTERS', 'Freeing memory via delete ptr leaves the pointer variable holding the old address. Always set ptr = nullptr immediately following deallocation to prevent use-after-free corruption.');
    } else if (p === 48) {
      y = drawChapterHeader(doc, y, 'Chapter 4', pfCh3.title, pfCh3.subtitle);
      y = drawCalloutBox(doc, y, 'architecture', 'HARDWARE BOUNDARY ALIGNMENT', pfCh3.memoryOrArchitectureDiagram);
      pfCh3.theoreticalFoundations.forEach((tf: string, idx: number) => {
        y = drawCalloutBox(doc, y, 'concept', `Alignment Principle 4.${idx + 1}`, tf);
      });
    } else if (p === 49) {
      y = drawSectionHeader(doc, y, '4.1', 'Struct Padding & Memory Footprint Optimization');
      if (pfCh3.codeListing) {
        y = drawCodeBlock(doc, y, pfCh3.codeListing.title, pfCh3.codeListing.code, pfCh3.codeListing.language);
        y = drawCalloutBox(doc, y, 'concept', 'PADDING DIAGNOSTIC', pfCh3.codeListing.explanation);
      }
    } else if (p === 50) {
      y = drawSectionHeader(doc, y, '4.2', 'Memory Safety Tools: Valgrind & AddressSanitizer');
      y = drawTable(
        doc,
        y,
        ['Diagnostic Tool', 'Mechanism', 'Overhead', 'Target Defects'],
        [40, 50, 42, 50],
        [
          ['Valgrind Memcheck', 'Dynamic binary instrumentation', '20x - 50x slowdown', 'Memory leaks, uninitialized reads'],
          ['AddressSanitizer (ASan)', 'Compile-time shadow memory', '2x slowdown (fast)', 'Out-of-bounds stack/heap/global access'],
          ['UndefinedBehaviorSanitizer', 'Compiler instrumentation', '1.2x slowdown', 'Signed integer overflow, null dereference'],
          ['ThreadSanitizer (TSan)', 'State tracking on memory ops', '5x - 15x slowdown', 'Data races, deadlock inversion']
        ]
      );
    } else if (p === 51) {
      y = drawSectionHeader(doc, y, '4.3', 'Modern C++ Smart Pointers & Ownership Semantics');
      y = drawCalloutBox(doc, y, 'concept', 'RAII & RESOURCE MANAGEMENT', 'Resource Acquisition Is Initialization (RAII) ensures that resource lifetime is strictly tied to stack object lifetime. Use std::unique_ptr for exclusive ownership and std::shared_ptr for reference-counted shared ownership.');
      y = drawCalloutBox(doc, y, 'tip', 'RULE OF ZERO / FIVE', 'Classes managing raw resources must explicitly define or delete the Destructor, Copy Constructor, Copy Assignment, Move Constructor, and Move Assignment operator.');
    } else if (p === 52) {
      y = drawChapterHeader(doc, y, 'Chapter 5', pfCh4.title, pfCh4.subtitle);
      if (pfCh4.codeListing) {
        y = drawCodeBlock(doc, y, pfCh4.codeListing.title, pfCh4.codeListing.code, pfCh4.codeListing.language);
        y = drawCalloutBox(doc, y, 'concept', 'BINARY I/O MECHANICS', pfCh4.codeListing.explanation);
      }
    } else if (p === 53) {
      y = drawSectionHeader(doc, y, '5.1', 'Operating System File Descriptors & Inode Tables');
      y = drawCalloutBox(doc, y, 'concept', 'UNIX FILE DESCRIPTOR ARCHITECTURE', 'Every opened stream references an entry in the process File Descriptor (FD) table, pointing to the kernel open file table, which references the underlying storage inode. Standard streams: 0 (stdin), 1 (stdout), 2 (stderr).');
      y = drawCalloutBox(doc, y, 'tip', 'BUFFER FLUSHING PROTOCOL', 'Standard std::cout buffers output in user space until a newline or explicit std::flush is called. Prefer \n over std::endl in high-frequency loops to prevent redundant syscall flushes.');
    } else if (p === 54) {
      y = drawSectionHeader(doc, y, '5.2', 'Call Stack Activation Records & Recursion Unwinding');
      y = drawCalloutBox(doc, y, 'architecture', 'STACK FRAME ACTIVATION LAYOUT', 'Top of Stack --> [ Local Variables ][ Saved Frame Pointer (RBP) ][ Return Address ][ Function Parameters ]');
      y = drawCalloutBox(doc, y, 'exam', 'STACK OVERFLOW HAZARDS', 'Deep recursion without tail-call optimization exhausts the default thread stack space (typically 8MB on Linux, 1MB on Windows), triggering an unrecoverable SIGSEGV segmentation fault.');
    } else if (p === 55) {
      y = drawSectionHeader(doc, y, '5.3', 'Command Line Arguments & Environment Variables');
      y = drawCalloutBox(doc, y, 'concept', 'MAIN SIGNATURE & ARGUMENT PARSING', 'int main(int argc, char* argv[]): argc holds the argument count; argv is an array of null-terminated strings where argv[0] contains the executable binary path.');
    } else if (p === 56) {
      y = drawChapterHeader(doc, y, 'Chapter 6', 'CS-101 Midterm Examination Solved Question Bank', 'Detailed University Exam Questions with Comprehensive Solutions');
      const midterm1 = pf.midtermFinalExamBank[0];
      if (midterm1) {
        y = drawCalloutBox(doc, y, 'exam', `MIDTERM PROBLEM 1 [${midterm1.difficulty}]`, midterm1.question);
        y = drawCalloutBox(doc, y, 'tip', 'RIGOROUS MODEL SOLUTION', midterm1.solution);
      }
    } else if (p === 57) {
      const midterm2 = pf.midtermFinalExamBank[1] || pf.midtermFinalExamBank[0];
      if (midterm2) {
        y = drawCalloutBox(doc, y, 'exam', `MIDTERM PROBLEM 2 [${midterm2.difficulty}]`, midterm2.question);
        y = drawCalloutBox(doc, y, 'tip', 'RIGOROUS MODEL SOLUTION', midterm2.solution);
      }
    } else if (p === 58) {
      y = drawChapterHeader(doc, y, 'Chapter 6 (Cont.)', 'CS-101 Final Examination Solved Question Bank', 'Advanced Algorithmic & Memory Diagnostics Final Exam Problems');
      y = drawCalloutBox(doc, y, 'exam', 'FINAL EXAM PROBLEM: COMPLEX MEMORY TRACE', 'Given: int* p = new int[5]; for(int i=0;i<5;i++) *(p+i) = i*10; int* q = p + 2; delete[] p; cout << *q;\nExplain why printing *q produces undefined behavior, what happens in physical RAM, and how to rewrite using std::vector.');
      y = drawCalloutBox(doc, y, 'tip', 'OFFICIAL GRADING RUBRIC SOLUTION', '1. Deleting array p marks the memory block as free in the heap allocator bins. 2. Pointer q remains a dangling pointer pointing to freed memory. Reading *q is undefined behavior (may return stale data or crash with SIGSEGV if the page is unmapped). 3. Fix: Use std::vector<int> vec = {0, 10, 20, 30, 40};.');
    } else if (p === 59) {
      y = drawSectionHeader(doc, y, '6.1', 'Midterm & Final Examination Rubrics & Point Distribution');
      y = drawTable(
        doc,
        y,
        ['Question Category', 'Weight (%)', 'Common Pitfalls', 'Preparation Strategy'],
        [40, 30, 55, 55],
        [
          ['Code Tracing & Memory Diagrams', '30%', 'Off-by-one errors, pointer dereferences', 'Draw physical box memory diagrams on paper'],
          ['Algorithmic Problem Solving', '35%', 'Missing edge cases (empty arrays, negatives)', 'Write pre/post conditions and pseudocode first'],
          ['Syntax, Types & Compilation', '15%', 'Implicit conversions, missing includes', 'Memorize C++ type conversion hierarchies'],
          ['Object & Struct Memory Layout', '20%', 'Neglecting padding bytes, shallow copies', 'Practice calculating sizeof() with alignment rules']
        ]
      );
    } else if (p === 60) {
      y = drawChapterHeader(doc, y, 'Chapter 7', 'CS-101 Capstone Laboratory Specification', 'Hands-On Production Engineering Lab Project');
      y = drawCalloutBox(doc, y, 'architecture', 'CAPSTONE PROJECT TITLE', 'Custom Heap Memory Allocator & Pool Manager');
      y = drawCalloutBox(doc, y, 'concept', 'LAB MISSION OBJECTIVE', 'Implement a custom user-space memory allocator in C++ supporting malloc(), free(), and realloc() using a doubly-linked explicit free list and boundary tag coalescing.');
    } else if (p === 61) {
      y = drawSectionHeader(doc, y, '7.1', 'Project Architecture & Milestone Deliverables');
      y = drawTable(
        doc,
        y,
        ['Milestone', 'Timeline', 'Technical Deliverable', 'Validation Criteria'],
        [30, 30, 60, 60],
        [
          ['Milestone 1', 'Week 4', 'Raw block allocator with sbrk simulation', 'Passes sequential allocation unit tests'],
          ['Milestone 2', 'Week 7', 'Boundary-tag header/footer coalescing', 'Zero memory fragmentation on free()'],
          ['Milestone 3', 'Week 10', 'Segregated free lists with power-of-two bins', 'O(1) allocation time for common sizes'],
          ['Milestone 4', 'Week 13', 'Thread safety with mutex locks and benchmarks', 'Outperforms standard malloc by 15% on fixed sizes']
        ]
      );
    } else if (p === 62) {
      y = drawSectionHeader(doc, y, '7.2', 'Capstone Evaluation Rubric & Submission Requirements');
      y = drawCalloutBox(doc, y, 'tip', 'SUBMISSION PROTOCOL', 'Projects must include: (1) Production C++17 source code; (2) Makefile or CMakeLists.txt; (3) GoogleTest test suite with >90% branch coverage; (4) Valgrind log proving 0 leaks, 0 errors.');
    } else if (p === 63) {
      y = drawChapterHeader(doc, y, 'Chapter 8', 'CS-101 Technical Interview Question Bank', 'FAANG-Tier Coding & Systems Interview Scenarios');
      const iq1 = pf.interviewQuestionBank[0];
      if (iq1) {
        y = drawCalloutBox(doc, y, 'concept', `INTERVIEW SCENARIO [${iq1.industryContext}]`, iq1.question);
        y = drawCalloutBox(doc, y, 'tip', 'OPTIMAL ARCHITECTURAL SOLUTION', iq1.optimalAnswer);
      }
    } else if (p === 64) {
      y = drawSectionHeader(doc, y, '8.1', 'Authoritative Academic Lexicon & Formal Definitions');
      const glossRows = pf.glossary.map((g: any) => [g.term, g.definition]);
      y = drawTable(doc, y, ['Key Term', 'Rigorous Academic Definition'], [45, 137], glossRows);
    }
  }

  // =============================================================
  // DISCIPLINE II: DATA STRUCTURES & ALGORITHMS (30 PAGES: 65 TO 94)
  // =============================================================
  const dsaCh0 = safeChapter(dsa, 0, 'Asymptotic Analysis & Recurrence Relations', 'Big-O Formalisms, Master Theorem & Complexity Classes', [
    'Asymptotic notation describes the limiting behavior of execution time or memory as input size n approaches infinity.',
    'The Master Theorem provides a closed-form solution for divide-and-conquer recurrences of the form T(n) = a*T(n/b) + f(n).'
  ]);
  const dsaCh1 = safeChapter(dsa, 1, 'Non-Linear Structures: Binary Search Trees & AVL Self-Balancing', 'Height Invariants, Tree Traversals & Rotation Mechanics', [
    'A Binary Search Tree enforces the ordering invariant: left child keys < node key < right child keys.',
    'AVL trees maintain height balance by ensuring the balance factor BF = height(left) - height(right) is in {-1, 0, 1}.'
  ], {
    title: 'AVL Tree Self-Balancing Rotations in C++',
    code: 'struct Node {\n    int key, height;\n    Node *left, *right;\n};\n\nNode* rightRotate(Node* y) {\n    Node* x = y->left;\n    Node* T2 = x->right;\n    x->right = y;\n    y->left = T2;\n    y->height = 1 + std::max(getHeight(y->left), getHeight(y->right));\n    x->height = 1 + std::max(getHeight(x->left), getHeight(x->right));\n    return x;\n}',
    language: 'cpp',
    explanation: 'A right rotation rebalances a Left-Left (LL) imbalance in O(1) time by reassigning three pointers.'
  });
  const dsaCh2 = safeChapter(dsa, 2, 'Binary Heaps, Priority Queues & In-Place Heap Sort Algorithm', 'Complete Binary Trees, Sift-Down & In-Place Sorting', [
    'A binary heap is a complete binary tree satisfying the heap-order property.',
    'Building a heap from an unordered array runs in O(N) linear time using bottom-up sift-down operations.'
  ], {
    title: 'Heap Sort In-Place Implementation in C++',
    code: 'void heapSort(int arr[], int n) {\n    for (int i = n / 2 - 1; i >= 0; i--)\n        heapify(arr, n, i); // Build heap O(N)\n    for (int i = n - 1; i > 0; i--) {\n        std::swap(arr[0], arr[i]);\n        heapify(arr, i, 0); // Restore heap O(log N)\n    }\n}',
    language: 'cpp',
    explanation: 'Heap sort achieves guaranteed O(N log N) worst-case time with zero auxiliary memory allocation.'
  });
  const dsaCh3 = safeChapter(dsa, 3, 'Hash Tables, Universal Hashing & Collision Strategies', 'Separate Chaining, Open Addressing & Load Factor Dynamics', [
    'A hash function maps keys of arbitrary size to fixed-width table indices.',
    'Open addressing resolving collisions via linear, quadratic, or double hashing probes requires load factor alpha < 0.7.'
  ], {
    title: 'Robin Hood Hashing Probe Sequence in C++',
    code: 'struct Entry { int key; int val; int psl; }; // Probe Sequence Length\nvoid insert(Entry e) {\n    int idx = hash(e.key);\n    while (table[idx].occupied) {\n        if (e.psl > table[idx].psl) std::swap(e, table[idx]);\n        idx = (idx + 1) % CAP; e.psl++;\n    }\n    table[idx] = e;\n}',
    language: 'cpp',
    explanation: 'Robin Hood hashing steals from the rich (short probe sequence) to give to the poor, minimizing search variance.'
  });
  const dsaCh4 = safeChapter(dsa, 4, 'Graph Algorithms: BFS, DFS, Dijkstra & Minimum Spanning Trees', 'Shortest Paths, Topological Sort & Greedy Algorithms', [
    'Breadth-First Search (BFS) computes shortest paths in unweighted graphs using a FIFO queue in O(V + E) time.',
    'Dijkstra algorithm computes Single Source Shortest Paths in non-negative weighted graphs in O((V + E) log V).'
  ], {
    title: 'Dijkstra Shortest Path with Min-Heap in C++',
    code: 'std::vector<int> dijkstra(int src, int V, const std::vector<std::vector<Edge>>& adj) {\n    std::vector<int> dist(V, INF);\n    std::priority_queue<Pair, std::vector<Pair>, std::greater<Pair>> pq;\n    dist[src] = 0; pq.push({0, src});\n    while (!pq.empty()) {\n        auto [d, u] = pq.top(); pq.pop();\n        if (d > dist[u]) continue;\n        for (const auto& edge : adj[u]) {\n            if (dist[u] + edge.weight < dist[edge.to]) {\n                dist[edge.to] = dist[u] + edge.weight;\n                pq.push({dist[edge.to], edge.to});\n            }\n        }\n    }\n    return dist;\n}',
    language: 'cpp',
    explanation: 'Greedily extracts the minimum tentative distance node and relaxes adjacent incident edges.'
  });
  const dsaCh5 = safeChapter(dsa, 5, 'Dynamic Programming: Optimal Substructure & 0/1 Knapsack', 'Bellman Optimality, Memoization Tables & State Compression', [
    'Dynamic Programming applies to problems with optimal substructure and overlapping subproblems.',
    'State space reduction compresses memory requirements from O(N*W) to O(W) in 0/1 knapsack problems.'
  ], {
    title: '0/1 Knapsack Space-Optimized Tabulation in C++',
    code: 'int knapsack(int W, const std::vector<int>& wt, const std::vector<int>& val, int n) {\n    std::vector<int> dp(W + 1, 0);\n    for (int i = 0; i < n; i++) {\n        for (int w = W; w >= wt[i]; w--) {\n            dp[w] = std::max(dp[w], dp[w - wt[i]] + val[i]);\n        }\n    }\n    return dp[W];\n}',
    language: 'cpp',
    explanation: 'Iterating backward through capacity w prevents reusing the current item in the same step.'
  });

  for (let p = 65; p <= 94; p++) {
    let y = await nextPage(
      'Discipline II: Data Structures & Algorithms',
      `CS-201 (Page ${p - 64}/30)`,
      `Drafting CS-201: Data Structures & Algorithms (Page ${p} of 216)...`
    );

    if (p === 65) {
      y = drawChapterHeader(doc, y, 'Discipline II', 'CS-201: Data Structures & Algorithms', 'Asymptotic Complexity, Abstract Data Types & Algorithmic Paradigms');
      y = drawCalloutBox(doc, y, 'concept', 'COURSE OVERVIEW & MATHEMATICAL RIGOR', dsa.courseOverview);
      y = drawSectionHeader(doc, y, '2.0', 'Accredited Program Learning Outcomes');
      dsa.learningOutcomes.forEach((lo: string, idx: number) => {
        y = drawCalloutBox(doc, y, 'tip', `Outcome 2.${idx + 1}`, lo);
      });
    } else if (p === 66) {
      y = drawChapterHeader(doc, y, 'Chapter 1', dsaCh0.title, dsaCh0.subtitle);
      const splitText = doc.splitTextToSize(dsaCh0.abstractText, contentWidth);
      doc.text(splitText, 14, y);
      y += splitText.length * 4.2 + 4;
      dsaCh0.theoreticalFoundations.forEach((tf: string, idx: number) => {
        y = drawCalloutBox(doc, y, 'concept', `Complexity Principle 1.${idx + 1}`, tf);
      });
    } else if (p === 67) {
      y = drawSectionHeader(doc, y, '1.1', 'The Master Theorem for Divide-and-Conquer Recurrences');
      y = drawCalloutBox(doc, y, 'concept', 'MASTER THEOREM FORMULATION', 'For T(n) = a*T(n/b) + f(n):\nCase 1: If f(n) = O(n^(log_b(a) - eps)), then T(n) = Theta(n^(log_b(a))).\nCase 2: If f(n) = Theta(n^(log_b(a)) * log^k(n)), then T(n) = Theta(n^(log_b(a)) * log^(k+1)(n)).\nCase 3: If f(n) = Omega(n^(log_b(a) + eps)) and regularity holds, then T(n) = Theta(f(n)).');
    } else if (p === 68) {
      y = drawSectionHeader(doc, y, '1.2', 'Asymptotic Complexity Comparison Matrix');
      if (dsaCh0.complexityAnalysis) {
        y = drawTable(doc, y, dsaCh0.complexityAnalysis.tableHeaders, dsaCh0.complexityAnalysis.colWidths, dsaCh0.complexityAnalysis.rows);
      }
    } else if (p === 69) {
      y = drawChapterHeader(doc, y, 'Chapter 2', dsaCh1.title, dsaCh1.subtitle);
      dsaCh1.theoreticalFoundations.forEach((tf: string, idx: number) => {
        y = drawCalloutBox(doc, y, 'concept', `Tree Foundation 2.${idx + 1}`, tf);
      });
    } else if (p === 70) {
      y = drawSectionHeader(doc, y, '2.1', 'AVL Tree Self-Balancing Code & Rotations');
      if (dsaCh1.codeListing) {
        y = drawCodeBlock(doc, y, dsaCh1.codeListing.title, dsaCh1.codeListing.code, dsaCh1.codeListing.language);
        y = drawCalloutBox(doc, y, 'concept', 'ROTATION MECHANICS', dsaCh1.codeListing.explanation);
      }
    } else if (p >= 71 && p <= 76) {
      y = drawChapterHeader(doc, y, 'Chapter 3', dsaCh2.title, dsaCh2.subtitle);
      if (dsaCh2.codeListing && p === 72) {
        y = drawCodeBlock(doc, y, dsaCh2.codeListing.title, dsaCh2.codeListing.code, dsaCh2.codeListing.language);
      } else {
        dsaCh2.theoreticalFoundations.forEach((tf: string, idx: number) => {
          y = drawCalloutBox(doc, y, 'concept', `Heap Principle 3.${idx + 1}`, tf);
        });
      }
    } else if (p >= 77 && p <= 82) {
      y = drawChapterHeader(doc, y, 'Chapter 4', dsaCh3.title, dsaCh3.subtitle);
      if (dsaCh3.codeListing && p === 78) {
        y = drawCodeBlock(doc, y, dsaCh3.codeListing.title, dsaCh3.codeListing.code, dsaCh3.codeListing.language);
      } else {
        dsaCh3.theoreticalFoundations.forEach((tf: string, idx: number) => {
          y = drawCalloutBox(doc, y, 'concept', `Hash Table Foundation 4.${idx + 1}`, tf);
        });
      }
    } else if (p >= 83 && p <= 88) {
      y = drawChapterHeader(doc, y, 'Chapter 5', dsaCh4.title, dsaCh4.subtitle);
      if (dsaCh4.codeListing && p === 84) {
        y = drawCodeBlock(doc, y, dsaCh4.codeListing.title, dsaCh4.codeListing.code, dsaCh4.codeListing.language);
      } else {
        dsaCh4.theoreticalFoundations.forEach((tf: string, idx: number) => {
          y = drawCalloutBox(doc, y, 'concept', `Graph Foundation 5.${idx + 1}`, tf);
        });
      }
    } else if (p >= 89 && p <= 92) {
      y = drawChapterHeader(doc, y, 'Chapter 6', dsaCh5.title, dsaCh5.subtitle);
      if (dsaCh5.codeListing && p === 90) {
        y = drawCodeBlock(doc, y, dsaCh5.codeListing.title, dsaCh5.codeListing.code, dsaCh5.codeListing.language);
      } else {
        dsaCh5.theoreticalFoundations.forEach((tf: string, idx: number) => {
          y = drawCalloutBox(doc, y, 'concept', `DP Foundation 6.${idx + 1}`, tf);
        });
      }
    } else if (p === 93) {
      y = drawChapterHeader(doc, y, 'Chapter 7', 'CS-201 Solved Midterm & Final Examination Bank', 'Advanced Asymptotic Proofs & Tree Balancing Walkthroughs');
      y = drawCalloutBox(doc, y, 'exam', 'EXAM PROBLEM: AVL TREE ROTATION SEQUENCE', 'Insert keys [15, 20, 24, 10, 13, 7, 30, 36, 25] into an empty AVL tree. Show balance factors after each step and state all rotation types.');
      y = drawCalloutBox(doc, y, 'tip', 'MODEL SOLUTION & ROTATION TRACE', 'Inserting 24 after 15, 20 causes Left-Left (LL) imbalance at 15. Perform left rotation: 20 becomes root. Continue step-by-step maintaining height <= 1.44 * log2(N).');
    } else if (p === 94) {
      y = drawSectionHeader(doc, y, '7.1', 'Authoritative Data Structures Lexicon');
      const glossRows = dsa.glossary.map((g: any) => [g.term, g.definition]);
      y = drawTable(doc, y, ['Key Term', 'Rigorous Academic Definition'], [45, 137], glossRows);
    }
  }

  // =============================================================
  // DISCIPLINE III: DATABASE MANAGEMENT SYSTEMS (28 PAGES: 95 TO 122)
  // =============================================================
  const dbCh0 = safeChapter(db, 0, 'Relational Model, Relational Algebra & SQL Foundations', 'Tuple Relational Calculus, Relational Operators & DDL/DML', [
    'Relational algebra consists of procedural operators (Select, Project, Join, Union, Difference, Cartesian Product).',
    'SQL queries are declarative specifications transformed into relational algebra expression trees for physical optimization.'
  ]);
  const dbCh1 = safeChapter(db, 1, 'Functional Dependencies & Normalization Theory (1NF to BCNF)', 'Armstrong Axioms, Lossless Joins & Dependency Preservation', [
    'A functional dependency X -> Y specifies that if two tuples agree on attributes X, they must agree on attributes Y.',
    'Boyce-Codd Normal Form (BCNF) eliminates all redundancy by requiring every non-trivial determinant X to be a superkey.'
  ]);

  for (let p = 95; p <= 122; p++) {
    let y = await nextPage(
      'Discipline III: Database Management Systems',
      `CS-204 (Page ${p - 94}/28)`,
      `Drafting CS-204: Database Systems (Page ${p} of 216)...`
    );

    if (p === 95) {
      y = drawChapterHeader(doc, y, 'Discipline III', 'CS-204: Database Management Systems', 'Relational Algebra, SQL Optimization, Storage Engines & ACID Transactions');
      y = drawCalloutBox(doc, y, 'concept', 'COURSE OVERVIEW & DATABASE FOUNDATIONS', db.courseOverview);
      y = drawSectionHeader(doc, y, '3.0', 'Accredited Program Learning Outcomes');
      db.learningOutcomes.forEach((lo: string, idx: number) => {
        y = drawCalloutBox(doc, y, 'tip', `Outcome 3.${idx + 1}`, lo);
      });
    } else if (p === 96) {
      y = drawChapterHeader(doc, y, 'Chapter 1', dbCh0.title, dbCh0.subtitle);
      dbCh0.theoreticalFoundations.forEach((tf: string, idx: number) => {
        y = drawCalloutBox(doc, y, 'concept', `Relational Foundation 1.${idx + 1}`, tf);
      });
    } else if (p === 97) {
      y = drawSectionHeader(doc, y, '1.1', 'Relational Algebra Mathematical Operators');
      y = drawTable(
        doc,
        y,
        ['Operator Symbol', 'Formal Name', 'Algebraic Definition', 'Equivalent SQL Keyword'],
        [35, 45, 60, 40],
        [
          ['sigma_P(R)', 'Selection', '{ t in R | P(t) is true }', 'WHERE clause'],
          ['pi_A(R)', 'Projection', '{ t[A] | t in R }', 'SELECT attribute list'],
          ['R |><| S', 'Natural Join', 'pi(sigma_R.A=S.A(R x S))', 'NATURAL JOIN / ON'],
          ['R union S', 'Union', '{ t | t in R or t in S }', 'UNION'],
          ['R - S', 'Set Difference', '{ t | t in R and t not in S }', 'EXCEPT / MINUS']
        ]
      );
    } else if (p >= 98 && p <= 103) {
      y = drawChapterHeader(doc, y, 'Chapter 2', 'Entity-Relationship Modeling & Schema Mapping', 'Cardinality Constraints, Weak Entity Sets & Relational Transformation');
      y = drawCalloutBox(doc, y, 'concept', 'ER-TO-RELATIONAL MAPPING RULES', '1. Strong entity sets become relations with matching primary keys.\n2. 1:N relationships map primary key of the 1-side as foreign key in the N-side.\n3. M:N relationships require a junction table with compound primary key.\n4. Multi-valued attributes become separate tables referencing the parent key.');
    } else if (p >= 104 && p <= 107) {
      y = drawChapterHeader(doc, y, 'Chapter 3', dbCh1.title, dbCh1.subtitle);
      dbCh1.theoreticalFoundations.forEach((tf: string, idx: number) => {
        y = drawCalloutBox(doc, y, 'concept', `Normalization Foundation 3.${idx + 1}`, tf);
      });
    } else if (p >= 108 && p <= 111) {
      y = drawChapterHeader(doc, y, 'Chapter 4', 'Storage Engines, B+ Tree Indexing Internals & Slotted Pages', 'Page Layouts, Buffer Pools & Disk Access Optimization');
      y = drawCalloutBox(doc, y, 'architecture', 'SLOTTED PAGE STORAGE ARCHITECTURE', 'Page Header [ Free Space Pointer | Slot Directory --> Tuple Offsets ] <==== FREE SPACE ====> [ Record Data ... ]');
      y = drawCalloutBox(doc, y, 'concept', 'B+ TREE ADVANTAGES FOR DISK STORAGE', '1. High fanout minimizes tree height to 3-4 levels for billions of records.\n2. Leaf nodes linked via doubly-linked pointers enable lightning-fast range scans without re-traversing internal nodes.');
    } else if (p >= 112 && p <= 115) {
      y = drawChapterHeader(doc, y, 'Chapter 5', 'Transactions, ACID Guarantees, Isolation Levels & 2PL Protocols', 'Concurrency Control, Precedence Graphs & Write-Ahead Logging');
      y = drawCalloutBox(doc, y, 'concept', 'ACID TRANSACTION GUARANTEES', 'Atomicity: All-or-nothing execution via undo logs.\nConsistency: Transactions preserve all database schema invariants.\nIsolation: Serializability guarantees execution matches some sequential order.\nDurability: Committed transactions persist across power failures via Write-Ahead Logging (WAL).');
    } else if (p >= 116 && p <= 119) {
      y = drawChapterHeader(doc, y, 'Chapter 6', 'Query Optimization, Physical Join Algorithms & Distributed Systems', 'Cost-Based Optimization, Grace Hash Joins & CAP Theorem');
      y = drawCalloutBox(doc, y, 'concept', 'JOIN ALGORITHMS COST COMPARISON', 'Nested Loop Join: O(M * N) - High I/O cost.\nBlock Nested Loop Join: O(B(R) + (B(R)/(Buffer-2)) * B(S)) - Moderate cost.\nSort-Merge Join: O(M log M + N log N) - Optimal for sorted inputs.\nGrace Hash Join: O(3 * (B(R) + B(S))) - Optimal for large unsorted relations.');
    } else if (p >= 120 && p <= 121) {
      y = drawChapterHeader(doc, y, 'Chapter 7', 'CS-204 Solved Midterm & Final Examination Bank', 'Normalization Proofs, Conflict Serializability & B+ Tree Splits');
      y = drawCalloutBox(doc, y, 'exam', 'EXAM PROBLEM: CONFLICT SERIALIZABILITY & 2PL', 'Given schedule S: r1(A); r2(B); w1(A); r2(A); w2(B); w1(B). Draw the precedence graph, test for conflict serializability, and determine whether S can be generated by Strict 2PL.');
      y = drawCalloutBox(doc, y, 'tip', 'MODEL SOLUTION & PRECEDENCE GRAPH', 'Edges: T1 -> T2 (w1(A) before r2(A)), and T2 -> T1 (r2(B) before w1(B)). The precedence graph contains a cycle T1 -> T2 -> T1. Therefore, schedule S is NOT conflict serializable.');
    } else if (p === 122) {
      y = drawSectionHeader(doc, y, '7.1', 'Authoritative Database Management Systems Lexicon');
      const glossRows = db.glossary.map((g: any) => [g.term, g.definition]);
      y = drawTable(doc, y, ['Key Term', 'Rigorous Academic Definition'], [45, 137], glossRows);
    }
  }

  // =============================================================
  // DISCIPLINE IV: OPERATING SYSTEMS (28 PAGES: 123 TO 150)
  // =============================================================
  const osCh0 = safeChapter(os, 0, 'Processes, Threads & Kernel Dual-Mode Protection', 'PCB State Machine, System Calls, Trap Handlers & Context Switching', [
    'Dual-mode operation partitions execution into User Mode and Kernel Mode using CPU privilege rings.',
    'A context switch saves CPU registers of the running process to its PCB and restores state of the next scheduled process.'
  ]);
  const osCh1 = safeChapter(os, 1, 'Concurrency, Race Conditions & Synchronization Primitives', 'Mutual Exclusion, Semaphores, Mutexes, Monitors & Hardware Atomics', [
    'Race conditions occur when multiple execution threads access shared memory without mutual exclusion.',
    'Dijkstra semaphores provide atomic P() (wait) and V() (signal) operations for thread synchronization.'
  ]);

  for (let p = 123; p <= 150; p++) {
    let y = await nextPage(
      'Discipline IV: Operating Systems Architecture',
      `CS-301 (Page ${p - 122}/28)`,
      `Drafting CS-301: Operating Systems (Page ${p} of 216)...`
    );

    if (p === 123) {
      y = drawChapterHeader(doc, y, 'Discipline IV', 'CS-301: Operating Systems Architecture', 'Dual-Mode Kernels, Concurrency, CPU Scheduling & Virtual Memory');
      y = drawCalloutBox(doc, y, 'concept', 'COURSE OVERVIEW & SYSTEMS MISSION', os.courseOverview);
      y = drawSectionHeader(doc, y, '4.0', 'Accredited Program Learning Outcomes');
      os.learningOutcomes.forEach((lo: string, idx: number) => {
        y = drawCalloutBox(doc, y, 'tip', `Outcome 4.${idx + 1}`, lo);
      });
    } else if (p === 124) {
      y = drawChapterHeader(doc, y, 'Chapter 1', osCh0.title, osCh0.subtitle);
      osCh0.theoreticalFoundations.forEach((tf: string, idx: number) => {
        y = drawCalloutBox(doc, y, 'concept', `Kernel Foundation 1.${idx + 1}`, tf);
      });
    } else if (p >= 125 && p <= 127) {
      y = drawSectionHeader(doc, y, '1.1', 'Hardware Trap Handlers & System Call Lifecycle');
      y = drawCalloutBox(doc, y, 'architecture', 'SYSTEM CALL EXECUTION PIPELINE', 'User App calls read() --> Loads syscall ID into RAX --> Executes syscall instruction --> CPU switches to Ring 0 --> Jumps to kernel system_call_table[RAX] --> Executes sys_read --> sysret back to Ring 3');
    } else if (p >= 128 && p <= 131) {
      y = drawChapterHeader(doc, y, 'Chapter 2', osCh1.title, osCh1.subtitle);
      osCh1.theoreticalFoundations.forEach((tf: string, idx: number) => {
        y = drawCalloutBox(doc, y, 'concept', `Concurrency Foundation 2.${idx + 1}`, tf);
      });
    } else if (p >= 132 && p <= 135) {
      y = drawChapterHeader(doc, y, 'Chapter 3', 'CPU Scheduling: Preemptive Algorithms & Multilevel Queues', 'FCFS, Shortest Job First, Round Robin & MLFQ Priority Heuristics');
      y = drawTable(
        doc,
        y,
        ['Algorithm', 'Preemptive?', 'Criteria', 'Pros / Cons'],
        [40, 30, 45, 65],
        [
          ['First-Come First-Served', 'No', 'Arrival time', 'Simple / Suffers from severe convoy effect'],
          ['Shortest Job First', 'Optional', 'Burst time', 'Provably minimal average wait time / Starvation possible'],
          ['Round Robin', 'Yes', 'Time quantum', 'Fair interactive response / Quantum size tuning is critical'],
          ['Multilevel Feedback Queue', 'Yes', 'Dynamic priority', 'Adaptive to CPU vs I/O bursts / Complex tuning parameters']
        ]
      );
    } else if (p >= 136 && p <= 139) {
      y = drawChapterHeader(doc, y, 'Chapter 4', 'Deadlock Detection, Prevention & Banker Algorithm', 'Coffman Conditions, Resource Allocation Graphs & Safe Sequences');
      y = drawCalloutBox(doc, y, 'concept', 'FOUR COFFMAN DEADLOCK CONDITIONS', '1. Mutual Exclusion: At least one resource held non-shareably.\n2. Hold and Wait: Process holds resource while waiting for another.\n3. No Preemption: Resources cannot be forcibly taken from a process.\n4. Circular Wait: A closed chain of processes each waiting for next in circle.');
    } else if (p >= 140 && p <= 144) {
      y = drawChapterHeader(doc, y, 'Chapter 5', 'Virtual Memory, Multi-Level Page Tables & TLB Mechanics', 'Hardware MMU, Effective Access Time, Page Faults & LRU Invariants');
      y = drawCalloutBox(doc, y, 'concept', 'VIRTUAL ADDRESS TRANSLATION (x86-64)', 'Virtual Address: [ PML4: 9b ][ PDPT: 9b ][ PD: 9b ][ PT: 9b ][ Offset: 12b ] = 48-bit address space.');
      y = drawCalloutBox(doc, y, 'tip', 'PAGE FAULT HANDLING STEPS', '1. CPU traps on invalid PTE bit.\n2. OS locates page in swap space.\n3. Allocates physical frame.\n4. Reads page from disk via DMA.\n5. Updates PTE and restarts trapped instruction.');
    } else if (p >= 145 && p <= 147) {
      y = drawChapterHeader(doc, y, 'Chapter 6', 'Storage Systems: Unix Inode Architecture & File Systems', 'Direct/Indirect Inode Blocks, Journaling & Crash Consistency');
      y = drawCalloutBox(doc, y, 'architecture', 'UNIX INODE STRUCTURE', 'Inode [ Mode | UID | Size | 12 Direct Pointers | 1 Single Indirect | 1 Double Indirect | 1 Triple Indirect ]');
    } else if (p >= 148 && p <= 149) {
      y = drawChapterHeader(doc, y, 'Chapter 7', 'CS-301 Solved Midterm & Final Examination Bank', 'Effective Access Time Calculations, Banker Safe Sequence Proofs');
      y = drawCalloutBox(doc, y, 'exam', 'EXAM PROBLEM: MULTI-LEVEL PAGING EMAT', 'Calculate Effective Memory Access Time with 2-level paging, TLB lookup = 20ns, memory access = 100ns, TLB hit rate = 90%.');
      y = drawCalloutBox(doc, y, 'tip', 'MODEL SOLUTION', 'EMAT = HitRate * (TLB + Mem) + MissRate * (TLB + 2*Mem + Mem) = 0.90 * (20 + 100) + 0.10 * (20 + 200 + 100) = 0.90 * 120 + 0.10 * 320 = 108 + 32 = 140 ns.');
    } else if (p === 150) {
      y = drawSectionHeader(doc, y, '7.1', 'Authoritative Operating Systems Lexicon');
      const glossRows = os.glossary.map((g: any) => [g.term, g.definition]);
      y = drawTable(doc, y, ['Key Term', 'Rigorous Academic Definition'], [45, 137], glossRows);
    }
  }

  // =============================================================
  // DISCIPLINE V: COMPUTER NETWORKS (26 PAGES: 151 TO 176)
  // =============================================================
  const netCh0 = safeChapter(net, 0, 'Network Layering Models & Protocol Encapsulation', 'OSI 7-Layer Reference Model vs TCP/IP 5-Layer Stack', [
    'Layered networking isolates responsibilities through standardized service access points and protocol boundaries.',
    'Data encapsulation wraps payload data with headers at Application, Transport, Network, and Link layers.'
  ]);
  const netCh1 = safeChapter(net, 1, 'Network Layer: IPv4/IPv6, CIDR Subnetting & Addressing', 'Subnet Mask Calculations, VLSM, Routing Tables & ARP', [
    'Classless Inter-Domain Routing (CIDR) eliminates rigid classes using arbitrary-length prefix masks (/N).',
    'Address Resolution Protocol (ARP) translates 32-bit logical IP addresses into 48-bit physical MAC addresses.'
  ]);

  for (let p = 151; p <= 176; p++) {
    let y = await nextPage(
      'Discipline V: Computer Networks & Distributed Systems',
      `CS-302 (Page ${p - 150}/26)`,
      `Drafting CS-302: Computer Networks (Page ${p} of 216)...`
    );

    if (p === 151) {
      y = drawChapterHeader(doc, y, 'Discipline V', 'CS-302: Computer Networks & Distributed Systems', 'Layered Protocols, CIDR Subnetting, TCP Congestion Control & Security');
      y = drawCalloutBox(doc, y, 'concept', 'COURSE OVERVIEW & NETWORKING FOUNDATIONS', net.courseOverview);
      y = drawSectionHeader(doc, y, '5.0', 'Accredited Program Learning Outcomes');
      net.learningOutcomes.forEach((lo: string, idx: number) => {
        y = drawCalloutBox(doc, y, 'tip', `Outcome 5.${idx + 1}`, lo);
      });
    } else if (p === 152) {
      y = drawChapterHeader(doc, y, 'Chapter 1', netCh0.title, netCh0.subtitle);
      netCh0.theoreticalFoundations.forEach((tf: string, idx: number) => {
        y = drawCalloutBox(doc, y, 'concept', `Layering Foundation 1.${idx + 1}`, tf);
      });
    } else if (p >= 153 && p <= 156) {
      y = drawSectionHeader(doc, y, '1.1', 'OSI 7-Layer Reference Model vs TCP/IP Architecture');
      y = drawTable(
        doc,
        y,
        ['OSI Layer', 'TCP/IP Layer', 'Data Unit (PDU)', 'Core Protocols & Hardware'],
        [35, 35, 35, 75],
        [
          ['7. Application', 'Application', 'Data / Message', 'HTTP/3, DNS, SSH, SMTP, TLS 1.3'],
          ['6. Presentation', 'Application', 'Data', 'ASCII, JSON, Protocol Buffers, gzip'],
          ['5. Session', 'Application', 'Data', 'RPC, NetBIOS, gRPC streams'],
          ['4. Transport', 'Transport', 'Segment (TCP) / Datagram', 'TCP, UDP, QUIC, SCTP / Ports'],
          ['3. Network', 'Network / Internet', 'Packet', 'IPv4, IPv6, ICMP, BGP, OSPF / Routers'],
          ['2. Data Link', 'Network Interface', 'Frame', 'Ethernet (802.3), Wi-Fi (802.11) / Switches'],
          ['1. Physical', 'Network Interface', 'Bit', 'Copper, Fiber optics, Radio frequencies']
        ]
      );
    } else if (p >= 157 && p <= 161) {
      y = drawChapterHeader(doc, y, 'Chapter 2', netCh1.title, netCh1.subtitle);
      netCh1.theoreticalFoundations.forEach((tf: string, idx: number) => {
        y = drawCalloutBox(doc, y, 'concept', `Subnetting Principle 2.${idx + 1}`, tf);
      });
    } else if (p >= 162 && p <= 165) {
      y = drawChapterHeader(doc, y, 'Chapter 3', 'Routing Algorithms: Link-State, Distance-Vector & SDN', 'Dijkstra OSPF, Bellman-Ford BGP & Software-Defined Networking');
      y = drawCalloutBox(doc, y, 'concept', 'LINK-STATE VS DISTANCE-VECTOR ROUTING', 'Link-State (OSPF): Each router floods link costs to entire network and computes Dijkstra shortest path tree. Rapid convergence, high memory.\nDistance-Vector (BGP): Routers exchange routing tables with neighbors only. Prone to count-to-infinity problem solved via poison reverse.');
    } else if (p >= 166 && p <= 170) {
      y = drawChapterHeader(doc, y, 'Chapter 4', 'Transport Layer: TCP Reliability, Flow & Congestion Control', '3-Way Handshake, Sliding Window, AIMD & BDP Bandwidth Delay');
      y = drawCalloutBox(doc, y, 'concept', 'TCP CONGESTION CONTROL PHASES', '1. Slow Start: Congestion window (cwnd) doubles every RTT until ssthresh.\n2. Congestion Avoidance: cwnd increases by 1 MSS per RTT (linear growth).\n3. Fast Retransmit / Fast Recovery: Triggered by 3 duplicate ACKs; cwnd halved.');
    } else if (p >= 171 && p <= 173) {
      y = drawChapterHeader(doc, y, 'Chapter 5', 'Application Protocols: DNS, HTTP/2 vs HTTP/3 & TLS 1.3', 'Hierarchical Name Resolution, Multiplexing & Cryptography');
      y = drawCalloutBox(doc, y, 'concept', 'HTTP PROTOCOL EVOLUTION', 'HTTP/1.1: Head-of-line blocking on single TCP connection.\nHTTP/2: Binary framing and stream multiplexing over single TCP connection.\nHTTP/3: Operates over QUIC (UDP), eliminating head-of-line blocking at packet level.');
    } else if (p >= 174 && p <= 175) {
      y = drawChapterHeader(doc, y, 'Chapter 6', 'CS-302 Solved Midterm & Final Examination Bank', 'VLSM Allocation, TCP Window Scaling & Bandwidth-Delay Math');
      y = drawCalloutBox(doc, y, 'exam', 'EXAM PROBLEM: BANDWIDTH-DELAY PRODUCT (BDP)', 'A 10 Gbps link connects two datacenters with 50 ms Round-Trip Time. Calculate BDP in megabytes. If TCP uses a 16-bit window without window scaling, what is the maximum achievable throughput?');
      y = drawCalloutBox(doc, y, 'tip', 'MODEL SOLUTION', '1. BDP = Bandwidth * RTT = 10 * 10^9 bps * 0.050 s = 500,000,000 bits = 62.5 Megabytes.\n2. Max window size without scaling = 2^16 - 1 = 65,535 bytes = 524,280 bits.\n3. Max throughput = Window / RTT = 524,280 / 0.050 = 10.48 Mbps (< 0.11% link utilization! Window scaling is mandatory).');
    } else if (p === 176) {
      y = drawSectionHeader(doc, y, '6.1', 'Authoritative Computer Networks Lexicon');
      const glossRows = net.glossary.map((g: any) => [g.term, g.definition]);
      y = drawTable(doc, y, ['Key Term', 'Rigorous Academic Definition'], [45, 137], glossRows);
    }
  }

  // =============================================================
  // DISCIPLINE VI: SOFTWARE ENGINEERING (22 PAGES: 177 TO 198)
  // =============================================================
  const seCh0 = safeChapter(se, 0, 'SDLC Methodologies, Agile Principles & Scrum Framework', 'Waterfall vs Spiral vs Agile, Scrum Sprints & Burndown Charts', [
    'The Software Development Lifecycle (SDLC) defines formal engineering phases from requirements to maintenance.',
    'Scrum organizes development into fixed-duration Sprints (2-4 weeks) with daily stand-ups and sprint reviews.'
  ]);
  const seCh1 = safeChapter(se, 1, 'Object-Oriented Design Principles (SOLID) & Design Patterns', 'SRP, OCP, LSP, ISP, DIP & Gang of Four Architecture', [
    'SOLID principles prevent rigid, fragile software architecture through interface abstraction and dependency injection.',
    'Gang of Four patterns provide tested reusable templates for common architectural scenarios.'
  ]);

  for (let p = 177; p <= 198; p++) {
    let y = await nextPage(
      'Discipline VI: Software Engineering & System Design',
      `CS-304 (Page ${p - 176}/22)`,
      `Drafting CS-304: Software Engineering (Page ${p} of 216)...`
    );

    if (p === 177) {
      y = drawChapterHeader(doc, y, 'Discipline VI', 'CS-304: Software Engineering & System Design', 'SDLC Frameworks, SOLID Design Patterns, DevOps & Microservices');
      y = drawCalloutBox(doc, y, 'concept', 'COURSE OVERVIEW & ENGINEERING ETHICS', se.courseOverview);
      y = drawSectionHeader(doc, y, '6.0', 'Accredited Program Learning Outcomes');
      se.learningOutcomes.forEach((lo: string, idx: number) => {
        y = drawCalloutBox(doc, y, 'tip', `Outcome 6.${idx + 1}`, lo);
      });
    } else if (p === 178) {
      y = drawChapterHeader(doc, y, 'Chapter 1', seCh0.title, seCh0.subtitle);
      seCh0.theoreticalFoundations.forEach((tf: string, idx: number) => {
        y = drawCalloutBox(doc, y, 'concept', `SDLC Foundation 1.${idx + 1}`, tf);
      });
    } else if (p >= 179 && p <= 181) {
      y = drawSectionHeader(doc, y, '1.1', 'Comparative Analysis of Engineering Lifecycles');
      y = drawTable(
        doc,
        y,
        ['Process Model', 'Requirements Flexibility', 'Risk Management', 'Ideal Project Context'],
        [40, 45, 45, 50],
        [
          ['Waterfall', 'Very Low (fixed upfront)', 'Late (in testing phase)', 'Safety-critical hardware / NASA specs'],
          ['Spiral Model', 'Moderate', 'Continuous (per cycle)', 'High-risk, multi-million dollar R&D'],
          ['Agile / Scrum', 'High (continuous evolution)', 'Empirical / Sprint-level', 'Fast-moving consumer software / SaaS'],
          ['Kanban', 'Maximum (just-in-time)', 'Continuous flow monitoring', 'Maintenance & platform support teams']
        ]
      );
    } else if (p >= 182 && p <= 186) {
      y = drawChapterHeader(doc, y, 'Chapter 2', seCh1.title, seCh1.subtitle);
      seCh1.theoreticalFoundations.forEach((tf: string, idx: number) => {
        y = drawCalloutBox(doc, y, 'concept', `SOLID Foundation 2.${idx + 1}`, tf);
      });
    } else if (p >= 187 && p <= 190) {
      y = drawChapterHeader(doc, y, 'Chapter 3', 'Software Verification, Testing Pyramid & Mutation Testing', 'Unit Tests, Integration Tests, Mocking & Line/Branch Coverage');
      y = drawCalloutBox(doc, y, 'concept', 'THE TESTING PYRAMID ARCHITECTURE', 'Unit Tests (70%): Fast, isolated, in-memory tests verifying single classes/functions.\nIntegration Tests (20%): Verify boundary interactions with databases, caches, and HTTP APIs.\nEnd-to-End Tests (10%): Full user workflow tests running against production-like environments.');
    } else if (p >= 191 && p <= 194) {
      y = drawChapterHeader(doc, y, 'Chapter 4', 'DevOps, CI/CD Pipelines & Containerization Architecture', 'Git Internals, Automated Build Pipelines & Docker Mechanics');
      y = drawCalloutBox(doc, y, 'concept', 'DOCKER CONTAINER ISOLATION INTERNALS', 'Containers are not virtual machines. They are isolated Linux processes leveraging: (1) Namespaces (PID, NET, MNT, IPC) for visibility isolation; (2) Cgroups for CPU/RAM resource limits; (3) OverlayFS copy-on-write union file systems.');
    } else if (p >= 195 && p <= 196) {
      y = drawChapterHeader(doc, y, 'Chapter 5', 'Distributed Systems Architecture & Microservices Resilience', 'Circuit Breaker, API Gateways & Event-Driven Message Brokers');
      y = drawCalloutBox(doc, y, 'concept', 'RESILIENCE DESIGN PATTERNS', 'Circuit Breaker: Prevents cascading failures by tripping open when error threshold is reached.\nIdempotency Key: Ensures duplicate HTTP POST requests do not trigger duplicate charges.\nOutbox Pattern: Guarantees database writes and message broker publishes succeed atomically.');
    } else if (p >= 197 && p <= 198) {
      y = drawChapterHeader(doc, y, 'Chapter 6', 'CS-304 Solved Midterm & Final Examination Bank', 'SOLID Refactoring Scenarios & Architectural Design Reviews');
      y = drawCalloutBox(doc, y, 'exam', 'EXAM PROBLEM: SOLID REFACTORING', 'A monolithic PaymentService class contains 2,000 lines handling PayPal, Stripe, SQL logging, and sending emails. Detail all SOLID violations and refactor using Dependency Injection and Factory Pattern.');
      y = drawCalloutBox(doc, y, 'tip', 'MODEL REFACTORING SOLUTION', '1. Single Responsibility (SRP): Split into IPaymentProcessor, IReceiptNotifier, and ITransactionRepository.\n2. Open/Closed (OCP): Introduce IPaymentGateway interface so new processors require no modification to existing callers.\n3. Dependency Inversion (DIP): Inject interfaces via constructor.');
    }
  }
}
