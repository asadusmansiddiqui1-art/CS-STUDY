import { SubjectModule } from '../types';

export const coreSubjects: SubjectModule[] = [
  {
    id: 'pf',
    code: 'CS-101',
    name: 'Programming Fundamentals',
    semester: '1st Semester',
    creditHours: 4,
    iconName: 'Code2',
    color: 'emerald',
    pdfDownloadName: 'CS101_Programming_Fundamentals_Slides.pdf',
    description: 'Foundations of imperative problem solving, structured programming, memory management, pointers, and algorithmic logic in C++.',
    coreTopics: [
      'Primitive Data Types, Overflow, & Type Casting',
      'Control Structures: if/else, switch, loops (for, while, do-while)',
      'Functions, Call Stack, Scope, Recursion, Pass-by-Value vs Reference',
      'Arrays (1D & 2D), Row-Major Matrix Operations & C-Strings',
      'Pointers, Pointer Arithmetic, Dynamic Memory Allocation (new/delete)',
      'Structures (structs), Memory Padding, & File I/O Streams'
    ],
    recommendedBooks: [
      'C++ How to Program - Paul Deitel & Harvey Deitel',
      'Starting Out with C++: From Control Structures through Objects - Tony Gaddis',
      'The C Programming Language - Brian Kernighan & Dennis Ritchie'
    ],
    examTips: [
      'Always draw memory box diagrams for pointer dereferencing (*p) and address-of (&x) tracing questions.',
      'Watch out for infinite loop edge conditions and off-by-one errors in nested matrix loops.',
      'Check dynamic memory allocation for leaks: each new must have a corresponding delete.'
    ],
    projectIdeas: [
      'Student Record Management System with File I/O',
      'Console-based Battleship Game with Procedural AI',
      'CLI Banking Ledger with Transaction Logging'
    ],
    slidesDeck: {
      deckTitle: 'CS-101: Programming Fundamentals Slide Deck',
      totalSlides: 5,
      author: 'Asad Usman (CS Expert)',
      slides: [
        {
          slideNumber: 1,
          title: 'Module 1: Machine Architecture & Memory Layout',
          bulletPoints: [
            'Von Neumann architecture: CPU, RAM, Cache hierarchies & Bus layout',
            'Compilation pipeline: Preprocessor -> Compiler -> Assembler -> Linker',
            'Variables as memory addresses: Hexadecimal offsets and bitwidth representations',
            'Primitive types: int (4 bytes), char (1 byte), float (4 bytes), double (8 bytes)'
          ],
          codeOrDiagram: 'Source (.cpp) -> Preprocessed (.i) -> Assembly (.s) -> Object (.o) -> Binary Executable',
          examHighlight: 'Midterm favorite: Differentiating compiler errors vs linker errors (e.g. undefined reference).'
        },
        {
          slideNumber: 2,
          title: 'Module 2: Control Flow & Algorithmic Branching',
          bulletPoints: [
            'Short-circuit evaluation in logical operators (&&, ||)',
            'Switch-case jump tables vs cascaded if-else performance trade-offs',
            'Loop invariants, boundary conditions, and accumulator patterns',
            'Break vs continue within nested multi-dimensional iteration'
          ],
          codeOrDiagram: 'int i = 0;\nwhile(i < n) {\n  if(arr[i] == target) break;\n  i++;\n}',
          examHighlight: 'Always verify loop termination conditions with n=0 and n=1 edge cases.'
        },
        {
          slideNumber: 3,
          title: 'Module 3: Functions, Stack Frames & Recursion',
          bulletPoints: [
            'Call stack layout: Return address, saved frame pointer, local variables',
            'Pass-by-value makes a copy; pass-by-reference (&) passes direct memory alias',
            'Base cases prevent stack overflow; recurrence relations capture repetitive state',
            'Function overloading: Signature resolution determined by parameter types'
          ],
          codeOrDiagram: 'void swap(int &a, int &b) { int t = a; a = b; b = t; }',
          examHighlight: 'Final Exam Trap: Forgetting to return a value from non-void recursive branch causes undefined behavior.'
        },
        {
          slideNumber: 4,
          title: 'Module 4: Pointers & Dynamic Heap Memory',
          bulletPoints: [
            'Stack memory (automatic lifecycle) vs Heap memory (manual lifecycle with new/delete)',
            'Pointer arithmetic: ptr + 1 advances by sizeof(*ptr) bytes in memory',
            'Dangling pointers, wild pointers, and double-free exceptions',
            'Dynamic 2D arrays: Array of pointers vs contiguous single-block allocation'
          ],
          codeOrDiagram: 'int *arr = new int[size];\n// ... use arr ...\ndelete[] arr; // Must use delete[] for arrays!',
          examHighlight: 'High-yield question: Tracing memory leaks and drawing pointer indirection graphs.'
        },
        {
          slideNumber: 5,
          title: 'Module 5: Structs, Memory Alignment & File Streams',
          bulletPoints: [
            'User-defined composite types using struct and member access operator (.)',
            'Structure padding and alignment boundaries (4-byte / 8-byte word boundaries)',
            'File stream classes: ifstream (read), ofstream (write), fstream (bidirectional)',
            'Binary vs text file serialization and EOF detection strategies'
          ],
          codeOrDiagram: 'struct Student { int id; char grade; }; // sizeof may be 8 bytes due to 3-byte padding',
          examHighlight: 'Be prepared to calculate the sizeof struct with field reordering to minimize memory waste.'
        }
      ]
    }
  },
  {
    id: 'dsa',
    code: 'CS-201',
    name: 'Data Structures & Algorithms',
    semester: '3rd Semester',
    creditHours: 4,
    iconName: 'Network',
    color: 'indigo',
    pdfDownloadName: 'CS201_Data_Structures_Algorithms_Slides.pdf',
    description: 'Design and analysis of fundamental data structures, asymptotic notation, efficiency trade-offs, and algorithmic strategies.',
    coreTopics: [
      'Asymptotic Analysis: Big-O, Big-Omega, Big-Theta notation',
      'Linear Structures: Arrays, Singly/Doubly/Circular Linked Lists',
      'Stacks, Queues, Deques, and Expression Parsing',
      'Trees: Binary Trees, Binary Search Trees (BST), AVL, Heaps',
      'Sorting & Searching: Quick, Merge, Heap, Binary Search',
      'Graph Algorithms: BFS, DFS, Dijkstra, Kruskal, Prim'
    ],
    recommendedBooks: [
      'Introduction to Algorithms (CLRS) - Cormen, Leiserson, Rivest, Stein',
      'Data Structures and Algorithm Analysis in C++ - Mark Allen Weiss',
      'Algorithms (4th Edition) - Robert Sedgewick & Kevin Wayne'
    ],
    examTips: [
      'Master the Master Theorem for solving divide-and-conquer recurrence relations.',
      'Practice drawing BST node deletions (0, 1, and 2 children cases) step-by-step.',
      'Memorize both time and space complexity matrices for all elementary sorts.'
    ],
    projectIdeas: [
      'Custom File Compression Utility using Huffman Coding Trees',
      'Shortest Path GPS Route Planner using Dijkstra Algorithm',
      'In-Memory Key-Value Store with Balanced Tree Indexing'
    ],
    slidesDeck: {
      deckTitle: 'CS-201: Data Structures & Algorithms Slide Deck',
      totalSlides: 5,
      author: 'Asad Usman (CS Expert)',
      slides: [
        {
          slideNumber: 1,
          title: 'Module 1: Asymptotic Analysis & Recurrences',
          bulletPoints: [
            'Mathematical definition of Big-O (upper bound), Big-Omega (lower), Big-Theta (tight)',
            'Dominant terms rule: ignore low-order terms and constant factors',
            'Master Theorem: T(n) = aT(n/b) + f(n) comparing n^(log_b a) vs f(n)',
            'Space complexity vs Auxiliary space distinctions'
          ],
          codeOrDiagram: 'T(n) = 2T(n/2) + O(n) => a=2, b=2, k=1 => n^(log_2 2) = n^1 => Case 2: O(n log n)',
          examHighlight: 'Master Theorem condition checks (regularity condition) are frequent test questions.'
        },
        {
          slideNumber: 2,
          title: 'Module 2: Linked Lists & Node Manipulations',
          bulletPoints: [
            'Array vs Linked List: Cache locality vs dynamic sizing trade-offs',
            'Singly vs Doubly vs Circular linked lists: Sentinel dummy head nodes',
            'Fast & Slow pointer pattern (Floyd cycle detection, finding middle element)',
            'In-place list reversal using three pointer tracking (prev, curr, next)'
          ],
          codeOrDiagram: 'Node* prev = nullptr, *curr = head;\nwhile(curr) { Node* nxt = curr->next; curr->next = prev; prev = curr; curr = nxt; }',
          examHighlight: 'Classic exam question: Reverse a linked list in O(n) time and O(1) space.'
        },
        {
          slideNumber: 3,
          title: 'Module 3: Stacks, Queues & Monotonic Primitives',
          bulletPoints: [
            'LIFO (Stack) vs FIFO (Queue) Abstract Data Types',
            'Circular array queue implementation with modulo arithmetic: (tail + 1) % capacity',
            'Infix to Postfix conversion using Shunting Yard algorithm and operator precedence',
            'Monotonic stack applications: Next Greater Element in O(n) linear scan'
          ],
          codeOrDiagram: 'Queue enqueue: rear = (rear + 1) % MAX; arr[rear] = val; count++;',
          examHighlight: 'Tracing parenthesis matching and postfix expression evaluation on a stack table.'
        },
        {
          slideNumber: 4,
          title: 'Module 4: Trees, Binary Search Trees & AVL Balancing',
          bulletPoints: [
            'Tree terminology: Height, depth, complete vs full vs balanced binary trees',
            'BST property: Left subtree keys < root key < right subtree keys',
            'Tree traversals: Inorder (sorted in BST), Preorder, Postorder, Level-order (BFS queue)',
            'AVL balance factor = height(left) - height(right) in {-1, 0, 1}; LL, RR, LR, RL rotations'
          ],
          codeOrDiagram: 'BST Inorder Traversal => yields keys in strictly non-decreasing order',
          examHighlight: 'Drawing step-by-step node deletion with two children (replace with inorder successor).'
        },
        {
          slideNumber: 5,
          title: 'Module 5: Graph Theory, BFS, DFS & Shortest Paths',
          bulletPoints: [
            'Adjacency Matrix (O(V^2) space) vs Adjacency List (O(V + E) space)',
            'Breadth-First Search (queue) for shortest path in unweighted graphs',
            'Depth-First Search (stack/recursion) for cycle detection & topological sort',
            'Dijkstra algorithm (priority queue / min-heap) for non-negative weighted edges'
          ],
          codeOrDiagram: 'Dijkstra Complexity: O((V + E) log V) using a binary min-heap priority queue',
          examHighlight: 'Dijkstra fails on negative edge weights (Bellman-Ford is required instead).'
        }
      ]
    }
  },
  {
    id: 'dbms',
    code: 'CS-204',
    name: 'Database Systems',
    semester: '4th Semester',
    creditHours: 4,
    iconName: 'Database',
    color: 'sky',
    pdfDownloadName: 'CS204_Database_Systems_Slides.pdf',
    description: 'Relational data modeling, SQL query optimization, ER modeling, normalization, transaction processing, and ACID properties.',
    coreTopics: [
      'Relational Model & Relational Algebra Operators',
      'Entity-Relationship (ER) & Enhanced ER (EER) Diagrams',
      'Advanced SQL: Joins, Subqueries, Aggregations, Grouping',
      'Normalization: 1NF, 2NF, 3NF, BCNF & Functional Dependencies',
      'Transactions: ACID Properties, Serializability, Concurrency Control',
      'Indexing: B-Trees, B+ Trees, and Query Cost Optimization'
    ],
    recommendedBooks: [
      'Database System Concepts - Silberschatz, Korth, Sudarshan',
      'Fundamentals of Database Systems - Ramez Elmasri & Shamkant Navathe',
      'SQL Queries for Mere Mortals - John Viescas'
    ],
    examTips: [
      'Practice decomposing relations into 3NF and BCNF while verifying lossless-join and dependency preservation.',
      'Clearly identify Candidate Keys using attribute closure algorithms before normalizing.',
      'Know two-phase locking (2PL) and deadlock handling in concurrency questions.'
    ],
    projectIdeas: [
      'University Course Registration Portal with Relational Constraints',
      'Hospital Patient & Doctor Schedule Management System in PostgreSQL',
      'E-commerce Inventory & Order Management Engine'
    ],
    slidesDeck: {
      deckTitle: 'CS-204: Database Systems Slide Deck',
      totalSlides: 5,
      author: 'Asad Usman (CS Expert)',
      slides: [
        {
          slideNumber: 1,
          title: 'Module 1: Relational Data Model & ER Diagrams',
          bulletPoints: [
            'Entities, Weak Entities, Attributes (multivalued, composite, derived)',
            'Cardinality ratios: 1:1, 1:N, M:N and participation constraints (total vs partial)',
            'Relational algebra primitives: Select (σ), Project (π), Cartesian Product (×), Join (⋈)',
            'Primary keys, foreign keys, and referential integrity constraints'
          ],
          codeOrDiagram: 'π_name (σ_gpa > 3.5 (Student ⋈ Enrollment))',
          examHighlight: 'Translating M:N ER relationships requires creating an intermediate junction table.'
        },
        {
          slideNumber: 2,
          title: 'Module 2: Advanced SQL Query Architecture',
          bulletPoints: [
            'Inner Join vs Left/Right/Full Outer Joins with NULL handling semantics',
            'GROUP BY with HAVING clause: filtering aggregates vs WHERE clause rows',
            'Correlated subqueries vs Non-correlated subqueries execution flow',
            'Window functions: ROW_NUMBER(), RANK(), DENSE_RANK() OVER (PARTITION BY)'
          ],
          codeOrDiagram: 'SELECT dept, AVG(salary) FROM emp GROUP BY dept HAVING AVG(salary) > 50000;',
          examHighlight: 'WHERE filters individual tuples before grouping; HAVING filters aggregated groups.'
        },
        {
          slideNumber: 3,
          title: 'Module 3: Normalization & Functional Dependencies',
          bulletPoints: [
            'Functional dependency X -> Y: closure of an attribute set X^+',
            '1NF: Atomic values, no repeating groups or nested arrays',
            '2NF: 1NF + no partial functional dependencies (every non-key depends on full candidate key)',
            '3NF: 2NF + no transitive dependencies (X -> Y where Y is non-prime and X is not superkey)',
            'BCNF: For every non-trivial FD X -> Y, X must strictly be a Super Key'
          ],
          codeOrDiagram: 'Attribute Closure: Start with X, iteratively add RHS if LHS is in current set.',
          examHighlight: 'Every BCNF decomposition is guaranteed lossless-join, but may lose dependency preservation.'
        },
        {
          slideNumber: 4,
          title: 'Module 4: Transactions & ACID Properties',
          bulletPoints: [
            'Atomicity: All operations commit or all rollback (Write-Ahead Logging / WAL)',
            'Consistency: Database transitions from one valid state satisfying constraints to another',
            'Isolation: Concurrent execution yields identical outcome to serial execution',
            'Durability: Committed updates survive system crashes or power failures',
            'Conflict serializability: Precedence / Serialization graph cycle detection'
          ],
          codeOrDiagram: 'Precedence Graph: Edge T1 -> T2 if T1 conflicts with T2 and occurred earlier. No cycle = Conflict Serializable.',
          examHighlight: 'Must know conflict serializability tests and the 4 isolation levels (Read Uncommitted, Read Committed, Repeatable Read, Serializable).'
        },
        {
          slideNumber: 5,
          title: 'Module 5: B+ Tree Indexing & Query Plans',
          bulletPoints: [
            'Why B+ Trees over Hash Tables: efficient range queries (BETWEEN x AND y)',
            'All records reside exclusively in leaf nodes linked via bidirectional pointers',
            'Internal nodes store router keys only, maximizing fan-out and minimizing disk I/O depth',
            'Clustered index (determines physical row order) vs Non-clustered secondary indices'
          ],
          codeOrDiagram: 'Root -> Internal Routers -> Linked Leaf Nodes [Data Records or RowIDs]',
          examHighlight: 'Calculating maximum number of keys per node given block size and pointer size.'
        }
      ]
    }
  },
  {
    id: 'os',
    code: 'CS-301',
    name: 'Operating Systems',
    semester: '5th Semester',
    creditHours: 4,
    iconName: 'Cpu',
    color: 'amber',
    pdfDownloadName: 'CS301_Operating_Systems_Slides.pdf',
    description: 'Hardware abstraction, process scheduling, synchronization primitives, memory virtualization, deadlocks, and file systems.',
    coreTopics: [
      'Process Lifecycle, Process Control Block (PCB) & Context Switching',
      'CPU Scheduling Algorithms: FCFS, SJF, Round Robin, Priority',
      'Process Synchronization: Critical Section, Mutex, Semaphores',
      'Deadlocks: Necessary Conditions, Bankers Algorithm, Prevention',
      'Virtual Memory: Paging, Page Replacement (FIFO, LRU, Optimal)',
      'File System Architecture, Inodes & Disk Scheduling (SCAN, C-SCAN)'
    ],
    recommendedBooks: [
      'Operating System Concepts ("Dinosaur Book") - Silberschatz, Galvin, Gagne',
      'Modern Operating Systems - Andrew S. Tanenbaum',
      'Operating Systems: Three Easy Pieces (OSTEP) - Remzi & Andrea Arpaci-Dusseau'
    ],
    examTips: [
      'Always construct Gantt charts carefully for Round Robin and calculate exact Average Waiting & Turnaround times.',
      'In Bankers Algorithm, write down the Need Matrix (Max - Allocation) clearly before testing safe state vectors.',
      'Distinguish internal vs external fragmentation with concrete memory diagrams.'
    ],
    projectIdeas: [
      'Simulated Multi-Level Feedback Queue (MLFQ) CPU Scheduler',
      'Producer-Consumer Concurrent Simulation with POSIX Threads & Mutex',
      'Simple Unix Shell Implementation with Fork, Exec, and Pipe redirection'
    ],
    slidesDeck: {
      deckTitle: 'CS-301: Operating Systems Slide Deck',
      totalSlides: 5,
      author: 'Asad Usman (CS Expert)',
      slides: [
        {
          slideNumber: 1,
          title: 'Module 1: Processes, Threads & Context Switching',
          bulletPoints: [
            'Dual-mode operation: User mode vs Kernel mode via hardware trap instructions',
            'Process address space: Text (code), Data, BSS, Heap (grows up), Stack (grows down)',
            'PCB contents: PID, program counter, register values, memory limits, open file descriptors',
            'Kernel threads vs User-level threads: context switch overhead and blocking semantics'
          ],
          codeOrDiagram: 'fork() creates child clone: returns 0 to child, child PID to parent.',
          examHighlight: 'Number of processes created by n consecutive fork() calls is 2^n.'
        },
        {
          slideNumber: 2,
          title: 'Module 2: CPU Scheduling Algorithms',
          bulletPoints: [
            'Preemptive vs Non-preemptive scheduling strategies',
            'First-Come First-Served (FCFS) and the Convoy Effect',
            'Shortest Job First (SJF) is provably optimal for minimum average waiting time',
            'Round Robin (RR) with time quantum q: trade-off between responsiveness and context-switch cost'
          ],
          codeOrDiagram: 'Turnaround Time = Completion Time - Arrival Time\nWaiting Time = Turnaround Time - Burst Time',
          examHighlight: 'Drawing precise Gantt charts with exact timeline ticks for Round Robin with multiple arrivals.'
        },
        {
          slideNumber: 3,
          title: 'Module 3: Process Synchronization & Concurrency',
          bulletPoints: [
            'Critical Section Requirements: Mutual Exclusion, Progress, Bounded Waiting',
            'Hardware atomic instructions: Test-and-Set, Compare-and-Swap',
            'Counting Semaphores vs Binary Semaphores (Mutexes)',
            'Classic problems: Producer-Consumer (bounded buffer), Readers-Writers, Dining Philosophers'
          ],
          codeOrDiagram: 'sem_wait(&mutex); // P(s)\n// Critical Section\nsem_post(&mutex); // V(s)',
          examHighlight: 'Deadlock risk when semaphores are acquired in inconsistent order across concurrent threads.'
        },
        {
          slideNumber: 4,
          title: 'Module 4: Deadlocks & Bankers Algorithm',
          bulletPoints: [
            'Four Coffman Conditions: Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait',
            'Deadlock prevention eliminates at least one of the 4 Coffman conditions',
            'Bankers Algorithm: Safe state check using Available vector, Allocation, Max, and Need matrices',
            'Resource Allocation Graph (RAG): Cycle with single-instance resources implies deadlock'
          ],
          codeOrDiagram: 'Need[i][j] = Max[i][j] - Allocation[i][j]\nFind process i where Finish[i]==false and Need[i] <= Work',
          examHighlight: 'Exam guarantee: Solve Bankers Algorithm to find safe sequence <P1, P3, P4, P0, P2>.'
        },
        {
          slideNumber: 5,
          title: 'Module 5: Virtual Memory & Page Replacement',
          bulletPoints: [
            'Paging: Virtual address split into Page Number (p) and Offset (d)',
            'Page Table & Translation Lookaside Buffer (TLB) hit ratios',
            'Internal fragmentation occurs in paging; external fragmentation in segmentation',
            'Page replacement: FIFO (subject to Belady Anomaly), Optimal (future clairvoyance), LRU'
          ],
          codeOrDiagram: 'Effective Access Time = (TLB_hit_rate * (TLB_time + Mem_time)) + (TLB_miss_rate * (TLB_time + 2*Mem_time))',
          examHighlight: 'Tracing LRU vs FIFO page faults on reference strings like 7,0,1,2,0,3,0,4,2,3,0,3,2.'
        }
      ]
    }
  },
  {
    id: 'cn',
    code: 'CS-302',
    name: 'Computer Networks',
    semester: '5th Semester',
    creditHours: 4,
    iconName: 'Wifi',
    color: 'rose',
    pdfDownloadName: 'CS302_Computer_Networks_Slides.pdf',
    description: 'Protocol architectures, packet switching, transport layer flow control, IP addressing, subnetting, and network security.',
    coreTopics: [
      'OSI 7-Layer Reference Model vs TCP/IP Protocol Stack',
      'Application Layer: HTTP/HTTPS, DNS, SMTP, FTP, Sockets',
      'Transport Layer: TCP 3-Way Handshake, Flow Control, UDP',
      'Network Layer: IPv4/IPv6, CIDR Subnetting, Routing (Distance Vector & Link State)',
      'Data Link Layer: Framing, Error Detection (CRC, Parity), CSMA/CD',
      'Network Security: Public Key Cryptography, TLS/SSL, Firewalls'
    ],
    recommendedBooks: [
      'Computer Networking: A Top-Down Approach - Kurose & Ross',
      'Computer Networks - Andrew S. Tanenbaum & David J. Wetherall',
      'TCP/IP Illustrated - W. Richard Stevens'
    ],
    examTips: [
      'Master CIDR Subnetting calculations (network address, broadcast address, valid host ranges) under time pressure.',
      'Trace TCP sequence and acknowledgment numbers during connection establishment and data transfer.',
      'Contrast Distance Vector (Bellman-Ford, count-to-infinity) with Link State (Dijkstra) routing.'
    ],
    projectIdeas: [
      'Multi-client Chat Server using TCP Sockets in C++ or Python',
      'Packet Sniffer & HTTP Header Analyzer using Raw Sockets',
      'Subnet Calculator and IP Range Visualizer'
    ],
    slidesDeck: {
      deckTitle: 'CS-302: Computer Networks Slide Deck',
      totalSlides: 5,
      author: 'Asad Usman (CS Expert)',
      slides: [
        {
          slideNumber: 1,
          title: 'Module 1: Network Architectures & The OSI Model',
          bulletPoints: [
            'Packet switching vs Circuit switching: statistical multiplexing vs dedicated reservation',
            'OSI 7 layers: Physical, Data Link, Network, Transport, Session, Presentation, Application',
            'TCP/IP 4-layer model: Link, Internet (IP), Transport (TCP/UDP), Application',
            'Encapsulation / Decapsulation: Headers and PDUs (Frame, Packet, Segment, Message)'
          ],
          codeOrDiagram: 'App Data -> +TCP Header (Segment) -> +IP Header (Packet) -> +Frame Header (Frame) -> Bits on wire',
          examHighlight: 'Which layer is responsible for routing (Layer 3), error-free node-to-node transfer (Layer 2).'
        },
        {
          slideNumber: 2,
          title: 'Module 2: Application Layer & Socket Protocols',
          bulletPoints: [
            'HTTP/1.1 persistent connections vs HTTP/2 multiplexing vs HTTP/3 (QUIC over UDP)',
            'DNS resolution hierarchy: Root, TLD (.com), Authoritative DNS servers (recursive vs iterative)',
            'Socket API basics: socket(), bind(), listen(), accept(), connect(), send(), recv()',
            'Email protocols: SMTP (push to mail server) vs IMAP/POP3 (pull from mail server)'
          ],
          codeOrDiagram: 'Client: socket() -> connect() -> send() | Server: socket() -> bind() -> listen() -> accept()',
          examHighlight: 'DNS operates predominantly over UDP port 53 for low-latency queries.'
        },
        {
          slideNumber: 3,
          title: 'Module 3: Transport Layer: TCP vs UDP',
          bulletPoints: [
            'TCP: Reliable, connection-oriented, byte-stream, in-order delivery; UDP: Unreliable, datagram',
            'TCP 3-Way Handshake: SYN -> SYN-ACK -> ACK; 4-Way Teardown: FIN -> ACK -> FIN -> ACK',
            'TCP Flow Control: Sliding window advertised by receiver (rwnd)',
            'TCP Congestion Control: Slow Start, Congestion Avoidance, Fast Retransmit, Fast Recovery'
          ],
          codeOrDiagram: 'Handshake: C->S: SYN (seq=x) | S->C: SYN-ACK (seq=y, ack=x+1) | C->S: ACK (seq=x+1, ack=y+1)',
          examHighlight: 'Tracing sequence numbers, ACK numbers, and window sizes during lost segment scenarios.'
        },
        {
          slideNumber: 4,
          title: 'Module 4: IPv4, CIDR & Subnet Calculations',
          bulletPoints: [
            'IPv4 addresses: 32 bits (4 octets); Classful addressing (Class A, B, C) vs CIDR notation (/24)',
            'Subnet Mask calculation: Network bits (1s) and Host bits (0s)',
            'Number of usable hosts = 2^(host_bits) - 2 (subtract Network ID and Broadcast ID)',
            'Network address = IP & SubnetMask; Broadcast address = IP | (~SubnetMask)'
          ],
          codeOrDiagram: '192.168.1.130/26 => Mask: 255.255.255.192. Host bits: 6. Usable hosts: 2^6 - 2 = 62.',
          examHighlight: 'Exam staple: Given IP and subnet requirement, determine subnet mask, subnets, and host ranges.'
        },
        {
          slideNumber: 5,
          title: 'Module 5: Routing Algorithms & Link State',
          bulletPoints: [
            'Intra-domain routing (IGP: OSPF, RIP) vs Inter-domain routing (EGP: BGP)',
            'Distance Vector (RIP): Bellman-Ford algorithm; Count-to-Infinity problem and Split Horizon',
            'Link State (OSPF): Floyd-Warshall / Dijkstra algorithm using Link State Advertisements (LSAs)',
            'NAT (Network Address Translation) and private IP ranges (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16)'
          ],
          codeOrDiagram: 'Bellman-Ford: D_x(y) = min_v { c(x,v) + D_v(y) } for all neighbors v of x',
          examHighlight: 'Explaining Count-to-Infinity and how Poison Reverse mitigates routing loops.'
        }
      ]
    }
  },
  {
    id: 'se',
    code: 'CS-304',
    name: 'Software Engineering',
    semester: '6th Semester',
    creditHours: 3,
    iconName: 'Layers',
    color: 'purple',
    pdfDownloadName: 'CS304_Software_Engineering_Slides.pdf',
    description: 'Software development life cycle, requirements engineering, architectural design patterns, Agile/Scrum, testing, and DevOps.',
    coreTopics: [
      'Software Process Models: Waterfall, Spiral, Agile & Scrum',
      'Requirements Engineering: Functional vs Non-Functional, User Stories',
      'Unified Modeling Language (UML): Use Case, Class, Sequence Diagrams',
      'Software Architecture & Design Patterns: Singleton, Factory, Observer, MVC',
      'Quality Assurance: Unit, Integration, Black-box, White-box Testing',
      'Version Control (Git/GitHub), CI/CD Pipelines, and Refactoring'
    ],
    recommendedBooks: [
      'Software Engineering: A Practitioner’s Approach - Roger S. Pressman',
      'Clean Code: A Handbook of Agile Software Craftsmanship - Robert C. Martin',
      'Design Patterns: Elements of Reusable Object-Oriented Software - Gang of Four (GoF)'
    ],
    examTips: [
      'Memorize UML arrow conventions: inheritance (closed triangle), composition (solid diamond), aggregation (hollow diamond).',
      'Calculate Cyclomatic Complexity (V(G) = E - N + 2P or P + 1) for white-box test path generation.',
      'Clearly justify when Agile is superior to Waterfall based on requirements uncertainty.'
    ],
    projectIdeas: [
      'Agile Sprint Planner & Kanban Board with Role-Based Access',
      'Automated Test Runner & Code Coverage Reporter',
      'Microservices Architecture Blueprint with UML documentation'
    ],
    slidesDeck: {
      deckTitle: 'CS-304: Software Engineering Slide Deck',
      totalSlides: 5,
      author: 'Asad Usman (CS Expert)',
      slides: [
        {
          slideNumber: 1,
          title: 'Module 1: SDLC Process Models & Agile Philosophy',
          bulletPoints: [
            'Waterfall Model: linear-sequential, distinct phases, high cost of late requirement changes',
            'Spiral Model: risk-driven iterative framework with continuous risk assessment milestones',
            'Agile Manifesto principles: working software over comprehensive documentation',
            'Scrum Framework: Product Owner, Scrum Master, Developers, Sprints (1-4 weeks), Daily Standups'
          ],
          codeOrDiagram: 'Scrum Flow: Product Backlog -> Sprint Planning -> Sprint Backlog -> Sprint Execution -> Sprint Review & Retrospective',
          examHighlight: 'Compare Waterfall vs Agile when requirements are volatile or regulatory audits are required.'
        },
        {
          slideNumber: 2,
          title: 'Module 2: Requirements Engineering & User Stories',
          bulletPoints: [
            'Functional Requirements (what the system should do: e.g. login, process payment)',
            'Non-Functional Requirements (quality attributes: latency, throughput, security, 99.9% uptime)',
            'User Story template: "As a <role>, I want <capability> so that <business value>"',
            'INVEST criteria for stories: Independent, Negotiable, Valuable, Estimable, Small, Testable'
          ],
          codeOrDiagram: 'INVEST Criteria: Independent | Negotiable | Valuable | Estimable | Small | Testable',
          examHighlight: 'Classifying ambiguous statements into Functional vs Non-Functional requirements.'
        },
        {
          slideNumber: 3,
          title: 'Module 3: Unified Modeling Language (UML)',
          bulletPoints: [
            'Structural diagrams (Class, Component) vs Behavioral diagrams (Use Case, Sequence, Activity)',
            'Class relationships: Generalization (is-a), Association (has-a), Aggregation (weak), Composition (strong)',
            'Sequence diagram lifelines, synchronous messages (solid arrow), return messages (dashed arrow)',
            'Use case diagrams: Actors, Use Cases, <<include>> (mandatory), <<extend>> (conditional)'
          ],
          codeOrDiagram: 'Composition: House *-- Room (room cannot exist without house). Aggregation: Team o-- Player.',
          examHighlight: 'Drawing correct arrow symbols: closed triangle for inheritance, solid diamond for composition.'
        },
        {
          slideNumber: 4,
          title: 'Module 4: Architectural Styles & Design Patterns',
          bulletPoints: [
            'Gang of Four categories: Creational (Singleton, Factory), Structural (Adapter, Decorator), Behavioral (Observer, Strategy)',
            'Singleton: ensures a class has only one instance with global access point (thread safety)',
            'Observer pattern: one-to-many dependency so when one object changes state, dependents are notified',
            'MVC Architecture: Model (data/business rules), View (UI), Controller (input handling/updates)'
          ],
          codeOrDiagram: 'Singleton in C++: private constructor, static getInstance() returning instance reference.',
          examHighlight: 'Identify which design pattern to use for given scenario (e.g. event notification -> Observer).'
        },
        {
          slideNumber: 5,
          title: 'Module 5: Software Quality, Testing & DevOps',
          bulletPoints: [
            'Verification ("Are we building the product right?") vs Validation ("Are we building the right product?")',
            'Black-box testing: Equivalence Partitioning and Boundary Value Analysis (BVA: min-1, min, max, max+1)',
            'White-box testing: Statement coverage, Branch coverage, Path coverage',
            'Cyclomatic Complexity V(G) = E - N + 2 = P + 1 (number of independent linear execution paths)',
            'DevOps & CI/CD: Automated build, test execution, and deployment pipelines'
          ],
          codeOrDiagram: 'Cyclomatic Complexity: V(G) = Predicate Nodes + 1 = Regions in control flow graph',
          examHighlight: 'Drawing Control Flow Graph (CFG) from code snippet and deriving basis path test cases.'
        }
      ]
    }
  }
];
