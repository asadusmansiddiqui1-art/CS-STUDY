import 'dotenv/config';
import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

let geminiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!geminiClient) {
    geminiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return geminiClient;
}

function formatGeminiContents(messages: Array<{ role: string; content: string }>) {
  const valid = messages.filter((m) => m && typeof m.content === 'string' && m.content.trim().length > 0);
  const firstUserIdx = valid.findIndex((m) => m.role === 'user');
  if (firstUserIdx === -1) {
    return [];
  }
  const sliced = valid.slice(firstUserIdx);
  const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

  for (const m of sliced) {
    const role: 'user' | 'model' = m.role === 'user' ? 'user' : 'model';
    if (contents.length > 0 && contents[contents.length - 1].role === role) {
      contents[contents.length - 1].parts[0].text += `\n\n${m.content}`;
    } else {
      contents.push({
        role,
        parts: [{ text: m.content }],
      });
    }
  }
  return contents;
}

const SYSTEM_INSTRUCTION = `You are the Official AI Academic Tutor & Computer Science Mentor on "CS Study Hub", an undergraduate learning platform curated by Asad Usman (Computer Science Expert, email: asadusmansiddiqui1@gmail.com). Direct students to contact via Email or WhatsApp Message, and never disclose any raw phone number.

You are deeply knowledgeable in the entire CS curriculum, degree roadmaps, core courses, classes, industry skills, and semester grading rules of this platform.

### PLATFORM CURRICULUM & COURSES:
1. **Programming Fundamentals (CS-101 | 1st Semester | 4 Credit Hours)**:
   - Core Topics: Machine architecture (Von Neumann), compilation pipeline (preprocessor -> compiler -> assembler -> linker), primitive data types, memory representations, control structures (loops, switch jump tables), functions, call stack frames, recursion, arrays (row-major memory), pointers, pointer arithmetic, dynamic memory allocation (new/delete, malloc/free, memory leaks), structs, memory padding, file I/O streams.
   - Key Books: Deitel & Deitel, Tony Gaddis, K&R C.
   - Exam & Viva: Pointer tracing diagrams, recursion trees, memory leak detection.

2. **Data Structures & Algorithmic Analysis (CS-201 | 3rd Semester | 4 Credit Hours)**:
   - Core Topics: Big-O, Big-Omega, Big-Theta asymptotic analysis; Singly/Doubly/Circular Linked Lists; Stacks (infix-to-postfix, call stack); Queues (Circular, Priority Queue); Trees (BST, AVL balancing rotations, Red-Black principles, B-Trees); Min/Max Heaps (HeapSort O(n log n)); Hash Tables (collision resolution: chaining, open addressing); Graphs (Adjacency Matrix/List, BFS, DFS, Topological Sort, Dijkstra's Shortest Path, Bellman-Ford, Prim's & Kruskal's MST); Divide & Conquer (MergeSort, QuickSort with randomized pivot).
   - Key Books: CLRS (Introduction to Algorithms), Mark Allen Weiss.

3. **Database Systems (CS-204 | 4th Semester | 4 Credit Hours)**:
   - Core Topics: Relational Data Model, ER and EER Modeling, Relational Algebra (Select, Project, Join, Union), SQL Mastery (DDL, DML, Aggregates, Group By, Subqueries, Complex Joins, Window functions), Functional Dependencies, Normalization (1NF, 2NF, 3NF, BCNF with loss-less join and dependency preservation), Transactions, ACID properties, Concurrency Control (Serializability, Two-Phase Locking 2PL, Deadlock prevention), Storage & Indexing (B+ Trees, Hash Indexing, Query Optimization).
   - Key Books: Silberschatz, Korth & Sudarshan; Elmasri & Navathe.

4. **Operating Systems (CS-301 | 5th Semester | 4 Credit Hours)**:
   - Core Topics: Kernel architectures (Monolithic vs Microkernel), Process State Lifecycle, PCB, Context Switching, System Calls (fork, exec, wait, exit), Multithreading (User vs Kernel threads), CPU Scheduling (FCFS, SJF, Round Robin, Multilevel Feedback Queues), Synchronization (Race conditions, Peterson's solution, Mutex, Counting/Binary Semaphores, Dining Philosophers, Producer-Consumer), Deadlocks (Coffman conditions, Banker's Algorithm), Virtual Memory (Paging, Page Tables, TLB, Page Fault Handler, Page Replacement: FIFO, LRU, Clock, Optimal), File Systems (Inodes, Directory structures).
   - Key Books: Silberschatz, Galvin & Gagne (Dinosaur Book); OSTEP (Operating Systems: Three Easy Pieces).

5. **Computer Networks (CS-302 | 6th Semester | 3 Credit Hours)**:
   - Core Topics: OSI 7-Layer and TCP/IP 5-Layer models, Physical & Data Link (Framing, CRC, Ethernet, CSMA/CD), Network Layer (IPv4/IPv6, CIDR Subnetting, ARP, ICMP, Routing: Distance Vector, Link State, OSPF, BGP), Transport Layer (UDP vs TCP, 3-Way Handshake, Sequence & Ack numbers, Sliding Window Flow Control, TCP Congestion Control: Slow Start, AIMD), Application Layer (DNS resolution, HTTP/1.1 vs HTTP/2 vs HTTP/3, TLS/SSL handshake, Sockets).
   - Key Books: Kurose & Ross (Top-Down Approach); Tanenbaum.

6. **Software Engineering (CS-304 | 6th Semester | 3 Credit Hours)**:
   - Core Topics: SDLC Models (Waterfall, Spiral, Agile Scrum, Kanban), Requirement Engineering (Functional vs Non-Functional, User Stories), System Architecture (Monoliths vs Microservices, Layered, MVC, Clean Architecture), UML Diagrams (Class, Sequence, State, Activity), Design Patterns (GoF: Singleton, Factory, Observer, Strategy, Decorator, Adapter), Software Testing (Unit, Integration, System, Black-box/White-box, TDD), CI/CD pipelines, Code Quality.
   - Key Books: Ian Sommerville; Clean Code (Robert C. Martin); GoF Design Patterns.

### DEGREE HANDBOOK & DOWNLOADABLE TEXTBOOKS:
- **110-Page Master CS Degree Handbook**: An exhaustive 110-page academic encyclopedia integrating all 6 disciplines with theory, low-level architecture, memory models, production code, and 100+ solved university exam questions. Students can download it directly from the "Core CS Subjects" section.
- **23-Page Single-Subject Textbooks**: Downloadable dedicated 23-page manuals for each course on the hub.

### INDUSTRY SKILLS & CAREER ROADMAPS:
- **Foundational CS**: DSA Problem Solving, C++ / Python programming.
- **DevOps & Infrastructure**: Linux command-line & bash scripting, Git & GitHub professional workflow (branches, PRs, merge conflict resolution, rebase), Docker containerization, CI/CD.
- **Full-Stack Engineering**: React, TypeScript, Tailwind CSS, Node.js/Express, REST APIs.
- **Databases & Systems**: PostgreSQL, schema design, B+ Tree indexing, cache hierarchies (Redis).

### SEMESTER GPA & ACADEMIC RULES:
- 4.0 Scale: A (85%+ = 4.0), A- (80-84% = 3.67), B+ (75-79% = 3.33), B (70-74% = 3.0), B- (65-69% = 2.67), C+ (61-64% = 2.33), C (58-60% = 2.0), F (<50% = 0.0).
- Formula: GPA = Σ(Credit Hours × Grade Points) / Total Credit Hours.

### DIRECT & QUICK RESPONSE INSTRUCTIONS:
1. **Direct Answer First**: Address the student's question immediately and specifically with high accuracy.
2. **Concise & Punchy**: Deliver structured answers (bullet points, clear subheadings, and syntax-highlighted code snippets where appropriate). Avoid repetitive boilerplate.
3. **Curriculum Awareness**: When asked about courses, classes, semesters, or skills, cite the exact course codes (CS-101, CS-201, CS-204, CS-301, CS-302, CS-304), credit hours, and practical tools.
4. **Code & Explanations**: Provide clean, working code snippets in C++, Python, or Java with Big-O complexity analysis when algorithms are requested.`;

async function generateChatResponse(ai: GoogleGenAI, contents: any[], subject?: string): Promise<string> {
  const subjectContext = subject && subject !== 'General CS' ? `\nNote: The student is specifically focusing on the discipline/class: "${subject}".` : '';
  const fullSystemInstruction = SYSTEM_INSTRUCTION + subjectContext;

  const response = await ai.models.generateContent({
    model: 'gemini-3.6-flash',
    contents,
    config: {
      systemInstruction: fullSystemInstruction,
      temperature: 0.5,
    },
  });

  if (response.text) {
    return response.text;
  }
  throw new Error('No text returned from model');
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '5mb' }));

  // Health check endpoint
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', hasGeminiKey: Boolean(process.env.GEMINI_API_KEY) });
  });

  // SSE Real-time Streaming AI Chat endpoint for ultra-fast, live token responses
  app.post('/api/chat/stream', async (req, res) => {
    try {
      const { messages, subject } = req.body;

      if (!Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ error: 'Messages array is required' });
      }

      const ai = getGeminiClient();
      if (!ai) {
        return res.status(503).json({ error: 'Gemini API is not configured' });
      }

      const contents = formatGeminiContents(messages);
      if (contents.length === 0) {
        return res.status(400).json({ error: 'At least one user message is required' });
      }

      // Configure SSE Headers
      res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
      res.setHeader('Cache-Control', 'no-cache, no-transform');
      res.setHeader('Connection', 'keep-alive');
      res.setHeader('X-Accel-Buffering', 'no');
      res.flushHeaders?.();

      const subjectContext = subject && subject !== 'General CS' ? `\nSubject Focus: ${subject}` : '';
      const fullSystemInstruction = SYSTEM_INSTRUCTION + subjectContext;

      const responseStream = await ai.models.generateContentStream({
        model: 'gemini-3.6-flash',
        contents,
        config: {
          systemInstruction: fullSystemInstruction,
          temperature: 0.5,
        },
      });

      for await (const chunk of responseStream) {
        if (chunk.text) {
          res.write(`data: ${JSON.stringify({ text: chunk.text })}\n\n`);
        }
      }

      res.write('data: [DONE]\n\n');
      res.end();
    } catch (error: any) {
      console.error('Streaming error in /api/chat/stream:', error);
      if (!res.headersSent) {
        return res.status(500).json({ error: error?.message || 'Streaming failed' });
      }
      res.write(`data: ${JSON.stringify({ error: error?.message || 'Streaming error' })}\n\n`);
      res.end();
    }
  });

  // AI CS Student Chat Board endpoint (JSON fallback)
  app.post('/api/chat', async (req, res) => {
    try {
      const { messages, subject } = req.body;

      if (!Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ error: 'Messages array is required' });
      }

      const ai = getGeminiClient();

      if (!ai) {
        return res.json({
          reply: `### Notice from CS Study Hub AI Tutor 🎓\n\nI am currently operating in offline advisory mode. You can still review the complete course syllabi, **23-Page Textbooks**, and **110-Page Master Handbook** right on this portal!\n\nTo activate live conversational answers, configure \`GEMINI_API_KEY\` in your environment settings.`,
        });
      }

      const contents = formatGeminiContents(messages);
      if (contents.length === 0) {
        return res.status(400).json({ error: 'At least one user message is required' });
      }

      const replyText = await generateChatResponse(ai, contents, subject);
      return res.json({ reply: replyText });
    } catch (error: any) {
      console.error('Error in /api/chat:', error);

      // Extract last user message to provide intelligent domain fallback if network hiccups occur
      const userMessages = req.body?.messages?.filter((m: any) => m.role === 'user');
      const lastQuery = userMessages?.[userMessages.length - 1]?.content?.toLowerCase() || '';

      let fallbackAnswer = '';

      if (lastQuery.includes('course') || lastQuery.includes('class') || lastQuery.includes('subject') || lastQuery.includes('curriculum')) {
        fallbackAnswer = `### Core Computer Science Curriculum on CS Study Hub 🎓\nCurated by **Asad Usman**, our degree program features 6 foundational pillars:\n\n1. **CS-101: Programming Fundamentals** (Semester 1 | 4 Credits) - C++ syntax, memory layout, control flow, functions, arrays, pointers, dynamic memory allocation (\`new\`/\`delete\`), and file I/O.\n2. **CS-201: Data Structures & Algorithmic Analysis** (Semester 3 | 4 Credits) - Asymptotic Big-O analysis, Linked Lists, Stacks, Queues, Binary Trees, AVL balancing, Heaps, Hash Tables, and Graphs (BFS/DFS/Dijkstra).\n3. **CS-204: Database Systems** (Semester 4 | 4 Credits) - Relational algebra, SQL mastery, Normalization (1NF to BCNF), Transactions & ACID, B+ Tree indexing.\n4. **CS-301: Operating Systems** (Semester 5 | 4 Credits) - Processes, Threads, CPU scheduling, Semaphores & Mutex, Deadlocks, Virtual Memory paging, and File Systems.\n5. **CS-302: Computer Networks** (Semester 6 | 3 Credits) - OSI & TCP/IP stack, Subnetting, TCP 3-way handshake, Routing algorithms, and Socket programming.\n6. **CS-304: Software Engineering** (Semester 6 | 3 Credits) - Agile/Scrum SDLC, UML modeling, GoF Design Patterns, Clean Architecture, and Testing.\n\n📚 **Study Tip:** You can download the **110-Page Master Degree Handbook** or individual **23-Page Course Textbooks** directly from the **Core CS Subjects** section above!`;
      } else if (lastQuery.includes('skill') || lastQuery.includes('career') || lastQuery.includes('job')) {
        fallbackAnswer = `### High-Yield Industry Skills for CS Students 💻\nCurated roadmap on CS Study Hub:\n\n1. **DSA & Problem Solving**: Master two-pointers, sliding window, tree traversals, and dynamic programming.\n2. **Git & GitHub Workflow**: Branching, atomic commits, pull requests, merge conflict resolution, and interactive rebase.\n3. **Linux Command Line & Scripting**: Terminal navigation, grep, piping, process management, and shell automation.\n4. **Modern Full-Stack Development**: React, TypeScript, Tailwind CSS, Node.js/Express, REST APIs.\n5. **Docker & Containers**: Writing Dockerfiles, multi-stage builds, and cloud container deployments.\n6. **Relational Database Engineering**: PostgreSQL, index optimization, and transaction isolation levels.\n\n🎥 Check out our curated **Skills & Video Masterclasses** section on this page to watch hand-picked video guides!`;
      } else if (lastQuery.includes('gpa') || lastQuery.includes('grade') || lastQuery.includes('cgpa')) {
        fallbackAnswer = `### University GPA & CGPA Calculation Guide 📊\n\n- **Formula**: \`Semester GPA = Σ (Course Credit Hours × Grade Points) / Total Credit Hours\`\n- **Grading Scale (4.0 Standard)**:\n  - **A+ / A (85%+)** = 4.00 Grade Points\n  - **A- (80-84%)** = 3.67 Grade Points\n  - **B+ (75-79%)** = 3.33 Grade Points\n  - **B (70-74%)** = 3.00 Grade Points\n  - **B- (65-69%)** = 2.67 Grade Points\n  - **C+ (61-64%)** = 2.33 Grade Points\n  - **C (58-60%)** = 2.00 Grade Points\n  - **F (<50%)** = 0.00 Grade Points\n\nUse our interactive **Semester GPA Calculator** section on this hub to project your semester grades and target GPA!`;
      } else {
        fallbackAnswer = `### CS Study Hub Academic Advisory 🎓\nThank you for asking! I am your AI Computer Science Tutor, trained on all undergraduate subjects (Programming Fundamentals, Data Structures, Databases, Operating Systems, Computer Networks, and Software Engineering).\n\nFeel free to ask me:\n- To explain any concept (e.g. *"Explain TCP 3-way handshake"* or *"How does AVL rotation work?"*)\n- To write or debug code in C++, Python, or Java\n- How to prepare for semester exams and viva presentations\n- Details about the **110-Page Master Degree Handbook** curated by **Asad Usman**!`;
      }

      return res.json({
        reply: fallbackAnswer,
      });
    }
  });

  // Vite middleware for development vs static build for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`CS Study Hub server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});

