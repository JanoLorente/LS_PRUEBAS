
import React, { useState, useEffect, useRef } from 'react';
import { Users, Search, Filter, UserPlus, Mail, Phone, MoreHorizontal, MessageSquare, ChevronRight, Circle, Send, X, Paperclip, Smile } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  status: 'active' | 'away' | 'vacation';
  email: string;
  phone: string;
  avatar: string;
}

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
}

const mockTeam: TeamMember[] = [
  { id: '1', name: 'Antonio García', role: 'Administrador de Sistemas', department: 'IT', status: 'active', email: 'antonio.garcia@netoffice.com', phone: '+34 600 000 001', avatar: 'https://picsum.photos/seed/antonio/100/100' },
  { id: '2', name: 'Laura Sanz', role: 'Responsable RRHH', department: 'Recursos Humanos', status: 'active', email: 'laura.sanz@netoffice.com', phone: '+34 600 000 002', avatar: 'https://picsum.photos/seed/laura/100/100' },
  { id: '3', name: 'David Ruiz', role: 'Gestor de Logística', department: 'Operaciones', status: 'away', email: 'david.ruiz@netoffice.com', phone: '+34 600 000 003', avatar: 'https://picsum.photos/seed/david/100/100' },
  { id: '4', name: 'Marta López', role: 'Técnico de Campo', department: 'Operaciones', status: 'vacation', email: 'marta.lopez@netoffice.com', phone: '+34 600 000 004', avatar: 'https://picsum.photos/seed/marta/100/100' },
  { id: '5', name: 'Carlos Valiente', role: 'Desarrollador Senior', department: 'IT', status: 'active', email: 'carlos.v@netoffice.com', phone: '+34 600 000 005', avatar: 'https://picsum.photos/seed/carlos/100/100' },
  { id: '6', name: 'Elena Méndez', role: 'Atención al Cliente', department: 'Soporte', status: 'active', email: 'elena.m@netoffice.com', phone: '+34 600 000 006', avatar: 'https://picsum.photos/seed/elena/100/100' },
];

const TeamView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDept, setFilterDept] = useState('Todos');
  const [filterStatus, setFilterStatus] = useState('Todos');
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [chatMessages, setChatMessages] = useState<Record<string, Message[]>>({});
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const departments = ['Todos', 'IT', 'Recursos Humanos', 'Operaciones', 'Soporte'];
  const statuses = ['Todos', 'Disponible', 'Ausente', 'Vacaciones'];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (selectedMember) scrollToBottom();
  }, [selectedMember, chatMessages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedMember) return;

    const msg: Message = {
      id: Date.now().toString(),
      senderId: 'me',
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => ({
      ...prev,
      [selectedMember.id]: [...(prev[selectedMember.id] || []), msg]
    }));
    setNewMessage('');

    // Respuesta simulada automática
    setTimeout(() => {
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        senderId: selectedMember.id,
        text: `¡Hola! He recibido tu mensaje. En breve te respondo.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => ({
        ...prev,
        [selectedMember.id]: [...(prev[selectedMember.id] || []), reply]
      }));
    }, 1500);
  };

  const filteredTeam = mockTeam.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          member.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = filterDept === 'Todos' || member.department === filterDept;
    
    const statusMap: Record<string, string> = {
      'Disponible': 'active',
      'Ausente': 'away',
      'Vacaciones': 'vacation'
    };
    const matchesStatus = filterStatus === 'Todos' || member.status === statusMap[filterStatus];
    
    return matchesSearch && matchesDept && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-500 bg-green-500';
      case 'away': return 'text-amber-500 bg-amber-500';
      case 'vacation': return 'text-blue-500 bg-blue-500';
      default: return 'text-slate-300 bg-slate-300';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Disponible';
      case 'away': return 'Ausente';
      case 'vacation': return 'Vacaciones';
      default: return 'Desconocido';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#1b4e9b] tracking-tight">Gestión de Equipo</h1>
          <p className="text-slate-400 font-medium text-sm">Directorio completo y estados de la plantilla en tiempo real.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#1b4e9b] to-[#0072bc] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-900/20 hover:opacity-90 transition-all active:scale-95">
          <UserPlus size={18} /> Invitar Miembro
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Total Plantilla</p>
          <div className="flex items-end justify-between">
            <p className="text-3xl font-black text-slate-800">142</p>
            <div className="p-2 bg-blue-50 text-[#1b4e9b] rounded-xl"><Users size={20} /></div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Activos Ahora</p>
          <div className="flex items-end justify-between">
            <p className="text-3xl font-black text-green-600">128</p>
            <div className="p-2 bg-green-50 text-green-600 rounded-xl"><Circle size={20} fill="currentColor" /></div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">En Vacaciones</p>
          <div className="flex items-end justify-between">
            <p className="text-3xl font-black text-blue-500">08</p>
            <div className="p-2 bg-blue-50 text-blue-500 rounded-xl"><MessageSquare size={20} /></div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Bajas Médicas</p>
          <div className="flex items-end justify-between">
            <p className="text-3xl font-black text-amber-500">06</p>
            <div className="p-2 bg-amber-50 text-amber-500 rounded-xl"><Filter size={20} /></div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-blue-900/5 overflow-hidden">
        {/* Filtros */}
        <div className="p-8 border-b border-slate-50 flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 w-full lg:w-auto flex-1">
            <div className="relative flex-1 min-w-[200px] max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <input 
                type="text" 
                placeholder="Buscar por nombre o cargo..." 
                className="w-full bg-slate-50 pl-12 pr-4 py-3.5 rounded-2xl border-none outline-none text-sm font-medium focus:ring-2 ring-blue-100 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
              <select 
                className="bg-slate-50 pl-10 pr-10 py-3.5 rounded-2xl border-none outline-none text-sm font-bold text-slate-600 appearance-none cursor-pointer focus:ring-2 ring-blue-100 transition-all"
                value={filterDept}
                onChange={(e) => setFilterDept(e.target.value)}
              >
                {departments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
              </select>
            </div>
            <div className="relative">
              <Circle className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={14} fill="currentColor" />
              <select 
                className="bg-slate-50 pl-10 pr-10 py-3.5 rounded-2xl border-none outline-none text-sm font-bold text-slate-600 appearance-none cursor-pointer focus:ring-2 ring-blue-100 transition-all"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                {statuses.map(status => <option key={status} value={status}>{status}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Grid de Empleados */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-0 divide-x divide-y divide-slate-50">
          {filteredTeam.map((member) => (
            <div key={member.id} className="p-8 hover:bg-slate-50/50 transition-all group relative">
              <button className="absolute top-6 right-6 p-2 text-slate-300 hover:text-slate-600 rounded-full hover:bg-white transition-all opacity-0 group-hover:opacity-100">
                <MoreHorizontal size={18} />
              </button>
              
              <div className="flex items-start gap-5">
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white shadow-md">
                    <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-4 border-white ${getStatusColor(member.status)}`}></div>
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-800 text-lg group-hover:text-[#1b4e9b] transition-colors">{member.name}</h3>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter mb-2">{member.role}</p>
                  <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${
                    member.status === 'active' ? 'bg-green-50 text-green-600 border-green-100' :
                    member.status === 'away' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                    'bg-blue-50 text-blue-500 border-blue-100'
                  }`}>
                    {getStatusLabel(member.status)}
                  </span>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <div className="flex items-center gap-3 text-slate-500 hover:text-[#1b4e9b] cursor-pointer transition-colors group/link">
                  <div className="p-2 bg-slate-50 rounded-lg group-hover/link:bg-blue-50 transition-colors"><Mail size={14} /></div>
                  <span className="text-xs font-semibold">{member.email}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-500 hover:text-[#1b4e9b] cursor-pointer transition-colors group/link">
                  <div className="p-2 bg-slate-50 rounded-lg group-hover/link:bg-blue-50 transition-colors"><Phone size={14} /></div>
                  <span className="text-xs font-semibold">{member.phone}</span>
                </div>
              </div>

              <div className="mt-8 flex gap-2">
                <button className="flex-1 py-3 bg-slate-50 text-slate-600 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-[#1b4e9b] hover:text-white transition-all">Perfil</button>
                <button 
                  onClick={() => setSelectedMember(member)}
                  className="flex-1 py-3 bg-[#1b4e9b] text-white rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-[#3a9cfd] transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquare size={14} /> Mensaje
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {filteredTeam.length === 0 && (
          <div className="p-20 text-center">
            <Users className="mx-auto text-slate-100 mb-4" size={64} />
            <h3 className="text-lg font-bold text-slate-800">No se encontraron miembros</h3>
            <p className="text-slate-400">Prueba con otros términos de búsqueda o filtros.</p>
          </div>
        )}
      </div>

      {/* Overlay de Chat */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-end md:p-6 bg-slate-900/40 backdrop-blur-[2px] animate-in fade-in duration-300">
          <div className="w-full h-full md:h-auto md:max-h-[85vh] md:w-[450px] bg-white md:rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right-8 duration-500">
            {/* Cabecera del Chat */}
            <div className="p-6 bg-[#1b4e9b] text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-white/20">
                    <img src={selectedMember.avatar} alt={selectedMember.name} className="w-full h-full object-cover" />
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-[#1b4e9b] ${getStatusColor(selectedMember.status)}`}></div>
                </div>
                <div>
                  <h3 className="font-extrabold text-lg leading-none">{selectedMember.name}</h3>
                  <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest mt-1">{selectedMember.role}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedMember(null)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Cuerpo del Mensaje */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
              <div className="text-center py-4">
                <span className="px-3 py-1 bg-white border border-slate-100 rounded-full text-[9px] font-black text-slate-400 uppercase tracking-widest">Hoy</span>
              </div>
              
              {/* Mensaje de bienvenida inicial si no hay mensajes */}
              {(!chatMessages[selectedMember.id] || chatMessages[selectedMember.id].length === 0) && (
                <div className="flex flex-col items-center justify-center py-10 opacity-40">
                  <MessageSquare size={48} className="text-slate-200 mb-2" />
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center">Inicia una conversación con <br/> {selectedMember.name.split(' ')[0]}</p>
                </div>
              )}

              {chatMessages[selectedMember.id]?.map((msg) => (
                <div key={msg.id} className={`flex ${msg.senderId === 'me' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2`}>
                  <div className={`max-w-[80%] p-4 rounded-2xl shadow-sm text-sm ${
                    msg.senderId === 'me' 
                    ? 'bg-[#1b4e9b] text-white rounded-br-none' 
                    : 'bg-white border border-slate-100 text-slate-700 rounded-bl-none'
                  }`}>
                    <p className="leading-relaxed">{msg.text}</p>
                    <p className={`text-[9px] mt-1 font-bold uppercase tracking-tighter ${msg.senderId === 'me' ? 'text-white/40' : 'text-slate-300'}`}>
                      {msg.timestamp}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input del Chat */}
            <div className="p-6 bg-white border-t border-slate-50 shrink-0">
              <form onSubmit={handleSendMessage} className="relative flex items-center gap-3">
                <div className="flex-1 relative">
                  <input 
                    type="text" 
                    placeholder="Escribe un mensaje..."
                    className="w-full bg-slate-50 pl-4 pr-12 py-4 rounded-2xl border-none outline-none text-sm font-medium focus:ring-2 ring-blue-100 transition-all"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    <button type="button" className="p-2 text-slate-300 hover:text-slate-600 transition-colors"><Smile size={18} /></button>
                    <button type="button" className="p-2 text-slate-300 hover:text-slate-600 transition-colors"><Paperclip size={18} /></button>
                  </div>
                </div>
                <button 
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="p-4 bg-[#1b4e9b] text-white rounded-2xl shadow-lg shadow-blue-900/20 hover:bg-[#3a9cfd] transition-all disabled:opacity-50 active:scale-95"
                >
                  <Send size={20} fill="currentColor" />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamView;
