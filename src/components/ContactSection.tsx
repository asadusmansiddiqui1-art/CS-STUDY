import React, { useState } from 'react';
import { Mail, MessageSquare, Copy, Check, Send, ExternalLink, GraduationCap, Sparkles, User, Heart } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const email = 'asadusmansiddiqui1@gmail.com';
  const waUrl = 'https://wa.me/923424622705?text=Hello%20Asad,%20I%20am%20reaching%20out%20via%20CS%20Study%20Hub!';

  const [copiedEmail, setCopiedEmail] = useState(false);

  // Quick message state
  const [studentName, setStudentName] = useState('');
  const [studentMessage, setStudentMessage] = useState('');
  const [preferredChannel, setPreferredChannel] = useState<'whatsapp' | 'email'>('whatsapp');

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `Hello Asad! My name is ${studentName || 'a CS peer'}.\n\nMessage: ${studentMessage || 'I would like to connect regarding CS Study Hub.'}`
    );

    if (preferredChannel === 'whatsapp') {
      window.open(`https://wa.me/923424622705?text=${text}`, '_blank');
    } else {
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(`CS Study Hub Inquiry from ${studentName || 'Student'}`)}&body=${text}`;
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2">
            <User className="w-4 h-4" />
            <span>Developer & Community</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Meet the Developer
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            Created and maintained by <strong className="text-slate-900 dark:text-white">Asad Usman</strong>, a passionate Computer Science Expert dedicated to simplifying computer science fundamentals for university peers.
          </p>
        </div>

        {/* Developer Bio Card & Contact Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Developer Bio & Credentials (5 cols) */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-md">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800 text-white flex items-center justify-center text-2xl font-black shadow-lg shadow-indigo-500/25">
                AU
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                  Asad Usman
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 font-medium mt-0.5">
                  <GraduationCap className="w-4 h-4" />
                  <span>Computer Science Expert &amp; Software Engineer</span>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Department of Computer Science
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              &quot;I created <strong>CS Study Hub</strong> to bridge the gap between lecture slides,
              interactive algorithm practice, and semester planning. Whether you want to debug code,
              revise data structures, or plan your GPA, this hub is built to help us excel together.&quot;
            </p>

            <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 space-y-3">
              <div className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
                Core Interests &amp; Tech Focus
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Data Structures & Algorithms',
                  'C++ & Modern JavaScript',
                  'System Architecture',
                  'Full-Stack Web Development',
                  'Database Optimization',
                ].map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Dedicated Contact Cards & Quick Inquiry (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Two Primary Action Cards: Email & WhatsApp */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Email Card */}
              <div
                id="contact-email-card"
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm hover:border-indigo-400 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-3">
                    <Mail className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Email Address
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    For study queries, feedback &amp; collabs
                  </p>
                  <div className="mt-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 font-mono text-xs text-slate-800 dark:text-slate-200 break-all select-all font-semibold">
                    {email}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                  <a
                    href={`mailto:${email}?subject=CS%20Study%20Hub%20Inquiry`}
                    id="send-email-btn"
                    className="flex-1 py-2 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Email</span>
                  </a>

                  <button
                    type="button"
                    id="copy-email-btn"
                    onClick={handleCopyEmail}
                    className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium transition-colors"
                    title="Copy Email Address"
                  >
                    {copiedEmail ? (
                      <Check className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* WhatsApp Card */}
              <div
                id="contact-whatsapp-card"
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm hover:border-emerald-400 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-3">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    WhatsApp Message
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Instant chat for questions, study notes &amp; discussion
                  </p>
                  <div className="mt-3 p-2.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/60 text-xs font-semibold flex items-center justify-between">
                    <span className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span>Direct WhatsApp Chat</span>
                    </span>
                    <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-sans font-medium">
                      Online &amp; Active
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    id="open-whatsapp-btn"
                    className="w-full py-2.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Send WhatsApp Message</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Direct Quick Inquiry Form */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                Send a Direct Message to Asad
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                Have a recommendation for a new DSA topic, found an edge-case bug, or want study notes? Leave a quick note below:
              </p>

              <form onSubmit={handleSendMessage} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    id="inquiry-student-name"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="Your Name (e.g. Ali / Sarah)"
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />

                  <div className="flex items-center gap-2 p-1 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setPreferredChannel('whatsapp')}
                      className={`flex-1 py-1 px-2 rounded-lg text-xs font-semibold transition-colors ${
                        preferredChannel === 'whatsapp'
                          ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-xs'
                          : 'text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      Send via WhatsApp
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreferredChannel('email')}
                      className={`flex-1 py-1 px-2 rounded-lg text-xs font-semibold transition-colors ${
                        preferredChannel === 'email'
                          ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-xs'
                          : 'text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      Send via Email
                    </button>
                  </div>
                </div>

                <textarea
                  id="inquiry-student-message"
                  value={studentMessage}
                  onChange={(e) => setStudentMessage(e.target.value)}
                  placeholder="Type your message, notes request, or questions here..."
                  rows={3}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  required
                />

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-slate-400">
                    Direct action trigger to {preferredChannel === 'whatsapp' ? 'WhatsApp Message' : 'Email'}
                  </span>

                  <button
                    type="submit"
                    id="submit-inquiry-btn"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
