
export enum AppView {
  DASHBOARD = 'dashboard',
  TEAM = 'team',
  TIME_TRACKING = 'time_tracking',
  CALENDAR = 'calendar',
  INCIDENTS = 'incidents'
}

export interface GeoLocation {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
}

export interface TimeEntry {
  id: string;
  date: string;
  startTime: string;
  endTime: string | null;
  status: 'active' | 'completed' | 'incident';
  totalHours: number;
  location?: GeoLocation;
}

export interface Incident {
  id: string;
  employeeName: string;
  date: string;
  description: string;
  status: 'pending' | 'resolved' | 'rejected';
  type: 'missing_punch' | 'wrong_hours' | 'other';
}

export interface CalendarEvent {
  date: string;
  type: 'work' | 'holiday' | 'vacation_approved' | 'vacation_pending' | 'vacation_denied' | 'incident';
  hours: number;
  denialReason?: string;
}
