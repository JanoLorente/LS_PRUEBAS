
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Bell, Search, Settings, AlertCircle, Clock, ChevronRight, CheckCheck, Inbox } from 'lucide-react';
import { AppView } from '../types';

interface HeaderProps {
  onViewChange: (view: AppView) => void;
}

interface NotificationItem {
  id: string;
  user: string;
  type: string;
  time: string;
  urgent: boolean;
  read: boolean;
}

const Header: React.FC<HeaderProps> = ({ onViewChange }) => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    { id: '1', user: 'David Ruiz', type: 'Fichaje fallido', time: 'Hace 5 min', urgent: true, read: false },
    { id: '2', user: 'Laura Sanz', type: 'Solicitud vacaciones', time: 'Hace 2 horas', urgent: false, read: false },
    { id: '3', user: 'Carlos V.', type: 'Error Geofence', time: 'Ayer', urgent: false, read: true },
    { id: '4', user: 'Marta López', type: 'Justificante médico', time: 'Ayer', urgent: true, read: false },
  ]);
  
  const notificationRef = useRef<HTMLDivElement>(null);

  // Grouping logic
  const groupedNotifications = useMemo(() => {
    const groups = {
      urgent: notifications.filter(n => n.urgent && !n.read),
      recent: notifications.filter(n => !n.urgent || n.read)
    };
    return groups;
  }, [notifications]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="h-16 bg-gradient-to-r from-[#1b4e9b] to-[#0072bc] flex items-center justify-between px-8 sticky top-0 z-40 shadow-sm text-white">
      <div className="flex items-center bg-white/10 rounded-lg px-4 py-2 w-96 max-w-full backdrop-blur-md border border-white/20">
        <Search size={18} className="text-white/70" />
        <input 
          type="text" 
          placeholder="Buscar en el portal..." 
          className="bg-transparent border-none outline-none ml-2 text-sm w-full placeholder:text-white/50 text-white"
        />
      </div>

      <div className="flex items-center gap-4">
        <div className="relative" ref={notificationRef}>
          <button 
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className={`p-2 rounded-full transition-all relative ${isNotificationsOpen ? 'bg-white/20' : 'hover:bg-white/10'}`}
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 rounded-full border-2 border-[#1b4e9b] flex items-center justify-center text-[8px] font-black animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Panel Desplegable de Notificaciones */}
          {isNotificationsOpen && (
            <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-slate-800">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white">
                <div>
                  <h3 className="font-black text-[10px] uppercase tracking-widest text-slate-400">Notificaciones</h3>
                  <p className="text-[10px] font-bold text-slate-400 mt-0.5">{unreadCount} pendientes de lectura</p>
                </div>
                {unreadCount > 0 && (
                  <button 
                    onClick={markAllAsRead}
                    className="flex items-center gap-1.5 text-[10px] font-black text-[#1b4e9b] uppercase hover:bg-blue-50 px-2 py-1 rounded-lg transition-colors"
                  >
                    <CheckCheck size={14} /> Marcar todo
                  </button>
                )}
              </div>
              
              <div className="max-h-96 overflow-y-auto scrollbar-hide">
                {notifications.length === 0 ? (
                  <div className="p-12 text-center">
                    <Inbox className="mx-auto text-slate-200 mb-3" size={32} />
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Sin notificaciones</p>
                  </div>
                ) : (
                  <>
                    {/* Grupo: Prioridad Alta */}
                    {groupedNotifications.urgent.length > 0 && (
                      <div className="bg-red-50/30">
                        <div className="px-4 py-2 border-b border-red-100/30">
                          <span className="text-[9px] font-black text-red-500 uppercase tracking-widest">Prioridad Crítica</span>
                        </div>
                        {groupedNotifications.urgent.map((n) => (
                          <NotificationRow 
                            key={n.id} 
                            n={n} 
                            onAction={() => {
                              markAsRead(n.id);
                              onViewChange(AppView.INCIDENTS);
                              setIsNotificationsOpen(false);
                            }} 
                          />
                        ))}
                      </div>
                    )}

                    {/* Grupo: Recientes / Historial */}
                    {groupedNotifications.recent.length > 0 && (
                      <div>
                        {groupedNotifications.urgent.length > 0 && (
                          <div className="px-4 py-2 border-b border-slate-100 bg-slate-50/50">
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Otras Actividades</span>
                          </div>
                        )}
                        {groupedNotifications.recent.map((n) => (
                          <NotificationRow 
                            key={n.id} 
                            n={n} 
                            onAction={() => {
                              markAsRead(n.id);
                              onViewChange(AppView.INCIDENTS);
                              setIsNotificationsOpen(false);
                            }} 
                          />
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>

              <button 
                onClick={() => {
                  onViewChange(AppView.INCIDENTS);
                  setIsNotificationsOpen(false);
                }}
                className="w-full p-4 text-[10px] font-black text-[#1b4e9b] uppercase tracking-widest hover:bg-slate-50 transition-colors border-t border-slate-100 bg-white"
              >
                Centro de Incidencias
              </button>
            </div>
          )}
        </div>

        <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <Settings size={20} />
        </button>
        
        <div className="flex items-center gap-3 pl-4 border-l border-white/20 ml-2">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold">Antonio García</p>
            <p className="text-[10px] text-white/70 font-medium uppercase tracking-widest">Admin</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center overflow-hidden border-2 border-white/40">
            <img src="https://picsum.photos/seed/admin/100/100" alt="Avatar" />
          </div>
        </div>
      </div>
    </header>
  );
};

// Componente auxiliar para las filas de notificación
const NotificationRow = ({ n, onAction }: { n: NotificationItem; onAction: () => void }) => (
  <div 
    className={`p-4 hover:bg-blue-50/50 transition-colors border-b border-slate-50 cursor-pointer group relative ${!n.read ? 'bg-white' : 'opacity-60 grayscale-[0.5]'}`}
    onClick={onAction}
  >
    <div className="flex gap-3">
      <div className={`p-2.5 rounded-xl shrink-0 ${n.urgent && !n.read ? 'bg-red-50 text-red-500 shadow-sm shadow-red-100' : 'bg-blue-50 text-[#1b4e9b]'}`}>
        {n.urgent ? <AlertCircle size={18} /> : <Clock size={18} />}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <p className="text-xs font-extrabold text-slate-800 truncate">{n.user}</p>
          {!n.read && <span className="w-2 h-2 bg-[#3a9cfd] rounded-full"></span>}
        </div>
        <p className="text-[11px] text-slate-500 font-medium mt-0.5 leading-snug">{n.type}</p>
        <p className="text-[9px] text-slate-400 font-bold mt-1.5 uppercase tracking-tighter flex items-center gap-1">
          <Clock size={10} /> {n.time}
        </p>
      </div>
      <ChevronRight size={14} className="text-slate-300 group-hover:text-[#1b4e9b] transition-colors self-center" />
    </div>
  </div>
);

export default Header;
