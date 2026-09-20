/**
 * Complete Academic Curriculum Data for 20+ Page Subject Textbooks & 100+ Page Degree Mega-Book
 * Curated by Asad Usman (Department of Computer Science)
 */

export interface DeepChapter {
  number: string;
  title: string;
  subtitle: string;
  abstractText: string;
  theoreticalFoundations: string[];
  memoryOrArchitectureDiagram?: string;
  codeListing?: {
    language: string;
    title: string;
    code: string;
    explanation: string;
  };
  complexityAnalysis?: {
    tableHeaders: string[];
    colWidths: number[];
    rows: string[][];
  };
  examProblems: {
    question: string;
    examType: string;
    solution: string;
    keyTakeaway: string;
  }[];
  labProjectSpec?: {
    title: string;
    objectives: string[];
    milestones: string[];
  };
}

export interface ComprehensiveSubjectCurriculum {
  id: string;
  code: string;
  name: string;
  semester: string;
  creditHours: number;
  courseOverview: string;
  curriculumPrerequisites: string[];
  learningOutcomes: string[];
  chapters: DeepChapter[];
  midtermFinalExamBank: {
    question: string;
    difficulty: 'Midterm Standard' | 'Final Exam Mastery';
    solution: string;
    rubric: string;
  }[];
  interviewQuestionBank: {
    question: string;
    industryContext: string;
    optimalAnswer: string;
  }[];
  glossary: { term: string; definition: string }[];
}

export const megaCurriculum: Record<string, ComprehensiveSubjectCurriculum> = {
  pf: {
    id: 'pf',
    code: 'CS-101',
    name: 'Programming Fundamentals',
    semester: 'Semester 1',
    creditHours: 4,
    courseOverview:
      'A rigorous exploration of computational thinking, imperative programming paradigms, machine-level execution, pointer arithmetic, dynamic memory heaps, and algorithm design in C++.',
    curriculumPrerequisites: ['High School Mathematics', 'Basic Analytical Problem Solving'],
    learningOutcomes: [
      'Deconstruct complex real-world algorithmic problems into deterministic structured logic.',
      'Trace execution state across stack frames, register files, and dynamic heap allocations.',
      'Eliminate dangling pointers, buffer overflows, and memory leaks using deterministic lifecycle management.',
      'Design modular, performant applications utilizing pointers, structs, and binary file streams.'
    ],
    chapters: [
      {
        number: 'Chapter 1',
        title: 'Machine Architecture, Compilation Pipelines & Memory Representation',
        subtitle: 'From High-Level Source to CPU Microcode Execution',
        abstractText:
          'Understanding computing starts at the silicon boundary. Source code is not executed directly; it undergoes four transformations: preprocessor macro expansions, syntactic translation into assembly, machine code object translation, and link-time address resolution. At runtime, the operating system assigns virtual address spaces partitioned into Text, Data, BSS, Heap, and Stack segments.',
        theoreticalFoundations: [
          'The Von Neumann Architecture bottleneck: Shared memory bus between CPU program instructions and data operands.',
          'Virtual Memory Segments: The Text segment contains immutable CPU opcodes; Data/BSS host global and static variables.',
          'Endianness: Little-endian systems store the least significant byte at the lowest memory address.',
          'Primitive representations: IEEE 754 floating point standard (sign bit, biased exponent, mantissa precision).'
        ],
        memoryOrArchitectureDiagram:
          '+-----------------------+ 0xFFFFFFFF (High Memory)\n| Stack (Grows Down)    | <- Frame Pointers, Local Vars, Return Addrs\n|          v            |\n|                       |\n|          ^            |\n| Heap (Grows Up)       | <- Dynamic Allocations via malloc()/new\n+-----------------------+\n| BSS (Uninitialized)   | <- Zero-initialized static & globals\n+-----------------------+\n| Data (Initialized)    | <- Initialized globals (int x = 42;)\n+-----------------------+\n| Text (Code Segment)   | <- Read-only executable binary instructions\n+-----------------------+ 0x00000000 (Low Memory)',
        codeListing: {
          language: 'C++',
          title: 'Memory Address Inspection & Byte Serialization',
          code: `#include <iostream>
#include <iomanip>

void inspectBytes(const void* ptr, size_t size) {
    const unsigned char* bytePtr = static_cast<const unsigned char*>(ptr);
    std::cout << "Memory Dump at " << ptr << ": ";
    for (size_t i = 0; i < size; ++i) {
        std::cout << "0x" << std::hex << std::setw(2) << std::setfill('0')
                  << static_cast<int>(bytePtr[i]) << " ";
    }
    std::cout << std::dec << "\\n";
}

int main() {
    int val = 0x12345678;
    std::cout << "Integer value: " << val << "\\n";
    inspectBytes(&val, sizeof(val)); // Demonstrates Little-Endian byte ordering
    return 0;
}`,
          explanation:
            'This snippet casts any generic memory address to an unsigned byte pointer, exposing how 32-bit integers are stored across four consecutive byte addresses in x86/ARM hardware architectures.'
        },
        complexityAnalysis: {
          tableHeaders: ['Data Type', 'Size (x86_64)', 'Value Range', 'Typical Alignment'],
          colWidths: [35, 30, 80, 35],
          rows: [
            ['char', '1 Byte', '-128 to +127', '1-byte boundary'],
            ['short', '2 Bytes', '-32,768 to +32,767', '2-byte boundary'],
            ['int', '4 Bytes', '-2.14B to +2.14B', '4-byte boundary'],
            ['long long', '8 Bytes', '-9.22E18 to +9.22E18', '8-byte boundary'],
            ['float', '4 Bytes', '~7 decimal digits precision', '4-byte boundary'],
            ['double', '8 Bytes', '~15-17 decimal digits', '8-byte boundary'],
            ['pointer (T*)', '8 Bytes', '0x0000000000000000 to 0xFFFFFFFFFFFFFFFF', '8-byte boundary']
          ]
        },
        examProblems: [
          {
            examType: 'Midterm Standard',
            question: 'What is the precise difference between a compiler error and a linker error? Provide concrete examples of code triggering each.',
            solution:
              'A compiler error occurs during lexical analysis, parsing, or semantic checking when C++ syntax rules or type constraints are violated (e.g., missing semicolons, undeclared variables, or mismatched parameter types). A linker error occurs after individual translation units (.cpp -> .o) are compiled, when the linker attempts to bind unresolved symbols into a final executable (e.g., calling a function prototyped in a header whose definition is missing, or having multiple global definitions violating the One Definition Rule).',
            keyTakeaway: 'Always remember: Syntax and types belong to the compiler; symbol resolution and external references belong to the linker.'
          }
        ]
      },
      {
        number: 'Chapter 2',
        title: 'Control Structures, Loop Invariants & Algorithmic Branching',
        subtitle: 'Branch Prediction, Short-Circuiting, and Recursion Semantics',
        abstractText:
          'Conditional branching governs execution paths. Modern superscalar CPUs utilize hardware branch predictors with history tables to speculatively execute instructions. High-performance code must account for pipeline stalls induced by branch mispredictions, short-circuit boolean semantics, and formal loop invariants.',
        theoreticalFoundations: [
          'Branch Prediction: Modern CPUs execute ahead based on 2-bit saturating counters; mispredictions incur 15-20 cycle pipeline flushes.',
          'Short-Circuit Evaluation: In (A && B), if A evaluates to false, B is guaranteed never to execute, crucial for guard clauses like (ptr != nullptr && ptr->val > 0).',
          'Loop Invariant: A formal mathematical assertion that holds true before loop entry, at every iteration boundary, and immediately upon loop termination.'
        ],
        codeListing: {
          language: 'C++',
          title: 'Safe Defensive Branching with Short-Circuit Guard Clauses',
          code: `#include <iostream>

struct Node {
    int data;
    Node* next;
};

// Defensive processing using short-circuit logical operators
bool processNextNode(Node* current) {
    // Both pointer validity and payload boundary verified safely:
    if (current != nullptr && current->next != nullptr && current->next->data > 0) {
        std::cout << "Valid positive successor: " << current->next->data << "\\n";
        return true;
    }
    return false;
}`,
          explanation:
            'If current is null, the evaluation terminates immediately without evaluating current->next, strictly avoiding segmentation faults.'
        },
        examProblems: [
          {
            examType: 'Midterm Classic',
            question: 'Trace the output and state of variables in a nested loop with pre-increment vs post-increment operations and state the loop invariant for binary search.',
            solution:
              'For binary search in a sorted array arr[0..n-1], the loop invariant is: If the target element x exists anywhere within the original array, it MUST lie within the sub-index range [low, high]. At each iteration, mid = low + (high - low)/2 divides the search space. By comparing arr[mid] to x, either low = mid + 1 or high = mid - 1 preserves the invariant while monotonically decreasing the search interval size until low > high.',
            keyTakeaway: 'Pre-increment (++i) increments in-place without generating a temporary copy, whereas post-increment (i++) copies the old state before incrementing.'
          }
        ]
      },
      {
        number: 'Chapter 3',
        title: 'Pointers, Pointer Arithmetic & Dynamic Heap Management',
        subtitle: 'Mastering Memory Dereferencing, Lvalues, Rvalues & Heap Lifecycles',
        abstractText:
          'Pointers are the foundational mechanism of systems programming. A pointer variable stores the virtual address of another variable. Understanding pointer arithmetic, multidimensional pointer indexing, function pointers, and the heap allocator (new / delete / malloc / free) is mandatory for systems engineers.',
        theoreticalFoundations: [
          'Address-of (&) and Dereference (*) operators: & extracts the lvalue base address; * resolves data stored at the targeted address.',
          'Pointer Arithmetic: Adding integer k to pointer of type T* advances the byte address by k * sizeof(T).',
          'Dangling Pointers: Pointers pointing to memory that has already been deallocated via delete or whose stack frame has popped.',
          'Memory Leaks: Allocating heap memory without recording its reference or omitting the matching delete statement.'
        ],
        memoryOrArchitectureDiagram:
          'int x = 42;         // Stack Address 0x7FFF00: Value 42\nint* ptr = &x;      // Stack Address 0x7FFF08: Value 0x7FFF00\nint** dptr = &ptr;  // Stack Address 0x7FFF10: Value 0x7FFF08\n\n[ dptr (0x7FFF10) ] --> [ ptr (0x7FFF08) ] --> [ x (0x7FFF00): 42 ]',
        codeListing: {
          language: 'C++',
          title: '2D Dynamic Matrix Allocation with Clean Deallocation Guard',
          code: `#include <iostream>

int** allocateMatrix(int rows, int cols) {
    int** matrix = new int*[rows];
    for (int i = 0; i < rows; ++i) {
        matrix[i] = new int[cols](); // Zero-initialized
    }
    return matrix;
}

void freeMatrix(int** matrix, int rows) {
    if (!matrix) return;
    for (int i = 0; i < rows; ++i) {
        delete[] matrix[i]; // Free each row vector
    }
    delete[] matrix;       // Free top pointer array
}

int main() {
    const int R = 3, C = 4;
    int** mat = allocateMatrix(R, C);
    mat[1][2] = 99;
    std::cout << "Value at mat[1][2]: " << mat[1][2] << "\\n";
    freeMatrix(mat, R);
    return 0;
}`,
          explanation:
            'Demonstrates complete 2D array allocation on the heap and prevents memory leaks by deallocating in reverse allocation order.'
        },
        examProblems: [
          {
            examType: 'Final Exam Mastery',
            question: 'Differentiate between int* const p vs const int* p vs const int* const p. What operations are allowed or rejected on each?',
            solution:
              '1) const int* p (or int const* p): Pointer to constant integer. The integer data being pointed to cannot be altered through p (*p = 10 is illegal), but p itself can be redirected to point to another address (p = &y is legal).\n2) int* const p: Constant pointer to mutable integer. The address stored inside p cannot be changed (p = &y is illegal), but the integer value at that address may be modified (*p = 10 is legal).\n3) const int* const p: Constant pointer to constant integer. Neither the targeted value (*p = 10) nor the target address (p = &y) may ever be modified.',
            keyTakeaway: 'Read pointer declarations from right to left: const before the asterisk modifies the data; const after the asterisk modifies the pointer variable itself.'
          }
        ]
      }
    ],
    midtermFinalExamBank: [
      {
        question: 'Explain the exact sequence of events when a recursive function reaches stack overflow.',
        difficulty: 'Midterm Standard',
        solution:
          'Each invocation pushes a stack frame containing: return instruction address, incoming arguments, saved CPU registers (frame pointer RBP), and local variables. If the base case is missing or unreachable, the stack pointer (RSP) decrements into the unmapped guard page below the stack boundary, triggering a hardware MMU fault reported as SIGSEGV (Segmentation Fault).',
        rubric: 'Award full marks for detailing frame allocation, guard page collision, and MMU hardware fault signal.'
      },
      {
        question: 'Write an algorithm in C++ to reverse a singly linked list in O(N) time and O(1) auxiliary space without allocating new nodes.',
        difficulty: 'Final Exam Mastery',
        solution:
          'Node* reverseList(Node* head) { Node *prev = nullptr, *curr = head, *next = nullptr; while(curr != nullptr) { next = curr->next; curr->next = prev; prev = curr; curr = next; } return prev; }',
        rubric: 'Must use three sliding pointers (prev, curr, next) and re-link next pointers without memory allocations.'
      }
    ],
    interviewQuestionBank: [
      {
        question: 'Why does C++ have undefined behavior, and what happens when you write beyond array bounds?',
        industryContext: 'Systems Performance & Memory Security',
        optimalAnswer:
          'C++ omits mandatory runtime bounds checking to maximize raw execution velocity. Writing beyond an array boundary corrupts neighboring stack or heap variables, overwrites saved return addresses (stack smashing), or attempts to write into read-only memory pages, leading to erratic bugs or exploitable security vulnerabilities (CVE buffer overflows).'
      }
    ],
    glossary: [
      { term: 'Lvalue', definition: 'An expression that designates a persistent memory location and can appear on the left side of an assignment.' },
      { term: 'Rvalue', definition: 'A temporary value that does not persist beyond the expression that computed it.' },
      { term: 'Stack Frame', definition: 'A contiguous block of memory pushed onto the runtime stack during a function call.' },
      { term: 'Heap Fragmentation', definition: 'Condition where free memory is broken into non-contiguous slices, preventing large contiguous allocations.' }
    ]
  },

  dsa: {
    id: 'dsa',
    code: 'CS-201',
    name: 'Data Structures & Algorithms',
    semester: 'Semester 3',
    creditHours: 4,
    courseOverview:
      'Rigorous analysis of asymptotic complexity, abstract data types, recursive divide-and-conquer, dynamic programming, priority queues, self-balancing search trees (AVL, Red-Black), and graph algorithms.',
    curriculumPrerequisites: ['CS-101 Programming Fundamentals', 'Discrete Mathematics'],
    learningOutcomes: [
      'Derive asymptotic Big-O, Big-Omega, and Big-Theta bounds using Master Theorem and recurrence trees.',
      'Implement self-balancing BSTs (AVL tree rotations) and maintain logarithmic lookup invariants.',
      'Formulate optimal substructure and overlapping subproblems for Dynamic Programming solutions.',
      'Analyze and execute Graph traversal algorithms (BFS, DFS, Dijkstra, Prim, Kruskal, Topological Sort).'
    ],
    chapters: [
      {
        number: 'Chapter 1',
        title: 'Asymptotic Analysis, Big-O Formalisms & Recurrence Relations',
        subtitle: 'Formal Mathematical Foundations of Algorithmic Complexity',
        abstractText:
          'Algorithm efficiency cannot be measured in seconds because physical hardware, operating system workloads, and compiler optimizations vary. Computer science utilizes asymptotic notation to categorize execution growth rate as input size n tends toward infinity.',
        theoreticalFoundations: [
          'Big-O Definition: f(n) = O(g(n)) if there exist positive constants c and n0 such that 0 <= f(n) <= c*g(n) for all n >= n0.',
          'Big-Omega (Lower Bound): f(n) = Ω(g(n)) if f(n) >= c*g(n) for all n >= n0.',
          'Big-Theta (Tight Bound): f(n) = Θ(g(n)) if f(n) is simultaneously O(g(n)) and Ω(g(n)).',
          'Master Theorem: For T(n) = a*T(n/b) + f(n), compare f(n) to n^(log_b(a)).'
        ],
        complexityAnalysis: {
          tableHeaders: ['Class Name', 'Notation', 'Operations for N = 1,000', 'Feasible for Competitions / Real-Time'],
          colWidths: [35, 30, 60, 55],
          rows: [
            ['Constant', 'O(1)', '1 operation', 'Instantaneous (< 1ns)'],
            ['Logarithmic', 'O(log n)', '~10 operations', 'Exceptional (< 10ns)'],
            ['Linear', 'O(n)', '1,000 operations', 'Excellent (< 1µs)'],
            ['Linearithmic', 'O(n log n)', '~10,000 operations', 'Standard for sorting (< 10µs)'],
            ['Quadratic', 'O(n^2)', '1,000,000 operations', 'Acceptable for small inputs (< 1ms)'],
            ['Cubic', 'O(n^3)', '1,000,000,000 operations', 'Warning threshold (~1 sec)'],
            ['Exponential', 'O(2^n)', '1.07 * 10^301 operations', 'Infeasible beyond N = 40']
          ]
        },
        examProblems: [
          {
            examType: 'Midterm Proof',
            question: 'Solve the recurrence relation T(n) = 2T(n/2) + O(n) using both the Master Theorem and the Recurrence Tree method.',
            solution:
              'Step 1 (Master Theorem): a = 2, b = 2, f(n) = O(n). Compute n^(log_b a) = n^(log_2 2) = n^1. Since f(n) = Θ(n^1), this matches Master Theorem Case 2. Therefore, T(n) = Θ(n log n).\nStep 2 (Recurrence Tree): Level 0 has cost n. Level 1 has 2 subproblems of size n/2, cost = 2 * (n/2) = n. Level k has 2^k subproblems of size n/2^k, cost = n. Height of tree is log_2(n). Total cost = sum of costs across all log_2(n) levels = n * log_2(n) = Θ(n log n).',
            keyTakeaway: 'This recurrence defines the exact runtime of Merge Sort.'
          }
        ]
      },
      {
        number: 'Chapter 2',
        title: 'Non-Linear Structures: Binary Search Trees & AVL Self-Balancing',
        subtitle: 'Logarithmic Guarantees through Left and Right Rotations',
        abstractText:
          'A degenerate Binary Search Tree degrades into an O(N) linked list if elements are inserted in sorted order. Adelson-Velsky and Landis (AVL) trees maintain balance factor invariants: the height difference between left and right subtrees of any node is strictly at most 1.',
        theoreticalFoundations: [
          'BST Invariant: For any node X, all keys in the left subtree are < key(X), and all keys in the right subtree are > key(X).',
          'AVL Balance Factor: BF(node) = height(left_child) - height(right_child) ∈ {-1, 0, +1}.',
          'Four Rotation Cases: Left-Left (Single Right Rotation), Right-Right (Single Left Rotation), Left-Right (Double Rotation: Left then Right), and Right-Left (Double Rotation: Right then Left).'
        ],
        codeListing: {
          language: 'C++',
          title: 'AVL Tree Right Rotation and Balance Recomputation',
          code: `struct AVLNode {
    int key, height;
    AVLNode *left, *right;
    AVLNode(int k) : key(k), height(1), left(nullptr), right(nullptr) {}
};

int getHeight(AVLNode* n) { return n ? n->height : 0; }
int getBalance(AVLNode* n) { return n ? getHeight(n->left) - getHeight(n->right) : 0; }

AVLNode* rotateRight(AVLNode* y) {
    AVLNode* x = y->left;
    AVLNode* T2 = x->right;
    
    // Perform rotation
    x->right = y;
    y->left = T2;
    
    // Update heights
    y->height = 1 + std::max(getHeight(y->left), getHeight(y->right));
    x->height = 1 + std::max(getHeight(x->left), getHeight(x->right));
    return x; // New root of subtree
}`,
          explanation:
            'The right rotation shifts node x up to replace y, maintaining BST order while restoring balance factor to legal bounds in O(1) operations.'
        },
        examProblems: [
          {
            examType: 'Midterm Classic',
            question: 'Insert keys [10, 20, 30, 40, 50, 25] into an empty AVL tree and show all rotations performed.',
            solution:
              '1. Insert 10, 20: Balanced.\n2. Insert 30: Node 10 has BF = -2 (Right-Right). Left rotation on 10. Root becomes 20, left=10, right=30.\n3. Insert 40: Balanced.\n4. Insert 50: Node 30 has BF = -2 (Right-Right). Left rotation on 30. Subtree root becomes 40, left=30, right=50.\n5. Insert 25: Node 20 has BF = -2. Its right child 40 has left child 30 with right child 25. Double rotation restores balance.',
            keyTakeaway: 'Always update node heights immediately following pointer re-assignments.'
          }
        ]
      }
    ],
    midtermFinalExamBank: [
      {
        question: 'Compare Dijkstra algorithm and Bellman-Ford algorithm in terms of edge weights and time complexities.',
        difficulty: 'Final Exam Mastery',
        solution:
          'Dijkstra uses a greedy priority queue approach to find single-source shortest paths on non-negative weighted graphs in O((V + E) log V) time. Bellman-Ford relaxes all edges V-1 times, supporting negative edge weights and detecting negative weight cycles in O(V * E) time.',
        rubric: 'Differentiate based on negative weights, cycle detection, and Big-O efficiency.'
      }
    ],
    interviewQuestionBank: [
      {
        question: 'How does an LRU Cache operate in O(1) time for both get() and put()?',
        industryContext: 'High-Throughput Web Services & Redis Internals',
        optimalAnswer:
          'An LRU Cache combines a doubly linked list with a hash map. The hash map maps keys to list node pointers in O(1). The doubly linked list maintains usage order: newly accessed nodes are moved to the head in O(1), and the least recently used node is evicted from the tail in O(1).'
      }
    ],
    glossary: [
      { term: 'Amortized Complexity', definition: 'The average time taken per operation over a sequence of n operations, e.g., dynamic array vector expansions.' },
      { term: 'Topological Sort', definition: 'A linear ordering of vertices in a Directed Acyclic Graph (DAG) such that for every directed edge u -> v, u comes before v.' }
    ]
  },

  db: {
    id: 'db',
    code: 'CS-204',
    name: 'Database Systems',
    semester: 'Semester 4',
    creditHours: 4,
    courseOverview:
      'Relational algebra, SQL standards, Entity-Relationship modeling, functional dependencies, schema normalization (1NF, 2NF, 3NF, BCNF), indexing structures (B+ Trees), query optimization, and ACID transactions.',
    curriculumPrerequisites: ['CS-201 Data Structures & Algorithms', 'Discrete Mathematics'],
    learningOutcomes: [
      'Formulate complex relational algebraic queries and convert them into standard SQL execution blocks.',
      'Deconstruct unnormalized relational tables into Boyce-Codd Normal Form without losing functional dependencies.',
      'Analyze query execution plans, index scan costs, and B+ tree branching heights.',
      'Enforce ACID transaction semantics and conflict serializability using Two-Phase Locking (2PL).'
    ],
    chapters: [
      {
        number: 'Chapter 1',
        title: 'Relational Model, Relational Algebra & SQL Foundations',
        subtitle: 'Mathematical Formalism of Tuples, Relations, and Projection',
        abstractText:
          'Introduced by Edgar F. Codd in 1970, the relational model treats databases as mathematical relations (subsets of Cartesian products). Queries in relational algebra are declarative expressions composed of selection (σ), projection (π), Cartesian product (×), set union (∪), set difference (-), and natural join (⋈).',
        theoreticalFoundations: [
          'Relation Schema: Denoted R(A1:D1, A2:D2, ..., An:Dn) where Ai is an attribute and Di is its domain.',
          'Selection operator (σ_p): Filters tuples that satisfy predicate p: σ_{gpa >= 3.5}(Students).',
          'Projection operator (π_L): Selects specified attribute columns L and eliminates duplicate tuples.',
          'Integrity Constraints: Entity integrity (Primary key cannot be null) and Referential integrity (Foreign key must match a valid primary key or be null).'
        ],
        codeListing: {
          language: 'SQL',
          title: 'Advanced Analytical Query with Aggregations and Window Functions',
          code: `-- University Departmental Academic Standing Query
SELECT 
    d.department_name,
    s.student_id,
    s.full_name,
    s.cgpa,
    RANK() OVER (PARTITION BY s.department_id ORDER BY s.cgpa DESC) as dept_rank,
    AVG(s.cgpa) OVER (PARTITION BY s.department_id) as dept_average
FROM students s
INNER JOIN departments d ON s.department_id = d.id
WHERE s.status = 'ACTIVE'
HAVING s.cgpa >= 3.0
ORDER BY d.department_name, dept_rank ASC;`,
          explanation:
            'Demonstrates inner joins, window partitioning for computing departmental rankings, and conditional filters.'
        },
        examProblems: [
          {
            examType: 'Midterm Relational Algebra',
            question: 'Express in relational algebra: Find the names of students who have enrolled in both CS-101 and CS-201.',
            solution:
              'π_{name}(Students ⋈ (π_{student_id}(σ_{course_code = "CS-101"}(Enrollments)) ∩ π_{student_id}(σ_{course_code = "CS-201"}(Enrollments))))',
            keyTakeaway: 'Intersection ∩ enforces the AND condition across multiple relational tuples.'
          }
        ]
      },
      {
        number: 'Chapter 2',
        title: 'Functional Dependencies & Normalization Theory (1NF to BCNF)',
        subtitle: 'Eliminating Update, Insertion, and Deletion Anomalies',
        abstractText:
          'Redundancy in database schemas wastes storage and creates update anomalies. Normalization decomposes relations based on functional dependencies X -> Y.',
        theoreticalFoundations: [
          'First Normal Form (1NF): All attribute values must be atomic; no multi-valued attributes or repeating groups.',
          'Second Normal Form (2NF): Relation is in 1NF and contains no partial dependencies (no non-prime attribute depends on a subset of any candidate key).',
          'Third Normal Form (3NF): Relation is in 2NF and contains no transitive dependencies (for X -> A, X is a superkey OR A is a prime attribute).',
          'Boyce-Codd Normal Form (BCNF): For every non-trivial functional dependency X -> A, X must be a superkey.'
        ],
        complexityAnalysis: {
          tableHeaders: ['Normal Form', 'Violation Condition', 'Solution Strategy'],
          colWidths: [35, 75, 70],
          rows: [
            ['1NF', 'Arrays, comma-separated lists, repeated columns', 'Split into individual atomic rows with composite keys'],
            ['2NF', 'Part of composite key determines non-key column', 'Decompose into new table with the partial key as primary'],
            ['3NF', 'Non-key column determines another non-key column', 'Extract transitive dependency into a separate lookup entity'],
            ['BCNF', 'Non-trivial dependency X -> Y where X is not superkey', 'Decompose into R1(X, Y) and R2(R - Y)']
          ]
        },
        examProblems: [
          {
            examType: 'Final Exam Classic',
            question: 'Given relation R(A, B, C, D, E) with FDs: { A -> BC, CD -> E, B -> D, E -> A }. Identify candidate keys and highest normal form.',
            solution:
              '1. Compute attribute closure of A: A+ = {A, B, C, D, E}. A is candidate key.\n2. Compute closure of E: E+ = {E, A, B, C, D}. E is candidate key.\n3. Compute closure of CD: CD+ = {C, D, E, A, B}. CD is candidate key.\n4. Compute closure of BC: B+ = {B, D}, BC+ = {B, C, D, E, A}. BC is candidate key.\nCandidate keys are {A}, {E}, {BC}, {CD}. Prime attributes: A, B, C, D, E. All attributes are prime! Since every attribute is prime, 3NF is automatically satisfied. Check BCNF: B -> D violates BCNF because B is not a superkey. Highest NF is 3NF.',
            keyTakeaway: 'Always calculate attribute closures (X+) before making assertions on normal form classifications.'
          }
        ]
      }
    ],
    midtermFinalExamBank: [
      {
        question: 'Explain the ACID properties of database transactions and describe how WAL (Write-Ahead Logging) ensures Durability.',
        difficulty: 'Final Exam Mastery',
        solution:
          'ACID stands for Atomicity (all-or-nothing), Consistency (preserves schema constraints), Isolation (concurrency control), and Durability (survives crashes). WAL guarantees durability by writing log records of modifications to non-volatile disk BEFORE dirty data pages are flushed from RAM buffer pools. During crash recovery, the database scans the WAL to REDO committed changes and UNDO uncommitted transactions.',
        rubric: 'Must clearly explain all four letters and the mechanism of WAL log flushing.'
      }
    ],
    interviewQuestionBank: [
      {
        question: 'Why are B+ Trees preferred over Binary Search Trees or Hash Indexes for relational database storage engines?',
        industryContext: 'Database Engine Design (InnoDB, Postgres)',
        optimalAnswer:
          'B+ Trees have massive branching factors (fan-out of 100-1000), keeping tree height at 3-4 levels even for millions of rows. This minimizes disk I/O seeks. Furthermore, B+ Tree leaves are linked sequentially in a doubly-linked list, enabling blisteringly fast range scans (e.g., WHERE age BETWEEN 20 AND 30), which Hash indexes cannot perform.'
      }
    ],
    glossary: [
      { term: 'ACID', definition: 'Atomicity, Consistency, Isolation, Durability - the four pillars of transactional reliability.' },
      { term: 'Deadlock', definition: 'A situation where two or more transactions hold locks on resources while waiting for locks held by each other.' }
    ]
  },

  os: {
    id: 'os',
    code: 'CS-301',
    name: 'Operating Systems Architecture',
    semester: 'Semester 5',
    creditHours: 4,
    courseOverview:
      'Kernel architecture, process lifecycle, thread synchronization, CPU scheduling algorithms, deadlock prevention, virtual memory, demand paging, and file systems.',
    curriculumPrerequisites: ['CS-101 Programming Fundamentals', 'Computer Organization & Architecture'],
    learningOutcomes: [
      'Trace context switching, interrupt handlers, and system call traps between User Mode and Kernel Mode.',
      'Implement synchronization primitives (mutexes, semaphores, conditional variables) to eliminate race conditions.',
      'Apply CPU scheduling algorithms (Round Robin, SRTF, Multilevel Feedback Queues) and calculate turnaround times.',
      'Analyze virtual memory translation via page tables, TLBs, and page replacement heuristics.'
    ],
    chapters: [
      {
        number: 'Chapter 1',
        title: 'Processes, Threads & Kernel Dual-Mode Protection',
        subtitle: 'Context Switching, PCB State Transitions, and System Calls',
        abstractText:
          'An operating system is the core resource manager. Hardware enforcement relies on dual-mode CPU operation: Ring 3 (User Mode) restricts access to hardware registers, while Ring 0 (Kernel Mode) grants unlimited privileges. System calls (syscall/sysenter) execute controlled transitions via software interrupts.',
        theoreticalFoundations: [
          'Process Control Block (PCB): Kernel data structure storing PID, Program Counter, CPU registers, memory mappings, and open file descriptors.',
          'Context Switch: Saving state of the running process to its PCB and loading the state of the next scheduled process.',
          'Processes vs Threads: Processes have isolated virtual address spaces; threads within the same process share code, data, and heap, but maintain private stacks.'
        ],
        codeListing: {
          language: 'C',
          title: 'POSIX Forking, Child Process Execution & Exit Status Reaping',
          code: `#include <stdio.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/wait.h>

int main() {
    pid_t pid = fork();
    
    if (pid < 0) {
        perror("Fork failed");
        return 1;
    } else if (pid == 0) {
        // Child Process
        printf("[Child PID: %d] Executing child task...\\n", getpid());
        _exit(42); // Clean child exit
    } else {
        // Parent Process
        int status;
        printf("[Parent PID: %d] Waiting for child PID %d...\\n", getpid(), pid);
        waitpid(pid, &status, 0); // Reaping prevents zombie process
        if (WIFEXITED(status)) {
            printf("[Parent] Child exited cleanly with status code: %d\\n", WEXITSTATUS(status));
        }
    }
    return 0;
}`,
          explanation:
            'Demonstrates fork() copying process state and waitpid() preventing zombie processes in Linux.'
        },
        examProblems: [
          {
            examType: 'Midterm Classic',
            question: 'How many total processes are created when the code snippet: fork(); fork(); fork(); executes?',
            solution:
              'Each call to fork() doubles the number of active processes. Starting with 1 parent process:\nAfter 1st fork: 2^1 = 2 processes.\nAfter 2nd fork: 2^2 = 4 processes.\nAfter 3rd fork: 2^3 = 8 processes.\nTotal processes running = 8. Total NEW child processes created = 8 - 1 = 7.',
            keyTakeaway: 'Formula for n consecutive unconditional forks is 2^n total processes.'
          }
        ]
      },
      {
        number: 'Chapter 2',
        title: 'Concurrency, Race Conditions & Synchronization Primitives',
        subtitle: 'Semaphores, Mutexes, Monitors & The Dining Philosophers Problem',
        abstractText:
          'When multiple concurrent threads access shared mutable state without synchronization, execution outcome depends on arbitrary instruction interleaving, producing non-deterministic race conditions.',
        theoreticalFoundations: [
          'Critical Section Problem: Protocol must satisfy Mutual Exclusion, Progress, and Bounded Waiting.',
          'Mutex: A locking mechanism where only the thread that locked the mutex can unlock it (ownership semantics).',
          'Counting Semaphore: An integer variable accessed via atomic wait() / P() and signal() / V() operations.',
          'Deadlock Four Conditions (Coffman): Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait.'
        ],
        examProblems: [
          {
            examType: 'Final Exam Mastery',
            question: 'State the four Coffman conditions for deadlocks and explain Banker algorithm safety check.',
            solution:
              'The four conditions are Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait. The Banker algorithm tests safety before granting resource requests: it simulates allocation and checks if there exists a sequence <P1, P2, ..., Pn> where each process can finish using currently available resources plus resources freed by previously finished processes.',
            keyTakeaway: 'Breaking any ONE of the four Coffman conditions is mathematically sufficient to prevent deadlocks.'
          }
        ]
      }
    ],
    midtermFinalExamBank: [
      {
        question: 'Explain Virtual Memory Translation using a 2-level page table and describe the role of the TLB.',
        difficulty: 'Final Exam Mastery',
        solution:
          'Virtual addresses are divided into Page Directory Index, Page Table Index, and Offset. The CPU first checks the TLB (Translation Lookaside Buffer) associative cache. On a TLB hit, physical frame number is retrieved in < 1ns. On a TLB miss, a hardware page table walk traverses memory to locate the Page Table Entry, updates the TLB, and restarts the instruction.',
        rubric: 'Must explain virtual address partitioning, TLB hit vs miss, and page frame calculation.'
      }
    ],
    interviewQuestionBank: [
      {
        question: 'What is the exact distinction between a Zombie process and an Orphan process in Linux?',
        industryContext: 'Unix Production Systems Troubleshooting',
        optimalAnswer:
          'An orphan process is a child whose parent terminated without waiting for it; the Linux init process (PID 1) automatically adopts orphan processes and reaps their exit status. A zombie process is a process that has completed execution via exit(), but its parent has not yet called wait() to read its exit code; its PCB remains in the process table, consuming PID slots.'
      }
    ],
    glossary: [
      { term: 'Context Switch', definition: 'The switching of the CPU from one process or thread to another, involving state save and restore.' },
      { term: 'Thrashing', definition: 'A state where the operating system spends more time swapping pages in and out of virtual memory than executing actual instructions.' }
    ]
  },

  cn: {
    id: 'cn',
    code: 'CS-302',
    name: 'Computer Networks',
    semester: 'Semester 6',
    creditHours: 3,
    courseOverview:
      'Layered network architectures (OSI 7-Layer and TCP/IP models), data link protocols, IP addressing (IPv4/IPv6, CIDR subnetting), routing protocols (OSPF, BGP), transport protocols (TCP flow and congestion control vs UDP), application layer (DNS, HTTP/1.1, HTTP/2, TLS), and network security.',
    curriculumPrerequisites: ['CS-101 Programming Fundamentals', 'CS-301 Operating Systems Architecture'],
    learningOutcomes: [
      'Deconstruct packet transmission across the physical, link, network, transport, and application layers.',
      'Calculate CIDR subnet masks, usable host ranges, and broadcast addresses for complex enterprise networks.',
      'Trace TCP 3-way handshakes, sequence acknowledgment arithmetic, and congestion control states.',
      'Inspect application protocols (DNS lookups, HTTP headers, TLS handshakes) using packet capture analyzers.'
    ],
    chapters: [
      {
        number: 'Chapter 1',
        title: 'Network Layering Models, Protocol Architectures & Encapsulation',
        subtitle: 'OSI 7-Layer Reference Model vs TCP/IP Internet Suite',
        abstractText:
          'Computer networks rely on layered abstraction: each layer provides services to the layer above while shielding implementation details below. During transmission, data moves down the stack, with each layer prepending a protocol header (encapsulation); at the destination, headers are stripped sequentially (decapsulation).',
        theoreticalFoundations: [
          'OSI 7-Layers: Physical, Data Link, Network, Transport, Session, Presentation, Application.',
          'TCP/IP 4-Layers: Network Interface (Link), Internet (IP), Transport (TCP/UDP), Application (HTTP, DNS).',
          'PDU (Protocol Data Unit) Terminology: Frame (Link), Packet/Datagram (Network), Segment (Transport), Message/Data (Application).'
        ],
        complexityAnalysis: {
          tableHeaders: ['OSI Layer', 'TCP/IP Equivalent', 'Key Protocols', 'Addressing Scheme'],
          colWidths: [35, 35, 60, 50],
          rows: [
            ['Application (7)', 'Application', 'HTTP, DNS, SMTP, SSH', 'URLs, Hostnames, Mailboxes'],
            ['Presentation (6)', 'Application', 'TLS/SSL, JPEG, ASCII', 'Data Formats & Encodings'],
            ['Session (5)', 'Application', 'RPC, NetBIOS, Sockets', 'Session Identifiers'],
            ['Transport (4)', 'Transport', 'TCP, UDP, QUIC', 'Port Numbers (0-65535)'],
            ['Network (3)', 'Internet', 'IPv4, IPv6, ICMP, BGP', 'IP Addresses (32-bit / 128-bit)'],
            ['Data Link (2)', 'Network Access', 'Ethernet 802.3, Wi-Fi 802.11', 'MAC Addresses (48-bit hex)'],
            ['Physical (1)', 'Network Access', 'Fiber Optic, Cat6e, 5G Radio', 'Bits, Volts, Frequencies']
          ]
        },
        examProblems: [
          {
            examType: 'Midterm Calculation',
            question: 'A network is assigned IP block 192.168.10.0/24. Subnet this network into 4 equal subnets. State the subnet mask, network address, usable host range, and broadcast address for each.',
            solution:
              'To create 4 subnets, we borrow 2 bits from host portion (2^2 = 4). New mask is /26 (255.255.255.192). Block size is 256 - 192 = 64.\nSubnet 1: Net 192.168.10.0/26, Usable: .1 to .62, Broadcast: .63\nSubnet 2: Net 192.168.10.64/26, Usable: .65 to .126, Broadcast: .127\nSubnet 3: Net 192.168.10.128/26, Usable: .129 to .190, Broadcast: .191\nSubnet 4: Net 192.168.10.192/26, Usable: .193 to .254, Broadcast: .255.',
            keyTakeaway: 'Always subtract 2 from total host addresses (one for network ID, one for broadcast ID).'
          }
        ]
      },
      {
        number: 'Chapter 2',
        title: 'Transport Layer: TCP Reliability, Flow & Congestion Control',
        subtitle: 'Three-Way Handshake, Sliding Window, Slow Start & Fast Retransmit',
        abstractText:
          'IP provides unreliable, best-effort packet delivery. TCP constructs a reliable, in-order byte stream over this unreliable foundation using checksums, sequence numbers, positive acknowledgments, sliding window flow control, and dynamic congestion control algorithms.',
        theoreticalFoundations: [
          'TCP 3-Way Handshake: SYN -> SYN-ACK -> ACK establishes sequence sync and receiver window parameters.',
          'TCP Connection Teardown: FIN -> ACK -> FIN -> ACK with TIME_WAIT state (2*MSL) to drain duplicate segments.',
          'Flow Control vs Congestion Control: Flow control prevents overflowing the receiver buffer (advertised window); Congestion control prevents overflowing internet routers (congestion window cwnd).',
          'Congestion Algorithms: Slow Start (exponential growth), Congestion Avoidance (additive increase), Fast Retransmit (3 duplicate ACKs), Fast Recovery.'
        ],
        examProblems: [
          {
            examType: 'Final Exam Mastery',
            question: 'Why does the TCP connection teardown process include a TIME_WAIT state of 2MSL (Maximum Segment Lifetime)?',
            solution:
              '1) To ensure the final ACK sent by the client arrives safely at the server; if the final ACK is lost, the server will retransmit its FIN, which the client can only re-acknowledge if it remains in TIME_WAIT.\n2) To allow all old duplicate segments from the connection to dissipate completely in the network, preventing them from being misinterpreted by a future connection utilizing the same port pair.',
            keyTakeaway: 'TIME_WAIT is essential to prevent ghost packets from corrupting subsequent connections.'
          }
        ]
      }
    ],
    midtermFinalExamBank: [
      {
        question: 'Compare Distance Vector Routing (Bellman-Ford) and Link State Routing (Dijkstra) in terms of convergence and routing loops.',
        difficulty: 'Final Exam Mastery',
        solution:
          'Distance vector routers share their entire routing table only with immediate neighbors; they suffer from slow convergence and the Count-to-Infinity problem. Link state routers flood local link state advertisements (LSAs) to the entire network so every node builds an identical topology map, converging rapidly without routing loops.',
        rubric: 'Differentiate based on information shared, flooding scope, and loop susceptibility.'
      }
    ],
    interviewQuestionBank: [
      {
        question: 'What happens in precise network protocol sequence when you type https://google.com into your browser address bar and press Enter?',
        industryContext: 'Standard Senior Systems & Network Engineering Interview',
        optimalAnswer:
          '1. DNS resolution (browser cache -> OS cache -> recursive resolver -> authoritative root/TLD DNS via UDP 53).\n2. ARP resolution to find local gateway default router MAC address.\n3. TCP 3-way handshake on port 443 with server.\n4. TLS 1.3 cryptographic handshake (ClientHello, ServerHello, certificate verification, ECDHE key exchange, session keys).\n5. Encrypted HTTP/2 or HTTP/3 GET request sent over TLS.\n6. Web server processes request, returns HTTP 200 OK HTML payload.\n7. Browser renders DOM and fetches secondary assets.'
      }
    ],
    glossary: [
      { term: 'MTU (Maximum Transmission Unit)', definition: 'The largest packet size that can be transmitted over a network medium without fragmentation (typically 1500 bytes on Ethernet).' },
      { term: 'BGP (Border Gateway Protocol)', definition: 'The exterior gateway protocol that routes traffic across autonomous systems (AS) on the global Internet backbone.' }
    ]
  },

  se: {
    id: 'se',
    code: 'CS-304',
    name: 'Software Engineering',
    semester: 'Semester 6',
    creditHours: 3,
    courseOverview:
      'Software Development Life Cycle (SDLC), Agile and Scrum methodologies, requirements elicitation, architectural patterns (MVC, Microservices), UML diagrams, Gang of Four (GoF) design patterns, Git workflows, CI/CD pipelines, Docker containerization, and automated testing (unit, integration, regression).',
    curriculumPrerequisites: ['CS-101 Programming Fundamentals', 'Object-Oriented Programming'],
    learningOutcomes: [
      'Compare predictive Waterfall vs iterative Agile methodologies and lead Scrum sprints.',
      'Architect resilient software using SOLID object-oriented principles and GoF design patterns.',
      'Model system use cases, class structures, and sequence flows using standard UML notations.',
      'Construct automated CI/CD deployment pipelines incorporating git workflows and containerization.'
    ],
    chapters: [
      {
        number: 'Chapter 1',
        title: 'SDLC Methodologies, Agile Principles & Scrum Framework',
        subtitle: 'From Predictive Waterfall to Iterative Sprint Delivery',
        abstractText:
          'Software Engineering is the disciplined application of engineering principles to software construction. Historical Waterfall models separated requirements, design, implementation, and testing into sequential phases, leading to catastrophic delays when requirements evolved. The Agile Manifesto and Scrum framework replace predictive planning with empirical process control through short iterative sprints.',
        theoreticalFoundations: [
          'Agile Manifesto Core Values: Individuals and interactions over processes and tools; Working software over comprehensive documentation; Customer collaboration over contract negotiation; Responding to change over following a plan.',
          'Scrum Ceremonies: Sprint Planning, Daily Standup (15m), Sprint Review, and Sprint Retrospective.',
          'Scrum Roles: Product Owner (defines What and value), Scrum Master (servant leader, removes blockers), Development Team (self-organizing execution).'
        ],
        complexityAnalysis: {
          tableHeaders: ['Attribute', 'Waterfall (Predictive)', 'Agile / Scrum (Iterative)', 'Kanban (Flow-Based)'],
          colWidths: [35, 45, 55, 45],
          rows: [
            ['Requirements', 'Fixed upfront', 'Evolving in Product Backlog', 'Continuously prioritized'],
            ['Delivery Cycle', 'Single monolithic release at end', 'Working software every 2-4 weeks', 'Continuous continuous flow'],
            ['Risk Profile', 'High (surprises at end)', 'Low (early feedback loops)', 'Low (WIP constraints)'],
            ['Client Involve', 'Signed-off at start and end', 'Active partner in each sprint review', 'Regular feedback loops']
          ]
        },
        examProblems: [
          {
            examType: 'Midterm Scenario',
            question: 'A medical device company is designing firmware for heart pacemakers. Should they choose pure Agile or a Hybrid V-Model? Justify with safety and regulatory constraints.',
            solution:
              'They should choose a Hybrid V-Model or regulated Plan-Driven approach. Life-critical systems require exhaustive upfront mathematical proofs, traceability matrices, ISO 13485 compliance, and formal validation testing at each abstraction level. Iterative exploratory agile sprints risk shipping fatal regressions in embedded pacemaker logic.',
            keyTakeaway: 'Match development methodology to domain risk: high regulatory and safety risk mandates plan-driven traceability.'
          }
        ]
      },
      {
        number: 'Chapter 2',
        title: 'Object-Oriented Design Principles (SOLID) & Design Patterns',
        subtitle: 'Writing Decoupled, Extensible & Testable Software Systems',
        abstractText:
          'Maintainable codebases rely on SOLID principles to minimize coupling and maximize cohesion. Design patterns provide reusable battle-tested solutions to common architectural challenges.',
        theoreticalFoundations: [
          'Single Responsibility Principle (SRP): A class should have one, and only one, reason to change.',
          'Open/Closed Principle (OCP): Software entities should be open for extension, but closed for modification.',
          'Liskov Substitution Principle (LSP): Subtypes must be substitutable for their base types without altering program correctness.',
          'Interface Segregation Principle (ISP): Clients should not be forced to depend on methods they do not use.',
          'Dependency Inversion Principle (DIP): High-level modules should not depend on low-level modules; both should depend on abstractions.'
        ],
        examProblems: [
          {
            examType: 'Final Exam Mastery',
            question: 'Demonstrate how the Factory Pattern and Dependency Inversion Principle eliminate tight coupling in a multi-provider notification system.',
            solution:
              'Define an interface INotificationService { void send(string msg); }. Implement concrete classes EmailNotifier and SMSNotifier. Create a NotificationFactory that instantiates the correct service based on configuration. The high-level OrderService depends ONLY on INotificationService interface, never directly on EmailNotifier or SMSNotifier.',
            keyTakeaway: 'Depend upon abstractions, never upon concrete implementations.'
          }
        ]
      }
    ],
    midtermFinalExamBank: [
      {
        question: 'Differentiate between Unit Testing, Integration Testing, and Regression Testing with examples of each.',
        difficulty: 'Final Exam Mastery',
        solution:
          'Unit testing verifies individual isolated functions using mock dependencies (e.g., testing calculateTax(amount)). Integration testing verifies interactions between collaborating components (e.g., verifying UserRepository queries the real database). Regression testing re-runs the existing test suite after code modifications to ensure prior working features did not break.',
        rubric: 'Must clearly explain scope, dependencies, and testing phase for all three.'
      }
    ],
    interviewQuestionBank: [
      {
        question: 'Explain Git Merge vs Git Rebase and when to avoid rebasing.',
        industryContext: 'Collaborative Enterprise Source Control Workflows',
        optimalAnswer:
          'Git merge creates a new merge commit preserving exact history and branch timelines. Git rebase re-applies commits from the current branch on top of another base tip, creating a linear history. The Golden Rule of Rebase: Never rebase a public shared branch, because it rewrites commit SHAs, causing severe divergence for all collaborating teammates.'
      }
    ],
    glossary: [
      { term: 'Technical Debt', definition: 'The implied future cost of additional rework caused by choosing an easy or expedient solution now instead of a better approach.' },
      { term: 'CI/CD', definition: 'Continuous Integration and Continuous Deployment: automated pipelines that build, test, and release code changes.' }
    ]
  }
};
