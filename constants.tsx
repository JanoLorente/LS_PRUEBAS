
import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Clock, 
  CalendarDays, 
  AlertCircle
} from 'lucide-react';
import { AppView } from './types';

export const COLORS = {
  primary: '#1b4e9b',    // Azul LASO profundo
  secondary: '#3a9cfd',  // Azul LASO brillante
  accent: '#0072bc',     // Azul medio
  background: '#ffffff',
  surface: '#f8fafc',
  text: '#1e293b'
};

export const NAVIGATION_ITEMS = [
  { id: AppView.DASHBOARD, label: 'Inicio', icon: <LayoutDashboard size={20} /> },
  { id: AppView.TEAM, label: 'Equipo', icon: <Users size={20} /> },
  { id: AppView.TIME_TRACKING, label: 'Control Horario', icon: <Clock size={20} /> },
  { id: AppView.CALENDAR, label: 'Calendario Laboral', icon: <CalendarDays size={20} /> },
  { id: AppView.INCIDENTS, label: 'Incidencias', icon: <AlertCircle size={20} /> },
];
