export type ThemeMode = 'light' | 'dark';

export interface CodeSnippet {
  language: 'cpp' | 'javascript';
  title: string;
  code: string;
  explanation: string;
}

export interface ComplexityInfo {
  best: string;
  average: string;
  worst: string;
  space: string;
  notes: string;
}

export interface PracticeProblem {
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  approachHint: string;
}

export interface StudyResource {
  id: string;
  title: string;
  category: string;
  readTime: string;
  slideCount: number;
  badgeColor: string;
  summary: string;
  keyConcepts: string[];
  asciiDiagram?: string;
  complexity: ComplexityInfo;
  codeSnippets: CodeSnippet[];
  commonPitfalls: string[];
  practiceProblems: PracticeProblem[];
  downloadFileName: string;
}

export interface CourseSlide {
  slideNumber: number;
  title: string;
  bulletPoints: string[];
  codeOrDiagram?: string;
  examHighlight?: string;
}

export interface CourseSlideDeck {
  deckTitle: string;
  totalSlides: number;
  author: string;
  slides: CourseSlide[];
}

export interface SubjectModule {
  id: string;
  code: string;
  name: string;
  semester: string;
  creditHours: number;
  iconName: string;
  color: string;
  description: string;
  coreTopics: string[];
  recommendedBooks: string[];
  examTips: string[];
  projectIdeas: string[];
  slidesDeck?: CourseSlideDeck;
  pdfDownloadName?: string;
}

export interface SkillVideo {
  id: string;
  title: string;
  instructor: string;
  channel: string;
  duration: string;
  category: 'core' | 'web' | 'devops' | 'systems';
  youtubeId: string;
  thumbnailUrl: string;
  summary: string;
  topicsCovered: string[];
  practicalTakeaways: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface PracticalSkill {
  id: string;
  name: string;
  category: 'core' | 'web' | 'devops' | 'systems';
  icon: string;
  badge: string;
  description: string;
  essentialConcepts: string[];
  industryApplication: string;
  recommendedProject: string;
  relatedCourseCode: string;
}

export interface CourseGradeItem {
  id: string;
  name: string;
  creditHours: number;
  grade: string;
}

export interface GradeScaleItem {
  grade: string;
  point: number;
  percentageRange: string;
  description: string;
}

export interface PlaygroundPreset {
  id: string;
  title: string;
  language: 'javascript' | 'cpp';
  description: string;
  code: string;
  defaultStdin?: string;
}

export interface ExecutionLog {
  id: string;
  type: 'stdout' | 'stderr' | 'info' | 'warn';
  text: string;
  timestamp: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
  subject?: string;
}
