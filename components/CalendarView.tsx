
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Download, Calendar, Info, AlertCircle, CheckCircle2, XCircle, HelpCircle, Clock } from 'lucide-react';
import { CalendarEvent } from '../types';

const CalendarView: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);
  const weekDays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

  // Mock de eventos con estados de vacaciones
  const mockEvents: Record<number, Partial<CalendarEvent>> = {
    1: { type: 'holiday' },
    12: { type: 'incident' },
    13: { type: 'incident' },
    15: { type: 'vacation_approved' },
    16: { type: 'vacation_approved' },
    20: { type: 'vacation_denied', denialReason: 'Coincidencia con pico de producción y falta de personal en el departamento de Logística.' },
    21: { type: 'vacation_denied', denialReason: 'Periodo de cierre contable obligatorio.' },
    24: { type: 'vacation_pending' },
    25: { type: 'vacation_pending' },
  };

  const getDayType = (day: number) => {
    // Sábados y Domingos aproximados para Mayo 2024
    if ([5, 12, 19, 26].includes(day)) return 'sunday';
    return mockEvents[day]?.type || 'work';
  };

  const dayStyles: any = {
    work: 'bg-white text-slate-800 border-slate-100',
    holiday: 'bg-red-50 text-red-600 border-red-100',
    sunday: 'bg-slate-50 text-slate-300 border-slate-100',
    incident: 'bg-blue-50 text-[#1b4e9b] border-blue-100',
    vacation_approved: 'bg-green-50 text-green-600 border-green-100',
    vacation_pending: 'bg-amber-50/50 text-amber-600 border-amber-400 border-dashed animate-pulse shadow-[inset_0_0_12px_rgba(245,158,11,0.1)]',
    vacation_denied: 'bg-orange-100 text-orange-700 border-orange-300 ring-2 ring-orange-200 ring-inset',
  };

  const selectedEvent = selectedDay ? mockEvents[selectedDay] : null;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#1b4e9b]">Calendario Laboral</h1>
          <p className="text-slate-400 font-medium">Visualiza tu año laboral y solicita ausencias</p>
        </div>
        <div className="flex items-center bg-white p-1 rounded-xl shadow-sm border border-slate-100">
           <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400"><ChevronLeft size={20} /></button>
           <span className="px-6 font-black text-slate-800 uppercase tracking-widest text-sm">Mayo 2024</span>
           <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400"><ChevronRight size={20} /></button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        <div className="xl:col-span-3 bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-blue-900/5">
           <div className="grid grid-cols-7 mb-6">
              {weekDays.map(d => (
                <div key={d} className="text-center text-[10px] font-black text-slate-400 uppercase tracking-widest pb-4">{d}</div>
              ))}
           </div>
           
           <div className="grid grid-cols-7 gap-3">
              <div className="aspect-square"></div>
              <div className="aspect-square"></div>
              {daysInMonth.map(day => {
                const type = getDayType(day);
                return (
                  <button 
                    key={day} 
                    onClick={() => setSelectedDay(day)}
                    className={`
                      aspect-square rounded-3xl border-2 flex flex-col items-center justify-center relative group cursor-pointer transition-all hover:scale-105
                      ${dayStyles[type]}
                      ${selectedDay === day ? 'ring-4 ring-[#3a9cfd]/20 !border-[#3a9cfd]' : ''}
                    `}
                  >
                    <span className="text-lg font-black">{day}</span>
                    {type === 'work' && <span className="text-[8px] font-bold opacity-40 mt-1 uppercase">8.0h</span>}
                    {type === 'vacation_denied' && <XCircle size={12} className="absolute top-2 right-2" />}
                    {type === 'vacation_approved' && <CheckCircle2 size={12} className="absolute top-2 right-2" />}
                    {type === 'vacation_pending' && <Clock size={12} className="absolute top-2 right-2 animate-spin-slow" style={{ animationDuration: '4s' }} />}
                  </button>
                );
              })}
           </div>

           <div className="mt-12 border-t border-slate-50 pt-8">
              <div className="flex items-center gap-2 mb-6">
                <HelpCircle size={14} className="text-[#3a9cfd]" />
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Leyenda del Calendario</h4>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-4 gap-x-8">
                <div className="flex items-center gap-3">
                   <div className={`w-5 h-5 rounded-lg border ${dayStyles.work}`}></div>
                   <span className="text-[11px] font-bold text-slate-600">Jornada Ordinaria</span>
                </div>
                <div className="flex items-center gap-3">
                   <div className={`w-5 h-5 rounded-lg border ${dayStyles.holiday}`}></div>
                   <span className="text-[11px] font-bold text-slate-600">Día Festivo</span>
                </div>
                <div className="flex items-center gap-3">
                   <div className={`w-5 h-5 rounded-lg border ${dayStyles.incident}`}></div>
                   <span className="text-[11px] font-bold text-slate-600">Incidencia</span>
                </div>
                <div className="flex items-center gap-3">
                   <div className={`w-5 h-5 rounded-lg border ${dayStyles.vacation_approved}`}></div>
                   <span className="text-[11px] font-bold text-slate-600">Aprobadas</span>
                </div>
                <div className="flex items-center gap-3">
                   <div className={`w-5 h-5 rounded-lg border-2 border-dashed border-amber-400 bg-amber-50/50`}></div>
                   <span className="text-[11px] font-bold text-amber-600 italic">Pendientes (En revisión)</span>
                </div>
                <div className="flex items-center gap-3">
                   <div className={`w-5 h-5 rounded-lg border ${dayStyles.vacation_denied}`}></div>
                   <span className="text-[11px] font-bold text-slate-600">Denegada</span>
                </div>
                <div className="flex items-center gap-3">
                   <div className={`w-5 h-5 rounded-lg border ${dayStyles.sunday}`}></div>
                   <span className="text-[11px] font-bold text-slate-400">Fin de Semana</span>
                </div>
              </div>
           </div>
        </div>

        <div className="space-y-6">
           <div className="bg-[#1b4e9b] p-8 rounded-[2rem] text-white shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                 <div className="p-2 bg-white/10 rounded-lg"><Calendar size={20} /></div>
                 <h3 className="font-bold">Nueva Solicitud</h3>
              </div>
              <p className="text-sm text-white/70 mb-6 leading-relaxed">Selecciona días en el calendario para solicitar tus vacaciones.</p>
              <button className="w-full py-4 bg-white text-[#1b4e9b] rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-50 transition-all shadow-xl shadow-blue-900/40">
                Iniciar Solicitud
              </button>
           </div>

           {selectedDay && (
             <div className={`p-8 rounded-[2rem] border animate-in slide-in-from-right-4 transition-all ${
               selectedEvent?.type === 'vacation_denied' ? 'bg-orange-50 border-orange-200' : 
               selectedEvent?.type === 'vacation_pending' ? 'bg-amber-50 border-amber-200' : 'bg-white border-slate-100'
             }`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-extrabold text-slate-800">Día {selectedDay} Mayo</h3>
                  {selectedEvent?.type === 'vacation_pending' && <Clock className="text-amber-500" size={18} />}
                </div>
                
                {selectedEvent?.type === 'vacation_pending' ? (
                  <div className="space-y-3">
                    <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest">Estado: Pendiente de RRHH</p>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium">
                      Tu solicitud ha sido recibida correctamente. Recibirás una notificación en cuanto sea revisada por tu responsable de área.
                    </p>
                    <div className="pt-2">
                       <button className="text-xs font-bold text-amber-700 hover:underline">Cancelar solicitud</button>
                    </div>
                  </div>
                ) : selectedEvent?.type === 'vacation_denied' ? (
                  <div className="space-y-3">
                    <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest">Solicitud Denegada</p>
                    <div className="bg-white p-4 rounded-2xl border border-orange-100">
                      <p className="text-xs text-slate-600 leading-relaxed font-medium italic">
                        "{selectedEvent.denialReason}"
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-slate-400">Jornada laboral estándar. No hay incidencias para este día.</p>
                )}
             </div>
           )}

           <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
              <h3 className="font-extrabold text-slate-800 mb-6 flex items-center gap-2"><Info size={18} className="text-[#3a9cfd]" /> Estadísticas 2024</h3>
              <div className="space-y-6">
                 <div>
                    <div className="flex justify-between text-xs font-bold mb-2">
                       <span className="text-slate-400 uppercase tracking-tighter">Disponibles</span>
                       <span className="text-slate-800">12 / 24</span>
                    </div>
                    <div className="h-2 bg-slate-50 rounded-full overflow-hidden">
                       <div className="h-full bg-[#1b4e9b] w-1/2 rounded-full"></div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
