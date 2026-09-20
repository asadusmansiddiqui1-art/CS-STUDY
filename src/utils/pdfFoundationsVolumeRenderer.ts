import { jsPDF } from 'jspdf';
import {
  drawChapterHeader,
  drawSectionHeader,
  drawCalloutBox,
  drawCodeBlock,
  drawTable,
  PDF_COLORS
} from './pdfGeneratorUtils';
import {
  whatIsComputerSections,
  whatIsCplSections,
  whatIsProgrammingSections,
  whatAreLanguagesSections
} from '../data/foundationsCurriculumData';

/**
 * Renders Volume 0: Foundations of Computing, CPL & Programming Languages
 * Total Pages: Exactly 30 Pages (Pages 7 to 36 of 216)
 */
export async function renderVolume0Foundations(
  doc: jsPDF,
  nextPage: (headerLeft: string, headerRight: string, statusLabel?: string) => Promise<number>,
  contentWidth: number
): Promise<void> {
  // -------------------------------------------------------------
  // CHAPTER 0.1: WHAT IS A COMPUTER? (8 PAGES: PAGES 7 TO 14)
  // -------------------------------------------------------------
  for (let i = 0; i < whatIsComputerSections.length; i++) {
    const sec = whatIsComputerSections[i];
    const pageNum = 7 + i;
    let y = await nextPage(
      'Volume 0: Computer Foundations',
      `Chapter 0.1: What is a Computer? (Part ${i + 1}/8)`,
      `Drafting Volume 0: What is a Computer? (Page ${pageNum} of 216)...`
    );

    y = drawChapterHeader(
      doc,
      y,
      `Chapter 0.1 • Part ${i + 1}`,
      sec.title,
      sec.subtitle
    );

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(...PDF_COLORS.slateText);
    const splitOverview = doc.splitTextToSize(sec.overview, contentWidth);
    doc.text(splitOverview, 14, y);
    y += splitOverview.length * 4.2 + 3;

    // Render Table if available
    if (sec.tableData) {
      y = drawTable(doc, y, sec.tableData.headers, sec.tableData.colWidths, sec.tableData.rows);
      y += 2;
    }

    // Render Code Listing if available
    if (sec.codeListing) {
      y = drawCodeBlock(doc, y, sec.codeListing.title, sec.codeListing.code, sec.codeListing.language);
      y = drawCalloutBox(doc, y, 'concept', 'EXECUTION TRACE & ANALYSIS', sec.codeListing.explanation);
    }

    // Render Callouts
    if (sec.callouts && sec.callouts.length > 0) {
      for (const callout of sec.callouts) {
        y = drawCalloutBox(doc, y, callout.type, callout.title, callout.body);
      }
    }

    // Render Key Points if space permits
    if (sec.keyPoints && sec.keyPoints.length > 0 && y < 240) {
      y = drawSectionHeader(doc, y, `0.1.${i + 1}`, 'Core Theoretical & Architectural Deductions');
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(...PDF_COLORS.slateText);
      for (const kp of sec.keyPoints) {
        if (y > 270) break;
        const splitKp = doc.splitTextToSize(`• ${kp}`, contentWidth);
        doc.text(splitKp, 14, y);
        y += splitKp.length * 3.8 + 1.5;
      }
    }
  }

  // -------------------------------------------------------------
  // CHAPTER 0.2: WHAT IS CPL? (8 PAGES: PAGES 15 TO 22)
  // -------------------------------------------------------------
  for (let i = 0; i < whatIsCplSections.length; i++) {
    const sec = whatIsCplSections[i];
    const pageNum = 15 + i;
    let y = await nextPage(
      'Volume 0: Language Lineage',
      `Chapter 0.2: What is CPL? & History (Part ${i + 1}/8)`,
      `Drafting Volume 0: What is CPL? & Lineage (Page ${pageNum} of 216)...`
    );

    y = drawChapterHeader(
      doc,
      y,
      `Chapter 0.2 • Part ${i + 1}`,
      sec.title,
      sec.subtitle
    );

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(...PDF_COLORS.slateText);
    const splitOverview = doc.splitTextToSize(sec.overview, contentWidth);
    doc.text(splitOverview, 14, y);
    y += splitOverview.length * 4.2 + 3;

    if (sec.tableData) {
      y = drawTable(doc, y, sec.tableData.headers, sec.tableData.colWidths, sec.tableData.rows);
      y += 2;
    }

    if (sec.codeListing) {
      y = drawCodeBlock(doc, y, sec.codeListing.title, sec.codeListing.code, sec.codeListing.language);
      y = drawCalloutBox(doc, y, 'concept', 'GRAMMATICAL & SYNTACTICAL INSIGHT', sec.codeListing.explanation);
    }

    if (sec.callouts && sec.callouts.length > 0) {
      for (const callout of sec.callouts) {
        y = drawCalloutBox(doc, y, callout.type, callout.title, callout.body);
      }
    }

    if (sec.keyPoints && sec.keyPoints.length > 0 && y < 240) {
      y = drawSectionHeader(doc, y, `0.2.${i + 1}`, 'Key Historical Breakthroughs & Lessons');
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(...PDF_COLORS.slateText);
      for (const kp of sec.keyPoints) {
        if (y > 270) break;
        const splitKp = doc.splitTextToSize(`• ${kp}`, contentWidth);
        doc.text(splitKp, 14, y);
        y += splitKp.length * 3.8 + 1.5;
      }
    }
  }

  // -------------------------------------------------------------
  // CHAPTER 0.3: WHAT IS PROGRAMMING? (6 PAGES: PAGES 23 TO 28)
  // -------------------------------------------------------------
  for (let i = 0; i < whatIsProgrammingSections.length; i++) {
    const sec = whatIsProgrammingSections[i];
    const pageNum = 23 + i;
    let y = await nextPage(
      'Volume 0: Science of Programming',
      `Chapter 0.3: Theory of Programming (Part ${i + 1}/6)`,
      `Drafting Volume 0: Theory of Programming (Page ${pageNum} of 216)...`
    );

    y = drawChapterHeader(
      doc,
      y,
      `Chapter 0.3 • Part ${i + 1}`,
      sec.title,
      sec.subtitle
    );

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(...PDF_COLORS.slateText);
    const splitOverview = doc.splitTextToSize(sec.overview, contentWidth);
    doc.text(splitOverview, 14, y);
    y += splitOverview.length * 4.2 + 3;

    if (sec.tableData) {
      y = drawTable(doc, y, sec.tableData.headers, sec.tableData.colWidths, sec.tableData.rows);
      y += 2;
    }

    if (sec.codeListing) {
      y = drawCodeBlock(doc, y, sec.codeListing.title, sec.codeListing.code, sec.codeListing.language);
      y = drawCalloutBox(doc, y, 'concept', 'ALGORITHMIC ANALYSIS & PROOF', sec.codeListing.explanation);
    }

    if (sec.callouts && sec.callouts.length > 0) {
      for (const callout of sec.callouts) {
        y = drawCalloutBox(doc, y, callout.type, callout.title, callout.body);
      }
    }

    if (sec.keyPoints && sec.keyPoints.length > 0 && y < 240) {
      y = drawSectionHeader(doc, y, `0.3.${i + 1}`, 'Algorithmic Invariants & Verification Rules');
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(...PDF_COLORS.slateText);
      for (const kp of sec.keyPoints) {
        if (y > 270) break;
        const splitKp = doc.splitTextToSize(`• ${kp}`, contentWidth);
        doc.text(splitKp, 14, y);
        y += splitKp.length * 3.8 + 1.5;
      }
    }
  }

  // -------------------------------------------------------------
  // CHAPTER 0.4: PROGRAMMING LANGUAGES TAXONOMY (8 PAGES: PAGES 29 TO 36)
  // -------------------------------------------------------------
  for (let i = 0; i < whatAreLanguagesSections.length; i++) {
    const sec = whatAreLanguagesSections[i];
    const pageNum = 29 + i;
    let y = await nextPage(
      'Volume 0: Language Taxonomy',
      `Chapter 0.4: Programming Languages (Part ${i + 1}/8)`,
      `Drafting Volume 0: Language Paradigms & Compilers (Page ${pageNum} of 216)...`
    );

    y = drawChapterHeader(
      doc,
      y,
      `Chapter 0.4 • Part ${i + 1}`,
      sec.title,
      sec.subtitle
    );

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(...PDF_COLORS.slateText);
    const splitOverview = doc.splitTextToSize(sec.overview, contentWidth);
    doc.text(splitOverview, 14, y);
    y += splitOverview.length * 4.2 + 3;

    if (sec.tableData) {
      y = drawTable(doc, y, sec.tableData.headers, sec.tableData.colWidths, sec.tableData.rows);
      y += 2;
    }

    if (sec.codeListing) {
      y = drawCodeBlock(doc, y, sec.codeListing.title, sec.codeListing.code, sec.codeListing.language);
      y = drawCalloutBox(doc, y, 'concept', 'COMPILATION & RUNTIME SEMANTICS', sec.codeListing.explanation);
    }

    if (sec.callouts && sec.callouts.length > 0) {
      for (const callout of sec.callouts) {
        y = drawCalloutBox(doc, y, callout.type, callout.title, callout.body);
      }
    }

    if (sec.keyPoints && sec.keyPoints.length > 0 && y < 240) {
      y = drawSectionHeader(doc, y, `0.4.${i + 1}`, 'Taxonomy Criteria & Architectural Principles');
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(...PDF_COLORS.slateText);
      for (const kp of sec.keyPoints) {
        if (y > 270) break;
        const splitKp = doc.splitTextToSize(`• ${kp}`, contentWidth);
        doc.text(splitKp, 14, y);
        y += splitKp.length * 3.8 + 1.5;
      }
    }
  }
}
