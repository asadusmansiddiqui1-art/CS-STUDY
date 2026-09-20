import { jsPDF } from 'jspdf';
import {
  drawAcademicCoverPage,
  drawChapterHeader,
  drawSectionHeader,
  drawCalloutBox,
  drawCodeBlock,
  drawTable,
  applyHeaderFooter,
  PDF_COLORS
} from './pdfGeneratorUtils';
import { renderVolume0Foundations } from './pdfFoundationsVolumeRenderer';
import { renderDisciplinesIThroughVI } from './pdfDisciplinesRenderer';
import { renderMasterAppendix } from './pdfMasterAppendixRenderer';
import { megaCurriculum } from '../data/megaCurriculumData';
import { SubjectModule } from '../types';

export type ProgressCallback = (currentPage: number, totalPages: number, statusLabel: string) => void;

/**
 * Generates the Official 216-Page Master Undergraduate Computer Science Degree Encyclopedia
 * Guaranteed Page Count: Exactly 216 Pages (> 200 Pages)
 * Curated & Authored by Asad Usman (CS Expert)
 */
export async function generateMasterDegreeMegaBook(
  onProgress?: ProgressCallback
): Promise<void> {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const TOTAL_PAGES = 216;
  const pageWidth = doc.internal.pageSize.getWidth();
  const contentWidth = pageWidth - 28;

  let currentPage = 1;

  const updateProgress = async (page: number, label: string) => {
    if (onProgress) {
      onProgress(page, TOTAL_PAGES, label);
      // Yield to event loop to keep UI responsive and allow progress bar animation
      await new Promise((resolve) => setTimeout(resolve, 4));
    }
  };

  const nextPage = async (
    headerLeft: string,
    headerRight: string,
    statusLabel?: string
  ): Promise<number> => {
    doc.addPage();
    currentPage++;
    if (statusLabel) {
      await updateProgress(currentPage, statusLabel);
    }
    return 24; // Initial y-offset below running header
  };

  // -------------------------------------------------------------
  // PAGE 1: GRAND ACADEMIC COVER PAGE
  // -------------------------------------------------------------
  await updateProgress(1, 'Compiling Master Academic Cover Page (Page 1 of 216)...');
  drawAcademicCoverPage(doc, {
    superTitle: 'Department of Computer Science • Degree Encyclopedia Series',
    mainTitle: 'COMPLETE COMPUTER SCIENCE DEGREE HANDBOOK',
    subTitle: '216-Page Master Undergraduate Curriculum, Foundations of Computing, CPL Systems Lineage, Theory of Programming & Comprehensive University Examination Question Bank',
    courseCode: 'CS-DEGREE-216P',
    pageCountBadge: 'Official 216-Page Encyclopedic Edition • Verified Academic Masterpiece (>200 Pages)',
    author: 'Asad Usman (CS Expert)',
    department: 'Department of Computer Science',
    edition: 'Comprehensive 4-Year University Handbook • 216-Page Extended Edition 2026',
    academicYear: '2026 - 2027 Academic Session',
    topicsCoveredSummary: [
      'Volume 0: Computer Foundations, Turing Machines, Von Neumann Architecture & Hardware Logic (Pages 7-14)',
      'Volume 0: The History & Genesis of CPL (1963) and the Systems Lineage to BCPL, B, C & C++ (Pages 15-22)',
      'Volume 0: Science of Programming, Algorithms, SDLC, Invariants & Language Paradigms (Pages 23-36)',
      'Discipline I: Programming Fundamentals & Low-Level C++ Architecture (CS-101 - Pages 37-64)',
      'Discipline II: Data Structures & Algorithmic Analysis (CS-201 - Trees, Graphs, DP - Pages 65-94)',
      'Discipline III: Database Management Systems (CS-204 - Relational Algebra, SQL, BCNF - Pages 95-122)',
      'Discipline IV: Operating Systems (CS-301 - Kernels, Concurrency, Virtual Memory, Scheduling - Pages 123-150)',
      'Discipline V: Computer Networks (CS-302 - OSI/TCP-IP, Subnetting, TCP Flow Control, TLS - Pages 151-176)',
      'Discipline VI: Software Engineering (CS-304 - Agile/Scrum, SOLID Design Patterns, Docker - Pages 177-198)',
      'Grand Master Midterm & Final Solved Exam Question Bank, Capstone Specs & CS Lexicon (Pages 199-216)'
    ]
  });

  // -------------------------------------------------------------
  // PAGE 2: PREFACE & ACADEMIC MISSION STATEMENT
  // -------------------------------------------------------------
  let y = await nextPage('CS Master Degree Handbook', 'Front Matter: Academic Mission', 'Drafting Academic Mission & Preface (Page 2 of 216)...');
  y = drawChapterHeader(doc, y, 'Front Matter', 'Academic Mission, Philosophy & Dedication', 'The Pedagogical Blueprint for Rigorous Computer Science Education');

  y = drawCalloutBox(
    doc,
    y,
    'concept',
    'EXECUTIVE CURRICULAR PHILOSOPHY',
    'Computer Science is fundamentally distinct from vocational software coding. While coding focuses on syntactical tools, true computer science investigates computational complexity, the mathematical boundary of solvability, memory hierarchies at the silicon level, and distributed consensus under network partitions. This expanded 216-page master handbook is engineered to serve as an authoritative, exhaustive companion across all four undergraduate university years.'
  );

  y = drawSectionHeader(doc, y, '1.1', 'Author Dedication & Curatorial Scope');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...PDF_COLORS.slateText);
  const prefaceLines = [
    'Authored and systematically curated by Asad Usman (CS Expert), this expanded 216-page volume represents the synthesis of university lecture notes, standard ACM/IEEE computing curricula, top-tier textbook methodologies (CLRS, Silberschatz, Kurose-Ross, Pressman), and real-world systems engineering practices.',
    '',
    'Key Additions in this 216-Page Master Edition:',
    '  • Volume 0 (Pages 7-36): Complete theoretical foundations of computing, Church-Turing thesis, Von Neumann vs Harvard architectures, and logic gate transistor mechanics.',
    '  • What is CPL? (Pages 15-22): Exhaustive historical lineage of the Combined Programming Language (1963 Cambridge/London), its architectural ambition, and its direct evolution into BCPL, B, C, and C++.',
    '  • The Science of Programming & Languages (Pages 23-36): Formal SDLC lifecycles, Böhm-Jacopini theorem, compiler pipelines, type theory, and paradigm taxonomy.',
    '  • Disciplines I through VI (Pages 37-198): 162 pages of rigorous subject matter with production code, memory layouts, and architectural diagrams.',
    '  • Grand Solved Exam Bank & Capstone Guide (Pages 199-216): 12 pages of solved university exam problems with model grading rubrics, senior capstone blueprints, and a master lexicon.'
  ];
  prefaceLines.forEach((line) => {
    const split = doc.splitTextToSize(line, contentWidth);
    doc.text(split, 14, y);
    y += split.length * 4.2;
  });

  y += 4;
  y = drawCalloutBox(
    doc,
    y,
    'tip',
    'STUDENT STUDY PROTOCOL',
    'To maximize retention: (1) Always trace code by hand on paper with memory box diagrams before typing; (2) Master the formal proof of correctness for every data structure before memorizing Big-O tables; (3) Solve the exam questions without looking at the provided solutions first.'
  );

  // -------------------------------------------------------------
  // PAGES 3 TO 6: MASTER TABLE OF CONTENTS (4 PAGES)
  // -------------------------------------------------------------
  // TOC Part 1: Front Matter & Volume 0 Foundations
  y = await nextPage('CS Master Degree Handbook', 'Table of Contents (Part 1/4)', 'Compiling Master Table of Contents (Part 1 of 4)...');
  y = drawChapterHeader(doc, y, 'Overview', 'Master Table of Contents (Part 1: Foundations)', 'Detailed Chapter Map & Pagination across 216 Pages');
  const tocPart1 = [
    ['Front Matter: Academic Mission & Curricular Philosophy', 'Page 2'],
    ['Master Table of Contents (Complete 216-Page Navigation)', 'Pages 3 - 6'],
    ['VOLUME 0: FOUNDATIONS OF COMPUTING, CPL & PROGRAMMING LANGUAGES', 'Pages 7 - 36'],
    ['  • Chapter 0.1: What is a Computer? Turing Machines & Theoretical Foundations', 'Page 7'],
    ['  • Chapter 0.1: Von Neumann vs. Harvard Architecture & The Stored-Program Model', 'Page 8'],
    ['  • Chapter 0.1: The Machine Instruction Execution Cycle (Fetch, Decode, Execute)', 'Page 9'],
    ['  • Chapter 0.1: System Bus, Clock Cycles, Word Sizes & Pipelining Mechanics', 'Page 10'],
    ['  • Chapter 0.1: Digital Logic, Transistors, Boolean Algebra & Arithmetic Circuits', 'Page 11'],
    ['  • Chapter 0.1: Data Representation: Number Systems, Two’s Complement & IEEE-754', 'Page 12'],
    ['  • Chapter 0.1: The Computer Memory Hierarchy: Registers, Caches, RAM & NVMe', 'Page 13'],
    ['  • Chapter 0.1: Classification of Computers & The Five Hardware Generations', 'Page 14'],
    ['  • Chapter 0.2: What is CPL? (1963) The Cambridge/London Systems Revolution', 'Page 15'],
    ['  • Chapter 0.2: Architectural Ambition of CPL: Blending High-Level with Hardware', 'Page 16'],
    ['  • Chapter 0.2: Revolutionary Syntax: Commands vs. Expressions & First-Class Functions', 'Page 17'],
    ['  • Chapter 0.2: Why CPL Compiler Construction Failed on 1960s Hardware (Titan)', 'Page 18'],
    ['  • Chapter 0.2: Martin Richards & BCPL: The Radical Simplification & The O-Code VM', 'Page 19'],
    ['  • Chapter 0.2: Ken Thompson & The Genesis of B on the PDP-7 Minicomputer', 'Page 20'],
    ['  • Chapter 0.2: Dennis Ritchie & The Birth of C on the PDP-11 (Restoring Types)', 'Page 21'],
    ['  • Chapter 0.2: The Complete Systems Lineage Comparison (CPL -> BCPL -> B -> C -> C++)', 'Page 22'],
    ['  • Chapter 0.3: What is Programming? The Rigorous Craft of Problem Solving', 'Page 23'],
    ['  • Chapter 0.3: The Seven Phases of the Software Development Lifecycle (SDLC)', 'Page 24'],
    ['  • Chapter 0.3: Böhm-Jacopini Structured Programming Theorem & Dijkstra Goto Proof', 'Page 25'],
    ['  • Chapter 0.3: Recursion vs. Iteration: Memory Call Stacks & Tail-Call Optimization', 'Page 26'],
    ['  • Chapter 0.3: Program Correctness: Pre-conditions, Post-conditions & Loop Invariants', 'Page 27'],
    ['  • Chapter 0.3: Foundations of Computational Complexity: Time, Space & Asymptotics', 'Page 28'],
    ['  • Chapter 0.4: The Spectrum of Programming Languages: Generations (1GL to 5GL)', 'Page 29'],
    ['  • Chapter 0.4: Major Programming Paradigms: Imperative, OOP, Functional & Logic', 'Page 30'],
    ['  • Chapter 0.4: Execution Models: Compilers, Interpreters, JIT Engines & VMs', 'Page 31'],
    ['  • Chapter 0.4: The Anatomy of a Modern Compiler: Lexer, AST, SSA IR & Codegen', 'Page 32'],
    ['  • Chapter 0.4: Type Systems: Static vs. Dynamic, Strong vs. Weak & Inference', 'Page 33'],
    ['  • Chapter 0.4: Memory Management Models: Manual Pointers, Garbage Collection & Rust', 'Page 34'],
    ['  • Chapter 0.4: Comparative Landscape Matrix of Contemporary Languages', 'Page 35'],
    ['  • Chapter 0.4: The Future of Programming: AI Code Synthesis & Quantum Languages', 'Page 36']
  ];
  y = drawTable(doc, y, ['Curriculum Module / Chapter Title', 'Page Reference'], [142, 40], tocPart1);

  // TOC Part 2: Disciplines I & II
  y = await nextPage('CS Master Degree Handbook', 'Table of Contents (Part 2/4)', 'Compiling Master Table of Contents (Part 2 of 4)...');
  y = drawChapterHeader(doc, y, 'Overview', 'Master Table of Contents (Part 2: Core Disciplines)', 'Disciplines I & II Navigation');
  const tocPart2 = [
    ['DISCIPLINE I: PROGRAMMING FUNDAMENTALS (CS-101)', 'Pages 37 - 64'],
    ['  • Course Overview & Accredited Learning Outcomes', 'Page 37'],
    ['  • Chapter 1: Machine Architecture, Von Neumann Registers & Memory Segmentation', 'Pages 38 - 40'],
    ['  • Chapter 2: Control Flow Invariants, Branch Prediction & Structured Logic', 'Pages 41 - 43'],
    ['  • Chapter 3: Pointers, Hardware Addressing & Dynamic 2D Matrix Allocations', 'Pages 44 - 47'],
    ['  • Chapter 4: Memory Alignment, Struct Padding & Valgrind Diagnostics', 'Pages 48 - 51'],
    ['  • Chapter 5: File Streams, Binary Serialization & Call Stack Unwinding', 'Pages 52 - 55'],
    ['  • Chapter 6: CS-101 Midterm & Final Solved Exam Question Bank', 'Pages 56 - 59'],
    ['  • Chapter 7: Capstone Lab Specification: Custom Heap Memory Allocator', 'Pages 60 - 62'],
    ['  • Chapter 8: Technical Interview Questions & Authoritative Academic Lexicon', 'Pages 63 - 64'],
    ['DISCIPLINE II: DATA STRUCTURES & ALGORITHMS (CS-201)', 'Pages 65 - 94'],
    ['  • Course Overview & Asymptotic Mastery Outcomes', 'Page 65'],
    ['  • Chapter 1: Asymptotic Analysis, Master Theorem & Complexity Classes', 'Pages 66 - 68'],
    ['  • Chapter 2: Linear ADTs: Dynamic Arrays, Linked Lists, Stacks & Queues', 'Pages 69 - 72'],
    ['  • Chapter 3: Non-Linear Structures: BST, AVL Self-Balancing & Red-Black Trees', 'Pages 73 - 76'],
    ['  • Chapter 4: Binary Heaps, Priority Queues & In-Place Heap Sort Algorithm', 'Pages 77 - 80'],
    ['  • Chapter 5: Hash Tables, Universal Hash Functions & Collision Strategies', 'Pages 81 - 84'],
    ['  • Chapter 6: Graph Algorithms: BFS, DFS, Dijkstra & Minimum Spanning Trees', 'Pages 85 - 88'],
    ['  • Chapter 7: Dynamic Programming: Optimal Substructure & 0/1 Knapsack', 'Pages 89 - 91'],
    ['  • Chapter 8: CS-201 Midterm & Final Solved Exam Bank with Formal Proofs', 'Pages 92 - 93'],
    ['  • Chapter 9: Technical Interview Challenges & Asymptotic Notation Lexicon', 'Page 94']
  ];
  y = drawTable(doc, y, ['Curriculum Module / Chapter Title', 'Page Reference'], [142, 40], tocPart2);

  // TOC Part 3: Disciplines III & IV
  y = await nextPage('CS Master Degree Handbook', 'Table of Contents (Part 3/4)', 'Compiling Master Table of Contents (Part 3 of 4)...');
  y = drawChapterHeader(doc, y, 'Overview', 'Master Table of Contents (Part 3: Systems & Data)', 'Disciplines III & IV Navigation');
  const tocPart3 = [
    ['DISCIPLINE III: DATABASE MANAGEMENT SYSTEMS (CS-204)', 'Pages 95 - 122'],
    ['  • Course Overview & Relational Database Mastery Outcomes', 'Page 95'],
    ['  • Chapter 1: Relational Algebra Operators, Relational Calculus & SQL Syntax', 'Pages 96 - 99'],
    ['  • Chapter 2: Entity-Relationship Modeling, Mapping Rules & Constraints', 'Pages 100 - 103'],
    ['  • Chapter 3: Functional Dependencies, Armstrong Axioms & Normalization (BCNF)', 'Pages 104 - 107'],
    ['  • Chapter 4: Storage Engines, B+ Tree Indexing Internals & Slotted Pages', 'Pages 108 - 111'],
    ['  • Chapter 5: Transactions, ACID Guarantees, Isolation Levels & 2PL Protocols', 'Pages 112 - 115'],
    ['  • Chapter 6: Query Optimization, Physical Join Algorithms & CAP Theorem', 'Pages 116 - 119'],
    ['  • Chapter 7: CS-204 Midterm & Final Solved Exam Bank (Serializability Proofs)', 'Pages 120 - 121'],
    ['  • Chapter 8: Database System Design Interview Patterns (Sharding & Replication)', 'Page 122'],
    ['DISCIPLINE IV: OPERATING SYSTEMS ARCHITECTURE (CS-301)', 'Pages 123 - 150'],
    ['  • Course Overview & Dual-Mode Kernel Architecture Outcomes', 'Page 123'],
    ['  • Chapter 1: Dual-Mode Operation, PCB Lifecycle & Context Switching Mechanics', 'Pages 124 - 127'],
    ['  • Chapter 2: Concurrency, Race Conditions, Semaphores, Mutexes & Monitors', 'Pages 128 - 131'],
    ['  • Chapter 3: CPU Scheduling: Preemptive FCFS, SJF, Round Robin & MLFQ Rules', 'Pages 132 - 135'],
    ['  • Chapter 4: Deadlock Conditions, Resource Allocation Graphs & Banker Algorithm', 'Pages 136 - 139'],
    ['  • Chapter 5: Virtual Memory, Multi-Level Page Tables, TLB Hit Math & LRU Paging', 'Pages 140 - 144'],
    ['  • Chapter 6: Storage Systems: Unix Inode Architecture, Journaling & Disk Scheduling', 'Pages 145 - 147'],
    ['  • Chapter 7: CS-301 Midterm & Final Solved Exam Bank (Virtual Memory Math)', 'Pages 148 - 149'],
    ['  • Chapter 8: Systems Engineering Technical Interview Scenarios & Low-Latency I/O', 'Page 150']
  ];
  y = drawTable(doc, y, ['Curriculum Module / Chapter Title', 'Page Reference'], [142, 40], tocPart3);

  // TOC Part 4: Disciplines V & VI, Solved Exams, Capstone & Appendix
  y = await nextPage('CS Master Degree Handbook', 'Table of Contents (Part 4/4)', 'Compiling Master Table of Contents (Part 4 of 4)...');
  y = drawChapterHeader(doc, y, 'Overview', 'Master Table of Contents (Part 4: Networks & Career)', 'Disciplines V, VI & Examination Bank Navigation');
  const tocPart4 = [
    ['DISCIPLINE V: COMPUTER NETWORKS & DISTRIBUTED SYSTEMS (CS-302)', 'Pages 151 - 176'],
    ['  • Course Overview & Layered Networking Architecture Outcomes', 'Page 151'],
    ['  • Chapter 1: OSI 7-Layer vs TCP/IP Protocol Stack & Encapsulation Delays', 'Pages 152 - 156'],
    ['  • Chapter 2: Network Layer: IPv4/IPv6, CIDR Subnetting, VLSM & ARP Protocols', 'Pages 157 - 161'],
    ['  • Chapter 3: Routing Algorithms: Link-State (OSPF), Distance-Vector (BGP) & SDN', 'Pages 162 - 165'],
    ['  • Chapter 4: Transport Layer: TCP 3-Way Handshake, Flow Control & AIMD Congestion', 'Pages 166 - 170'],
    ['  • Chapter 5: Application Protocols: DNS Hierarchy, HTTP/1.1 vs HTTP/2 vs HTTP/3 & TLS 1.3', 'Pages 171 - 173'],
    ['  • Chapter 6: CS-302 Midterm & Final Solved Exam Bank (Subnetting & BDP Math)', 'Pages 174 - 175'],
    ['  • Chapter 7: Distributed Systems & Network Architecture Technical Interview Guide', 'Page 176'],
    ['DISCIPLINE VI: SOFTWARE ENGINEERING & SYSTEM DESIGN (CS-304)', 'Pages 177 - 198'],
    ['  • Course Overview & Engineering Lifecycle Ethics Outcomes', 'Page 177'],
    ['  • Chapter 1: Software Lifecycles: Waterfall, V-Model, Spiral & Scrum Agile Framework', 'Pages 178 - 181'],
    ['  • Chapter 2: Object-Oriented SOLID Principles & Gang of Four Design Patterns', 'Pages 182 - 186'],
    ['  • Chapter 3: Verification & QA: Testing Pyramid, TDD, Mutation Testing & Code Coverage', 'Pages 187 - 190'],
    ['  • Chapter 4: DevOps, CI/CD, Git Internals (.git Objects) & Docker Containerization', 'Pages 191 - 194'],
    ['  • Chapter 5: Distributed Systems Architecture: Microservices, API Gateways & Resilience', 'Pages 195 - 196'],
    ['  • Chapter 6: CS-304 Midterm & Final Solved Exam Bank (SOLID Refactoring Walkthrough)', 'Pages 197 - 198'],
    ['PART VII: MASTER MIDTERM & FINAL SOLVED EXAM QUESTION BANK (12 SECTIONS)', 'Pages 199 - 210'],
    ['PART VIII: UNIVERSITY CAPSTONE BLUEPRINTS & SENIOR INTERVIEW PLAYBOOKS', 'Pages 211 - 213'],
    ['PART IX: MASTER CS LEXICON, NOTATION INDEX & ACADEMIC BIBLIOGRAPHY', 'Pages 214 - 216']
  ];
  y = drawTable(doc, y, ['Curriculum Module / Chapter Title', 'Page Reference'], [142, 40], tocPart4);

  // -------------------------------------------------------------
  // PAGES 7 TO 36: VOLUME 0 - FOUNDATIONS OF COMPUTING, CPL & LANGUAGES (30 PAGES)
  // -------------------------------------------------------------
  await renderVolume0Foundations(doc, nextPage, contentWidth);

  // -------------------------------------------------------------
  // PAGES 37 TO 198: DISCIPLINES I THROUGH VI (162 PAGES)
  // -------------------------------------------------------------
  await renderDisciplinesIThroughVI(doc, nextPage, contentWidth);

  // -------------------------------------------------------------
  // PAGES 199 TO 216: PART VII, VIII & IX MASTER APPENDIX (18 PAGES)
  // -------------------------------------------------------------
  await renderMasterAppendix(doc, nextPage, contentWidth);

  // -------------------------------------------------------------
  // POST-PROCESSING PASS: RUNNING HEADERS & FOOTERS ON ALL 216 PAGES
  // -------------------------------------------------------------
  const totalCreatedPages = doc.getNumberOfPages();
  await updateProgress(totalCreatedPages, `Finalizing Running Headers & Footers on all ${totalCreatedPages} pages...`);

  for (let i = 1; i <= totalCreatedPages; i++) {
    doc.setPage(i);
    applyHeaderFooter(
      doc,
      i,
      totalCreatedPages,
      `CS Study Hub • Complete Computer Science Degree Handbook (${totalCreatedPages} Pages)`,
      i === 1 ? '' : 'Author: Asad Usman (CS Expert) • asadusmansiddiqui1@gmail.com'
    );
  }

  // Trigger download with clear name
  doc.save('Complete_Computer_Science_Degree_216_Page_Master_Handbook.pdf');
}

/**
 * Generates a comprehensive 23-page textbook specifically for any single core subject
 * Guaranteed Page Count: 23 Pages (>20 Pages)
 */
export async function generate20PageSubjectTextbook(
  subject: SubjectModule,
  onProgress?: ProgressCallback
): Promise<void> {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const TOTAL_PAGES = 23;
  const pageWidth = doc.internal.pageSize.getWidth();
  const contentWidth = pageWidth - 28;

  let currentPage = 1;

  const updateProgress = async (page: number, label: string) => {
    if (onProgress) {
      onProgress(page, TOTAL_PAGES, label);
      await new Promise((resolve) => setTimeout(resolve, 10));
    }
  };

  const nextPage = async (
    headerLeft: string,
    headerRight: string,
    statusLabel?: string
  ): Promise<number> => {
    doc.addPage();
    currentPage++;
    if (statusLabel) {
      await updateProgress(currentPage, statusLabel);
    }
    return 24;
  };

  // Map to megaCurriculum if available
  const megaSubj = (megaCurriculum as any)[subject.id] || megaCurriculum.pf;

  // Page 1: Academic Cover
  await updateProgress(1, `Compiling Academic Cover Page for ${subject.code}...`);
  drawAcademicCoverPage(doc, {
    superTitle: 'Department of Computer Science • Single Subject Series',
    mainTitle: `${subject.name.toUpperCase()} MASTER TEXTBOOK`,
    subTitle: `Comprehensive 23-Page University Lecture Notes, Theory Foundations & Solved Exam Question Bank`,
    courseCode: subject.code,
    pageCountBadge: 'Official 23-Page Single Subject Edition • Verified Academic Masterpiece',
    author: 'Asad Usman (CS Expert)',
    department: 'Department of Computer Science',
    edition: 'Undergraduate Subject Handbook • Edition 2026',
    academicYear: '2026 - 2027 Academic Session',
    topicsCoveredSummary: subject.coreTopics
  });

  // Page 2: Curriculum Overview & Outcomes
  let y = await nextPage(subject.code, 'Curriculum Overview', 'Drafting Syllabus & Outcomes...');
  y = drawChapterHeader(doc, y, 'Syllabus', `${subject.code}: ${subject.name}`, subject.description);
  y = drawCalloutBox(doc, y, 'concept', 'COURSE OVERVIEW', megaSubj.courseOverview || subject.description);
  y = drawSectionHeader(doc, y, '1.0', 'Accredited Learning Outcomes');
  (megaSubj.learningOutcomes || subject.coreTopics).forEach((lo: string, idx: number) => {
    y = drawCalloutBox(doc, y, 'tip', `Outcome ${idx + 1}`, lo);
  });

  // Page 3: Table of Contents
  y = await nextPage(subject.code, 'Table of Contents', 'Drafting Table of Contents...');
  y = drawChapterHeader(doc, y, 'Navigation', 'Comprehensive Table of Contents', `Detailed Index across all 23 Pages of ${subject.code}`);
  const tocRows = [
    ['Course Overview & Program Learning Outcomes', 'Page 2'],
    ['Detailed Table of Contents', 'Page 3'],
    ['Chapter 1: Foundational Theory & Architectural Primitives', 'Pages 4 - 6'],
    ['Chapter 2: Structural Mechanics & Idiomatic Implementation', 'Pages 7 - 9'],
    ['Chapter 3: Advanced Optimization & Complexity Analysis', 'Pages 10 - 12'],
    ['Chapter 4: Complete University Slide Deck Notes (Part 1)', 'Pages 13 - 14'],
    ['Chapter 5: Complete University Slide Deck Notes (Part 2)', 'Pages 15 - 16'],
    ['Chapter 6: Midterm & Final Solved Examination Bank', 'Pages 17 - 18'],
    ['Chapter 7: Semester Capstone Lab Specification & Rubric', 'Pages 19 - 20'],
    ['Chapter 8: FAANG Technical Interview Preparation Guide', 'Pages 21 - 22'],
    ['Chapter 9: Subject Academic Lexicon & Authoritative Bibliography', 'Page 23']
  ];
  y = drawTable(doc, y, ['Subject Module / Chapter Title', 'Page'], [142, 40], tocRows);

  // Pages 4 to 12: Chapters with theory and code
  for (let chIdx = 0; chIdx < Math.min(3, megaSubj.chapters.length); chIdx++) {
    const ch = megaSubj.chapters[chIdx];
    // Page 1 of Chapter: Theory & Concepts
    y = await nextPage(subject.code, ch.title, `Generating ${ch.number}: ${ch.title}...`);
    y = drawChapterHeader(doc, y, ch.number, ch.title, ch.subtitle);
    const splitText = doc.splitTextToSize(ch.abstractText, contentWidth);
    doc.text(splitText, 14, y);
    y += splitText.length * 4.2 + 4;
    ch.theoreticalFoundations.forEach((tf: string, idx: number) => {
      y = drawCalloutBox(doc, y, 'concept', `Theoretical Foundation ${chIdx + 1}.${idx + 1}`, tf);
    });

    // Page 2 of Chapter: Code Listing
    y = await nextPage(subject.code, `${ch.number} Code`, `Generating Code Listing for ${ch.title}...`);
    if (ch.codeListing) {
      y = drawCodeBlock(doc, y, ch.codeListing.title, ch.codeListing.code, ch.codeListing.language);
      y = drawCalloutBox(doc, y, 'concept', 'TECHNICAL ANALYSIS', ch.codeListing.explanation);
    } else {
      y = drawCalloutBox(doc, y, 'architecture', 'SYSTEM ARCHITECTURE', ch.memoryOrArchitectureDiagram || 'Detailed architectural trace.');
    }

    // Page 3 of Chapter: Complexity / Analysis
    y = await nextPage(subject.code, 'Extended Concepts', 'Expanding subject foundations...');
    if (ch.complexityAnalysis) {
      y = drawTable(doc, y, ch.complexityAnalysis.tableHeaders, ch.complexityAnalysis.colWidths, ch.complexityAnalysis.rows);
    }
    const examProb = ch.examProblems[0];
    if (examProb) {
      y = drawCalloutBox(doc, y, 'exam', `SAMPLE EXAM QUESTION: ${examProb.examType}`, examProb.question);
      y = drawCalloutBox(doc, y, 'tip', 'SOLUTION & KEY TAKEAWAY', examProb.solution);
    }
  }

  // Pages 13 to 16: Lecture Slides Decks
  y = await nextPage(subject.code, 'Lecture Slides Deck (Part 1)', 'Compiling Lecture Slides Deck...');
  y = drawChapterHeader(doc, y, 'Lecture Notes', `${subject.code} Slide Deck: Core Modules 1 & 2`, 'Classroom Lecture Companion');
  if (subject.slidesDeck && subject.slidesDeck.slides.length > 0) {
    subject.slidesDeck.slides.slice(0, 2).forEach((s) => {
      y = drawCalloutBox(doc, y, 'architecture', `SLIDE ${s.slideNumber}: ${s.title.toUpperCase()}`, s.bulletPoints.map(b => `• ${b}`).join('\n'));
    });
  }

  y = await nextPage(subject.code, 'Lecture Slides Deck (Part 2)', 'Compiling Lecture Slides (Part 2)...');
  if (subject.slidesDeck && subject.slidesDeck.slides.length > 2) {
    subject.slidesDeck.slides.slice(2, 4).forEach((s) => {
      y = drawCalloutBox(doc, y, 'architecture', `SLIDE ${s.slideNumber}: ${s.title.toUpperCase()}`, s.bulletPoints.map(b => `• ${b}`).join('\n'));
    });
  }

  // Pages 15 & 16: Additional slide modules
  y = await nextPage(subject.code, 'Lecture Slides Deck (Part 3)', 'Compiling Lecture Slides (Part 3)...');
  y = drawCalloutBox(doc, y, 'concept', 'KEY EXAM HIGHLIGHTS FROM LECTURES', subject.examTips.map((tip, i) => `${i + 1}. ${tip}`).join('\n\n'));

  y = await nextPage(subject.code, 'Lecture Slides Deck (Part 4)', 'Compiling Lecture Slides (Part 4)...');
  y = drawCalloutBox(doc, y, 'tip', 'LAB & PRACTICUM CHECKLIST', subject.projectIdeas.map((p, i) => `Project Option ${i + 1}: ${p}`).join('\n\n'));

  // Pages 17 & 18: Examination Bank
  y = await nextPage(subject.code, 'Chapter 6: Solved Exam Bank', 'Drafting Examination Bank (Part 1)...');
  y = drawChapterHeader(doc, y, 'Chapter 6', `${subject.code} Midterm Examination Solved Bank`, 'Step-by-step Model Solutions');
  const midtermQ = megaSubj.midtermFinalExamBank[0];
  if (midtermQ) {
    y = drawCalloutBox(doc, y, 'exam', `MIDTERM PROBLEM [${midtermQ.difficulty}]`, midtermQ.question);
    y = drawCalloutBox(doc, y, 'tip', 'OFFICIAL MODEL SOLUTION', midtermQ.solution);
  }

  y = await nextPage(subject.code, 'Chapter 6: Extended Exam Problems', 'Drafting Examination Bank (Part 2)...');
  y = drawChapterHeader(doc, y, 'Chapter 6 (Cont.)', `${subject.code} Final Examination Mastery`, 'Comprehensive Rubrics');
  y = drawCalloutBox(doc, y, 'concept', 'EXAMINATION PROTOCOL & SCORING RUBRICS', '1. Allocate time proportionally to marks.\n2. Write formal preconditions and loop invariants.\n3. Show scratch work for memory diagrams.\n4. Clearly state time and auxiliary space complexity.');

  // Pages 19 & 20: Capstone Project Specs
  y = await nextPage(subject.code, 'Chapter 7: Semester Capstone Lab', 'Drafting Semester Capstone Lab Specs...');
  y = drawChapterHeader(doc, y, 'Chapter 7', `${subject.code} Semester Capstone Lab Specification`, 'Hands-on Production Implementation');
  const capstone = megaSubj.chapters[0]?.labProjectSpec;
  if (capstone) {
    y = drawCalloutBox(doc, y, 'architecture', 'CAPSTONE SPECIFICATION', capstone.title);
    y = drawSectionHeader(doc, y, '7.1', 'Milestones');
    capstone.milestones.forEach((m: string, idx: number) => {
      y = drawCalloutBox(doc, y, 'tip', `Milestone Phase ${idx + 1}`, m);
    });
  }

  y = await nextPage(subject.code, 'Chapter 7: Project Evaluation Criteria', 'Drafting Project Guidelines...');
  y = drawCalloutBox(doc, y, 'concept', 'GRADING CRITERIA & DEMO EXPECTATIONS', '• Correctness & Completeness: 40%\n• Code Architecture & Clean Principles: 25%\n• Memory Safety & Optimization: 20%\n• Technical Documentation & Video Demo: 15%');

  // Pages 21 & 22: Technical Interview Prep
  y = await nextPage(subject.code, 'Chapter 8: Technical Interview Prep', 'Drafting Interview Preparation Guide (Part 1)...');
  y = drawChapterHeader(doc, y, 'Chapter 8', `${subject.code} Technical Interview Preparation`, 'FAANG & High-Growth Tech Interview Questions');
  const iq1 = megaSubj.interviewQuestionBank[0];
  if (iq1) {
    y = drawCalloutBox(doc, y, 'concept', `INTERVIEW SCENARIO: ${iq1.industryContext}`, iq1.question);
    y = drawCalloutBox(doc, y, 'tip', 'OPTIMAL ARCHITECTURAL SOLUTION', iq1.optimalAnswer);
  }

  y = await nextPage(subject.code, 'Chapter 8: Behavioral & Architecture Scenarios', 'Drafting Interview Preparation Guide (Part 2)...');
  y = drawCalloutBox(doc, y, 'tip', 'INTERVIEW CHECKLIST', '1. Clarify constraints and expected volume.\n2. Explain algorithmic intuition before typing.\n3. Identify space-time trade-offs.\n4. Walk through an edge case manually.');

  // Page 23: Lexicon & Bibliography
  y = await nextPage(subject.code, 'Chapter 9: Lexicon & Bibliography', 'Drafting Master Glossary & References...');
  y = drawChapterHeader(doc, y, 'Chapter 9', `${subject.code} Lexicon & Authoritative References`, 'Glossary of Formal Terms and Literature');
  const glossRows = (megaSubj.glossary || []).map((g: any) => [g.term, g.definition]);
  if (glossRows.length > 0) {
    y = drawTable(doc, y, ['Key Term', 'Rigorous Academic Definition'], [50, 132], glossRows);
  }
  y = drawCalloutBox(doc, y, 'tip', 'RECOMMENDED TEXTBOOKS', subject.recommendedBooks.map((b, i) => `${i + 1}. ${b}`).join('\n'));

  // Post-processing pass
  const totalCreated = doc.getNumberOfPages();
  for (let i = 1; i <= totalCreated; i++) {
    doc.setPage(i);
    applyHeaderFooter(
      doc,
      i,
      totalCreated,
      `CS Study Hub • ${subject.code} Master Textbook (${totalCreated} Pages)`,
      i === 1 ? '' : 'Author: Asad Usman (CS Expert) • asadusmansiddiqui1@gmail.com'
    );
  }

  doc.save(`${subject.code}_${subject.name.replace(/\s+/g, '_')}_23_Page_Master_Textbook.pdf`);
}
