import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Shield, Lock, FileText, ExternalLink, Activity } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-lavender-200/80 pt-12 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-600 to-rosebud-400 flex items-center justify-center text-white">
                <Heart className="w-4 h-4 fill-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-charcoal-900">Vericove</span>
            </div>
            <p className="text-sm font-medium text-brand-800 italic">
              "Your Symptoms Deserve to Be Heard."
            </p>
            <p className="text-xs text-charcoal-500 leading-relaxed">
              An AI-powered women's health intelligence platform combining symptom journaling, anonymous peer community, verified doctor discovery, and peer-reviewed scientific literature.
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-lavender-50 border border-lavender-200 text-xs text-brand-800">
              <Shield className="w-3.5 h-3.5 text-brand-600" />
              <span>Built for HerHack 2026</span>
            </div>
          </div>

          {/* Platform Sections */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-400 mb-3">Patient Platform</h4>
            <ul className="space-y-2 text-sm text-charcoal-600">
              <li><Link to="/dashboard" className="hover:text-brand-700 transition-colors">Patient Dashboard</Link></li>
              <li><Link to="/symptoms" className="hover:text-brand-700 transition-colors">Symptom Tracker</Link></li>
              <li><Link to="/ai-insights" className="hover:text-brand-700 transition-colors">AI Symptom Intelligence</Link></li>
              <li><Link to="/community" className="hover:text-brand-700 transition-colors">Anonymous Community</Link></li>
              <li><Link to="/reports" className="hover:text-brand-700 transition-colors">Clinical Reports</Link></li>
            </ul>
          </div>

          {/* Research & Doctors */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-400 mb-3">Evidence & Care</h4>
            <ul className="space-y-2 text-sm text-charcoal-600">
              <li><Link to="/research" className="hover:text-brand-700 transition-colors">Research Library</Link></li>
              <li><Link to="/research/collections" className="hover:text-brand-700 transition-colors">Curated Collections</Link></li>
              <li><Link to="/doctors" className="hover:text-brand-700 transition-colors">Verified Doctors Directory</Link></li>
              <li><Link to="/appointments" className="hover:text-brand-700 transition-colors">Appointments</Link></li>
            </ul>
          </div>

          {/* Compliance & Architecture */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-400 mb-3">Safety & Architecture</h4>
            <ul className="space-y-2 text-sm text-charcoal-600">
              <li><Link to="/profile" className="hover:text-brand-700 transition-colors">Privacy & Data Consent</Link></li>
              <li>
                <span className="text-xs text-charcoal-500 block">
                  Backend API Base: <code className="bg-lavender-100 px-1 py-0.5 rounded text-[11px] text-brand-800">/api</code>
                </span>
              </li>
              <li>
                <span className="text-xs text-charcoal-500 block">
                  Database: <span className="font-semibold text-charcoal-700">Central PostgreSQL</span>
                </span>
              </li>
              <li>
                <span className="text-xs text-charcoal-500 block">
                  Doctor Dashboard: <span className="text-xs text-purple-700 font-medium">Modular branch</span>
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Medical disclaimer strip */}
        <div className="pt-6 pb-4 border-t border-lavender-100 text-xs text-charcoal-500 leading-relaxed text-center max-w-4xl mx-auto">
          <p>
            <strong>Medical Notice:</strong> Information on Vericove is provided for educational and clinical consultation preparation purposes. It does not formulate medical diagnoses, prescribe drugs, or substitute for consultation with a licensed healthcare practitioner. In case of medical emergencies, contact local emergency services immediately.
          </p>
        </div>

        {/* Bottom copyright */}
        <div className="pt-4 border-t border-lavender-100 flex flex-col sm:flex-row items-center justify-between text-xs text-charcoal-400 gap-2">
          <p>© 2026 Vericove Platform. Developed for HerHack 2026. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/profile" className="hover:text-charcoal-600">Privacy Policy</Link>
            <Link to="/profile" className="hover:text-charcoal-600">Patient Rights</Link>
            <Link to="/profile" className="hover:text-charcoal-600">Consent Settings</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
