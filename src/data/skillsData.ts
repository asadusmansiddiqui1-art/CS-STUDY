import { SkillVideo, PracticalSkill } from '../types';

export const skillVideos: SkillVideo[] = [
  {
    id: 'dsa-masterclass',
    title: 'Data Structures and Algorithms Full Course',
    instructor: 'freeCodeCamp / Steven',
    channel: 'freeCodeCamp.org',
    duration: '5 hr 18 min',
    category: 'core',
    youtubeId: '8hly31xKli0',
    thumbnailUrl: 'https://images.unsplash.com/photo-1516116211227-bbc13c72782b?w=600&auto=format&fit=crop&q=80',
    summary: 'A comprehensive walkthrough of foundational and advanced computer science data structures, memory layouts, Big-O analysis, and sorting strategies.',
    topicsCovered: [
      'Big-O time & space complexity analysis',
      'Arrays, dynamic vectors & linked lists',
      'Binary Search Trees, Heaps & Priority Queues',
      'Recursion, divide-and-conquer, & dynamic programming'
    ],
    practicalTakeaways: [
      'Choose the right data structure based on read vs write frequency trade-offs.',
      'Always consider cache line locality before defaulting to node-pointer structures.',
      'Space-time trade-offs: hash map caching vs recursion call-stack footprint.'
    ],
    difficulty: 'Intermediate'
  },
  {
    id: 'git-github-mastery',
    title: 'Git & GitHub Complete Workflow for Developers',
    instructor: 'Brad Traversy',
    channel: 'Traversy Media',
    duration: '1 hr 12 min',
    category: 'devops',
    youtubeId: 'RGOj5yH7evk',
    thumbnailUrl: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=600&auto=format&fit=crop&q=80',
    summary: 'The ultimate practical guide to version control, branch management, merge conflict resolution, rebasing, and collaborating on open-source repositories.',
    topicsCovered: [
      'Init, staging, committing, and atomic commit messages',
      'Branching strategies (feature branches, Git Flow)',
      'Resolving merge conflicts like a pro',
      'Pull requests, code review etiquette, and GitHub actions'
    ],
    practicalTakeaways: [
      'Write imperative, present-tense commit messages (e.g. "Fix edge case in BST delete").',
      'Never commit API keys or sensitive credentials; use .gitignore rigorously.',
      'Use interactive rebase (git rebase -i) to squash messy WIP commits before PR review.'
    ],
    difficulty: 'Beginner'
  },
  {
    id: 'linux-command-line',
    title: 'Linux Command Line & Bash Scripting for CS Students',
    instructor: 'Chuck Keith',
    channel: 'NetworkChuck',
    duration: '45 min',
    category: 'systems',
    youtubeId: 'V1y-mbWM3B8',
    thumbnailUrl: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=600&auto=format&fit=crop&q=80',
    summary: 'Essential terminal fluency: navigating Unix directories, managing permissions, piping data streams, process monitoring, and writing automation shell scripts.',
    topicsCovered: [
      'Directory navigation (ls, cd, pwd, find, grep)',
      'Standard streams: stdin (0), stdout (1), stderr (2), and piping (|)',
      'File permissions: chmod (755, 644) and chown ownership',
      'Process management: ps, top, kill, htop, and background jobs (&)'
    ],
    practicalTakeaways: [
      'Master grep and awk to quickly parse large log files and debug server output.',
      'Always check file permissions with ls -la when facing permission denied errors.',
      'Use SSH keys (ssh-keygen) for passwordless authentication to remote cloud instances.'
    ],
    difficulty: 'Beginner'
  },
  {
    id: 'web-dev-rest-apis',
    title: 'RESTful API Design & Full-Stack Architecture',
    instructor: 'Kyle Cook',
    channel: 'Web Dev Simplified',
    duration: '1 hr 35 min',
    category: 'web',
    youtubeId: '-MTSQjw5DrM',
    thumbnailUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80',
    summary: 'Learn how to architect scalable, stateless HTTP REST APIs, status code best practices, authentication headers, and database connection pooling.',
    topicsCovered: [
      'HTTP methods: GET, POST, PUT, PATCH, DELETE idempotency',
      'Proper HTTP status codes: 200, 201, 400, 401, 403, 404, 500',
      'JSON payload validation, schemas, and error responses',
      'Authentication with JWT tokens and Bearer headers'
    ],
    practicalTakeaways: [
      'Noun-based endpoint naming (e.g. /api/students, not /api/getStudents).',
      'Always sanitize and validate request body parameters before running database queries.',
      'Implement pagination parameters (limit & offset or cursor) to protect memory on large datasets.'
    ],
    difficulty: 'Intermediate'
  },
  {
    id: 'docker-containers',
    title: 'Docker & Containers for Beginners',
    instructor: 'Nana Janashia',
    channel: 'TechWorld with Nana',
    duration: '2 hr 45 min',
    category: 'devops',
    youtubeId: '3c-iBn73dDE',
    thumbnailUrl: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=600&auto=format&fit=crop&q=80',
    summary: 'Containerize your applications once and run them anywhere: Dockerfile architecture, multi-stage builds, port mappings, volumes, and docker-compose orchestration.',
    topicsCovered: [
      'Virtual machines vs lightweight Docker containers',
      'Writing efficient Dockerfiles with layer caching',
      'Port binding (-p 3000:3000) and persistent volume mounts',
      'Docker Compose: orchestrating web app + PostgreSQL containers'
    ],
    practicalTakeaways: [
      'Leverage Docker layer caching: copy package.json and install dependencies before copying source code.',
      'Use lightweight base images (e.g. node:alpine) to keep container images fast and secure.',
      'Persistent database data must always be stored in named Docker volumes, never inside the container layer.'
    ],
    difficulty: 'Intermediate'
  },
  {
    id: 'system-design-primer',
    title: 'System Design for Tech Interviews & Scalable Web Apps',
    instructor: 'Gaurav Sen',
    channel: 'Gaurav Sen',
    duration: '1 hr 55 min',
    category: 'systems',
    youtubeId: 'xpDnVSmNFX0',
    thumbnailUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80',
    summary: 'High-level architecture fundamentals: Load balancing, horizontal scaling, caching strategies (Redis), database sharding, and CDN distribution.',
    topicsCovered: [
      'Vertical scaling vs Horizontal scaling trade-offs',
      'Load Balancers: Round-Robin, Least Connections, IP Hash',
      'Caching layers: Cache-aside, Write-through, and Redis eviction policies',
      'CAP Theorem: Consistency vs Availability vs Partition tolerance'
    ],
    practicalTakeaways: [
      'Never single-point-of-failure (SPOF): redundant instances across availability zones.',
      'Cache high-read, low-write queries with an appropriate TTL (Time To Live).',
      'Asynchronous task offloading with message queues (RabbitMQ/Kafka) for long-running jobs.'
    ],
    difficulty: 'Advanced'
  }
];

export const practicalSkillsList: PracticalSkill[] = [
  {
    id: 'git-version-control',
    name: 'Git & Version Control',
    category: 'devops',
    icon: 'GitBranch',
    badge: 'Industry Essential',
    description: 'Collaborative development, branching workflows, pull requests, rebase, cherry-pick, and merge conflict resolution.',
    essentialConcepts: [
      'Staging area & working directory lifecycle',
      'Branching, merging & conflict resolution',
      'Rebasing vs Fast-forward merges',
      'Pull requests & code review standards'
    ],
    industryApplication: 'Standard requirement across all software engineering teams worldwide.',
    recommendedProject: 'Collaborative open-source repo with branch protection and PR reviews.',
    relatedCourseCode: 'CS-304'
  },
  {
    id: 'linux-cli',
    name: 'Linux & Shell Scripting',
    category: 'systems',
    icon: 'Terminal',
    badge: 'Core Utility',
    description: 'Terminal navigation, stream redirection, piping, permissions management, and Bash automation scripts.',
    essentialConcepts: [
      'File system hierarchy & navigation',
      'Pipes, redirects & text filters (grep, sed, awk)',
      'Process management (ps, kill, top)',
      'Cron jobs and automated bash routines'
    ],
    industryApplication: 'Managing cloud VMs, CI/CD pipelines, container terminals, and production servers.',
    recommendedProject: 'Automated backup script that archives and compresses log directories nightly.',
    relatedCourseCode: 'CS-301'
  },
  {
    id: 'rest-apis',
    name: 'REST API & Web Architecture',
    category: 'web',
    icon: 'Globe',
    badge: 'High Demand',
    description: 'Stateless API architecture, HTTP verbs, status codes, JSON validation, JWT authentication, and pagination.',
    essentialConcepts: [
      'HTTP request-response lifecycle',
      'RESTful resource naming conventions',
      'Authentication: Sessions vs JWT tokens',
      'Error handling and rate limiting'
    ],
    industryApplication: 'Powering web, mobile, and third-party SaaS integrations.',
    recommendedProject: 'CRUD REST API with JWT authorization, request validation, and database storage.',
    relatedCourseCode: 'CS-204'
  },
  {
    id: 'dsa-problem-solving',
    name: 'Data Structures & Problem Solving',
    category: 'core',
    icon: 'Code2',
    badge: 'Technical Interviews',
    description: 'Algorithmic problem-solving patterns, two pointers, sliding window, graph traversals, and dynamic programming.',
    essentialConcepts: [
      'Big-O asymptotic time and space limits',
      'Two pointers & sliding window patterns',
      'BFS, DFS, and topological sort',
      'Top-down memoization & bottom-up DP'
    ],
    industryApplication: 'FAANG/MNC coding rounds, performance optimization, and algorithm engineering.',
    recommendedProject: 'Solve 100 curated LeetCode problems covering top 14 algorithmic patterns.',
    relatedCourseCode: 'CS-201'
  },
  {
    id: 'docker-devops',
    name: 'Docker & Containerization',
    category: 'devops',
    icon: 'Container',
    badge: 'Modern Stack',
    description: 'Building container images, multi-stage builds, persistent volumes, networking, and docker-compose orchestration.',
    essentialConcepts: [
      'Image layers and Dockerfile optimization',
      'Port binding and network isolation',
      'Volume mapping for persistent databases',
      'Multi-container docker-compose setups'
    ],
    industryApplication: 'Eliminating the "works on my machine" problem across staging and production.',
    recommendedProject: 'Containerize a React frontend and Node/Express backend with a PostgreSQL container.',
    relatedCourseCode: 'CS-304'
  },
  {
    id: 'sql-db-modeling',
    name: 'SQL & Database Design',
    category: 'core',
    icon: 'Database',
    badge: 'Data Foundation',
    description: 'Relational data modeling, schema normalization (3NF/BCNF), index optimization, and complex aggregation queries.',
    essentialConcepts: [
      'ER modeling and normalization rules',
      'Inner, outer, and self joins with NULL handling',
      'B-Tree indexing and query execution plans',
      'Transactions and ACID isolation levels'
    ],
    industryApplication: 'Core storage engine for financial systems, enterprise platforms, and consumer apps.',
    recommendedProject: 'Design a normalized schema for an online marketplace with transactional integrity.',
    relatedCourseCode: 'CS-204'
  }
];
