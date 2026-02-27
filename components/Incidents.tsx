
import React, { useState } from 'react';
import { AlertCircle, Clock, CheckCircle, XCircle, Search, Filter, MessageSquare, X } from 'lucide-react';

const mockIncidentsData = [
  { id: '1', employee: 'David Ruiz', type: 'Error App', date: 'Hoy, 09:30', detail: 'No pude cerrar el turno desde el móvil.', status: 'pending' },
  { id: '2', employee: 'Laura Sanz', type: 'Olvido', date: 'Ayer', detail: 'Olvido de fichaje de entrada.', status: 'approved' },
  { id: '3', employee: 'Carlos V.', type: 'Geoloc', date: '22 May', detail: 'Error de ubicación al fichar en cliente.', status: 'rejected' },
];

const Incidents: React.FC = () => {
  const [incidents, setIncidents] = useState(mockIncidentsData);
  const [showConfirm, setShowConfirm] = useState<{id: string, type: 'resolve' | 'reject', employee: string} | null>(null);
  const [reason, setReason] = useState('');

  const handleAction = () => {
    if (!showConfirm) return;
    
    setIncidents(prev => prev.map(inc => 
      inc.id === showConfirm.id 
        ? { ...inc, status: showConfirm.type === 'resolve' ? 'approved' : 'rejected' } 
        : inc
    ));
    
    setShowConfirm(null);
    setReason('');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-[#1b4e9b]">Incidencias</h1>
          <p className="text-slate-400 font-medium">Gestión de errores de registro y correcciones.</p>
        </div>
        <div className="flex gap-3">
           <button className="bg-white border border-slate-200 text-slate-600 px-6 py-2 rounded-xl font-bold hover:bg-slate-50 transition-all">Exportar PDF</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-5">
            <div className="p-4 bg-blue-50 text-[#1b4e9b] rounded-2xl"><Clock size={24} /></div>
            <div>
               <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Pendientes</p>
               <p className="text-3xl font-black text-slate-800">12</p>
            </div>
         </div>
         <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-5">
            <div className="p-4 bg-blue-600 text-white rounded-2xl"><CheckCircle size={24} /></div>
            <div>
               <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Resueltas</p>
               <p className="text-3xl font-black text-slate-800">142</p>
            </div>
         </div>
         <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-5">
            <div className="p-4 bg-slate-100 text-slate-400 rounded-2xl"><MessageSquare size={24} /></div>
            <div>
               <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Totales</p>
               <p className="text-3xl font-black text-slate-800">154</p>
            </div>
         </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-blue-900/5 overflow-hidden">
         <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 relative w-full">
               <Search size={18} className="absolute left-4 top-3.5 text-slate-300" />
               <input type="text" placeholder="Filtrar por empleado o tipo..." className="w-full bg-slate-50 pl-12 pr-4 py-3.5 rounded-2xl border-none outline-none text-sm font-medium" />
            </div>
            <button className="px-8 py-3.5 bg-[#1b4e9b] text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:opacity-90 transition-all shadow-lg shadow-blue-900/20">
               Nueva Incidencia
            </button>
         </div>

         <div className="divide-y divide-slate-50">
            {incidents.map((inc) => (
               <div key={inc.id} className="p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:bg-blue-50/20 transition-all group">
                  <div className="flex items-center gap-5">
                     <div className="w-14 h-14 bg-gradient-to-br from-[#1b4e9b] to-[#0072bc] rounded-2xl flex items-center justify-center font-black text-white shadow-lg shadow-blue-900/10">
                        {inc.employee[0]}
                     </div>
                     <div>
                        <p className="font-extrabold text-slate-800 text-lg">{inc.employee}</p>
                        <p className="text-xs font-bold text-[#3a9cfd] uppercase tracking-tighter">{inc.type} • {inc.date}</p>
                     </div>
                  </div>
                  
                  <div className="flex-1 lg:px-12">
                     <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        <p className="text-sm text-slate-600 font-medium leading-relaxed italic">"{inc.detail}"</p>
                     </div>
                  </div>

                  <div className="flex items-center gap-3 w-full lg:w-auto">
                     {inc.status === 'pending' ? (
                        <>
                           <button 
                             onClick={() => setShowConfirm({id: inc.id, type: 'reject', employee: inc.employee})}
                             className="flex-1 lg:flex-none px-6 py-3 text-slate-400 font-black text-xs uppercase hover:text-red-500 transition-colors"
                           >
                             Rechazar
                           </button>
                           <button 
                             onClick={() => setShowConfirm({id: inc.id, type: 'resolve', employee: inc.employee})}
                             className="flex-1 lg:flex-none px-8 py-3 bg-[#1b4e9b] text-white font-black text-xs uppercase rounded-2xl shadow-md hover:bg-[#0072bc] transition-all"
                           >
                             Resolver
                           </button>
                        </>
                     ) : (
                        <div className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest ${
                           inc.status === 'approved' ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400'
                        }`}>
                           {inc.status === 'approved' ? <CheckCircle size={14} /> : <XCircle size={14} />}
                           {inc.status === 'approved' ? 'Aprobada' : 'Denegada'}
                        </div>
                     )}
                  </div>
               </div>
            ))}
         </div>
      </div>

      {/* Modal de Confirmación */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[2.5rem] w-full max-w-md shadow-2xl overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-200">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-black text-slate-800">Confirmar Acción</h3>
                  <p className="text-sm text-slate-400 font-medium mt-1">Vas a {showConfirm.type === 'resolve' ? 'aprobar' : 'rechazar'} la incidencia de {showConfirm.employee}.</p>
                </div>
                <button onClick={() => setShowConfirm(null)} className="p-2 hover:bg-slate-50 rounded-full text-slate-300 hover:text-slate-800 transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest">Justificación / Motivo</label>
                <textarea 
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Escribe aquí el motivo del cambio de estado..."
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 text-sm font-medium outline-none focus:border-[#1b4e9b]/20 focus:ring-4 ring-[#1b4e9b]/5 transition-all resize-none h-32"
                />
              </div>

              <div className="mt-8 flex gap-3">
                <button 
                  onClick={() => setShowConfirm(null)}
                  className="flex-1 py-4 bg-slate-50 text-slate-400 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-100 transition-all"
                >
                  Cancelar
                </button>
                <button 
                  onClick={handleAction}
                  disabled={!reason.trim()}
                  className={`flex-1 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg transition-all ${
                    showConfirm.type === 'resolve' 
                      ? 'bg-[#1b4e9b] text-white shadow-blue-900/20 hover:opacity-90 disabled:opacity-50' 
                      : 'bg-red-500 text-white shadow-red-500/20 hover:bg-red-600 disabled:opacity-50'
                  }`}
                >
                  Confirmar {showConfirm.type === 'resolve' ? 'Aprobación' : 'Rechazo'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Incidents;
