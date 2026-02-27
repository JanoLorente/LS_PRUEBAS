
import React, { useState } from 'react';
import { 
  Play, 
  Square, 
  Download, 
  Plus, 
  MapPin, 
  Search, 
  Crosshair, 
  AlertTriangle, 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp,
  MapPinned,
  Compass
} from 'lucide-react';
import { GeoLocation } from '../types';

const mockLogs = [
  { 
    id: '1', 
    date: '24 May 2024', 
    start: '08:00', 
    end: '14:30', 
    status: 'OK', 
    total: '06:30', 
    gps: true,
    lat: 38.8786,
    lng: -6.9702,
    accuracy: 12
  },
  { 
    id: '2', 
    date: '24 May 2024', 
    start: '15:30', 
    end: '17:30', 
    status: 'OK', 
    total: '02:00', 
    gps: true,
    lat: 38.8791,
    lng: -6.9715,
    accuracy: 8
  },
  { 
    id: '3', 
    date: '23 May 2024', 
    start: '08:15', 
    end: '17:45', 
    status: 'ERROR', 
    total: '09:30', 
    gps: false,
    lat: 38.8500,
    lng: -6.9500,
    accuracy: 150
  },
  { 
    id: '4', 
    date: '22 May 2024', 
    start: '08:02', 
    end: '16:55', 
    status: 'OK', 
    total: '08:53', 
    gps: true,
    lat: 38.8780,
    lng: -6.9690,
    accuracy: 15
  },
];

const TimeTracking: React.FC = () => {
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [currentCoords, setCurrentCoords] = useState<GeoLocation | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);

  const requestGPS = () => {
    if (!navigator.geolocation) {
      setLocationError("El navegador no soporta geolocalización.");
      return;
    }

    setIsLocating(true);
    setLocationError(null);

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp
        });
        setIsLocating(false);
      },
      (error) => {
        let msg = "No se pudo obtener la ubicación GPS.";
        if (error.code === 1) msg = "Permiso de GPS denegado.";
        else if (error.code === 2) msg = "Señal de GPS no disponible.";
        
        setLocationError(msg);
        setIsLocating(false);
      },
      options
    );
  };

  const handleClockAction = () => {
    if (!isClockedIn) {
      requestGPS();
      setIsClockedIn(true);
    } else {
      setIsClockedIn(false);
      setCurrentCoords(null);
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedRowId(expandedRowId === id ? null : id);
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-8 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-[#1b4e9b]">Control de Presencia</h1>
          <p className="text-slate-400 font-medium">Prioridad GPS activa para dispositivos móviles.</p>
        </div>
        <div className="flex gap-2">
          <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-[#1b4e9b] transition-colors">
            <Download size={20} />
          </button>
          <button className="flex items-center gap-2 px-6 py-2 bg-[#1b4e9b] text-white rounded-lg font-bold shadow-lg shadow-blue-900/20 hover:bg-[#0072bc] transition-all">
            <Plus size={18} /> Nuevo Registro
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl shadow-blue-900/5 border border-slate-100 overflow-hidden flex flex-col lg:flex-row">
        <div className="p-10 flex-1 border-b lg:border-b-0 lg:border-r border-slate-100">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${
              isLocating ? 'bg-amber-50 text-amber-600 border-amber-200 animate-pulse' :
              currentCoords ? 'bg-green-50 text-green-600 border-green-200' : 
              locationError ? 'bg-red-50 text-red-600 border-red-200' :
              'bg-blue-50 text-[#1b4e9b] border-blue-100'
            }`}>
              {isLocating ? <Crosshair size={14} className="animate-spin" /> : 
               currentCoords ? <ShieldCheck size={14} /> : 
               locationError ? <AlertTriangle size={14} /> : <MapPin size={14} />}
              
              {isLocating ? 'Buscando Satélites GPS...' : 
               currentCoords ? 'Ubicación GPS Verificada' : 
               locationError ? 'Error: Usando Red/IP' : 'Central LASO - Badajoz'}
            </div>
            
            {currentCoords && (
              <span className="text-[10px] font-mono text-slate-400">
                {currentCoords.latitude.toFixed(5)}, {currentCoords.longitude.toFixed(5)} (±{Math.round(currentCoords.accuracy)}m)
              </span>
            )}
          </div>

          <h2 className="text-4xl font-black text-slate-800 tracking-tight leading-none mb-4">
            {isClockedIn ? 'Turno en curso...' : 'Fuera de jornada'}
          </h2>
          
          <div className="flex gap-2">
             <span className="px-3 py-1 bg-slate-50 text-slate-400 text-[10px] font-black uppercase rounded-full tracking-widest border border-slate-100">Logística</span>
             <span className="px-3 py-1 bg-slate-50 text-slate-400 text-[10px] font-black uppercase rounded-full tracking-widest border border-slate-100">8h/día</span>
          </div>
          
          <div className="mt-12 flex flex-col sm:flex-row sm:items-center gap-6">
            <button 
              onClick={handleClockAction}
              disabled={isLocating}
              className={`
                h-20 w-20 rounded-3xl flex items-center justify-center transition-all shadow-xl active:scale-95 disabled:opacity-50
                ${isClockedIn 
                  ? 'bg-red-500 text-white shadow-red-200' 
                  : 'bg-[#1b4e9b] text-white shadow-blue-200'}
              `}
            >
              {isClockedIn ? <Square size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
            </button>
            <div>
               <p className="text-5xl font-mono font-black text-slate-800 tabular-nums leading-none">
                 {isClockedIn ? "02:44:09" : "00:00:00"}
               </p>
               <p className="text-xs font-bold text-slate-400 mt-2 italic uppercase tracking-tighter">
                 {isLocating ? 'Sincronizando ubicación...' : 'Fichaje geolocalizado mediante dispositivo'}
               </p>
            </div>
          </div>

          {locationError && (
            <div className="mt-6 flex items-start gap-3 p-4 bg-red-50 rounded-2xl border border-red-100 text-red-600 text-sm">
              <AlertTriangle size={18} className="shrink-0" />
              <div>
                <p className="font-bold">Advertencia de Ubicación</p>
                <p className="opacity-80 text-xs">{locationError} El fichaje será marcado para revisión manual.</p>
              </div>
            </div>
          )}
        </div>

        <div className="bg-slate-50/50 p-8 w-full lg:w-96 space-y-6">
           <h3 className="font-bold text-slate-800 text-sm uppercase tracking-widest">Resumen del Día</h3>
           <div className="space-y-4">
              <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                 <span className="text-xs font-bold text-slate-400">Total Hoy</span>
                 <span className="font-black text-slate-800">06:45h</span>
              </div>
              <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                 <span className="text-xs font-bold text-slate-400">Verificación</span>
                 <span className="text-[10px] font-black text-green-600 uppercase">GPS Activo</span>
              </div>
              <div className="p-4 bg-blue-600 rounded-2xl text-white shadow-lg shadow-blue-600/20">
                 <p className="text-xs font-bold opacity-80 mb-1">Precisión Actual</p>
                 <p className="font-bold">{isLocating ? 'Midiendo...' : currentCoords ? `${Math.round(currentCoords.accuracy)} metros` : 'Sin datos'}</p>
              </div>
           </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between">
           <h3 className="font-extrabold text-slate-800">Historial de Fichajes</h3>
           <div className="relative">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
              <input type="text" placeholder="Buscar fecha..." className="pl-9 pr-4 py-2 bg-slate-50 border-none rounded-xl text-xs font-medium outline-none focus:ring-2 ring-[#1b4e9b]/10" />
           </div>
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-50/50 text-slate-400 text-[10px] uppercase font-black tracking-[0.2em]">
              <th className="px-8 py-4 text-left w-10"></th>
              <th className="px-8 py-4 text-left">Fecha de Trabajo</th>
              <th className="px-8 py-4 text-left">Entrada / Salida</th>
              <th className="px-8 py-4 text-left">Geo-Cert</th>
              <th className="px-8 py-4 text-left">Total</th>
              <th className="px-8 py-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {mockLogs.map(log => (
              <React.Fragment key={log.id}>
                <tr className={`hover:bg-blue-50/30 transition-colors cursor-pointer ${expandedRowId === log.id ? 'bg-blue-50/50' : ''}`} onClick={() => toggleExpand(log.id)}>
                  <td className="px-8 py-5">
                    {expandedRowId === log.id ? <ChevronUp size={16} className="text-[#1b4e9b]" /> : <ChevronDown size={16} className="text-slate-300" />}
                  </td>
                  <td className="px-8 py-5 font-bold text-slate-700">{log.date}</td>
                  <td className="px-8 py-5 text-slate-500 font-medium">{log.start} — {log.end}</td>
                  <td className="px-8 py-5">
                     {log.gps ? (
                       <div className="flex items-center gap-1 text-green-600 font-black text-[10px] uppercase">
                          <Crosshair size={12} /> GPS OK
                       </div>
                     ) : (
                       <div className="flex items-center gap-1 text-red-400 font-black text-[10px] uppercase">
                          <AlertTriangle size={12} /> Estimado
                       </div>
                     )}
                  </td>
                  <td className="px-8 py-5 font-black text-slate-800">{log.total}</td>
                  <td className="px-8 py-5 text-right">
                     <button className="text-[#3a9cfd] font-bold text-sm hover:underline">Ver Mapa</button>
                  </td>
                </tr>
                {expandedRowId === log.id && (
                  <tr className="bg-blue-50/20 animate-in slide-in-from-top-2 duration-200">
                    <td colSpan={6} className="px-8 py-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-5 rounded-2xl border border-blue-100 shadow-sm flex items-start gap-4">
                          <div className="p-3 bg-blue-50 text-[#1b4e9b] rounded-xl"><MapPinned size={20} /></div>
                          <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Coordenadas GPS</p>
                            <p className="text-sm font-mono font-bold text-slate-800">{log.lat.toFixed(5)}, {log.lng.toFixed(5)}</p>
                            <p className="text-[10px] text-slate-400 mt-1 uppercase">Certificado por Dispositivo</p>
                          </div>
                        </div>

                        <div className="bg-white p-5 rounded-2xl border border-blue-100 shadow-sm flex items-start gap-4">
                          <div className="p-3 bg-blue-50 text-[#1b4e9b] rounded-xl"><Compass size={20} /></div>
                          <div className="flex-1">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Precisión de Señal</p>
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-bold text-slate-800">{log.accuracy} metros</p>
                              <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden max-w-[100px]">
                                <div 
                                  className={`h-full rounded-full ${log.accuracy < 20 ? 'bg-green-500' : log.accuracy < 50 ? 'bg-amber-500' : 'bg-red-500'}`} 
                                  style={{width: `${Math.max(10, 100 - (log.accuracy / 2))}%`}}
                                ></div>
                              </div>
                            </div>
                            <p className="text-[10px] text-slate-400 mt-1 uppercase">{log.accuracy < 20 ? 'Alta Fidelidad' : 'Margen Amplio'}</p>
                          </div>
                        </div>

                        <div className="bg-[#1b4e9b] p-5 rounded-2xl shadow-lg flex items-center gap-4 text-white">
                          <div className="p-3 bg-white/20 rounded-xl"><ShieldCheck size={20} /></div>
                          <div>
                            <p className="text-[10px] font-black opacity-60 uppercase tracking-widest mb-0.5">Integridad de Datos</p>
                            <p className="text-xs font-bold">Registro Geofirmado</p>
                            <p className="text-[9px] opacity-40 font-mono mt-1">HASH: {Math.random().toString(36).substring(7).toUpperCase()}</p>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TimeTracking;
