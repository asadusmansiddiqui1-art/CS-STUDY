import { jsPDF } from 'jspdf';
import { SubjectModule, StudyResource } from '../types';
import { generate20PageSubjectTextbook, generateMasterDegreeMegaBook } from './pdfMasterBookGenerator';
import { applyHeaderFooter, drawAcademicCoverPage, drawChapterHeader, drawCalloutBox, drawTable, PDF_COLORS } from './pdfGeneratorUtils';

export { generate20PageSubjectTextbook, generateMasterDegreeMegaBook };

/**
 * Standard running header & footer helper for quick study resource exports
 */
function addHeaderFooter(doc: jsPDF, pageNum: number, _totalPagesPlaceholder: string, title: string) {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Top header line
  doc.setDrawColor(220, 225, 235);
  doc.setLineWidth(0.5);
  doc.line(14, 15, pageWidth - 14, 15);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('CS Study Hub - Curated by Asad Usman (CS Expert)', 14, 12);
  doc.text(title, pageWidth - 14, 12, { align: 'right' });

  // Bottom footer
  doc.line(14, pageHeight - 14, pageWidth - 14, pageHeight - 14);
  doc.text(`Page ${pageNum}`, pageWidth / 2, pageHeight - 9, { align: 'center' });
  doc.text('Contact: asadusmansiddiqui1@gmail.com | WhatsApp & Mail Support', 14, pageHeight - 9);
}

/**
 * Generate and download a comprehensive 20+ page PDF textbook & study guide for any Core CS Course
 */
export async function generateCoursePdf(subject: SubjectModule) {
  // Directly invoke the 23-page comprehensive academic textbook generator
  await generate20PageSubjectTextbook(subject);
}


/**
 * Generate and download a PDF study guide & lecture slide for Study Resources (DSA)
 */
export function generateResourcePdf(resource: StudyResource) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const contentWidth = pageWidth - 28;
  let y = 24;

  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - 20) {
      doc.addPage();
      y = 24;
      addHeaderFooter(doc, doc.getNumberOfPages(), '', resource.title);
    }
  };

  addHeaderFooter(doc, 1, '', resource.title);

  // Header Banner
  doc.setFillColor(79, 70, 229);
  doc.roundedRect(14, y, contentWidth, 24, 3, 3, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.text(resource.title, 18, y + 10);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.text(`Category: ${resource.category}   |   Est. Read: ${resource.readTime}   |   Slides: ${resource.slideCount} Slides`, 18, y + 17);

  y += 31;

  // Summary
  doc.setTextColor(30, 41, 59);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('Concept Overview', 14, y);
  y += 6;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(71, 85, 105);
  const sumLines = doc.splitTextToSize(resource.summary, contentWidth);
  doc.text(sumLines, 14, y);
  y += sumLines.length * 5 + 6;

  // Complexity Table
  checkPageBreak(30);
  doc.setTextColor(30, 41, 59);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('Asymptotic Complexity Matrix', 14, y);
  y += 6;

  doc.setFillColor(241, 245, 249);
  doc.roundedRect(14, y - 4, contentWidth, 18, 2, 2, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(79, 70, 229);
  doc.text(`Best: ${resource.complexity.best}   |   Average: ${resource.complexity.average}   |   Worst: ${resource.complexity.worst}   |   Space: ${resource.complexity.space}`, 18, y + 2);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text(`Note: ${resource.complexity.notes}`, 18, y + 9);
  y += 20;

  // Key Concepts
  checkPageBreak(25);
  doc.setTextColor(30, 41, 59);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('Key Conceptual Takeaways', 14, y);
  y += 6;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);
  resource.keyConcepts.forEach((kc) => {
    checkPageBreak(8);
    const kcLines = doc.splitTextToSize(`•  ${kc}`, contentWidth);
    doc.text(kcLines, 16, y);
    y += kcLines.length * 4.5 + 2;
  });

  y += 4;

  // Common Pitfalls
  checkPageBreak(25);
  doc.setTextColor(190, 24, 93); // Pink / Rose
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('Common Exam & Coding Pitfalls', 14, y);
  y += 6;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);
  resource.commonPitfalls.forEach((pitfall) => {
    checkPageBreak(8);
    const pLines = doc.splitTextToSize(`⚠️  ${pitfall}`, contentWidth);
    doc.text(pLines, 16, y);
    y += pLines.length * 4.5 + 2;
  });

  y += 4;

  // Practice Problems
  checkPageBreak(25);
  doc.setTextColor(30, 41, 59);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('Standard University Exam & Interview Problems', 14, y);
  y += 6;

  resource.practiceProblems.forEach((prob, idx) => {
    checkPageBreak(20);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(30, 41, 59);
    doc.text(`${idx + 1}. ${prob.title} [${prob.difficulty}]`, 16, y);
    y += 5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(71, 85, 105);
    const desc = doc.splitTextToSize(`Problem: ${prob.description}`, contentWidth - 4);
    doc.text(desc, 18, y);
    y += desc.length * 4 + 1;

    const hint = doc.splitTextToSize(`Optimal Strategy: ${prob.approachHint}`, contentWidth - 4);
    doc.setTextColor(79, 70, 229);
    doc.text(hint, 18, y);
    y += hint.length * 4 + 4;
  });

  doc.save(resource.downloadFileName.replace(/\.md$/, '.pdf'));
}
