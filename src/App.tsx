import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { AddWorkout } from './components/AddWorkout';
import { EditWorkout } from './components/EditWorkout';
import { Progress } from './components/Progress';
import { Dumbbell } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || '/';
      setActiveTab(hash.replace('/', ''));
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Dumbbell className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">GymTrack</h1>
          </div>
        </div>
      </header>

      <main className="pb-16 md:pb-0">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'add' && <AddWorkout />}
        {activeTab === 'edit' && <EditWorkout />}
        {activeTab === 'progress' && <Progress />}
      </main>

      <Navigation activeTab={activeTab} setActiveTab={(tab) => {
        window.location.hash = `/${tab}`;
      }} />
    </div>
  );
}

export default App;