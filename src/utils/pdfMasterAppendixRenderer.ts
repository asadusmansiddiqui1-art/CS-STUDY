import { jsPDF } from 'jspdf';
import {
  drawChapterHeader,
  drawCalloutBox,
  drawTable,
  PDF_COLORS
} from './pdfGeneratorUtils';

/**
 * Renders Part VII, Part VIII, and Part IX for the Master Degree Mega-Book
 * Total Pages: Exactly 18 Pages (Pages 199 to 216 of 216)
 */
export async function renderMasterAppendix(
  doc: jsPDF,
  nextPage: (headerLeft: string, headerRight: string, statusLabel?: string) => Promise<number>,
  contentWidth: number
): Promise<void> {
  // -------------------------------------------------------------
  // PART VII: MASTER SOLVED EXAM QUESTION BANK (12 PAGES: 199 TO 210)
  // -------------------------------------------------------------
  const solvedExams = [
    {
      subject: 'CS-101 Programming Fundamentals',
      title: 'Dangling Pointers, Heap Fragmentation & Double-Free Diagnostics',
      q: 'Consider the C++ code snippet where an integer array is allocated dynamically on the heap inside a helper function and returned as a raw pointer. Identify three distinct memory vulnerability hazards, explain why double-free errors cause undefined behavior, and demonstrate the fix using modern C++ RAII.',
      sol: '1. Memory Vulnerability Hazards: (a) If caller fails to delete[] the pointer, a heap memory leak occurs; (b) If caller deletes the pointer twice, it triggers a double-free heap metadata corruption crash; (c) Any access to the pointer after deletion constitutes undefined behavior via a dangling pointer.\n2. Double-Free Corruption: Heap allocators maintain linked lists of free memory chunks (bins). Freeing an already freed chunk corrupts the allocator’s internal linked list pointers, allowing arbitrary memory write exploits.\n3. Modern C++ RAII Solution: Replace raw pointer with std::vector<int> or std::unique_ptr<int[]>, which guarantees deterministic automatic deallocation upon scope exit without manual delete calls.'
    },
    {
      subject: 'CS-201 Data Structures & Algorithms',
      title: 'AVL Tree Self-Balancing & Double Rotations',
      q: 'Given an empty AVL tree, insert the keys [30, 20, 10, 25, 28] sequentially. For each insertion, show the balance factors, identify the specific imbalance case (LL, RR, LR, RL), and detail the exact rotation operations required to restore balance.',
      sol: '1. Insert 30, 20: Tree is balanced.\n2. Insert 10: Node 30 has balance factor +2, left child 20 has +1. This is a Left-Left (LL) imbalance. Perform a Right Rotation at 30: 20 becomes root, 10 is left child, 30 is right child.\n3. Insert 25: Node 30 balance factor becomes +1. Tree remains balanced.\n4. Insert 28: Subtree at 30 becomes imbalanced: Node 30 has BF +2, child 25 has -1. This is a Left-Right (LR) imbalance. Perform Left Rotation at 25 (28 becomes child of 30, 25 is left child of 28), then Right Rotation at 30 (28 becomes right child of 20, with children 25 and 30). Final tree is height-balanced with root 20.'
    },
    {
      subject: 'CS-204 Database Systems',
      title: 'BCNF Decomposition & Minimal Functional Dependency Cover',
      q: 'Given relation R(A, B, C, D, E) with functional dependencies F = { A -> BC, CD -> E, B -> D, E -> A }. (a) Find all candidate keys of R. (b) Identify all dependencies violating BCNF. (c) Perform a step-by-step BCNF lossless-join decomposition.',
      sol: '(a) Candidate Keys: Closure of A: A+ = {A, B, C, D, E}, so A is a candidate key. Closure of E: E+ = {E, A, B, C, D}, so E is a candidate key. Closure of CD: CD+ = {C, D, E, A, B}, so CD is a candidate key. Closure of BC: BC+ = {B, C, D, E, A}, so BC is a candidate key.\n(b) BCNF Violations: B -> D violates BCNF because B is not a superkey of R.\n(c) BCNF Decomposition: Decompose R using B -> D into R1(B, D) with key B, and R2(A, B, C, E). In R2, all dependencies (A -> BC, E -> A) have superkeys on the LHS. Both R1 and R2 are in BCNF, and R1 ∩ R2 = {B}, which is the candidate key of R1, ensuring the decomposition is strictly lossless-join.'
    },
    {
      subject: 'CS-301 Operating Systems',
      title: "Banker's Deadlock Avoidance Algorithm Execution",
      q: 'A system has 5 processes (P0-P4) and 3 resource types (A:10, B:5, C:7 instances). At time T0, Allocation matrix is [[0,1,0],[2,0,0],[3,0,2],[2,1,1],[0,0,2]] and Max matrix is [[7,5,3],[3,2,2],[9,0,2],[2,2,2],[4,3,3]]. Determine if the system is in a safe state, and derive a complete safe sequence.',
      sol: '1. Available Vector = Total - Sum(Allocation) = [10,5,7] - [7,2,5] = [3, 3, 2].\n2. Need Matrix = Max - Allocation: P0=[7,4,3], P1=[1,2,2], P2=[6,0,0], P3=[0,1,1], P4=[4,3,1].\n3. Safety Algorithm Step-by-Step:\n   - Check P1: Need [1,2,2] <= Available [3,3,2]. P1 runs to completion. New Available = [3,3,2] + [2,0,0] = [5,3,2].\n   - Check P3: Need [0,1,1] <= Available [5,3,2]. P3 completes. New Available = [5,3,2] + [2,1,1] = [7,4,3].\n   - Check P4: Need [4,3,1] <= Available [7,4,3]. P4 completes. New Available = [7,4,3] + [0,0,2] = [7,4,5].\n   - Check P0: Need [7,4,3] <= Available [7,4,5]. P0 completes. New Available = [7,4,5] + [0,1,0] = [7,5,5].\n   - Check P2: Need [6,0,0] <= Available [7,5,5]. P2 completes. New Available = [10,5,7].\nConclusion: System is in a SAFE state. Valid safe sequence is <P1, P3, P4, P0, P2>.'
    },
    {
      subject: 'CS-302 Computer Networks',
      title: 'VLSM Subnet Allocation & CIDR Hierarchy',
      q: 'An enterprise is allocated network block 192.168.10.0/24. Subnet requirements are: Engineering (100 hosts), Sales (50 hosts), Support (25 hosts), and two Point-to-Point WAN links (2 hosts each). Design the optimal Variable Length Subnet Mask (VLSM) allocation.',
      sol: '1. Order departments by host count descending:\n   - Engineering (100 hosts): Needs 2^7 - 2 = 126 hosts. Use /25 mask (255.255.255.128). Network: 192.168.10.0/25 (Range: .1 to .126, Broadcast: .127).\n   - Sales (50 hosts): Needs 2^6 - 2 = 62 hosts. Use /26 mask (255.255.255.192). Network: 192.168.10.128/26 (Range: .129 to .190, Broadcast: .191).\n   - Support (25 hosts): Needs 2^5 - 2 = 30 hosts. Use /27 mask (255.255.255.224). Network: 192.168.10.192/27 (Range: .193 to .222, Broadcast: .223).\n   - WAN Link 1 (2 hosts): Needs 2^2 - 2 = 2 hosts. Use /30 mask (255.255.255.252). Network: 192.168.10.224/30 (Range: .225 to .226, Broadcast: .227).\n   - WAN Link 2 (2 hosts): Use /30 mask. Network: 192.168.10.228/30 (Range: .229 to .230, Broadcast: .231).\nUnallocated space remains from 192.168.10.232 to 192.168.10.255 for future expansion.'
    },
    {
      subject: 'CS-304 Software Engineering',
      title: 'SOLID Refactoring of E-Commerce Payment Gateway',
      q: 'A class OrderProcessor directly instantiates PayPalClient and writes order records to MySQL via raw SQL statements inside its processPayment() method. Identify all SOLID violations and refactor the architecture using Interface Segregation and Dependency Inversion.',
      sol: 'Violations:\n1. Single Responsibility (SRP): OrderProcessor handles business rules, payment processing, AND database persistence.\n2. Open/Closed (OCP): Adding Stripe or Apple Pay requires editing OrderProcessor source code directly.\n3. Dependency Inversion (DIP): High-level OrderProcessor directly depends on low-level PayPalClient and MySQL concrete classes.\nRefactoring:\n1. Create IPaymentGateway interface with method process(PaymentRequest req).\n2. Create IOrderRepository interface with method save(Order order).\n3. Implement concrete PayPalGateway, StripeGateway, and SqlOrderRepository.\n4. Inject IPaymentGateway and IOrderRepository into OrderProcessor constructor via Dependency Injection. OrderProcessor now adheres to all SOLID principles.'
    },
    {
      subject: 'CS-201 Algorithmic Complexity',
      title: 'Master Theorem Asymptotic Analysis Case 3 Regularity',
      q: 'Solve the recurrence relation T(n) = 3*T(n/4) + n*log(n) using the Master Theorem. Prove whether the regularity condition holds.',
      sol: '1. Parameters: a = 3, b = 4, f(n) = n*log(n).\n2. Critical exponent: log_b(a) = log_4(3) ≈ 0.7925.\n3. Compare f(n) to n^(log_b(a)): Since f(n) = n*log(n) = Ω(n^(0.7925 + ε)) for ε ≈ 0.2, this is candidate Case 3.\n4. Regularity Condition Check: We must prove that a * f(n/b) <= c * f(n) for some constant c < 1 and sufficiently large n.\n   3 * f(n/4) = 3 * (n/4) * log(n/4) = (3/4) * n * (log(n) - log(4)) <= (3/4) * n * log(n).\n   Choosing c = 3/4 < 1 satisfies the condition for all n >= 4.\n5. Conclusion: Case 3 applies. T(n) = Θ(f(n)) = Θ(n * log(n)).'
    },
    {
      subject: 'CS-204 Database Transactions',
      title: 'View Serializability vs Conflict Serializability',
      q: 'Differentiate between Conflict Serializability and View Serializability with formal definitions. Can a schedule be View Serializable but NOT Conflict Serializable? Provide an illustrative example.',
      sol: '1. Conflict Serializability: A schedule S is conflict serializable if it can be transformed into a serial schedule via non-conflicting adjacent operation swaps. Conflicting operations access same item and at least one is a write.\n2. View Serializability: A schedule S is view serializable if it is view equivalent to a serial schedule (same initial read, same read-from dependencies, same final write per data item).\n3. Yes, View Serializability strictly encompasses Conflict Serializability: Every conflict serializable schedule is view serializable, but the converse is false.\n4. Example with Blind Writes:\n   S: r1(X); w2(X); w1(X); w3(X).\n   Precedence graph has cycles T1 -> T2 and T2 -> T1 due to write conflicts, so S is NOT conflict serializable.\n   However, T3 blindly overwrites X last, and initial read is by T1. S is view equivalent to serial schedule <T1, T2, T3>.'
    },
    {
      subject: 'CS-301 Operating Systems',
      title: 'Paging Effective Memory Access Time with Multi-Level TLB',
      q: 'An x86-64 CPU uses 4-level paging. L1 TLB has 0.5 ns lookup and 95% hit rate. L2 TLB has 2.0 ns lookup and 4% hit rate. Main memory access latency is 50 ns. Calculate the Effective Memory Access Time (EMAT) and discuss performance impact of large 2MB/1GB pages.',
      sol: '1. Cases:\n   - L1 TLB Hit (95%): EMAT_1 = L1_time + Memory_data = 0.5 + 50 = 50.5 ns.\n   - L2 TLB Hit (4%): EMAT_2 = L1_time + L2_time + Memory_data = 0.5 + 2.0 + 50 = 52.5 ns.\n   - TLB Miss (1%): Must traverse 4 levels of page tables in RAM + final data fetch = L1 + L2 + 4 * Memory + Memory_data = 0.5 + 2.0 + 4 * 50 + 50 = 252.5 ns.\n2. Total EMAT = 0.95 * 50.5 + 0.04 * 52.5 + 0.01 * 252.5 = 47.975 + 2.100 + 2.525 = 52.60 ns.\n3. Impact of Huge Pages (2MB / 1GB): Increases TLB reach by orders of magnitude (a single TLB entry covers 2MB instead of 4KB), reducing TLB miss rate in memory-intensive databases from ~1% to <0.01%, virtually eliminating the 252.5 ns penalty.'
    },
    {
      subject: 'CS-302 Computer Networks',
      title: 'Diffie-Hellman Key Exchange & Discrete Logarithm Hardness',
      q: 'Explain the Diffie-Hellman key exchange protocol. Show the mathematical exchange using prime p = 23 and primitive root g = 5, with Alice private key a = 6 and Bob private key b = 15. What mathematical assumption protects the shared secret against eavesdroppers?',
      sol: '1. Public parameters: p = 23, g = 5.\n2. Alice computes public key A = g^a mod p = 5^6 mod 23 = 15625 mod 23 = 8. Alice sends A = 8 to Bob.\n3. Bob computes public key B = g^b mod p = 5^15 mod 23 = 19. Bob sends B = 19 to Alice.\n4. Shared Secret Computation:\n   - Alice computes s = B^a mod p = 19^6 mod 23 = 47,045,881 mod 23 = 2.\n   - Bob computes s = A^b mod p = 8^15 mod 23 = 2.\n   Both independently arrive at shared symmetric key s = 2.\n5. Cryptographic Hardness: Security relies on the computational hardness of the Discrete Logarithm Problem (DLP) in finite cyclic groups: given g, p, and g^a mod p, it is computationally infeasible to find a when p is a large 2048+ bit prime.'
    },
    {
      subject: 'CS-304 Distributed Systems',
      title: 'Raft Consensus Protocol: Leader Election & Split-Brain',
      q: 'Describe how the Raft consensus algorithm guarantees safety during network partitions. What happens when a cluster of 5 nodes splits into two partitions of 2 and 3 nodes? Why can split-brain never occur?',
      sol: '1. Raft Node Roles: Follower, Candidate, Leader. Terms act as logical clocks.\n2. Quorum Requirement: To be elected Leader or commit a log entry, a node MUST receive positive votes / acknowledgments from a strict majority (Quorum = floor(N/2) + 1). For N=5, Quorum is 3.\n3. Partition Analysis:\n   - Partition with 2 nodes: Candidates cannot gather 3 votes; cannot elect a leader or commit writes.\n   - Partition with 3 nodes: Forms a valid Quorum (3/5). Can elect a leader and commit log entries.\n4. Split-Brain Impossibility: Because any two majorities of size floor(N/2)+1 must overlap in at least one node, it is mathematically impossible for two distinct leaders to obtain Quorum simultaneously. When partition heals, nodes with lower term update to the higher term leader and truncate uncommitted conflicting entries.'
    },
    {
      subject: 'CS-304 System Design',
      title: 'High-Scale Distributed Rate Limiting Architecture',
      q: 'Design a distributed rate limiter capable of enforcing 10,000 requests per minute per user across a cluster of 50 API gateway instances. Compare Token Bucket vs Sliding Window Log algorithms in Redis.',
      sol: '1. Token Bucket: Central Redis hash stores {last_refreshed_timestamp, current_tokens}. On request, tokens are replenished based on elapsed time * refill_rate. If tokens >= 1, decrement and allow; else reject (HTTP 429). Executed atomically via Redis Lua script to prevent race conditions. Memory overhead is minimal (O(1) per user).\n2. Sliding Window Log: Stores timestamps of requests in a Redis Sorted Set (ZSET). Removes timestamps older than current_time - 60s using ZREMRANGEBYSCORE. Card = ZCARD. If Card < limit, ZADD current_time and allow. Highly accurate, but high memory overhead (O(N) where N is requests in window).\n3. Production Architecture: Use Sliding Window Counter (combines low memory of fixed window with accuracy of sliding window) in Redis cluster with local in-memory token cache on API Gateways to reduce Redis network hops.'
    }
  ];

  for (let i = 0; i < solvedExams.length; i++) {
    const item = solvedExams[i];
    const pageNum = 199 + i;
    let y = await nextPage(
      'Part VII: Master Solved Exam Bank',
      `Solved Examination Problem ${i + 1}/12`,
      `Drafting Solved Exam Question Bank (Page ${pageNum} of 216)...`
    );

    if (i === 0) {
      y = drawChapterHeader(
        doc,
        y,
        'Part VII',
        'Grand Master Midterm & Final Solved Exam Question Bank',
        'Exhaustive Analytical Walkthroughs Across All Six Core Disciplines'
      );
    } else {
      y = drawChapterHeader(
        doc,
        y,
        `Exam Problem ${i + 1}`,
        item.title,
        `University Degree Examination Question • Discipline: ${item.subject}`
      );
    }

    y = drawCalloutBox(doc, y, 'exam', `OFFICIAL UNIVERSITY EXAMINATION QUESTION [${item.subject}]`, item.q);
    y = drawCalloutBox(doc, y, 'tip', 'RIGOROUS MODEL SOLUTION & GRADING RUBRIC', item.sol);
  }

  // -------------------------------------------------------------
  // PART VIII: CAPSTONE & INTERVIEW GUIDE (3 PAGES: 211 TO 213)
  // -------------------------------------------------------------
  for (let p = 211; p <= 213; p++) {
    let y = await nextPage(
      'Part VIII: Capstone & Career Guide',
      `Capstone & Senior Engineering (Part ${p - 210}/3)`,
      `Drafting Capstone & Senior Interview Guide (Page ${p} of 216)...`
    );

    if (p === 211) {
      y = drawChapterHeader(
        doc,
        y,
        'Part VIII',
        'University Senior Capstone Project Blueprints',
        'Architecture Blueprints for Outstanding Final Year Undergraduate Projects'
      );
      y = drawTable(
        doc,
        y,
        ['Capstone Domain', 'Architecture Stack', 'Academic Contribution', 'Assessment Metric'],
        [40, 45, 52, 45],
        [
          ['Distributed Consensus', 'Raft / Go / gRPC', 'Byzantine fault tolerance under partitions', 'Throughput under network delay'],
          ['Database Storage Engine', 'LSM-Tree / Rust / RocksDB', 'Write-optimized SSTables & memtable', 'Compaction latency benchmarks'],
          ['Compiler Construction', 'LLVM / C++ / Lex & Yacc', 'Static AST optimizations & SSA emission', 'IR code generation accuracy'],
          ['Microkernel OS', 'C / x86 Assembly / QEMU', 'Preemptive scheduler & IPC messaging', 'Context switch overhead <500 cycles'],
          ['P2P File Distribution', 'BitTorrent / Python / asyncio', 'Distributed Hash Table (Kademlia)', 'Swarm download completion rate']
        ]
      );
      y = drawCalloutBox(
        doc,
        y,
        'concept',
        'CAPSTONE EVALUATION RUBRIC',
        'Senior capstone grading emphasizes: (1) Formal problem definition and literature review; (2) Rigorous architectural specification with modular separation; (3) Quantitative empirical benchmarks; (4) Production-grade test coverage (>80%).'
      );
    } else if (p === 212) {
      y = drawChapterHeader(
        doc,
        y,
        'Part VIII (Cont.)',
        'Technical Interview Engineering Playbook',
        'FAANG-Tier Algorithmic & System Design Interview Protocol'
      );
      y = drawCalloutBox(
        doc,
        y,
        'concept',
        'FIVE-STEP TECHNICAL CODING PROTOCOL',
        '1. Clarification & Edge Cases: Explicitly ask about null inputs, array bounds, negative numbers, integer overflow, and duplicates.\n2. State Brute Force Upfront: Articulate naive solution with its Big-O time and space before writing any code.\n3. Pattern Recognition: Categorize into known patterns (Sliding Window, Two Pointers, Monotonic Stack, Topological Sort, DP, Union-Find).\n4. Step-by-Step Pseudocode: Walk through the algorithmic logic with the interviewer before writing code.\n5. Manual Dry-Run: Test the implementation line-by-line with a realistic test case, checking loop boundaries and termination.'
      );
      y = drawCalloutBox(
        doc,
        y,
        'tip',
        'SYSTEM DESIGN INTERVIEW PROTOCOL (45-MINUTE FRAMEWORK)',
        'Minute 0-5: Scope & Requirements (Functional & Non-Functional, Read/Write QPS, Storage Estimation).\nMinute 5-10: High-Level Architecture (Client -> DNS -> CDN -> Load Balancer -> API Gateway -> Microservices -> DB).\nMinute 10-25: Core Component Deep-Dive (Data Model, Partitioning Key, Replication Strategy, Caching Layers).\nMinute 25-40: Bottlenecks & Scalability (Single Points of Failure, CAP theorem trade-offs, Rate Limiting, Asynchronous Queues).\nMinute 40-45: Wrap-up & Monitoring (Metrics, Alerts, Latency percentiles p99).'
      );
    } else if (p === 213) {
      y = drawChapterHeader(
        doc,
        y,
        'Part VIII (Cont.)',
        'Software Engineering Career & Research Pathways',
        'Navigating Graduate Admissions, Big Tech & Specialized Systems Engineering'
      );
      y = drawTable(
        doc,
        y,
        ['Career / Academic Path', 'Key Skill Competencies', 'Recommended Certifications / Projects', 'Target Industry Roles'],
        [42, 50, 48, 42],
        [
          ['Systems Engineering', 'C/C++, Linux kernel, concurrency, eBPF', 'Contribute to open-source OS/database engines', 'Kernel Dev, Storage Engineer, High-Frequency Trading'],
          ['Distributed Cloud Systems', 'Go, Kubernetes, gRPC, Cassandra, Kafka', 'AWS Solutions Architect, CKA (Kubernetes)', 'Site Reliability Engineer (SRE), Cloud Architect'],
          ['AI / Machine Learning', 'Python, PyTorch, Linear Algebra, CUDA', 'Publishing at NeurIPS/ICML, Kaggle Master', 'Machine Learning Engineer, Research Scientist'],
          ['Cybersecurity', 'Reverse engineering, cryptography, penetration testing', 'OSCP, CISSP, CEH', 'Security Analyst, Cryptographer, Red Team Lead']
        ]
      );
    }
  }

  // -------------------------------------------------------------
  // PART IX: MASTER LEXICON & BIBLIOGRAPHY (3 PAGES: 214 TO 216)
  // -------------------------------------------------------------
  for (let p = 214; p <= 216; p++) {
    let y = await nextPage(
      'Part IX: Master Lexicon & Bibliography',
      `Academic References (Part ${p - 213}/3)`,
      `Drafting Master Lexicon & Bibliography (Page ${p} of 216)...`
    );

    if (p === 214) {
      y = drawChapterHeader(
        doc,
        y,
        'Part IX',
        'Master Computer Science Lexicon & Mathematical Notation',
        'Formal Definitions of Core Computer Science Terms Across All Disciplines'
      );
      y = drawTable(
        doc,
        y,
        ['Symbol / Term', 'Rigorous Academic Definition & Operational Context'],
        [45, 137],
        [
          ['Θ(g(n))', 'Tight asymptotic bound: f(n) = Θ(g(n)) iff c1*g(n) <= f(n) <= c2*g(n) for large n'],
          ['O(g(n))', 'Asymptotic upper bound: f(n) = O(g(n)) iff f(n) <= c*g(n) for all n >= n0'],
          ['Ω(g(n))', 'Asymptotic lower bound: f(n) = Ω(g(n)) iff f(n) >= c*g(n) for all n >= n0'],
          ['NP-Complete', 'Class of decision problems in NP to which every other problem in NP can be reduced in polynomial time'],
          ['Semaphore P()', 'Atomic wait/decrement operation on counting semaphore: decrements value, blocks caller if value < 0'],
          ['Semaphore V()', 'Atomic signal/increment operation on counting semaphore: increments value, awakens blocked thread'],
          ['ACID', 'Transaction guarantees: Atomicity (all-or-none), Consistency, Isolation (serializable), Durability'],
          ['B+ Tree', 'Self-balancing search tree where all data records reside at leaf nodes, optimal for block storage'],
          ['RAII', 'Resource Acquisition Is Initialization: binds resource lifecycle strictly to stack variable scope']
        ]
      );
    } else if (p === 215) {
      y = drawChapterHeader(
        doc,
        y,
        'Part IX (Cont.)',
        'Systems Engineering Terminology & Architectural Patterns',
        'Distributed Systems, Network Protocol & Concurrency Terminology'
      );
      y = drawTable(
        doc,
        y,
        ['System Term', 'Technical Definition & Engineering Significance'],
        [45, 137],
        [
          ['CAP Theorem', 'Distributed data store can provide at most two of: Consistency, Availability, and Partition Tolerance'],
          ['Two-Phase Commit (2PC)', 'Atomic commitment protocol across distributed nodes ensuring all nodes commit or all abort'],
          ['Sliding Window', 'Flow control protocol allowing sender to transmit multiple packets before receiving acknowledgment'],
          ['Translation Lookaside Buffer', 'High-speed hardware associative cache mapping Virtual Page Numbers to Physical Frames'],
          ['Context Switch', 'Process of saving CPU state of running process and restoring state of newly scheduled process'],
          ['Böhm-Jacopini Theorem', 'Proves any computable algorithm can be expressed using sequence, selection, and iteration'],
          ['Single Source Shortest Path', 'Dijkstra algorithm finding minimal weight path from origin vertex to all other graph vertices'],
          ['CPL (1963)', 'Combined Programming Language: seminal early systems language, direct ancestor of BCPL, B, and C']
        ]
      );
    } else if (p === 216) {
      y = drawChapterHeader(
        doc,
        y,
        'Bibliography',
        'Authoritative Computer Science Academic Bibliography',
        'Seminal Textbooks & Primary Sources Utilized Across the 216-Page Curriculum'
      );
      y = drawTable(
        doc,
        y,
        ['Discipline Domain', 'Authoritative Textbook Reference', 'Authors & Edition'],
        [45, 75, 62],
        [
          ['Foundations & CPL', 'Fundamental Concepts in Programming Languages', 'Christopher Strachey (1967)'],
          ['Foundations & Turing', 'On Computable Numbers, with an Application to the Entscheidungsproblem', 'Alan M. Turing (1936)'],
          ['Programming Fundamentals', 'C++ How to Program (10th Edition)', 'Paul Deitel & Harvey Deitel'],
          ['Data Structures & Algorithms', 'Introduction to Algorithms (4th Edition - CLRS)', 'Cormen, Leiserson, Rivest, Stein'],
          ['Database Systems', 'Database System Concepts (7th Edition)', 'Silberschatz, Korth, Sudarshan'],
          ['Operating Systems', 'Operating System Concepts (10th Edition)', 'Silberschatz, Galvin, Gagne'],
          ['Computer Networks', 'Computer Networking: A Top-Down Approach (8th Edition)', 'James Kurose & Keith Ross'],
          ['Software Engineering', 'Software Engineering: A Practitioner’s Approach (9th Edition)', 'Roger S. Pressman & Bruce Maxim'],
          ['Computer Architecture', 'Computer Organization and Design: RISC-V Edition', 'David A. Patterson & John L. Hennessy'],
          ['Compiler Construction', 'Compilers: Principles, Techniques, and Tools (Dragon Book)', 'Aho, Lam, Sethi, Ullman']
        ]
      );
      y = drawCalloutBox(
        doc,
        y,
        'tip',
        'CERTIFICATE OF CURRICULAR COMPLETION',
        'This concludes the official 216-Page Computer Science Undergraduate Degree Handbook curated by Asad Usman (CS Expert). All curriculum outlines, architectural diagrams, source code listings, and solved examination questions adhere to ACM/IEEE guidelines.'
      );
    }
  }
}
