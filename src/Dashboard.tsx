import React, { useEffect, useState } from 'react';
import { GraduationCap, Users, TrendingUp, IndianRupee, LogOut, Search, RefreshCw } from 'lucide-react';

interface Enrollment {
  id: number;
  name: string;
  email: string;
  phone: string;
  education: string;
  program: string;
  amount: number;
  paymentId: string;
  status: string;
  createdAt: string;
}

const Dashboard: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchEnrollments = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/enrollments');
      const data = await response.json();
      setEnrollments(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const filteredEnrollments = enrollments.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.paymentId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalRevenue = enrollments.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="min-h-screen bg-slate-50/50 font-sans">
      <header className="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-500 p-2 rounded-xl text-white shadow-lg shadow-indigo-100">
            <GraduationCap size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Admin Panel</h1>
            <p className="text-xs text-slate-500 font-medium">Live enrollments</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <button onClick={onLogout} className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-start justify-between">
            <div><p className="text-slate-500 text-sm font-medium mb-1">Total Enrollments</p><h2 className="text-4xl font-bold text-slate-900">{enrollments.length}</h2></div>
            <div className="bg-indigo-500 p-2.5 rounded-xl text-white"><Users size={20} /></div>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-start justify-between">
            <div><p className="text-slate-500 text-sm font-medium mb-1">Paid</p><h2 className="text-4xl font-bold text-slate-900">{enrollments.length}</h2></div>
            <div className="bg-blue-500 p-2.5 rounded-xl text-white"><TrendingUp size={20} /></div>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-start justify-between">
            <div><p className="text-slate-500 text-sm font-medium mb-1">Revenue</p><h2 className="text-4xl font-bold text-slate-900">₹{totalRevenue.toLocaleString()}</h2></div>
            <div className="bg-violet-500 p-2.5 rounded-xl text-white"><IndianRupee size={20} /></div>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-4 flex items-center justify-between gap-4 border-b border-slate-50">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input type="text" placeholder="Search..." className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-none rounded-xl text-sm" onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            <button onClick={fetchEnrollments} className="flex items-center gap-2 px-4 py-2.5 text-slate-600 hover:text-slate-900 text-sm font-medium border border-slate-100 rounded-xl">
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} /> Refresh
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                  <th className="px-6 py-4">Name</th><th className="px-6 py-4">Email</th><th className="px-6 py-4">Phone</th>
                  <th className="px-6 py-4">Program</th><th className="px-6 py-4">Amount</th><th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredEnrollments.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">{item.name}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{item.email}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{item.phone}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{item.program}</td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-900">₹{item.amount}</td>
                    <td className="px-6 py-4"><span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-[10px] font-bold uppercase">{item.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;