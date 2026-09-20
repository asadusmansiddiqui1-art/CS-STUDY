import { jsPDF } from 'jspdf';

/**
 * Shared styling utilities for University-Grade Computer Science PDFs
 */

export const PDF_COLORS = {
  primary: [49, 46, 129] as [number, number, number], // Indigo 900
  secondary: [79, 70, 229] as [number, number, number], // Indigo 600
  accent: [14, 165, 233] as [number, number, number], // Sky 500
  slateDark: [15, 23, 42] as [number, number, number], // Slate 900
  slateText: [51, 65, 85] as [number, number, number], // Slate 700
  slateMuted: [100, 116, 139] as [number, number, number], // Slate 500
  slateLight: [248, 250, 252] as [number, number, number], // Slate 50
  border: [226, 232, 240] as [number, number, number], // Slate 200
  amber: [180, 83, 9] as [number, number, number], // Amber 700
  amberBg: [254, 243, 199] as [number, number, number], // Amber 100
  emerald: [4, 120, 87] as [number, number, number], // Emerald 700
  emeraldBg: [209, 250, 229] as [number, number, number], // Emerald 100
  codeBg: [30, 41, 59] as [number, number, number], // Slate 800
};

/**
 * Renders a formal University-grade cover page
 */
export function drawAcademicCoverPage(
  doc: jsPDF,
  options: {
    superTitle: string;
    mainTitle: string;
    subTitle: string;
    courseCode?: string;
    pageCountBadge: string;
    author: string;
    department: string;
    edition: string;
    academicYear: string;
    topicsCoveredSummary: string[];
  }
) {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Top header decorative bar
  doc.setFillColor(...PDF_COLORS.primary);
  doc.rect(0, 0, pageWidth, 18, 'F');

  doc.setFillColor(...PDF_COLORS.secondary);
  doc.rect(0, 18, pageWidth, 3, 'F');

  // Top banner label
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255);
  doc.text('CS STUDY HUB • ACADEMIC CURRICULUM ARCHIVE & TEXTBOOK SERIES', 14, 12);
  doc.text('OFFICIAL CURRICULUM MANUAL', pageWidth - 14, 12, { align: 'right' });

  // Outer decorative border frame
  doc.setDrawColor(...PDF_COLORS.border);
  doc.setLineWidth(0.8);
  doc.rect(12, 28, pageWidth - 24, pageHeight - 44);

  doc.setDrawColor(...PDF_COLORS.secondary);
  doc.setLineWidth(0.3);
  doc.rect(14, 30, pageWidth - 28, pageHeight - 48);

  // Super Title (Department / Subject field)
  let y = 48;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...PDF_COLORS.secondary);
  doc.text(options.superTitle.toUpperCase(), pageWidth / 2, y, { align: 'center' });

  // Main Title Box
  y += 10;
  if (options.courseCode) {
    doc.setFillColor(...PDF_COLORS.secondary);
    doc.roundedRect(pageWidth / 2 - 25, y, 50, 9, 2, 2, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(255, 255, 255);
    doc.text(options.courseCode, pageWidth / 2, y + 6.5, { align: 'center' });
    y += 15;
  }

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(...PDF_COLORS.slateDark);

  const titleLines = doc.splitTextToSize(options.mainTitle, pageWidth - 50);
  doc.text(titleLines, pageWidth / 2, y, { align: 'center' });
  y += titleLines.length * 9 + 4;

  // Subtitle
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.setTextColor(...PDF_COLORS.slateMuted);
  const subLines = doc.splitTextToSize(options.subTitle, pageWidth - 60);
  doc.text(subLines, pageWidth / 2, y, { align: 'center' });
  y += subLines.length * 6 + 10;

  // Badge: Page Count & Academic Verification
  doc.setFillColor(...PDF_COLORS.emeraldBg);
  doc.setDrawColor(...PDF_COLORS.emerald);
  doc.roundedRect(pageWidth / 2 - 45, y, 90, 10, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(...PDF_COLORS.emerald);
  doc.text(options.pageCountBadge.toUpperCase(), pageWidth / 2, y + 6.5, { align: 'center' });
  y += 20;

  // Content Scope Overview Box
  doc.setFillColor(...PDF_COLORS.slateLight);
  doc.setDrawColor(...PDF_COLORS.border);
  doc.roundedRect(24, y, pageWidth - 48, 56, 3, 3, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...PDF_COLORS.primary);
  doc.text('CURRICULAR SCOPE & CORE MODULES INCLUDED:', 30, y + 9);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...PDF_COLORS.slateText);

  let bulletY = y + 17;
  options.topicsCoveredSummary.slice(0, 5).forEach((topic) => {
    doc.setFillColor(...PDF_COLORS.secondary);
    doc.circle(32, bulletY - 1, 1.2, 'F');
    doc.text(topic, 36, bulletY);
    bulletY += 7;
  });

  y += 72;

  // Metadata Table (Author, Department, Date, Edition)
  const metaBoxY = pageHeight - 64;
  doc.setFillColor(...PDF_COLORS.slateLight);
  doc.setDrawColor(...PDF_COLORS.border);
  doc.roundedRect(24, metaBoxY, pageWidth - 48, 38, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...PDF_COLORS.primary);
  doc.text('AUTHOR & PUBLICATION METADATA', 30, metaBoxY + 8);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...PDF_COLORS.slateText);

  doc.text(`Author / Curator: ${options.author}`, 30, metaBoxY + 16);
  doc.text(`Department: ${options.department}`, 30, metaBoxY + 23);
  doc.text(`Academic Series: ${options.edition}`, 30, metaBoxY + 30);

  doc.text(`Curriculum Year: ${options.academicYear}`, pageWidth - 90, metaBoxY + 16);
  doc.text('Verification: Peer-Reviewed CS Hub', pageWidth - 90, metaBoxY + 23);
  doc.text('Status: Full Academic Release', pageWidth - 90, metaBoxY + 30);

  // Bottom footer accent
  doc.setFillColor(...PDF_COLORS.primary);
  doc.rect(0, pageHeight - 8, pageWidth, 8, 'F');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(255, 255, 255);
  doc.text('COMPUTER SCIENCE STUDY HUB • LICENSED FOR STUDENT ACADEMIC STUDY AND UNIVERSITY PREPARATION', pageWidth / 2, pageHeight - 3, { align: 'center' });
}

/**
 * Applies running headers and footers to a page with dynamic total page count
 */
export function applyHeaderFooter(
  doc: jsPDF,
  pageNum: number,
  totalPages: number,
  headerLeft: string,
  headerRight: string
) {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Top header (omit on page 1 cover)
  if (pageNum > 1) {
    doc.setDrawColor(...PDF_COLORS.border);
    doc.setLineWidth(0.4);
    doc.line(14, 15, pageWidth - 14, 15);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(...PDF_COLORS.slateMuted);
    doc.text(headerLeft, 14, 12);
    doc.text(headerRight, pageWidth - 14, 12, { align: 'right' });
  }

  // Bottom footer
  doc.setDrawColor(...PDF_COLORS.border);
  doc.setLineWidth(0.4);
  doc.line(14, pageHeight - 14, pageWidth - 14, pageHeight - 14);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...PDF_COLORS.slateMuted);
  doc.text('CS Study Hub • Curated by Asad Usman (CS Expert) • asadusmansiddiqui1@gmail.com', 14, pageHeight - 9);
  doc.setFont('helvetica', 'bold');
  doc.text(`Page ${pageNum} of ${totalPages}`, pageWidth - 14, pageHeight - 9, { align: 'right' });
}

/**
 * Draws a major chapter header banner
 */
export function drawChapterHeader(
  doc: jsPDF,
  y: number,
  chapterNum: string,
  title: string,
  subtitle?: string
): number {
  const pageWidth = doc.internal.pageSize.getWidth();
  const contentWidth = pageWidth - 28;

  doc.setFillColor(...PDF_COLORS.primary);
  doc.roundedRect(14, y, contentWidth, subtitle ? 24 : 18, 2, 2, 'F');

  // Accent left bar
  doc.setFillColor(...PDF_COLORS.accent);
  doc.rect(14, y, 4, subtitle ? 24 : 18, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text(chapterNum.toUpperCase(), 24, y + 7);

  doc.setFontSize(13);
  doc.text(title, 24, y + 14);

  if (subtitle) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(224, 231, 255);
    doc.text(subtitle, 24, y + 20);
    return y + 30;
  }

  return y + 24;
}

/**
 * Draws a section header
 */
export function drawSectionHeader(doc: jsPDF, y: number, sectionNumber: string, title: string): number {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...PDF_COLORS.slateDark);
  doc.text(`${sectionNumber} ${title}`, 14, y);

  doc.setDrawColor(...PDF_COLORS.border);
  doc.setLineWidth(0.3);
  doc.line(14, y + 2, doc.internal.pageSize.getWidth() - 14, y + 2);

  return y + 8;
}

/**
 * Draws a styled callout box (Concept, Exam Alert, Memory Model)
 */
export function drawCalloutBox(
  doc: jsPDF,
  y: number,
  type: 'concept' | 'exam' | 'tip' | 'architecture',
  title: string,
  content: string
): number {
  const pageWidth = doc.internal.pageSize.getWidth();
  const contentWidth = pageWidth - 28;

  let bg = PDF_COLORS.slateLight;
  let border = PDF_COLORS.border;
  let accent = PDF_COLORS.secondary;
  let titleColor = PDF_COLORS.primary;

  if (type === 'exam') {
    bg = PDF_COLORS.amberBg;
    accent = PDF_COLORS.amber;
    titleColor = PDF_COLORS.amber;
    border = [251, 191, 36];
  } else if (type === 'tip') {
    bg = PDF_COLORS.emeraldBg;
    accent = PDF_COLORS.emerald;
    titleColor = PDF_COLORS.emerald;
    border = [110, 231, 183];
  } else if (type === 'architecture') {
    bg = [241, 245, 249];
    accent = [15, 23, 42];
    titleColor = [15, 23, 42];
    border = [203, 213, 225];
  }

  const lines = doc.splitTextToSize(content, contentWidth - 16);
  const boxHeight = lines.length * 4.5 + 13;

  doc.setFillColor(...bg);
  doc.setDrawColor(...border);
  doc.roundedRect(14, y, contentWidth, boxHeight, 2, 2, 'FD');

  // Left accent strip
  doc.setFillColor(...accent);
  doc.rect(14, y, 3.5, boxHeight, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...titleColor);
  doc.text(title, 22, y + 6.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...PDF_COLORS.slateText);
  doc.text(lines, 22, y + 12);

  return y + boxHeight + 4;
}

/**
 * Draws a code snippet block
 */
export function drawCodeBlock(
  doc: jsPDF,
  y: number,
  title: string,
  code: string,
  language = 'C++'
): number {
  const pageWidth = doc.internal.pageSize.getWidth();
  const contentWidth = pageWidth - 28;

  const rawLines = code.split('\n');
  const codeLines: string[] = [];
  rawLines.forEach((l) => {
    const wrapped = doc.splitTextToSize(l, contentWidth - 16);
    codeLines.push(...wrapped);
  });

  const blockHeight = codeLines.length * 3.8 + 14;

  // Dark IDE style background
  doc.setFillColor(...PDF_COLORS.codeBg);
  doc.roundedRect(14, y, contentWidth, blockHeight, 2, 2, 'F');

  // Header strip inside code block
  doc.setFillColor(15, 23, 42);
  doc.roundedRect(14, y, contentWidth, 7, 2, 2, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  doc.text(`SOURCE LISTING: ${title} (${language})`, 18, y + 5);

  // Code content
  doc.setFont('courier', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(248, 250, 252);

  let codeY = y + 12;
  codeLines.forEach((line) => {
    doc.text(line, 18, codeY);
    codeY += 3.8;
  });

  return y + blockHeight + 4;
}

/**
 * Draws an academic table with alternating row colors
 */
export function drawTable(
  doc: jsPDF,
  y: number,
  headers: string[],
  colWidths: number[],
  rows: string[][]
): number {
  const contentWidth = colWidths.reduce((a, b) => a + b, 0);

  // Table header
  doc.setFillColor(...PDF_COLORS.primary);
  doc.roundedRect(14, y, contentWidth, 7.5, 1, 1, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);

  let currentX = 14;
  headers.forEach((h, i) => {
    doc.text(h, currentX + 3, y + 5);
    currentX += colWidths[i];
  });

  y += 7.5;

  // Table Rows
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.8);

  rows.forEach((row, rowIndex) => {
    const isEven = rowIndex % 2 === 0;
    doc.setFillColor(isEven ? 255 : 248, isEven ? 255 : 250, isEven ? 255 : 252);
    doc.setDrawColor(...PDF_COLORS.border);
    doc.rect(14, y, contentWidth, 7, 'FD');

    doc.setTextColor(...PDF_COLORS.slateText);

    let cellX = 14;
    row.forEach((cell, cellIndex) => {
      doc.text(cell, cellX + 3, y + 4.8);
      cellX += colWidths[cellIndex];
    });

    y += 7;
  });

  return y + 4;
}
