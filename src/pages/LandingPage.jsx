import React from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  Sparkles,
  Users,
  Stethoscope,
  BookOpen,
  FileText,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Clock,
  Lock,
  ChevronRight,
  Search,
  MessageSquareHeart,
  Activity
} from 'lucide-react';
import { Badge, DemoDataBadge } from '../components/common/Badge';
import MedicalDisclaimer from '../components/common/MedicalDisclaimer';

export const LandingPage = () => {
  return (
    <div className="space-y-20 pb-16 overflow-hidden">

      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28">
        {/* Soothing background decorative glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-brand-200/40 via-lavender-200/30 to-rosebud-200/30 blur-3xl -z-10 rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-lavender-100/90 border border-lavender-300/80 text-brand-900 text-xs sm:text-sm font-semibold mb-6 shadow-xs animate-in fade-in slide-in-from-bottom-2">
            <Sparkles className="w-4 h-4 text-brand-600" />
            <span>AI-Powered Women's Health Intelligence</span>
          </div>

          {/* Hero Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-charcoal-950 tracking-tight leading-[1.15] max-w-4xl mx-auto">
            Your Health. Your Voice. <br className="hidden sm:block" />
            <span className="text-gradient">Your Journey.</span>
          </h1>

          {/* Supporting Text */}
          <p className="mt-6 text-lg sm:text-xl text-charcoal-600 max-w-3xl mx-auto leading-relaxed">
            A safe space to understand your symptoms, connect with women who share similar experiences, explore trusted health information and find healthcare professionals who listen.
          </p>

          {/* Action Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/signup"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-brand-600 via-lavender-700 to-brand-700 text-white font-bold text-base shadow-card hover:shadow-elevated hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="#features"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-white border border-lavender-200 text-charcoal-800 font-semibold text-base hover:bg-lavender-50 transition-all shadow-soft flex items-center justify-center gap-2"
            >
              <span>Explore Features</span>
              <ChevronRight className="w-4 h-4 text-charcoal-400" />
            </a>
          </div>

          {/* Trust Highlights */}
          <div className="mt-12 pt-8 border-t border-lavender-200/60 max-w-2xl mx-auto flex flex-wrap items-center justify-center gap-6 text-xs text-charcoal-500">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>100% Anonymous Community</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-brand-600" />
              <span>Verified Physician Directory</span>
            </div>
            <div className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <span>Evidence-Based Research Hub</span>
            </div>
          </div>

        </div>
      </section>

      {/* 2. PROBLEM STATEMENT (The Reality of Medical Gaslighting) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-charcoal-900 to-charcoal-950 text-white p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-elevated">

          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-600/20 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-300">The Problem We Are Solving</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-2 mb-6 tracking-tight">
              Women's health symptoms are too often dismissed, minimized, or misunderstood.
            </h2>
            <p className="text-charcoal-300 text-base sm:text-lg leading-relaxed mb-8">
              Medical bias and diagnostic delay are systemic realities. Many women spend an average of <strong>7.4 years</strong> searching for an accurate diagnosis for chronic conditions like endometriosis or PCOS, frequently told their debilitating pain is "just normal periods" or "just stress."
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-charcoal-800">
              <div className="space-y-1">
                <p className="text-3xl font-extrabold text-brand-300">7.4 Years</p>
                <p className="text-xs text-charcoal-400">Average diagnostic latency for chronic women's pelvic conditions.</p>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-extrabold text-rosebud-300">62%</p>
                <p className="text-xs text-charcoal-400">Of patients report pain dismissed during initial clinical consultations.</p>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-extrabold text-emerald-300">3x Faster</p>
                <p className="text-xs text-charcoal-400">Diagnosis timeline when presenting structured chronological data.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. PLATFORM CORE FEATURES */}
      <section id="features" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-700">Holistic Ecosystem</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-charcoal-900 mt-2 tracking-tight">
            Comprehensive tools to understand, advocate, and heal.
          </h2>
          <p className="mt-4 text-charcoal-600 text-base">
            Every feature is engineered to bridge the communication gap between patients, communities, and licensed clinicians.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* Feature 1 */}
          <div className="p-7 rounded-3xl bg-white border border-lavender-200/80 shadow-card hover:shadow-elevated transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-brand-100 text-brand-700 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-charcoal-900 mb-2">Dynamic Symptom Tracker</h3>
              <p className="text-sm text-charcoal-600 leading-relaxed">
                Log pain levels, body areas, cycle phases, and triggers with intuitive precision. Discover cyclical correlations across weeks and months.
              </p>
            </div>
            <Link to="/symptoms" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-900">
              <span>View Tracker</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Feature 2 */}
          <div className="p-7 rounded-3xl bg-white border border-lavender-200/80 shadow-card hover:shadow-elevated transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-charcoal-900 mb-2">AI Symptom Intelligence</h3>
              <p className="text-sm text-charcoal-600 leading-relaxed">
                Speak or type naturally. Our non-diagnostic AI extracts structured symptoms, maps timelines, and generates objective consultation questions.
              </p>
            </div>
            <Link to="/ai-insights" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-900">
              <span>Try AI Intelligence</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Feature 3 */}
          <div className="p-7 rounded-3xl bg-white border border-lavender-200/80 shadow-card hover:shadow-elevated transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-rosebud-100 text-rosebud-700 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-charcoal-900 mb-2">Anonymous Peer Community</h3>
              <p className="text-sm text-charcoal-600 leading-relaxed">
                Share questions and emotional support with complete anonymity using pseudonyms. Real experiences categorised by condition without stigma.
              </p>
            </div>
            <Link to="/community" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-900">
              <span>Join Discussions</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Feature 4 */}
          <div className="p-7 rounded-3xl bg-white border border-lavender-200/80 shadow-card hover:shadow-elevated transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-charcoal-900 mb-2">Research & Knowledge Hub</h3>
              <p className="text-sm text-charcoal-600 leading-relaxed">
                Explore real peer-reviewed papers with DOIs, PMIDs, evidence grading, and simplified summaries. Save studies to cite in medical visits.
              </p>
            </div>
            <Link to="/research" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-900">
              <span>Browse Research</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Feature 5 */}
          <div className="p-7 rounded-3xl bg-white border border-lavender-200/80 shadow-card hover:shadow-elevated transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Stethoscope className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-charcoal-900 mb-2">Verified Doctor Directory</h3>
              <p className="text-sm text-charcoal-600 leading-relaxed">
                Find empathetic gynecologists, endocrinologists, and pelvic pain specialists whose medical registrations and credentials have been verified.
              </p>
            </div>
            <Link to="/doctors" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-900">
              <span>Find Specialists</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Feature 6 */}
          <div className="p-7 rounded-3xl bg-white border border-lavender-200/80 shadow-card hover:shadow-elevated transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-charcoal-900 mb-2">Clinical Health Reports</h3>
              <p className="text-sm text-charcoal-600 leading-relaxed">
                Generate clean, printable PDF consultation packets that transform fragmented symptoms into chronological charts that physicians respect.
              </p>
            </div>
            <Link to="/reports" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-900">
              <span>Generate Brief</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section className="bg-lavender-50/60 py-16 border-y border-lavender-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-700">The Patient Journey</span>
            <h2 className="text-3xl font-extrabold text-charcoal-900 mt-2">How Vericove Empowers You</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-2xl bg-white shadow-soft border border-lavender-200/60">
              <div className="w-12 h-12 rounded-full bg-brand-600 text-white font-bold text-lg flex items-center justify-center mx-auto mb-4">1</div>
              <h4 className="font-bold text-charcoal-900 mb-1">Track & Log</h4>
              <p className="text-xs text-charcoal-600 leading-relaxed">Record daily pain, cycle variations, and triggers in seconds.</p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-white shadow-soft border border-lavender-200/60">
              <div className="w-12 h-12 rounded-full bg-brand-600 text-white font-bold text-lg flex items-center justify-center mx-auto mb-4">2</div>
              <h4 className="font-bold text-charcoal-900 mb-1">AI Pattern Synthesis</h4>
              <p className="text-xs text-charcoal-600 leading-relaxed">Organize symptoms into clinical timelines and doctor questions.</p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-white shadow-soft border border-lavender-200/60">
              <div className="w-12 h-12 rounded-full bg-brand-600 text-white font-bold text-lg flex items-center justify-center mx-auto mb-4">3</div>
              <h4 className="font-bold text-charcoal-900 mb-1">Peer & Evidence Support</h4>
              <p className="text-xs text-charcoal-600 leading-relaxed">Exchange anonymous insights and access peer-reviewed papers.</p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-white shadow-soft border border-lavender-200/60">
              <div className="w-12 h-12 rounded-full bg-brand-600 text-white font-bold text-lg flex items-center justify-center mx-auto mb-4">4</div>
              <h4 className="font-bold text-charcoal-900 mb-1">Consult with Confidence</h4>
              <p className="text-xs text-charcoal-600 leading-relaxed">Share clear clinical summaries with verified practitioners who listen.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PRIVACY & SECURITY HIGHLIGHTS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-lavender-200 shadow-card flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-brand-800 text-xs font-semibold">
              <Lock className="w-3.5 h-3.5" />
              <span>Privacy By Design</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-charcoal-900">
              Your health data is intimate. You own it completely.
            </h3>
            <p className="text-sm text-charcoal-600 leading-relaxed">
              We separate community discussions under custom pseudonyms from your private clinical symptom records. You control what information you share with consulting physicians.
            </p>
            <div className="flex flex-wrap gap-4 text-xs font-medium text-charcoal-700 pt-2">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Granular Doctor Sharing
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Non-diagnostic Safeguards
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> No Hidden Data Brokering
              </span>
            </div>
          </div>

          <div className="w-full md:w-auto p-6 rounded-2xl bg-lavender-50 border border-lavender-200/80 text-center min-w-[280px]">
            <p className="text-xs font-semibold uppercase tracking-wider text-charcoal-500 mb-1">Architecture</p>
            <p className="text-base font-bold text-brand-900 mb-4">REST API & Database Ready</p>
            <div className="space-y-2 text-xs text-left">
              <div className="p-2 rounded-lg bg-white border border-lavender-200 flex justify-between">
                <span className="text-charcoal-600">Backend:</span>
                <span className="font-semibold text-charcoal-900">Central REST API</span>
              </div>
              <div className="p-2 rounded-lg bg-white border border-lavender-200 flex justify-between">
                <span className="text-charcoal-600">Database:</span>
                <span className="font-semibold text-charcoal-900">PostgreSQL</span>
              </div>
              <div className="p-2 rounded-lg bg-white border border-lavender-200 flex justify-between">
                <span className="text-charcoal-600">Doctor Module:</span>
                <span className="font-semibold text-charcoal-900">Independent Branch</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS (Clearly labeled as demo content) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-700">Patient Experiences</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-charcoal-900 mt-1">What Women Share</h2>
          </div>
          <DemoDataBadge label="SIMULATED DEMO STORIES" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-lavender-200/80 shadow-soft flex flex-col justify-between">
            <p className="text-sm text-charcoal-700 italic leading-relaxed mb-6">
              "For four years I was told my pain was psychosomatic. Generating a 6-month clinical summary from Vericove helped my new gynecologist recognize severe endometriosis on our very first consultation."
            </p>
            <div className="flex items-center gap-3 pt-4 border-t border-lavender-100">
              <div className="w-9 h-9 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm">
                AL
              </div>
              <div>
                <p className="text-sm font-bold text-charcoal-900">Aria L.</p>
                <p className="text-xs text-charcoal-500">Member • Endometriosis Journey</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-lavender-200/80 shadow-soft flex flex-col justify-between">
            <p className="text-sm text-charcoal-700 italic leading-relaxed mb-6">
              "Finding the 2023 international PCOS guideline in the Research Hub gave me the exact scientific terms to ask for fasting insulin testing. Finally felt like an informed partner in my care."
            </p>
            <div className="flex items-center gap-3 pt-4 border-t border-lavender-100">
              <div className="w-9 h-9 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-sm">
                SK
              </div>
              <div>
                <p className="text-sm font-bold text-charcoal-900">Samira K.</p>
                <p className="text-xs text-charcoal-500">Member • PCOS Support</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-lavender-200/80 shadow-soft flex flex-col justify-between">
            <p className="text-sm text-charcoal-700 italic leading-relaxed mb-6">
              "The community was the first place where people didn't say 'everyone has cramps'. Having verified physicians listed with their actual credentials gave me peace of mind when booking telehealth."
            </p>
            <div className="flex items-center gap-3 pt-4 border-t border-lavender-100">
              <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
                ET
              </div>
              <div>
                <p className="text-sm font-bold text-charcoal-900">Elena T.</p>
                <p className="text-xs text-charcoal-500">Member • Chronic Pelvic Pain</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. BOTTOM CALL TO ACTION */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-brand-700 via-lavender-700 to-rosebud-600 text-white p-8 sm:p-14 text-center shadow-elevated relative overflow-hidden">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Your Symptoms Deserve to Be Heard.
          </h2>
          <p className="text-lavender-100 max-w-2xl mx-auto text-base sm:text-lg mb-8 leading-relaxed">
            Join Vericove today to start tracking your health journey, connecting with peer communities, and discovering healthcare professionals who truly listen.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/signup"
              className="px-8 py-3.5 rounded-2xl bg-white text-brand-900 font-bold text-base shadow-lg hover:bg-lavender-50 transition-all"
            >
              Get Started with Vericove
            </Link>
            <Link
              to="/dashboard"
              className="px-8 py-3.5 rounded-2xl bg-brand-800/60 border border-white/30 text-white font-semibold text-base hover:bg-brand-800 transition-all"
            >
              Open Patient Portal
            </Link>
          </div>
        </div>
      </section>

      {/* Standard Disclaimer at Bottom of Landing */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <MedicalDisclaimer />
      </section>

    </div>
  );
};

export default LandingPage;
