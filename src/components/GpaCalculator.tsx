import React, { useState, useMemo } from 'react';
import { Calculator, Plus, Trash2, RotateCcw, Copy, Check, Award, BookCheck, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { CourseGradeItem, GradeScaleItem } from '../types';

export const gradeScale: GradeScaleItem[] = [
  { grade: 'A', point: 4.0, percentageRange: '85% - 100%', description: 'Exceptional / Outstanding' },
  { grade: 'A-', point: 3.67, percentageRange: '80% - 84%', description: 'Excellent' },
  { grade: 'B+', point: 3.33, percentageRange: '75% - 79%', description: 'Very Good' },
  { grade: 'B', point: 3.0, percentageRange: '70% - 74%', description: 'Good' },
  { grade: 'B-', point: 2.67, percentageRange: '65% - 69%', description: 'Above Average' },
  { grade: 'C+', point: 2.33, percentageRange: '61% - 64%', description: 'Average' },
  { grade: 'C', point: 2.0, percentageRange: '58% - 60%', description: 'Satisfactory' },
  { grade: 'C-', point: 1.67, percentageRange: '55% - 57%', description: 'Pass' },
  { grade: 'D', point: 1.0, percentageRange: '50% - 54%', description: 'Low Pass' },
  { grade: 'F', point: 0.0, percentageRange: '0% - 49%', description: 'Fail' },
];

const initialCourses: CourseGradeItem[] = [
  { id: '1', name: 'Data Structures & Algorithms', creditHours: 4, grade: 'A' },
  { id: '2', name: 'Database Systems', creditHours: 4, grade: 'A-' },
  { id: '3', name: 'Computer Networks', creditHours: 3, grade: 'B+' },
  { id: '4', name: 'Technical Writing', creditHours: 3, grade: 'A' },
  { id: '5', name: 'Linear Algebra', creditHours: 3, grade: 'B' },
];

export const GpaCalculator: React.FC = () => {
  const [courses, setCourses] = useState<CourseGradeItem[]>(initialCourses);
  const [includeCgpa, setIncludeCgpa] = useState<boolean>(false);
  const [prevCgpa, setPrevCgpa] = useState<string>('3.50');
  const [prevCredits, setPrevCredits] = useState<string>('34');
  const [showScale, setShowScale] = useState<boolean>(false);
  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);

  // Calculate SGPA
  const { totalCredits, totalQualityPoints, sgpa, standing } = useMemo(() => {
    let credSum = 0;
    let pointSum = 0;

    courses.forEach((c) => {
      const scaleObj = gradeScale.find((g) => g.grade === c.grade);
      const points = scaleObj ? scaleObj.point : 0;
      credSum += Number(c.creditHours);
      pointSum += Number(c.creditHours) * points;
    });

    const calculatedSgpa = credSum > 0 ? pointSum / credSum : 0;

    let academicStanding = 'Good Standing';
    let standingColor = 'text-indigo-600 dark:text-indigo-400';

    if (calculatedSgpa >= 3.7) {
      academicStanding = "Dean's Honor List";
      standingColor = 'text-emerald-600 dark:text-emerald-400';
    } else if (calculatedSgpa >= 3.0) {
      academicStanding = 'First Division / Good Standing';
      standingColor = 'text-indigo-600 dark:text-indigo-400';
    } else if (calculatedSgpa >= 2.0) {
      academicStanding = 'Satisfactory Progress';
      standingColor = 'text-amber-600 dark:text-amber-400';
    } else {
      academicStanding = 'Academic Warning / Probation';
      standingColor = 'text-rose-600 dark:text-rose-400';
    }

    return {
      totalCredits: credSum,
      totalQualityPoints: pointSum,
      sgpa: calculatedSgpa,
      standing: { text: academicStanding, color: standingColor },
    };
  }, [courses]);

  // Calculate Cumulative CGPA if enabled
  const cumulativeStats = useMemo(() => {
    if (!includeCgpa) return null;
    const pCgpa = parseFloat(prevCgpa) || 0;
    const pCreds = parseFloat(prevCredits) || 0;

    const priorTotalPoints = pCgpa * pCreds;
    const combinedCredits = pCreds + totalCredits;
    const combinedPoints = priorTotalPoints + totalQualityPoints;

    const finalCgpa = combinedCredits > 0 ? combinedPoints / combinedCredits : 0;

    return {
      finalCgpa,
      totalDegreeCredits: combinedCredits,
    };
  }, [includeCgpa, prevCgpa, prevCredits, totalCredits, totalQualityPoints]);

  const handleAddCourse = () => {
    const newId = String(Date.now());
    setCourses([
      ...courses,
      { id: newId, name: `Course ${courses.length + 1}`, creditHours: 3, grade: 'B+' },
    ]);
  };

  const handleRemoveCourse = (id: string) => {
    if (courses.length <= 1) return;
    setCourses(courses.filter((c) => c.id !== id));
  };

  const handleUpdateCourse = (id: string, field: keyof CourseGradeItem, value: any) => {
    setCourses(courses.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
  };

  const handleReset = () => {
    setCourses(initialCourses);
  };

  const handleCopySummary = async () => {
    const lines = [
      '--- CS STUDY HUB: SEMESTER GPA REPORT ---',
      `Semester GPA (SGPA): ${sgpa.toFixed(2)}`,
      `Total Credit Hours: ${totalCredits}`,
      `Total Quality Points: ${totalQualityPoints.toFixed(2)}`,
      `Academic Standing: ${standing.text}`,
      '',
      'Courses Breakdown:',
      ...courses.map(
        (c) => `- ${c.name}: ${c.creditHours} Credits, Grade: ${c.grade}`
      ),
    ];

    if (cumulativeStats) {
      lines.push('');
      lines.push(`Cumulative CGPA: ${cumulativeStats.finalCgpa.toFixed(2)}`);
      lines.push(`Total Degree Credits: ${cumulativeStats.totalDegreeCredits}`);
    }

    lines.push('\nCalculated via CS Study Hub by Asad Usman (CS Expert)');
    await navigator.clipboard.writeText(lines.join('\n'));
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  return (
    <section id="gpa-calculator" className="py-16 md:py-20 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2">
              <Calculator className="w-4 h-4" />
              <span>Academic Utility Tool</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
              Semester GPA Calculator
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl">
              Calculate semester SGPA and cumulative CGPA according to standard university 4.0 grading guidelines. Add courses, assign credit hours, and project your academic standing.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              id="gpa-scale-toggle-btn"
              onClick={() => setShowScale(!showScale)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 shadow-xs transition-colors"
            >
              <Info className="w-3.5 h-3.5 text-indigo-500" />
              <span>{showScale ? 'Hide Grade Scale' : 'View Grade Scale'}</span>
              {showScale ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Collapsible Grade Scale Reference */}
        {showScale && (
          <div className="mb-8 p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md">
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-3">
              Standard 4.0 GPA Grading Scale Matrix
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 text-xs">
              {gradeScale.map((item) => (
                <div
                  key={item.grade}
                  className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-800"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-white text-sm">
                      {item.grade}
                    </span>
                    <span className="font-mono font-semibold text-indigo-600 dark:text-indigo-400">
                      {item.point.toFixed(2)}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    {item.percentageRange}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main Grid: Course Rows vs Score Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Courses Input Table (8 cols) */}
          <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Semester Course Enrollment
              </h3>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  id="gpa-reset-btn"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              </div>
            </div>

            {/* Courses Rows */}
            <div className="space-y-3">
              {courses.map((course, index) => (
                <div
                  key={course.id}
                  className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-3 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-800/70"
                >
                  <span className="text-xs font-mono font-bold text-slate-400 w-5 shrink-0 pl-1 hidden sm:inline">
                    {index + 1}.
                  </span>

                  {/* Course Name */}
                  <input
                    type="text"
                    id={`course-name-${course.id}`}
                    value={course.name}
                    onChange={(e) => handleUpdateCourse(course.id, 'name', e.target.value)}
                    placeholder="Course name"
                    className="flex-1 px-3 py-1.5 text-xs sm:text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />

                  {/* Credit Hours Selector */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="text-xs text-slate-500 dark:text-slate-400 sm:hidden">Credits:</span>
                    <select
                      id={`course-credits-${course.id}`}
                      value={course.creditHours}
                      onChange={(e) =>
                        handleUpdateCourse(course.id, 'creditHours', Number(e.target.value))
                      }
                      className="px-2.5 py-1.5 text-xs sm:text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value={1}>1 Credit</option>
                      <option value={2}>2 Credits</option>
                      <option value={3}>3 Credits</option>
                      <option value={4}>4 Credits</option>
                      <option value={5}>5 Credits</option>
                      <option value={6}>6 Credits</option>
                    </select>
                  </div>

                  {/* Grade Selector */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="text-xs text-slate-500 dark:text-slate-400 sm:hidden">Grade:</span>
                    <select
                      id={`course-grade-${course.id}`}
                      value={course.grade}
                      onChange={(e) => handleUpdateCourse(course.id, 'grade', e.target.value)}
                      className="px-3 py-1.5 text-xs sm:text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      {gradeScale.map((item) => (
                        <option key={item.grade} value={item.grade}>
                          {item.grade} ({item.point.toFixed(2)})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Delete Row Button */}
                  <button
                    type="button"
                    id={`remove-course-${course.id}`}
                    onClick={() => handleRemoveCourse(course.id)}
                    disabled={courses.length <= 1}
                    className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg disabled:opacity-30 transition-colors self-end sm:self-center"
                    title="Remove course"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add Course Button */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                type="button"
                id="add-course-row-btn"
                onClick={handleAddCourse}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-semibold transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Course Row</span>
              </button>

              <label className="flex items-center gap-2 cursor-pointer text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 select-none">
                <input
                  type="checkbox"
                  id="include-cgpa-checkbox"
                  checked={includeCgpa}
                  onChange={(e) => setIncludeCgpa(e.target.checked)}
                  className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                />
                <span>Include Cumulative CGPA Calculation</span>
              </label>
            </div>

            {/* CGPA inputs if checked */}
            {includeCgpa && (
              <div className="mt-5 p-4 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200/70 dark:border-indigo-900/40 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-indigo-900 dark:text-indigo-200 mb-1">
                    Previous Cumulative CGPA
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="4.0"
                    id="previous-cgpa-input"
                    value={prevCgpa}
                    onChange={(e) => setPrevCgpa(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs sm:text-sm bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-800 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-indigo-900 dark:text-indigo-200 mb-1">
                    Previous Total Earned Credits
                  </label>
                  <input
                    type="number"
                    min="0"
                    id="previous-credits-input"
                    value={prevCredits}
                    onChange={(e) => setPrevCredits(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs sm:text-sm bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-800 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Results Summary Card (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 text-white rounded-2xl p-6 shadow-xl border border-indigo-800/60 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-36 h-36 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>

              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
                  Semester Calculation
                </span>
                <Award className="w-5 h-5 text-amber-400" />
              </div>

              {/* Big SGPA metric */}
              <div className="text-center py-4">
                <div className="text-5xl sm:text-6xl font-extrabold tracking-tight font-mono text-white">
                  {sgpa.toFixed(2)}
                </div>
                <div className="text-xs text-indigo-200 mt-1 font-medium">
                  Semester GPA (out of 4.00)
                </div>

                <div className="mt-3 inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-xs font-semibold">
                  {standing.text}
                </div>
              </div>

              {/* Stats Breakdown */}
              <div className="mt-4 pt-4 border-t border-indigo-800/80 grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-indigo-300 block">Total Credits</span>
                  <span className="font-bold text-sm font-mono text-white">{totalCredits}</span>
                </div>
                <div>
                  <span className="text-indigo-300 block">Quality Points</span>
                  <span className="font-bold text-sm font-mono text-white">
                    {totalQualityPoints.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Cumulative CGPA block if active */}
              {cumulativeStats && (
                <div className="mt-4 pt-4 border-t border-indigo-800/80">
                  <span className="text-indigo-300 text-xs block">Projected Cumulative CGPA</span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-2xl font-bold font-mono text-emerald-400">
                      {cumulativeStats.finalCgpa.toFixed(2)}
                    </span>
                    <span className="text-xs text-indigo-200">
                      across {cumulativeStats.totalDegreeCredits} credits
                    </span>
                  </div>
                </div>
              )}

              {/* Copy summary button */}
              <button
                type="button"
                id="copy-gpa-summary-btn"
                onClick={handleCopySummary}
                className="mt-6 w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/15 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                {copiedSummary ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Summary Copied to Clipboard</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Breakdown Report</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick tips card */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-2 shadow-xs">
              <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
                <BookCheck className="w-4 h-4 text-indigo-500" />
                <span>GPA Tips for CS Students</span>
              </div>
              <p>
                A high grade in a 4-credit course (like DSA or Database Systems) heavily impacts
                your SGPA more than 1 or 2-credit labs. Prioritize heavy credit core subjects!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
