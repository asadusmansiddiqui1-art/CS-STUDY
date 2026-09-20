/**
 * Foundations of Computer Science, CPL History & Programming Languages Curriculum Data
 * Curated by Asad Usman (Department of Computer Science)
 */

export interface FoundationsTopic {
  title: string;
  subtitle: string;
  category: string;
  overview: string;
  keyPoints: string[];
  tableData?: {
    headers: string[];
    colWidths: number[];
    rows: string[][];
  };
  callouts?: {
    type: 'concept' | 'exam' | 'tip' | 'architecture';
    title: string;
    body: string;
  }[];
  codeListing?: {
    language: string;
    title: string;
    code: string;
    explanation: string;
  };
}

/**
 * Chapter 0.1: What is a Computer? (8 In-depth Sections)
 */
export const whatIsComputerSections: FoundationsTopic[] = [
  {
    title: 'Theoretical & Mathematical Foundations of Computation',
    subtitle: 'Turing Machines, Church-Turing Thesis & The Limits of Decidability',
    category: 'Computer Foundations • Theory',
    overview:
      'At its theoretical core, a computer is a physical realization of a Universal Turing Machine (UTM)—a mathematical model of computation formulated by Alan Turing in 1936. A Turing Machine consists of an infinite memory tape divided into cells, a read/write head, a state register, and a finite transition table. The Church-Turing Thesis postulates that any function computable by an effective algorithm can be computed by a Universal Turing Machine.',
    keyPoints: [
      'Universal Computation: Any computer with sufficient memory and Turing completeness can simulate the logic of any other computational machine.',
      'Computable vs. Uncomputable: Alan Turing proved the Halting Problem is undecidable—no general algorithm can determine if an arbitrary program will eventually halt or run forever.',
      'Deterministic vs. Non-Deterministic: Deterministic Automata have exactly one valid state transition per input; Non-deterministic models branch simultaneously across computational paths.',
      'Shannon Information Entropy: Claude Shannon established in 1948 that digital information can be measured in bits (binary digits), bridging Boolean algebra to physical electronic circuits.'
    ],
    callouts: [
      {
        type: 'concept',
        title: 'FORMAL TURING MACHINE TUPLE DEFINITION',
        body: 'A formal Turing Machine is defined mathematically as a 7-tuple: M = (Q, Σ, Γ, δ, q0, q_accept, q_reject), where Q is a finite set of internal states, Σ is the input alphabet, Γ is the tape alphabet (with blank symbol b ∈ Γ, Σ ⊆ Γ), δ is the transition function δ: Q × Γ → Q × Γ × {L, R}, q0 is the start state, q_accept is the halting accept state, and q_reject is the halting reject state.'
      },
      {
        type: 'exam',
        title: 'HIGH-YIELD THEORY EXAM QUESTION',
        body: 'Explain why the Church-Turing Thesis is called a "Thesis" rather than a "Theorem".\nModel Answer: Because the concept of an "intuitive algorithm" or "effective procedure" is an informal mathematical notion, it cannot be formally proven like a mathematical theorem. However, because every independent formalization of computation (Turing Machines, Church Lambda Calculus, Post Machines, Kleene Partial Recursive Functions) has proven to be mathematically equivalent in computational power, it is accepted as a foundational thesis.'
      }
    ]
  },
  {
    title: 'Von Neumann vs. Harvard Architecture & Functional Model',
    subtitle: 'Stored-Program Concept, System Buses & The Von Neumann Bottleneck',
    category: 'Computer Foundations • Architecture',
    overview:
      'Published by John von Neumann in 1945 ("First Draft of a Report on the EDVAC"), the stored-program architecture unified computer programs and computational data within the same shared addressable physical memory space. In contrast, the Harvard Architecture separates physical instruction memory (read-only or modified by flash) from physical data memory, providing dual simultaneous memory access channels at the cost of circuit complexity.',
    keyPoints: [
      'Von Neumann Stored-Program Concept: Instructions and runtime variables reside together in primary RAM. Instructions are fetched, decoded, and executed sequentially unless redirected by branch instructions.',
      'The Von Neumann Bottleneck: Throughput is fundamentally bounded because instruction fetching and data reading/writing must contend for the same shared memory bus.',
      'Harvard Architecture: Dedicated instruction bus and data bus allow simultaneous instruction fetch and operand read/write cycles, widely used in modern DSPs and ARM microcontroller caches.',
      'Modified Harvard in Modern CPUs: Modern x86 and ARM processors combine both: they appear as Von Neumann to programmer memory, but utilize split L1 Instruction Cache and L1 Data Cache internally.'
    ],
    tableData: {
      headers: ['Architectural Property', 'Von Neumann Architecture', 'Harvard Architecture', 'Modern Modified Hybrid'],
      colWidths: [40, 48, 48, 46],
      rows: [
        ['Memory Space', 'Unified Instruction & Data RAM', 'Physically Separate ROM/RAM', 'Unified physical RAM, Split L1 Cache'],
        ['Bus Structure', 'Single Shared System Bus', 'Separate Address/Data Buses', 'Multi-level Interconnects (Crossbar)'],
        ['Throughput Constraint', 'Subject to Von Neumann Bottleneck', 'Dual simultaneous memory access', 'L1 Instruction & Data hits in parallel'],
        ['Complexity & Cost', 'Lower physical circuit cost', 'Higher pin count & complexity', 'High silicon density, high performance'],
        ['Common Deployments', 'General Purpose PCs, Servers', 'Microchip PIC, Digital Signal DSPs', 'Intel Core, AMD Ryzen, Apple M-Series']
      ]
    },
    callouts: [
      {
        type: 'architecture',
        title: 'CPU INTERNAL STRUCTURAL TAXONOMY',
        body: '[Control Unit (CU)] -> Synchronizes micro-operations & generates control signals\n[Arithmetic Logic Unit (ALU)] -> Performs integer math (+, -, *, /) and bitwise operations (AND, OR, XOR, SHL)\n[Registers] -> Program Counter (PC), Instruction Register (IR), Memory Address Register (MAR), Memory Data Register (MDR), Accumulator (ACC)\n[System Bus] -> Address Bus (unidirectional 64-bit), Data Bus (bidirectional 64-bit), Control Bus (Read/Write, Clock, Interrupts)'
      }
    ]
  },
  {
    title: 'The Machine Instruction Execution Cycle & Interrupt Vectoring',
    subtitle: 'Fetch, Decode, Execute, Memory Access, Write-Back & Hardware Interrupts',
    category: 'Computer Foundations • CPU Execution',
    overview:
      'Every operation performed by a digital computer reduces to billions of iterations of the Machine Instruction Cycle (Fetch-Decode-Execute). Synchronized by the master quartz crystal oscillator clock, the CPU continuously reads machine-language instructions from main memory, translates the operational opcode, fetches necessary memory operands, executes the arithmetic or control logic, and commits state back to registers or memory.',
    keyPoints: [
      '1. Fetch Phase: The Program Counter (PC) emits the target instruction memory address onto the Address Bus; the memory subsystem returns the 32-bit or 64-bit instruction word onto the Data Bus into the Instruction Register (IR); PC increments by instruction length.',
      '2. Decode Phase: The Control Unit decodes the opcode (operational code) bits and operand register specifiers, configuring datapath multiplexers and ALU control lines.',
      '3. Execute Phase: The ALU performs the specified computation (e.g., adding two 64-bit integer registers or evaluating conditional flags).',
      '4. Memory Access Phase: If the instruction specifies a load or store, effective memory addresses are calculated and transferred via MAR/MDR.',
      '5. Write-Back Phase: The result of computation is written back into the destination register file or cache line.',
      'Interrupt Handling: Hardware devices (keyboards, timers, NICs) assert interrupt request (IRQ) lines; the CPU suspends the current cycle, pushes registers onto the kernel stack, and jumps to the Interrupt Vector Table (IVT) handler.'
    ],
    codeListing: {
      language: 'Assembly (x86-64)',
      title: 'Disassembly of Fetch-Decode-Execute Flow',
      code: `; x86-64 Machine Instruction Lifecycle Example
; C++ Statement: c = a + b;
mov rax, QWORD PTR [rbp-8]   ; FETCH & LOAD: Read variable 'a' from stack into RAX register
add rax, QWORD PTR [rbp-16]  ; EXECUTE: ALU adds variable 'b' to RAX; updates CPU FLAGS (ZF, CF, SF)
mov QWORD PTR [rbp-24], rax  ; WRITE-BACK: Store calculated sum into memory address of 'c'`,
      explanation:
        'The CPU fetches the 4-byte instruction stream into the L1 Instruction Cache. The hardware instruction decoder translates the x86-64 prefix and opcode into RISC-like micro-ops (uops), dispatches them to reservation stations, performs addition in the integer ALU pipeline, and commits the result to the memory write-buffer.'
    }
  },
  {
    title: 'Digital Logic, Transistors, Boolean Algebra & Arithmetic Circuits',
    subtitle: 'From MOSFET Silicon Switches to Ripple Carry Adders & ALU Construction',
    category: 'Computer Foundations • Hardware Logic',
    overview:
      'Modern digital computers operate exclusively through binary electronic switches called MOSFETs (Metal-Oxide-Semiconductor Field-Effect Transistors). Operating in saturation mode, transistors act as voltage-controlled switches: 0V (GND) represents logical 0 (False), while +3.3V or +1.2V represents logical 1 (True). By combining complementary P-type and N-type MOSFETs (CMOS), digital designers construct elementary logic gates.',
    keyPoints: [
      'Universal Logic Gates: NAND and NOR are functionally complete universal gates—any Boolean logic function, arithmetic adder, or memory latch can be constructed using NAND or NOR gates alone.',
      'Boolean Axioms: De Morgan’s Laws ((A · B)′ = A′ + B′ and (A + B)′ = A′ · B′), Absorption (A + A·B = A), and Distributive Laws form the algebraic basis of digital minimization.',
      'Combinational Circuits: Output depends purely on current inputs (Adders, Multiplexers, Decoders, Encoders, Demultiplexers).',
      'Sequential Circuits: Output depends on current inputs and past states via feedback loops and clock edges (SR Latches, D Flip-Flops, JK Flip-Flops, Shift Registers, Synchronous Counters).'
    ],
    tableData: {
      headers: ['Logic Gate', 'Boolean Equation', 'Truth Table Output (A=0, B=0 | A=0, B=1 | A=1, B=0 | A=1, B=1)', 'Transistor Count (CMOS)'],
      colWidths: [35, 45, 62, 40],
      rows: [
        ['AND Gate', 'Y = A · B', '0, 0, 0, 1', '6 Transistors'],
        ['OR Gate', 'Y = A + B', '0, 1, 1, 1', '6 Transistors'],
        ['NOT (Inverter)', 'Y = A′', '1, 0 (Single input)', '2 Transistors (1 PMOS, 1 NMOS)'],
        ['NAND Gate', 'Y = (A · B)′', '1, 1, 1, 0 (Universal)', '4 Transistors'],
        ['NOR Gate', 'Y = (A + B)′', '1, 0, 0, 0 (Universal)', '4 Transistors'],
        ['XOR Gate', 'Y = A ⊕ B = A′B + AB′', '0, 1, 1, 0 (Sum bit in Half Adder)', '8-10 Transistors'],
        ['Full Adder', 'Sum = A ⊕ B ⊕ Cin, Cout = AB + Cin(A ⊕ B)', 'Adds 3 single bits with carry propagation', '28 Transistors']
      ]
    }
  },
  {
    title: 'Data Representation: Number Systems, Two’s Complement & IEEE-754',
    subtitle: 'Binary, Octal, Hexadecimal, Fixed-Point, Floating-Point & Character Sets',
    category: 'Computer Foundations • Data Formats',
    overview:
      'All computational data—whether numeric values, program instructions, multimedia video streams, or cryptographic keys—is stored and manipulated in digital memory as sequences of binary digits (bits). Understanding exact binary representation is essential for diagnosing integer overflows, precision rounding anomalies, and byte ordering (Endianness).',
    keyPoints: [
      'Number Bases: Binary (Base-2), Octal (Base-8), Decimal (Base-10), and Hexadecimal (Base-16). Hexadecimal is the standard notation for memory addresses because each hex digit maps precisely to 4 binary bits (one nibble).',
      'Two’s Complement Signed Representation: To represent negative integers, invert all bits (One’s Complement) and add 1. A leading bit of 1 indicates negative values. Range for n bits is [-2^(n-1), 2^(n-1) - 1].',
      'Integer Overflow: Occurs when an arithmetic operation produces a value outside the representable bit range. In C++, signed integer overflow is formally Undefined Behavior (UB), while unsigned arithmetic wraps modulo 2^n.',
      'IEEE-754 Floating-Point: Represents real numbers using Sign (1 bit), Exponent (8 bits for float, 11 for double with bias 127/1023), and Mantissa/Significand (23 bits for float, 52 for double).',
      'Text Encodings: ASCII (7-bit, 128 characters), Extended ASCII (8-bit), and UTF-8 (variable-length 1 to 4 bytes per Unicode code point, backward-compatible with 7-bit ASCII).'
    ],
    callouts: [
      {
        type: 'exam',
        title: 'TWO’S COMPLEMENT ARITHMETIC EXAMPLE',
        body: 'Task: Compute -5 in an 8-bit signed integer register.\nStep 1: +5 in binary = 0000 0101\nStep 2: Invert all bits (One’s Complement) = 1111 1010\nStep 3: Add 1 to least significant bit = 1111 1011 (Hexadecimal: 0xFB).\nVerification: Add (+5) + (-5) = 0000 0101 + 1111 1011 = [1] 0000 0000 (Carry discarded, result is 0!).'
      }
    ]
  },
  {
    title: 'The Computer Memory Hierarchy: From Silicon Registers to Cloud Storage',
    subtitle: 'Registers, L1/L2/L3 SRAM Caches, DRAM Main Memory, NVMe SSDs & Locality of Reference',
    category: 'Computer Foundations • Memory Hierarchy',
    overview:
      'No single storage technology can be simultaneously ultra-fast, infinitely large, and economically cheap. Computer architects resolve this engineering dilemma through the Memory Hierarchy: small amounts of extremely fast, expensive memory close to the execution cores, backed by progressively larger, slower, and cheaper storage tiers.',
    keyPoints: [
      'Principle of Locality: Temporal Locality (recently accessed memory is likely to be accessed again soon) and Spatial Locality (memory addresses contiguous to recently accessed items are likely to be accessed soon).',
      'SRAM vs. DRAM: Static RAM (SRAM) uses 6 transistors per bit, requires no refresh, and runs at CPU clock speeds (~1ns); Dynamic RAM (DRAM) stores charge in a single transistor-capacitor pair, requires periodic electrical refreshing every 64ms, and takes ~50ns to access.',
      'Cache Hit vs. Cache Miss: Cache hits deliver data within 1-4 CPU cycles; cache misses require stalling the core to retrieve entire 64-byte cache lines from L2, L3, or main system DRAM.',
      'Storage Technologies: NAND Flash SSDs read data electronically without moving mechanical arms, providing 5,000 MB/s transfer speeds over NVMe PCIe Gen4/5 buses, compared to mechanical 7200 RPM HDDs (~150 MB/s).'
    ],
    tableData: {
      headers: ['Hierarchy Tier', 'Typical Capacity', 'Access Latency (ns)', 'Clock Cycles', 'Hardware Technology'],
      colWidths: [38, 38, 38, 34, 34],
      rows: [
        ['Level 0: Registers', '1 - 2 KB (32-64 regs)', '0.3 - 0.5 ns', '1 Cycle', 'Static Flip-Flops in CPU core'],
        ['Level 1 Cache (L1)', '32 - 64 KB per core', '0.9 - 1.2 ns', '4 - 5 Cycles', '6T SRAM on-die (Split I/D)'],
        ['Level 2 Cache (L2)', '512 KB - 2 MB per core', '3 - 5 ns', '12 - 14 Cycles', 'SRAM on-die'],
        ['Level 3 Cache (L3)', '16 - 96 MB Shared', '10 - 20 ns', '35 - 50 Cycles', 'Dense SRAM / 3D V-Cache'],
        ['Main Memory (RAM)', '16 - 128 GB', '50 - 80 ns', '200 - 300 Cycles', 'DDR4 / DDR5 Synchronous DRAM'],
        ['Solid State Drive (NVMe)', '512 GB - 4 TB', '10,000 - 50,000 ns', '50,000+ Cycles', '3D TLC/QLC NAND Flash'],
        ['Mechanical Hard Drive', '2 TB - 24 TB', '10,000,000 ns (10ms)', '25,000,000 Cycles', 'Rotating Magnetic Platters']
      ]
    }
  },
  {
    title: 'Classification of Computers: From Embedded Microcontrollers to Supercomputers',
    subtitle: 'Microcontrollers, Microcomputers, Workstations, Mainframes, Supercomputing & Cloud Clusters',
    category: 'Computer Foundations • Systems Taxonomy',
    overview:
      'Computers are classified according to computational throughput, memory capacity, physical scale, power consumption, and domain-specific architectural optimizations. Computing spans tiny sub-milliwatt embedded systems up to warehouse-scale exascale supercomputers consuming tens of megawatts.',
    keyPoints: [
      'Embedded Systems & Microcontrollers: Self-contained chips integrating CPU, flash ROM, SRAM, and I/O peripherals (e.g., ARM Cortex-M, AVR, ESP32) designed for real-time deterministic control in automotive, medical, and aerospace systems.',
      'Microcomputers (Personal Computers): Desktops, laptops, tablets, and smartphones powered by CISC (x86-64) or RISC (ARM64) processors designed for multi-tasking interactive productivity.',
      'Workstations & Enterprise Servers: High-reliability computers featuring ECC (Error-Correcting Code) memory, multi-socket processors, and redundant hot-swappable power supplies for continuous 24/7 service.',
      'Mainframe Computers: High-availability enterprise systems (e.g., IBM z16) engineered for massive I/O bandwidth, processing trillions of secure banking transactions with 99.999% uptime.',
      'Supercomputers & High-Performance Computing (HPC): Massive parallel arrays of tens of thousands of CPUs and GPU accelerators connected via high-bandwidth InfiniBand fabrics, measured in FLOPS (Floating-Point Operations Per Second).'
    ],
    callouts: [
      {
        type: 'concept',
        title: 'THE EXASCALE SUPERCOMPUTING MILESTONE',
        body: 'In 2022, the Frontier supercomputer at Oak Ridge National Laboratory achieved true Exascale performance: over 1.1 ExaFLOPS (1.1 × 10^18 floating-point calculations per second). Exascale systems simulate molecular dynamics, climate forecasts, nuclear physics, and massive neural network training architectures across 8.7 million unified compute cores.'
      }
    ]
  },
  {
    title: 'The Five Generations of Computers: Silicon Evolution & The Future',
    subtitle: 'From Vacuum Tubes & Transistors to Microprocessors, NPUs & Quantum Qubits',
    category: 'Computer Foundations • Historical Evolution',
    overview:
      'The historical evolution of modern computing is classified into five distinct hardware generations, each demarcated by a fundamental breakthrough in underlying physical switching mechanisms, operating voltages, and programming paradigms.',
    keyPoints: [
      '1st Generation (1940-1956): Vacuum Tubes. Massive room-sized machines (ENIAC, UNIVAC I, EDVAC), consuming kilowatts of power, relying on magnetic drum memory, programmed purely in binary machine code.',
      '2nd Generation (1956-1963): Transistors. Invention of the bipolar junction transistor at Bell Labs (Shockley, Bardeen, Brattain) replaced fragile vacuum tubes, enabling magnetic core memory, FORTRAN, COBOL, and assembly languages.',
      '3rd Generation (1964-1971): Integrated Circuits (ICs). Jack Kilby and Robert Noyce fabricated multiple transistors on a single silicon chip; introduced operating systems, time-sharing, and the IBM System/360 architecture.',
      '4th Generation (1971-Present): Microprocessors & VLSI. The Intel 4004 (1971) placed an entire CPU on one chip; evolved into Very Large Scale Integration (VLSI) with billions of transistors, personal computers, GPUs, and the global Internet.',
      '5th Generation (Present & Emerging): Artificial Intelligence & Quantum Computing. Neuromorphic architectures, TPUs/NPUs for tensor matrix multiplication, and Quantum Computers utilizing superposition and entanglement to solve discrete optimization problems exponentially faster than classical Turing machines.'
    ],
    tableData: {
      headers: ['Generation', 'Era / Years', 'Core Switching Hardware', 'Primary Memory Storage', 'Dominant Programming Language'],
      colWidths: [30, 32, 45, 42, 33],
      rows: [
        ['1st Generation', '1940 - 1956', 'Thermionic Vacuum Tubes', 'Magnetic Drums, Williams Tubes', 'Machine Language (Binary)'],
        ['2nd Generation', '1956 - 1963', 'Discrete Silicon Transistors', 'Magnetic Core Memory', 'Assembly, Early FORTRAN & COBOL'],
        ['3rd Generation', '1964 - 1971', 'Integrated Circuits (SSI & MSI)', 'Magnetic Core & Early Semiconductor', 'ALGOL 60, BASIC, PL/I, CPL'],
        ['4th Generation', '1971 - Present', 'VLSI & ULSI Microprocessors', 'Semiconductor DRAM & NAND Flash', 'C, C++, Java, Python, Rust, Go'],
        ['5th Generation', 'Present & Future', 'AI Tensor NPUs & Superconducting Qubits', '3D Stacked HBM3e & Quantum States', 'Q#, Python PyTorch, Mojo, Julia']
      ]
    }
  }
];

/**
 * Chapter 0.2: What is CPL? History & Lineage (8 In-depth Sections)
 */
export const whatIsCplSections: FoundationsTopic[] = [
  {
    title: 'What is CPL? (Combined Programming Language) - History & Genesis',
    subtitle: 'The 1963 Cambridge & London Systems Language Revolution',
    category: 'Language History • CPL',
    overview:
      'CPL (Combined Programming Language, initially named Cambridge Programming Language) was a multi-institutional, ambitious systems and academic programming language developed jointly in 1962–1963 by the University of Cambridge Mathematical Laboratory (led by Christopher Strachey and David Barron) and the University of London Computer Unit. Developed specifically for the Titan Computer (an experimental Atlas 2 computer) at Cambridge and the Ferranti Atlas at London, CPL was conceived to bridge theoretical computer science with bare-metal operating system construction.',
    keyPoints: [
      'Institutional Authorship: Conceived by Christopher Strachey (one of the founding fathers of denotational semantics) alongside David Barron, Eric Nixon, and David Wheeler.',
      'The Grand Design Goal: In 1963, programmers were forced to choose between mathematical languages (like ALGOL 60), which lacked bit-level and hardware control, or raw Assembly, which lacked abstraction. CPL was engineered to combine the mathematical elegance of ALGOL with the low-level efficiency needed to write an entire operating system.',
      'Combined Name Etymology: Originally "Cambridge Programming Language", it was formally renamed "Combined Programming Language" when London University officially partnered on its compiler design.',
      'Seminal Historical Status: CPL is the direct grand-ancestor of BCPL, B, C, C++, Java, C#, and modern systems programming languages.'
    ],
    callouts: [
      {
        type: 'concept',
        title: 'CHRISTOPHER STRACHEY’S VISION FOR CPL',
        body: 'Christopher Strachey sought to build a language expressive enough to describe both high-level algorithmic processes (like matrix algebra and symbolic list processing) and low-level hardware interactions (such as word-level bit shifting, direct address dereferencing, and hardware interrupt dispatch). This ambition laid the foundation for the next 60 years of computer systems engineering.'
      }
    ]
  },
  {
    title: 'Revolutionary Computer Science Concepts Pioneered in CPL',
    subtitle: 'Commands vs. Expressions, Polymorphic Types & First-Class Functions',
    category: 'Language History • CPL Innovations',
    overview:
      'Despite the immense challenge of constructing a compiler on early 1960s hardware, CPL introduced fundamental computational abstractions that were decades ahead of its time and remain standard in modern language design today.',
    keyPoints: [
      '1. Commands vs. Expressions: CPL was the first major language to make a strict theoretical distinction between "Commands" (statements executed solely for their side effects, such as mutating memory) and "Expressions" (mathematical constructs evaluated strictly to produce a value without side effects).',
      '2. Polymorphic and Abstract Types: CPL featured an advanced type system supporting integers, reals, booleans, labels, pointers, and user-defined records, alongside polymorphic functions that could operate on multiple data types.',
      '3. First-Class Functions: Functions in CPL were first-class citizens: they could be passed as arguments to other routines, returned from expressions, and assigned to variables.',
      '4. Complex Pattern Assignment: CPL supported simultaneous multiple assignment (e.g., a, b := b, a for instantaneous variable swap), a construct later popularized by Python and Go.'
    ],
    codeListing: {
      language: 'CPL (Historical Reconstruction)',
      title: 'Factorial & Simultaneous Assignment in CPL (1963)',
      code: `/* CPL Factorial Procedure Definition (1963) */
let rec Fact(n) = (n = 0) -> 1, n * Fact(n - 1)

/* Multiple Assignment in CPL */
let Swap(x, y) = 
§
   x, y := y, x
§

/* Conditional Expression syntax */
let Abs(x) = (x < 0) -> -x, x`,
      explanation:
        'Notice the ternary-style conditional expression `(n = 0) -> 1, n * Fact(n - 1)`. CPL introduced block delimiters using section markers (§ ... §), which Martin Richards later replaced with curly braces { ... } in BCPL, forever standardizing modern C-style syntax!'
    }
  },
  {
    title: 'Why CPL Failed Commercially: The Compiler Construction Crisis',
    subtitle: 'Algorithmic Complexity Outpacing 1960s Mainframe Hardware Capabilities',
    category: 'Language History • Compiler Engineering',
    overview:
      'While CPL was conceptually brilliant, it suffered from a classic software engineering dilemma: it was far too large and semantically complex for the computing hardware of the early 1960s. Memory was measured in tens of thousands of words, and compiler technology was still in its infancy.',
    keyPoints: [
      'Hardware Constraints: The Titan computer had severely limited primary memory. A full CPL compiler required extensive multi-pass parsing, complex type inference tables, and dynamic runtime runtime stacks that exceeded memory budgets.',
      'Specification Bloat: Christopher Strachey and the committee continuously expanded the language specification with theoretical concepts, delaying compiler completion for years.',
      'The "London-Cambridge Bottleneck": Developing the compiler collaboratively between two universities across physical distance with punch cards and slow courier runs caused severe integration delays.',
      'The Catalytic Lesson: The failure to produce a compact, fast CPL compiler directly inspired Martin Richards in 1967 to build a radical simplification: BCPL.'
    ],
    callouts: [
      {
        type: 'tip',
        title: 'SOFTWARE ARCHITECTURE LESSON',
        body: 'The story of CPL is taught in software engineering as an early example of "Second-System Effect" (described by Fred Brooks in The Mythical Man-Month): an overly ambitious design attempting to solve every conceivable problem simultaneously, collapsing under the weight of its own specification.'
      }
    ]
  },
  {
    title: 'Martin Richards & BCPL: The Radical Simplification of CPL',
    subtitle: 'The Invention of Untyped Word-Based Memory & The O-Code Virtual Machine',
    category: 'Language History • BCPL',
    overview:
      'In 1967, while visiting MIT from the University of Cambridge, Martin Richards recognized that CPL’s immense complexity was paralyzing its adoption. Richards created BCPL (Basic Combined Programming Language) by stripping away CPL’s elaborate type system, keeping only its elegant control structures, and treating all data as a single fundamental unit: the machine word.',
    keyPoints: [
      'The Untyped Philosophy: In BCPL, there are no ints, floats, or chars—everything is simply a machine word (e.g., 16-bit or 36-bit binary integer). A word could represent a number, an ASCII character, an array base address, or a function pointer, depending entirely on the operators applied to it.',
      'The O-Code Revolution: Martin Richards invented "O-code", an intermediate, stack-based bytecode virtual machine. The BCPL compiler compiled source code to O-code; porting BCPL to a brand-new computer architecture required only writing a small, simple 500-line O-code interpreter!',
      'Introduction of Curly Braces: BCPL replaced CPL’s section brackets (§ ... §) with $( ... $) and eventually { ... }, establishing the syntactic visual signature of all future C-family languages.',
      'Direct Successor: BCPL was used to write the entire Tripos operating system at Cambridge and later influenced Ken Thompson at Bell Labs.'
    ],
    codeListing: {
      language: 'BCPL (1967)',
      title: 'Hello World & Memory Indirection in BCPL',
      code: `// BCPL Hello World Routine (1967)
GET "libhdr"

LET start() = VALOF
$(
    writes("Hello, World from BCPL!*N")
    
    // Word allocation and pointer indirection using '!' operator
    LET v = VEC 5
    v!0 := 100
    v!1 := 200
    writef("v!0 = %n, v!1 = %n*N", v!0, v!1)
    
    RESULTIS 0
$)`,
      explanation:
        'In BCPL, `v!i` represents vector indirection: *(v + i). Dennis Ritchie later adopted this exact mathematical duality in C: `v[i]` is defined identically to `*(v + i)`!'
    }
  },
  {
    title: 'Ken Thompson, Bell Labs & The Genesis of the B Language',
    subtitle: 'Porting BCPL to the 8KB PDP-7 & Writing the First UNIX Operating System',
    category: 'Language History • B Language',
    overview:
      'In 1969 at Bell Telephone Laboratories, Ken Thompson and Dennis Ritchie began developing the UNIX operating system on a discarded Digital Equipment Corporation (DEC) PDP-7 minicomputer equipped with only 8 Kilobytes of core memory. Thompson wanted a high-level programming language to replace assembly, but BCPL was still too large to run comfortably in 8KB.',
    keyPoints: [
      'Stripping Down BCPL: Thompson distilled BCPL even further, discarding everything that could not fit into the PDP-7’s memory, creating the language simply called "B" (named either after BCPL or Thompson’s wife, Bonnie).',
      'The B Syntax: Thompson introduced the concise operators that programmers use today: the `++` and `--` increment/decrement operators (which matched the PDP-7 hardware auto-increment address registers), composite assignment operators (`+=`, `-=`), and minimalist keywords.',
      'Word-Based Memory in B: Like BCPL, B was completely typeless. Every variable occupied exactly one 16-bit PDP-7 memory word. Memory pointers were word addresses rather than byte addresses.',
      'The Fatal Limitation of B: When Bell Labs acquired a DEC PDP-11 in 1970, the hardware supported 8-bit byte addressing. B’s untyped word-based model struggled to handle 8-bit ASCII characters without expensive bit-shifting, exposing the critical need for data types.'
    ],
    callouts: [
      {
        type: 'architecture',
        title: 'THE PDP-7 TO PDP-11 TRANSITION THAT BIRTHED C',
        body: 'PDP-7 (Word-addressed 18-bit machine) -> B Language fit perfectly.\nPDP-11 (Byte-addressed 16-bit machine with 8-bit bytes) -> B language could not efficiently index individual character bytes without manual pointer shifting. Dennis Ritchie recognized that hardware had evolved from word-oriented mainframes to byte-oriented minicomputers, requiring a language with explicit data types (char, int).'
      }
    ]
  },
  {
    title: 'Dennis Ritchie & The Birth of C: Restoring Types & Pointers',
    subtitle: 'From B to New-B to C (1972) on the PDP-11: The Foundation of Modern Software',
    category: 'Language History • C Language',
    overview:
      'Between 1971 and 1973, Dennis Ritchie transformed B into "New B" and finally into the "C" programming language. Ritchie restored data types (which had been discarded in the transition from CPL to BCPL) but kept them tightly coupled to machine hardware representations.',
    keyPoints: [
      'The Addition of Data Types: Ritchie introduced `char` (8-bit byte), `int` (16-bit or 32-bit machine word), `float`, `double`, and composite `struct` aggregates.',
      'Typed Pointer Arithmetic: In C, adding 1 to a pointer increments its memory address not by 1 byte, but by `sizeof(*ptr)` bytes. This brilliant insight unified pointer arithmetic with hardware byte addressing.',
      'Rewriting UNIX in C (1973): In a revolutionary move for computing history, Thompson and Ritchie rewrote the entire UNIX kernel in C. Prior to this, operating systems were universally considered too performance-critical to be written in anything other than raw assembly language.',
      'The Legacy: C proved that high-level portable languages could achieve bare-metal assembly performance. Today, Linux, Windows, macOS, iOS, Android, and all major relational database engines run on C/C++.'
    ],
    tableData: {
      headers: ['Historical Attribute', 'CPL (1963)', 'BCPL (1967)', 'B (1969)', 'C (1972)', 'C++ (1985)'],
      colWidths: [38, 35, 35, 34, 40],
      rows: [
        ['Lead Designers', 'C. Strachey, D. Barron', 'Martin Richards', 'Ken Thompson', 'Dennis Ritchie', 'Bjarne Stroustrup'],
        ['Primary Institution', 'Cambridge / London', 'Cambridge University', 'Bell Labs (Murray Hill)', 'Bell Labs', 'Bell Labs'],
        ['Type Philosophy', 'Polymorphic & Typed', 'Completely Untyped Word', 'Completely Untyped Word', 'Statically Typed (char, int)', 'Static, Strong, OOP Classes'],
        ['Primary Target', 'Titan (Atlas 2)', 'Compatible Time-Sharing', 'DEC PDP-7 (8KB)', 'DEC PDP-11', 'Universal Microprocessors'],
        ['Block Syntax', 'Section markers (§ ... §)', 'Brackets $( ... $)', 'Braces { ... }', 'Braces { ... }', 'Braces { ... }'],
        ['Pointers & Indirection', 'Explicit typed addresses', 'Vector ! operator (v!i)', 'Vector * indirection', 'Typed *ptr and ptr[i]', 'Smart pointers, References &']
      ]
    }
  },
  {
    title: 'Bjarne Stroustrup & C++: Zero-Cost Abstractions & Object-Oriented Power',
    subtitle: 'From "C with Classes" (1979) to Modern ISO C++23: Compiling High-Level Paradigms',
    category: 'Language History • C++ Evolution',
    overview:
      'In 1979 at Bell Labs, Danish computer scientist Bjarne Stroustrup began working on "C with Classes", which was officially released as C++ in 1985. Stroustrup wanted the simulation abstractions of Simula 67 combined with the uncompromising raw performance and memory control of Dennis Ritchie’s C.',
    keyPoints: [
      'The Zero-Overhead Principle: "What you don’t use, you don’t pay for; and what you do use, you couldn’t hand-code any better in assembly." C++ features like virtual functions, templates, and inline functions were engineered with zero unnecessary runtime penalty.',
      'RAII (Resource Acquisition Is Initialization): Destructors run automatically when objects exit scope, guaranteeing deterministic resource management (closing files, releasing locks, freeing memory) without garbage collection pauses.',
      'Templates & Generic Programming: Alexander Stepanov formulated the Standard Template Library (STL), proving that data structures (vector, map) and algorithms (sort, search) could be completely decoupled with compile-time polymorphism.',
      'Modern C++ Evolution: C++11 (move semantics, lambdas, auto), C++17 (filesystem, structured bindings), C++20 (Concepts, Ranges, Coroutines, Modules), and C++23.'
    ],
    callouts: [
      {
        type: 'concept',
        title: 'THE COMPLETE SYSTEMIC GENEALOGY',
        body: 'CPL (1963) -> BCPL (1967) -> B (1969) -> C (1972) -> C++ (1985) -> Modern Systems Architecture\nEvery line of code written in modern C, C++, Java, C#, Go, or Rust traces its grammatical lineage, semicolon terminators, curly braces, and operational precedence back to this evolutionary chain originating in 1963 with Christopher Strachey and CPL.'
      }
    ]
  },
  {
    title: 'The Modern Descendants: How the CPL/C Lineage Governs Modern Tech',
    subtitle: 'Rust, Go, Swift, Java, C# & The Contemporary Systems Programming Landscape',
    category: 'Language History • Modern Ecosystem',
    overview:
      'The philosophical tension that started with CPL—balancing developer productivity and expressive abstraction against hardware control and memory performance—remains the central driving dynamic in modern computer science.',
    keyPoints: [
      'Rust (Mozilla, Graydon Hoare): Solves C/C++’s historic vulnerability (memory corruption and data races) by replacing manual pointers with a compile-time Borrow Checker enforcing single-ownership and affine types with zero garbage collection overhead.',
      'Go (Google, Ken Thompson & Rob Pike): Ken Thompson returned to language design in 2009 to create Go, prioritizing ultra-fast compilation, built-in CSP concurrency (goroutines and channels), and memory safety for cloud microservices.',
      'Java & C#: Adopted C++ syntax while introducing virtual machines (JVM and CLR) with automatic generational garbage collection, dominating enterprise backends and mobile platforms (Android).',
      'The Enduring Dominance of C/C++: Despite newer languages, operating system kernels (Linux, Windows), browser engines (V8, WebKit, Gecko), game engines (Unreal Engine), and AI runtime engines (PyTorch, TensorFlow, CUDA) remain overwhelmingly implemented in C and C++.'
    ],
    callouts: [
      {
        type: 'exam',
        title: 'COMPREHENSIVE SYSTEMS ESSAY TOPIC',
        body: 'Trace the technological chain from CPL in 1963 to modern Rust in 2026.\nModel Key Points: (1) CPL pioneered the ambition of high-level systems programming; (2) BCPL simplified it to word-based machine memory; (3) B adapted it to minimal minicomputers; (4) C added structured hardware byte typing; (5) C++ added deterministic object lifecycles (RAII); (6) Rust eliminated temporal memory vulnerabilities (use-after-free, double-free) through formal compile-time affine type ownership.'
      }
    ]
  }
];

/**
 * Chapter 0.3: What is Programming & Algorithmic Theory (6 In-depth Sections)
 */
export const whatIsProgrammingSections: FoundationsTopic[] = [
  {
    title: 'What is Programming? The Rigorous Craft of Computational Problem Solving',
    subtitle: 'From Mathematical Specification to Executable Information Processing',
    category: 'Programming Theory • Definition',
    overview:
      'Computer programming is the rigorous science and disciplined engineering practice of designing, constructing, and verifying an executable sequence of instructions that causes an automated computational system to perform an intended information processing task or solve an abstract mathematical problem.',
    keyPoints: [
      'Programming is Not Merely Coding: Coding is the mechanical act of transcribing a solution into a specific programming language syntax. Programming encompasses problem analysis, boundary condition identification, computational modeling, complexity optimization, and correctness verification.',
      'Abstraction & Decomposition: Complex real-world systems are mastered by decomposing monolithic problems into hierarchical, decoupled sub-problems with clear interface contracts.',
      'Syntax vs. Semantics: Syntax governs the grammatical rules of tokens in a language (detected at compile time); Semantics governs the operational meaning and runtime behavior of the instructions.',
      'The Five Fundamental Properties of Algorithms: Finiteness (must terminate), Definiteness (each step unambiguous), Input (zero or more inputs), Output (one or more outputs), and Effectiveness (steps feasible on physical hardware).'
    ],
    callouts: [
      {
        type: 'concept',
        title: 'NIKLAUS WIRTH’S FAMOUS FORMULA',
        body: 'Algorithms + Data Structures = Programs (Niklaus Wirth, 1976).\nA program is fundamentally the synthesis of an organized structural representation of information (Data Structure) and a deterministic operational procedure for transforming that information (Algorithm).'
      }
    ]
  },
  {
    title: 'The Seven Phases of the Software Development Lifecycle (SDLC)',
    subtitle: 'Analysis, Design, Flowcharting, Implementation, Verification, Profiling & Maintenance',
    category: 'Programming Theory • Lifecycle',
    overview:
      'Engineering reliable software requires adhering to a structured procedural pipeline that transforms ambiguous human requirements into formally verified, high-performance machine code.',
    keyPoints: [
      '1. Problem Analysis & Specification: Formulating unambiguous inputs, expected outputs, invariants, constraints, and edge cases.',
      '2. Mathematical & Algorithmic Design: Selecting appropriate data representations (e.g., hash maps vs. balanced trees) and calculating asymptotic bounds.',
      '3. Visual Flowcharting & Structured Pseudocode: Mapping execution control flow and state transitions independently of language syntax.',
      '4. Implementation (Coding): Writing idiomatic, clean, modular code adhering to styling standards and SOLID design principles.',
      '5. Verification & Testing: Unit tests, integration tests, boundary-value analysis, and property-based automated testing.',
      '6. Profiling & Performance Tuning: Benchmarking CPU instruction counts, cache misses, memory allocations, and eliminating hot-path bottlenecks.',
      '7. Maintenance & Documentation: Refactoring code, patching vulnerabilities, and maintaining comprehensive technical documentation.'
    ],
    tableData: {
      headers: ['Phase', 'Primary Engineering Deliverable', 'Common Pitfalls', 'Industry Best Practice'],
      colWidths: [38, 48, 48, 46],
      rows: [
        ['1. Requirements', 'Software Requirements Specification (SRS)', 'Ambiguous or shifting scope', 'Formal use-case modeling & acceptance tests'],
        ['2. Architecture', 'UML Class Diagrams & API Schema', 'Premature optimization, coupling', 'Decoupled interfaces, modular decomposition'],
        ['3. Pseudocode', 'Language-agnostic algorithmic logic', 'Missing termination conditions', 'Step-by-step invariant tracing with dry-runs'],
        ['4. Coding', 'Production-ready source repository', 'Magic numbers, spaghetti branching', 'Clean Code, Static Analysis (Clang-Tidy, ESLint)'],
        ['5. Testing', 'Automated Test Suite (100% core coverage)', 'Testing only happy path', 'Test-Driven Development (TDD), Fuzz testing'],
        ['6. Deployment', 'CI/CD Pipeline & Docker Images', 'Environment configuration drift', 'Infrastructure as Code (IaC), GitOps']
      ]
    }
  },
  {
    title: 'The Böhm-Jacopini Structured Programming Theorem',
    subtitle: 'Sequence, Selection, Iteration & The Elimination of Spaghetti Goto Code',
    category: 'Programming Theory • Control Flow',
    overview:
      'In 1966, mathematicians Corrado Böhm and Giuseppe Jacopini published a landmark theoretical proof that revolutionized software design: any computable function can be expressed using only three elementary control structures: Sequence, Selection (if-then-else), and Iteration (while loops).',
    keyPoints: [
      '1. Sequence: Executing statements in consecutive linear order, one after another.',
      '2. Selection: Conditionally branching execution down one of two or more distinct paths based on a Boolean predicate.',
      '3. Iteration: Repeating a block of statements while a specified loop invariant condition remains true.',
      'Dijkstra’s Landmark Paper: In 1968, Edsger W. Dijkstra published "Go To Statement Considered Harmful", demonstrating that unrestricted `goto` statements created tangled "spaghetti code" that made mathematical reasoning about program correctness virtually impossible.',
      'Single-Entry, Single-Exit (SESE): Modern structured programming requires that functions and control blocks have predictable single points of entry and exit, enabling automated compiler optimizations and clean stack unwinding.'
    ],
    callouts: [
      {
        type: 'exam',
        title: 'BÖHM-JACOPINI THEOREM EXAM PRINCIPLE',
        body: 'Why was the Böhm-Jacopini theorem critical for modern compiler design?\nAnswer: Because compilers rely on structured control-flow graphs (CFGs) with clearly bounded loops to perform advanced static optimizations such as loop unrolling, loop-invariant code motion (LICM), dead code elimination, and auto-vectorization (SIMD). Unstructured jumps destroy reducible flow graphs and hinder optimization.'
      }
    ]
  },
  {
    title: 'Recursion vs. Iteration: Memory Call Stacks & Tail-Call Optimization',
    subtitle: 'Activation Records, Stack Frames, Base Cases, Recurrence Trees & Space Complexity',
    category: 'Programming Theory • Execution Models',
    overview:
      'Recursion and iteration are dual mechanisms for performing repetitive computation. While iteration repeats statements via looping constructs, recursion solves problems by having a function invoke itself with smaller sub-instances of the same problem until reaching a terminating base case.',
    keyPoints: [
      'The Call Stack Mechanism: Each recursive call pushes a new Activation Record (Stack Frame) onto the call stack containing local variables, parameters, and the return address. Unbounded recursion causes Stack Overflow when stack memory limits are exceeded.',
      'The Two Inviolable Rules of Recursion: (1) Every recursive function must have at least one well-defined Base Case; (2) Every recursive call must make measurable progress toward the base case.',
      'Recurrence Relations & Master Theorem: The runtime of divide-and-conquer algorithms is analyzed mathematically using recurrence equations: T(n) = a·T(n/b) + f(n).',
      'Tail-Call Optimization (TCO): If a recursive call is the absolute final operation executed by a function (a tail call), modern compilers can overwrite the current stack frame rather than pushing a new one, converting recursion into O(1) auxiliary space iteration!'
    ],
    codeListing: {
      language: 'C++',
      title: 'Standard Recursion vs. Tail-Call Optimization (TCO)',
      code: `// Standard Non-Tail Recursive Factorial (O(N) Stack Space)
int factStandard(int n) {
    if (n <= 1) return 1;
    return n * factStandard(n - 1); // Multiplies AFTER recursive call returns!
}

// Tail-Call Optimized Factorial (O(1) Stack Space under -O2)
int factTail(int n, int accumulator = 1) {
    if (n <= 1) return accumulator;
    return factTail(n - 1, n * accumulator); // Tail call: compiler turns this into a loop!
}`,
      explanation:
        'In `factStandard`, the multiplication `n * ...` cannot occur until `factStandard(n-1)` finishes, requiring O(n) active stack frames. In `factTail`, the result is accumulated into a parameter, allowing the compiler to optimize the call into a simple jump, eliminating stack overhead.'
    }
  },
  {
    title: 'Program Correctness: Pre-conditions, Post-conditions & Loop Invariants',
    subtitle: 'Hoare Logic, Formal Verification & Proving Algorithm Correctness',
    category: 'Programming Theory • Formal Methods',
    overview:
      'Testing can demonstrate the presence of software bugs, but it can never prove their total absence. Computer scientists use formal mathematical logic—pioneered by Sir Tony Hoare in 1969 (Hoare Logic)—to rigorously prove that an algorithm will behave correctly for every conceivable input.',
    keyPoints: [
      'Hoare Triples: Formatted as {P} C {Q}, meaning: if pre-condition P is true before executing code C, then post-condition Q will be guaranteed true upon termination.',
      'Pre-Conditions: Mandatory assertions and constraints on inputs that the calling client must satisfy prior to function invocation.',
      'Post-Conditions: Guarantees and state changes that the function pledges to deliver upon successful completion.',
      'Loop Invariants: A mathematical predicate that is true: (1) Prior to the first loop iteration (Initialization); (2) Maintained true from iteration to iteration (Maintenance); and (3) Upon loop termination, provides the exact property needed to prove the algorithm’s correctness (Termination).'
    ],
    callouts: [
      {
        type: 'exam',
        title: 'LOOP INVARIANT PROOF OF BINARY SEARCH',
        body: 'Invariant: If the target value exists in the sorted array A, it must be located within the subarray A[low ... high].\n1. Initialization: Prior to loop, low = 0, high = n - 1. The target is guaranteed in A[0 ... n-1] if present.\n2. Maintenance: In each iteration, mid = (low + high) / 2. If A[mid] < target, target must be in right half (low = mid + 1). If A[mid] > target, target must be in left half (high = mid - 1). The invariant is preserved.\n3. Termination: Loop terminates when low > high (element does not exist) or A[mid] == target (element found). Correctness is proven!'
      }
    ]
  },
  {
    title: 'Foundations of Computational Complexity: Time, Space & Asymptotics',
    subtitle: 'Big-O, Big-Omega, Big-Theta, Little-o & The Hierarchy of Complexity Classes',
    category: 'Programming Theory • Complexity',
    overview:
      'Computational complexity classifies algorithms according to the amount of physical resources (time and memory) required to execute them as a function of the input size n, independent of specific hardware clock speeds or programming languages.',
    keyPoints: [
      'Big-O Notation (O): Asymptotic upper bound. f(n) = O(g(n)) if there exist positive constants c and n0 such that 0 ≤ f(n) ≤ c·g(n) for all n ≥ n0. Represents worst-case behavior.',
      'Big-Omega Notation (Ω): Asymptotic lower bound. f(n) = Ω(g(n)) if 0 ≤ c·g(n) ≤ f(n) for all n ≥ n0. Represents best-case behavior.',
      'Big-Theta Notation (Θ): Asymptotically tight bound. f(n) = Θ(g(n)) if and only if f(n) = O(g(n)) and f(n) = Ω(g(n)).',
      'The Complexity Hierarchy: O(1) < O(log n) < O(n) < O(n log n) < O(n^2) < O(n^3) < O(2^n) < O(n!). Polynomial time algorithms (P) are considered tractably solvable; exponential algorithms are computationally intractable for large n.'
    ],
    tableData: {
      headers: ['Complexity Class', 'Common Name', 'Operations for n = 1,000', 'Example Algorithm'],
      colWidths: [40, 42, 50, 48],
      rows: [
        ['O(1)', 'Constant Time', '1 operation (Instantaneous)', 'Array indexing, Hash map lookup'],
        ['O(log n)', 'Logarithmic Time', '≈ 10 operations', 'Binary search, BST search'],
        ['O(n)', 'Linear Time', '1,000 operations', 'Linear scan, array summation'],
        ['O(n log n)', 'Linearithmic Time', '≈ 10,000 operations', 'Merge Sort, Heap Sort, Quick Sort (avg)'],
        ['O(n^2)', 'Quadratic Time', '1,000,000 operations', 'Bubble Sort, Insertion Sort, Nested loops'],
        ['O(2^n)', 'Exponential Time', '1.07 × 10^301 (Untractable)', 'Recursive Fibonacci, Traveling Salesperson (brute)']
      ]
    }
  }
];

/**
 * Chapter 0.4: Taxonomy & Evolution of Programming Languages (8 In-depth Sections)
 */
export const whatAreLanguagesSections: FoundationsTopic[] = [
  {
    title: 'The Spectrum of Programming Languages: From Low-Level to Domain-Specific',
    subtitle: 'Machine Code, Assembly Mnemonics, High-Level Systems & Declarative 4GLs',
    category: 'Programming Languages • Taxonomy',
    overview:
      'Programming languages occupy a spectrum of abstraction between the physical silicon hardware and human conceptual thought. As abstraction increases, programmer productivity and safety improve, while low-level hardware control is abstracted behind compiler automation.',
    keyPoints: [
      '1st Generation (1GL) - Machine Language: Raw binary instructions (e.g., 01001000 10001001) executed directly by CPU hardware logic without translation. Completely architecture-dependent and error-prone.',
      '2nd Generation (2GL) - Assembly Language: Symbolic mnemonics (MOV, ADD, SUB, JMP) mapped 1:1 to machine code instructions. Translated by an Assembler, enabling symbolic register and label references.',
      '3rd Generation (3GL) - High-Level Procedural & OOP: Hardware-independent, English-like syntax (C, C++, Java, Python). Compilers translate high-level statements into architecture-specific machine instructions.',
      '4th Generation (4GL) - Declarative & Domain-Specific (DSLs): Users specify WHAT result is desired rather than HOW to compute it step-by-step (SQL for databases, CSS for styling, LaTeX for typesetting).',
      '5th Generation (5GL) - Constraint & Logic Programming: Programs consist of mathematical constraints and logical assertions solved by automated inference engines (Prolog, constraint satisfaction).'
    ],
    callouts: [
      {
        type: 'concept',
        title: 'THE ABSTRACTION TRADEOFF',
        body: 'Low Abstraction (Assembly/C): Maximum hardware control, microsecond latency predictability, zero runtime overhead, but high cognitive burden and manual memory vulnerability risk.\nHigh Abstraction (Python/Haskell): High developer velocity, automated safety, mathematical elegance, but potential performance penalties from runtime interpretation, garbage collection, and indirect pointer lookups.'
      }
    ]
  },
  {
    title: 'Major Programming Paradigms: Imperative, Object-Oriented, Functional & Logic',
    subtitle: 'State Mutation vs. Pure Functions, Class Inheritance vs. Referential Transparency',
    category: 'Programming Languages • Paradigms',
    overview:
      'A programming paradigm is a fundamental architectural style and mental model for structuring computational execution. Modern software engineering embraces multi-paradigm programming, applying the optimal paradigm to each subsystem.',
    keyPoints: [
      'Imperative / Procedural Paradigm: Programs are modeled as sequences of explicit commands that mutate global and local state. Structured into procedures and functions (C, Pascal, Fortran).',
      'Object-Oriented Paradigm (OOP): Programs are structured as collaborating objects containing encapsulated private state (fields) and methods. Governed by 4 pillars: Abstraction, Encapsulation, Inheritance, and Polymorphism (Java, C++, C#).',
      'Functional Programming (FP): Computation is treated as the evaluation of mathematical functions, strictly avoiding mutable state and side effects. Emphasizes pure functions, immutability, first-class functions, and higher-order functions (Haskell, Lisp, OCaml, Clojure).',
      'Declarative & Logic Paradigm: Defines relationships, facts, and inference rules. The runtime engine searches the solution space via unification and backtracking (SQL, Prolog).'
    ],
    tableData: {
      headers: ['Paradigm', 'Core Philosophical Tenet', 'State Handling', 'Primary Languages', 'Key Strength'],
      colWidths: [35, 45, 40, 38, 42],
      rows: [
        ['Procedural', 'Step-by-step algorithms & functions', 'Explicit mutable state', 'C, Pascal, Fortran', 'Direct hardware mapping, simplicity'],
        ['Object-Oriented', 'Encapsulated data & behaviors', 'State tied to object instances', 'Java, C++, C#, Python', 'Large enterprise system modeling'],
        ['Functional', 'Pure mathematical transformations', 'Immutable (No side effects)', 'Haskell, Lisp, Elixir, Scala', 'Thread-safe concurrency, formal proofs'],
        ['Logic / Declarative', 'Declare facts, constraints & rules', 'Stateless deduction engine', 'Prolog, SQL, Datalog', 'Knowledge graphs, relational queries'],
        ['Multi-Paradigm', 'Blend OOP, FP, and procedural', 'Controlled mutability', 'Rust, TypeScript, Python, Swift', 'Adaptable to complex real-world tasks']
      ]
    }
  },
  {
    title: 'Execution Models: Compilers, Interpreters, JIT Engines & Virtual Machines',
    subtitle: 'From Source Code to Machine Binaries, Bytecode & Dynamic JIT Compilation',
    category: 'Programming Languages • Execution',
    overview:
      'Computers cannot execute high-level text directly; source code must be translated into physical binary machine instructions. The modern computing landscape employs three dominant execution strategies.',
    keyPoints: [
      '1. Ahead-Of-Time (AOT) Native Compilers: Directly translates entire source code into native machine code (ELF binaries on Linux, Mach-O on macOS, PE on Windows) prior to execution (e.g., C, C++, Rust, Go). Delivers absolute maximum runtime speed with zero startup translation latency.',
      '2. Pure Interpreters: An interpreter reads source code line-by-line or token-by-token, parsing and executing actions on the fly without producing a persistent binary (e.g., traditional Ruby, Bash, early Python). Highly portable and flexible for interactive debugging, but significantly slower due to continuous instruction parsing.',
      '3. Hybrid Bytecode & JIT (Just-In-Time) Virtual Machines: Source code is pre-compiled into portable intermediate bytecode (Java JVM bytecode or .NET CIL). At runtime, the Virtual Machine interprets bytecode initially, while the JIT engine (e.g., Java HotSpot, V8 TurboFan) profiles execution, identifies "hot spots" (frequently executed loops), and compiles those methods directly into optimized native machine code in memory during execution!'
    ],
    callouts: [
      {
        type: 'architecture',
        title: 'THE THREE DOMINANT EXECUTION MODELS COMPARED',
        body: 'AOT Compilation: Source Code -> Native Machine Code Binary -> Direct CPU Execution (C, C++, Rust, Go)\nPure Interpretation: Source Code -> AST Parser -> Runtime Evaluation Loop (Bash, Basic)\nHybrid JIT VM: Source Code -> Bytecode (.class) -> JVM/CLR Interpreter + HotSpot JIT Native Compilation (Java, C#, Node.js)'
      }
    ]
  },
  {
    title: 'The Anatomy of a Modern Compiler: From Lexing to Machine Code Emission',
    subtitle: 'Lexical Analysis, Syntax Parsing (AST), Semantic Type Checking, SSA Optimization & Code Gen',
    category: 'Programming Languages • Compiler Engineering',
    overview:
      'A compiler is one of the most sophisticated pieces of software engineering in computer science. Modern production compilers (such as LLVM, Clang, and GCC) are partitioned into two major halves: the Language Front-End and the Target Back-End, bridged by a common Intermediate Representation (IR).',
    keyPoints: [
      '1. Lexical Analysis (Scanner/Lexer): Converts raw source code characters into a stream of categorized tokens (keywords, identifiers, literals, operators) using Regular Expressions and Deterministic Finite Automata (DFA).',
      '2. Syntax Analysis (Parser): Validates grammatical correctness against a Context-Free Grammar (CFG) using LL(k) or LR(k) parsing algorithms, constructing an Abstract Syntax Tree (AST).',
      '3. Semantic Analysis: Verifies type consistency, resolves variable scopes using Symbol Tables, and checks function call signatures.',
      '4. Intermediate Representation (IR): The AST is converted into a linear, architecture-independent representation, typically Static Single Assignment (SSA) form where every variable is assigned exactly once.',
      '5. Optimization Pipeline: Eliminates dead code, unrolls loops, propagates constants, and vectorizes operations across SIMD registers.',
      '6. Target Code Generation & Register Allocation: Maps IR variables to a finite number of physical CPU registers (using Chaitin Graph Coloring algorithms) and emits target assembly/machine code.'
    ],
    codeListing: {
      language: 'LLVM IR (Intermediate Representation)',
      title: 'LLVM Static Single Assignment (SSA) Code Example',
      code: `; LLVM Intermediate Representation of: int add(int a, int b) { return a + b; }
define i32 @add(i32 %a, i32 %b) {
entry:
  %0 = add nsw i32 %a, %b   ; Adds two 32-bit integers with no signed wrap
  ret i32 %0                ; Returns the result to calling frame
}`,
      explanation:
        'Notice how LLVM IR is completely independent of x86, ARM, or RISC-V. The front-end (Clang) translates C++ to LLVM IR; the back-end (LLVM) optimizes the IR and translates it to any desired CPU instruction set!'
    }
  },
  {
    title: 'Type Systems: Static vs. Dynamic, Strong vs. Weak & Type Inference',
    subtitle: 'Type Safety, Compile-Time Invariants, Duck Typing & Hindley-Milner Systems',
    category: 'Programming Languages • Type Theory',
    overview:
      'A type system is a tractable syntactic method for proving the absence of certain program behaviors by classifying phrases according to the kinds of values they compute (Benjamin Pierce, Types and Programming Languages).',
    keyPoints: [
      'Static Typing: Types are explicitly verified at compile time (C, C++, Java, Rust). Type errors are caught before runtime execution, enabling compiler optimizations and self-documenting code.',
      'Dynamic Typing: Types are associated with runtime values, not variable bindings (Python, JavaScript, Ruby). Variables can point to any type; type mismatches manifest at runtime as exceptions.',
      'Strong Typing: The language strictly prevents operations on incompatible types without explicit casting (Python, Java, Rust). E.g., in Python, "5" + 2 raises a TypeError.',
      'Weak Typing: The language permits implicit type coercion and arbitrary memory reinterpretations (C, JavaScript). E.g., in JavaScript, "5" + 2 evaluates to "52", while in C, pointers can be cast arbitrarily to void*.',
      'Type Inference: The compiler automatically deduces types without requiring explicit annotations (C++ `auto`, Rust `let`, TypeScript, Haskell Hindley-Milner algorithm).'
    ],
    tableData: {
      headers: ['Type Dimension', 'Static Typing', 'Dynamic Typing', 'Strong Typing', 'Weak Typing'],
      colWidths: [38, 45, 45, 45, 47],
      rows: [
        ['Type Check Time', 'At Compile Time (Pre-execution)', 'At Runtime (During execution)', 'Enforced at all operations', 'Bypassed via coercion'],
        ['Error Detection', 'Caught before running program', 'Caught during program execution', 'Guarantees type integrity', 'Silent type conversions occur'],
        ['Performance Impact', 'Fast: no runtime type tags', 'Slow: runtime type tag lookups', 'Negligible (mostly compile-time)', 'Unpredictable bugs possible'],
        ['Example Languages', 'Rust, C++, Java, Go', 'Python, JavaScript, Ruby', 'Python, Rust, Java', 'JavaScript, C, C++']
      ]
    }
  },
  {
    title: 'Memory Management Models: Manual Pointers, Garbage Collection & Ownership',
    subtitle: 'malloc/free, Mark-and-Sweep, Reference Counting, RAII & Rust Affine Types',
    category: 'Programming Languages • Memory Models',
    overview:
      'How a programming language manages heap memory allocation and reclamation fundamentally dictates its latency predictability, throughput efficiency, and vulnerability to security exploits.',
    keyPoints: [
      '1. Manual Memory Management (C/C++): Developers explicitly request memory using `malloc`/`free` or `new`/`delete`. Provides absolute control and zero latency spikes, but introduces severe software risks: memory leaks, dangling pointers, double-free vulnerabilities, and buffer overflows.',
      '2. Automatic Garbage Collection (Java, C#, Go, Python): The runtime environment automatically scans heap memory to identify and deallocate unreferenced objects. Utilizes Mark-and-Sweep, Generational Garbage Collection, or Reference Counting with cycle detection. Eliminates manual memory bugs, but introduces unpredictable "stop-the-world" latency pauses and higher memory footprint.',
      '3. RAII & Deterministic Destructors (C++): Resource Acquisition Is Initialization binds heap memory and OS resources to the lifetime of stack objects. When the object exits scope, its destructor automatically frees the resource without runtime GC pauses.',
      '4. Ownership & Borrowing (Rust): The compiler enforces strict ownership rules at compile time: each resource has exactly one owner; resources can be borrowed immutably by multiple readers OR mutably by exactly one writer, achieving memory safety and thread safety without any garbage collector!'
    ],
    callouts: [
      {
        type: 'exam',
        title: 'MEMORY MANAGEMENT ARCHITECTURAL TRADEOFF',
        body: 'Why are high-frequency financial trading systems and operating system kernels almost never written in languages with automated Garbage Collection (Java/Python)?\nAnswer: Because Garbage Collectors introduce non-deterministic "stop-the-world" pause times where execution threads are frozen to trace object graphs. In trading systems where trades are executed in nanoseconds, or in OS kernels managing hardware interrupts, non-deterministic latency pauses can result in catastrophic financial losses or hardware watchdog timeouts.'
      }
    ]
  },
  {
    title: 'Comprehensive Comparative Landscape of Contemporary Languages',
    subtitle: 'In-Depth Profiles: C, C++, Python, Java, JavaScript, TypeScript, Go & Rust',
    category: 'Programming Languages • Industry Profiles',
    overview:
      'Every programming language embodies a specific set of architectural compromises optimized for particular engineering problem domains. Professional computer scientists understand the strengths, weaknesses, and runtime characteristics of each major language ecosystem.',
    keyPoints: [
      'C: The lingua franca of computing. Direct silicon access, minimalist runtime, ideal for OS kernels, device drivers, and microcontrollers.',
      'C++: High-performance systems, game engines, quantitative finance, and AAA games requiring zero-cost abstractions, deterministic destructors, and extreme throughput.',
      'Python: High-level expressiveness, rich scientific ecosystem (NumPy, PyTorch), dominating AI/Machine Learning, data engineering, and automation scripting.',
      'Java: Write Once Run Anywhere via JVM bytecode, robust enterprise frameworks (Spring), dominating banking, enterprise backends, and Android application development.',
      'JavaScript / TypeScript: The universal runtime of the World Wide Web. Single-threaded asynchronous event loop; TypeScript adds static compile-time type safety.',
      'Go: Engineered by Google for high-concurrency cloud microservices, Kubernetes, Docker, and hyper-scale network infrastructure.',
      'Rust: The premier modern systems language, delivering C++ performance with compile-time memory safety, chosen for next-generation Linux kernel drivers and web infrastructure.'
    ],
    tableData: {
      headers: ['Language', 'Primary Paradigm', 'Typing System', 'Memory Strategy', 'Primary Industry Domain'],
      colWidths: [28, 44, 46, 46, 56],
      rows: [
        ['C', 'Imperative / Procedural', 'Static, Weakly Typed', 'Manual malloc/free', 'Operating Systems, Firmware, Embedded'],
        ['C++', 'Multi-paradigm / OOP', 'Static, Strong', 'RAII & Manual Pointers', 'Game Engines, Finance, High-Perf Systems'],
        ['Python', 'Multi-paradigm / Dynamic', 'Dynamic, Strongly Typed', 'Automated Ref Counting + GC', 'AI/ML, Data Science, Backend APIs'],
        ['Java', 'Object-Oriented (Class)', 'Static, Strong', 'Generational Garbage Collection', 'Enterprise Backends, Banking, Android'],
        ['TypeScript', 'Multi-paradigm / Scripting', 'Static Structural (Compile-time)', 'Automated Garbage Collection', 'Full-Stack Web, Cloud Native, Desktop Apps'],
        ['Go', 'Concurrent Procedural', 'Static, Structural', 'Concurrent Garbage Collection', 'Cloud Infrastructure, Kubernetes, Microservices'],
        ['Rust', 'Multi-paradigm / Systems', 'Static, Strongly Typed', 'Compile-Time Ownership (No GC)', 'Systems Programming, Cryptography, Browsers']
      ]
    }
  },
  {
    title: 'The Future of Programming: Natural Language, AI Synthesis & Quantum Languages',
    subtitle: 'From High-Level Code to AI Copilots, Domain-Specific DSLs & Quantum Instruction Sets',
    category: 'Programming Languages • Future Directions',
    overview:
      'The trajectory of programming language evolution continues toward higher levels of cognitive expression. Just as Assembly replaced raw machine code and C replaced Assembly, modern AI code synthesis and specialized quantum instruction sets represent the next frontier of computational specification.',
    keyPoints: [
      'AI-Assisted Program Synthesis: Large Language Models (LLMs) synthesize high-level code from natural language prompts, shifting the software engineer’s role toward formal verification, architectural modeling, and security auditing.',
      'Domain-Specific Languages for AI: Frameworks like Mojo and Triton compile tensor operations directly onto heterogeneous GPU and TPU accelerator arrays, achieving hardware-saturating floating-point throughput.',
      'Quantum Programming Languages: Languages like Q# (Microsoft) and Qiskit (IBM) formulate algorithms leveraging quantum superposition, entanglement, and quantum phase estimation to solve polynomial factorization (Shor’s Algorithm) and database search (Grover’s Algorithm).',
      'The Unbroken Thread of Computation: Regardless of whether code is written by humans or synthesized by AI, the fundamental laws of computer science—Turing computability, algorithmic Big-O complexity, memory hierarchies, and digital logic—remain immutable and foundational.'
    ],
    callouts: [
      {
        type: 'tip',
        title: 'VALEDICTORY ADVICE FOR COMPUTER SCIENCE STUDENTS',
        body: 'Languages, frameworks, and syntax libraries evolve constantly, but foundational principles never expire. If you master the theoretical foundations in this 216-page handbook—how computers process instructions, how memory is laid out in silicon, how data structures scale asymptotically, and how operating systems coordinate concurrent processes—you will remain an authoritative, resilient computer scientist for your entire career.'
      }
    ]
  }
];
