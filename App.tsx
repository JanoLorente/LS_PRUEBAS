
import React, { useState } from 'react';
import { AppView } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import TimeTracking from './components/TimeTracking';
import CalendarView from './components/CalendarView';
import Incidents from './components/Incidents';
import Login from './components/Login';
import TeamView from './components/TeamView';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Iniciamos true para demo, pero el flujo está listo
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentView(AppView.DASHBOARD);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  const renderView = () => {
    switch (currentView) {
      case AppView.DASHBOARD:
        return <Dashboard />;
      case AppView.TEAM:
        return <TeamView />;
      case AppView.TIME_TRACKING:
        return <TimeTracking />;
      case AppView.CALENDAR:
        return <CalendarView />;
      case AppView.INCIDENTS:
        return <Incidents />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <h2 className="text-2xl font-bold">Módulo en Desarrollo</h2>
            <p>Estamos trabajando para traerte esta funcionalidad pronto.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden animate-in fade-in duration-500">
      <Sidebar 
        currentView={currentView} 
        onViewChange={setCurrentView} 
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        onLogout={handleLogout}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onViewChange={setCurrentView} />
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {renderView()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
