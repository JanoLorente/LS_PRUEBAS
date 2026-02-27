
import React from 'react';
import { Clock, CheckCircle, AlertTriangle, Users, TrendingUp, CalendarDays, ArrowUpRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { name: 'Lun', hours: 8.2 },
  { name: 'Mar', hours: 7.8 },
  { name: 'Mie', hours: 9.1 },
  { name: 'Jue', hours: 8.0 },
  { name: 'Vie', hours: 8.5 },
];

const StatCard = ({ title, value, icon: Icon, trend }: any) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
    <div className="flex items-center justify-between mb-4">
      <div className="p-3 rounded-xl bg-blue-50 text-[#1b4e9b] group-hover:bg-[#1b4e9b] group-hover:text-white transition-colors">
        <Icon size={22} />
      </div>
      {trend && (
        <span className="flex items-center text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
          <ArrowUpRight size={12} className="mr-1" /> {trend}%
        </span>
      )}
    </div>
    <h3 className="text-slate-400 text-xs font-black uppercase tracking-widest">{title}</h3>
    <p className="text-3xl font-bold text-slate-800 mt-1">{value}</p>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#1b4e9b] tracking-tight">Panel de Control</h1>
          <p className="text-slate-400 font-medium">Visualización de datos de Digitalización LASO</p>
        </div>
        <div className="flex gap-2">
           <button className="px-4 py-2 bg-[#1b4e9b] text-white rounded-lg text-sm font-bold shadow-lg shadow-blue-900/20 hover:bg-[#0072bc] transition-all">Generar Informe</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Fichajes Activos" value="128" icon={Clock} trend={12} />
        <StatCard title="Ausencias Hoy" value="08" icon={AlertTriangle} />
        <StatCard title="Total Plantilla" value="142" icon={Users} />
        <StatCard title="Eficiencia" value="96.4%" icon={TrendingUp} trend={4} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-extrabold text-xl text-slate-800">Actividad Semanal</h2>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
               <div className="w-3 h-3 bg-[#1b4e9b] rounded-full"></div> Horas Reales
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{top: 0, right: 0, left: -20, bottom: 0}}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="hours" radius={[6, 6, 0, 0]} barSize={40}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.hours > 8 ? '#3a9cfd' : '#1b4e9b'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-[#1b4e9b] to-[#0072bc] p-8 rounded-3xl text-white shadow-xl shadow-blue-900/10">
            <h2 className="font-bold text-lg mb-6 flex items-center gap-2"><Clock size={20} /> Tu Jornada</h2>
            <div className="text-center py-4">
               <p className="text-5xl font-black mb-2">04:22:15</p>
               <p className="text-sm text-white/60 font-medium">Entrada hoy: 08:32 AM</p>
            </div>
            <button className="w-full mt-6 py-4 bg-white text-[#1b4e9b] rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-50 transition-all shadow-lg">
               Pausar Turno
            </button>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h2 className="font-bold text-slate-800 mb-4">Acciones Directas</h2>
            <div className="grid grid-cols-2 gap-3">
               <button className="p-4 bg-slate-50 hover:bg-blue-50 rounded-2xl text-center transition-all group">
                  <CalendarDays className="mx-auto mb-2 text-slate-400 group-hover:text-[#1b4e9b]" size={24} />
                  <span className="text-xs font-bold text-slate-600">Vacaciones</span>
               </button>
               <button className="p-4 bg-slate-50 hover:bg-blue-50 rounded-2xl text-center transition-all group">
                  <AlertTriangle className="mx-auto mb-2 text-slate-400 group-hover:text-[#3a9cfd]" size={24} />
                  <span className="text-xs font-bold text-slate-600">Incidencia</span>
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
