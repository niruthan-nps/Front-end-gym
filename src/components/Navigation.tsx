// import React from 'react';
import { Dumbbell, BarChart2, PlusCircle } from 'lucide-react';

interface NavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Navigation({ activeTab, setActiveTab }: NavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4 md:relative md:border-t-0 md:border-b md:py-4">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex justify-around md:justify-start md:gap-8">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex flex-col items-center p-2 ${
              activeTab === 'dashboard'
                ? 'text-blue-600'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            <Dumbbell className="h-6 w-6" />
            <span className="text-sm mt-1">Dashboard</span>
          </button>
          <button
            onClick={() => setActiveTab('add')}
            className={`flex flex-col items-center p-2 ${
              activeTab === 'add'
                ? 'text-blue-600'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            <PlusCircle className="h-6 w-6" />
            <span className="text-sm mt-1">Add Workout</span>
          </button>
          <button
            onClick={() => setActiveTab('progress')}
            className={`flex flex-col items-center p-2 ${
              activeTab === 'progress'
                ? 'text-blue-600'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            <BarChart2 className="h-6 w-6" />
            <span className="text-sm mt-1">Progress</span>
          </button>
        </div>
      </div>
    </nav>
  );
}