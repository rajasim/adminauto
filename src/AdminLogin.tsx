import React, { useState } from 'react';
import { ShieldCheck, Lock, ArrowLeft } from 'lucide-react';

interface AdminLoginProps {
  onLogin: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [activeTab, setActiveTab] = useState<'signin' | 'create'>('signin');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This triggers the state change in App.tsx to show the dashboard
    onLogin();
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 font-sans">
      
      {/* Back to site link */}
      <button className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors mb-6 text-sm self-center sm:absolute sm:top-12 sm:left-1/2 sm:-translate-x-[220px]">
        <ArrowLeft size={16} />
        Back to site
      </button>

      {/* Main Card */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-8 border border-slate-100/50">
        
        {/* Header Section */}
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-indigo-600 p-2.5 rounded-xl shadow-lg shadow-indigo-200">
            <ShieldCheck className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 leading-tight">Admin Access</h1>
            <p className="text-slate-500 text-sm">Sign in to manage enrollments</p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex p-1 bg-slate-100 rounded-xl mb-8">
          <button
            type="button"
            onClick={() => setActiveTab('signin')}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
              activeTab === 'signin' 
              ? 'bg-white text-slate-900 shadow-sm' 
              : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Sign in
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('create')}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
              activeTab === 'create' 
              ? 'bg-white text-slate-900 shadow-sm' 
              : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Create admin
          </button>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700 ml-1">Email</label>
            <input
              required
              type="email"
              placeholder="admin@yoursite.com"
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all placeholder:text-slate-400"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700 ml-1">Password</label>
            <input
              required
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all"
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit"
            className="w-full group relative flex items-center justify-center gap-2 py-3.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-semibold rounded-xl hover:opacity-95 transition-all shadow-lg shadow-indigo-100 overflow-hidden active:scale-[0.98]"
          >
            <Lock size={18} className="transition-transform group-hover:-translate-y-0.5" />
            <span>Sign in</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;