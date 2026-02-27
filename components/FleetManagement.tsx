
import React from 'react';
import { Truck, AlertTriangle, FileText, Settings, ShieldCheck, Map, Gauge } from 'lucide-react';

const vehicles = [
  { id: '1', plate: '1234 ABC', model: 'Iveco Eurocargo', status: 'Ruta', fuel: '82%' },
  { id: '2', plate: '5678 DEF', model: 'Scania R450', status: 'Base', fuel: '45%' },
  { id: '3', plate: '9012 GHI', model: 'Volvo FH', status: 'Taller', fuel: '12%' },
];

const FleetManagement: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
       <div>
         <h1 className="text-3xl font-extrabold text-[#1b4e9b]">Gestión de Flota</h1>
         <p className="text-slate-400 font-medium">Control de activos móviles de Digitalización LASO.</p>
       </div>

       <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-blue-900/5">
             <div className="flex items-center justify-between mb-8">
                <h3 className="font-extrabold text-xl text-slate-800 flex items-center gap-3"><Truck className="text-[#1b4e9b]" /> Monitorización</h3>
                <button className="text-xs font-black text-[#3a9cfd] uppercase tracking-widest hover:underline">Mapa en Vivo</button>
             </div>
             <div className="space-y-4">
                {vehicles.map(v => (
                   <div key={v.id} className="flex items-center justify-between p-5 bg-slate-50 rounded-3xl border border-slate-100 hover:border-blue-200 transition-all group">
                      <div className="flex items-center gap-4">
                         <div className="p-3 bg-white rounded-2xl shadow-sm text-[#1b4e9b] group-hover:bg-[#1b4e9b] group-hover:text-white transition-colors">
                            <Gauge size={20} />
                         </div>
                         <div>
                            <p className="text-lg font-black text-slate-800 leading-none">{v.plate}</p>
                            <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-tighter">{v.model}</p>
                         </div>
                      </div>
                      <div className="flex items-center gap-6">
                         <div className="text-right">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Combustible</p>
                            <div className="flex items-center gap-2">
                               <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                  <div className={`h-full rounded-full ${parseInt(v.fuel) < 20 ? 'bg-red-500' : 'bg-[#3a9cfd]'}`} style={{width: v.fuel}}></div>
                               </div>
                               <span className="text-xs font-black text-slate-700">{v.fuel}</span>
                            </div>
                         </div>
                         <div className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                            v.status === 'Ruta' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'
                         }`}>{v.status}</div>
                      </div>
                   </div>
                ))}
             </div>
          </div>

          <div className="space-y-8">
             <div className="bg-gradient-to-br from-[#1b4e9b] to-[#0072bc] p-10 rounded-[2.5rem] text-white shadow-xl shadow-blue-900/10">
                <h3 className="font-extrabold text-xl mb-6 flex items-center gap-3"><ShieldCheck /> Seguridad Laboral</h3>
                <div className="p-6 bg-white/10 rounded-3xl backdrop-blur-md border border-white/20">
                   <div className="flex items-start gap-4 mb-4">
                      <AlertTriangle className="text-yellow-400 shrink-0" size={24} />
                      <div>
                         <p className="font-bold text-lg">Revisión EPIs</p>
                         <p className="text-sm text-white/70 leading-relaxed">Se ha detectado caducidad en el lote de guantes dieléctricos. Por favor, revisa el almacén.</p>
                      </div>
                   </div>
                   <button className="w-full py-4 bg-white text-[#1b4e9b] rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg">Solicitar Renovación</button>
                </div>
             </div>

             <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                <h3 className="font-extrabold text-slate-800 mb-6 flex items-center gap-3"><FileText className="text-[#3a9cfd]" /> Documentación de Flota</h3>
                <div className="space-y-3">
                   {['Seguro Obligatorio 2024.pdf', 'Certificado ITV - 1234ABC.pdf', 'Permiso Transportes.pdf'].map(doc => (
                      <div key={doc} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-all cursor-pointer">
                         <div className="flex items-center gap-3">
                            <FileText size={18} className="text-[#1b4e9b]" />
                            <span className="text-sm font-bold text-slate-700">{doc}</span>
                         </div>
                         <span className="text-[10px] font-black text-[#3a9cfd] uppercase">Descargar</span>
                      </div>
                   ))}
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};

export default FleetManagement;
