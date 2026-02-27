
import React from 'react';
import { AppView } from '../types';
import { NAVIGATION_ITEMS, COLORS } from '../constants';
import { Menu, X, LogOut } from 'lucide-react';

interface SidebarProps {
  currentView: AppView;
  onViewChange: (view: AppView) => void;
  isOpen: boolean;
  toggleSidebar: () => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange, isOpen, toggleSidebar, onLogout }) => {
  return (
    <aside 
      className={`
        ${isOpen ? 'w-64' : 'w-20'} 
        transition-all duration-300 ease-in-out
        bg-white text-slate-600 flex flex-col h-full z-30 shadow-lg border-r border-slate-100
      `}
    >
      <div className="h-16 flex items-center justify-between px-6 border-b border-slate-100">
        {isOpen && (
          <div className="flex items-center select-none">
            <span className="text-2xl font-semibold tracking-tight text-[#3b7ba9]">NetOffice</span>
            <span className="text-2xl font-light tracking-tight text-[#3b7ba9] ml-1">Timer</span>
          </div>
        )}
        <button onClick={toggleSidebar} className="p-1 hover:bg-slate-50 rounded transition-colors text-slate-400">
          {isOpen ? <X size={20} /> : <Menu size={20} className="mx-auto" />}
        </button>
      </div>

      <nav className="flex-1 py-8 space-y-1 px-3">
        {NAVIGATION_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={`
              w-full flex items-center px-4 py-3 rounded-xl transition-all duration-200
              ${currentView === item.id 
                ? 'bg-[#1b4e9b] text-white shadow-md shadow-blue-900/20' 
                : 'hover:bg-blue-50 hover:text-[#1b4e9b] text-slate-500'}
            `}
          >
            <span className={`${currentView === item.id ? 'text-white' : 'text-slate-400'}`}>
              {item.icon}
            </span>
            {isOpen && <span className="ml-4 font-semibold text-sm">{item.label}</span>}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <button 
          onClick={onLogout}
          className="w-full flex items-center px-4 py-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
        >
          <LogOut size={20} />
          {isOpen && <span className="ml-4 font-semibold text-sm">Cerrar Sesión</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
