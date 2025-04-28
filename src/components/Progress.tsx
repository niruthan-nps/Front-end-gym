// import React from 'react';
// import { useWorkoutStore } from '../store/workoutStore';
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from 'recharts';
// import { format, subWeeks, startOfWeek, endOfWeek } from 'date-fns';

// export function Progress() {
//   const workouts = useWorkoutStore((state) => state.workouts);

//   // Calculate weekly totals for the last 4 weeks
//   const weeklyData = [...Array(4)].map((_, i) => {
//     const weekStart = startOfWeek(subWeeks(new Date(), i));
//     const weekEnd = endOfWeek(weekStart);
//     const weekWorkouts = workouts.filter(
//       (w) =>
//         new Date(w.date) >= weekStart &&
//         new Date(w.date) <= weekEnd
//     );

//     const totalWeight = weekWorkouts.reduce((acc, workout) => {
//       return (
//         acc +
//         workout.exercises.reduce((exAcc, exercise) => {
//           return (
//             exAcc +
//             exercise.sets.reduce((setAcc, set) => setAcc + set.weight * set.reps, 0)
//           );
//         }, 0)
//       );
//     }, 0);

//     const totalSets = weekWorkouts.reduce(
//       (acc, workout) =>
//         acc +
//         workout.exercises.reduce((exAcc, exercise) => exAcc + exercise.sets.length, 0),
//       0
//     );

//     return {
//       week: format(weekStart, 'MMM d'),
//       totalWeight,
//       totalSets,
//     };
//   }).reverse();

//   return (
//     <div className="p-4 max-w-4xl mx-auto">
//       <h1 className="text-2xl font-bold mb-6">Weekly Progress</h1>

//       <div className="grid gap-6 md:grid-cols-2">
//         <div className="bg-white rounded-lg shadow-md p-4">
//           <h2 className="text-lg font-semibold mb-4">Total Weight Lifted</h2>
//           <div className="h-64">
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart data={weeklyData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="week" />
//                 <YAxis />
//                 <Tooltip />
//                 <Line
//                   type="monotone"
//                   dataKey="totalWeight"
//                   stroke="#3B82F6"
//                   strokeWidth={2}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-md p-4">
//           <h2 className="text-lg font-semibold mb-4">Total Sets Completed</h2>
//           <div className="h-64">
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart data={weeklyData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="week" />
//                 <YAxis />
//                 <Tooltip />
//                 <Line
//                   type="monotone"
//                   dataKey="totalSets"
//                   stroke="#10B981"
//                   strokeWidth={2}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>

//       <div className="mt-6 bg-white rounded-lg shadow-md p-4">
//         <h2 className="text-lg font-semibold mb-4">Weekly Summary</h2>
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Week
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Total Weight (kg)
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Total Sets
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {weeklyData.map((week, index) => (
//                 <tr key={week.week}>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                     {week.week}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {week.totalWeight.toLocaleString()}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {week.totalSets}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// // import React from 'react';
// import { useWorkoutStore } from '../store/workoutStore';
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from 'recharts';
// import { format, subWeeks, startOfWeek, endOfWeek } from 'date-fns';

// export function Progress() {
//   const workouts = useWorkoutStore((state) => state.workouts);

//   // Calculate weekly totals for the last 4 weeks
//   const weeklyData = [...Array(4)].map((_, i) => {
//     const weekStart = startOfWeek(subWeeks(new Date(), i));
//     const weekEnd = endOfWeek(weekStart);

//     // const weekWorkouts = workouts.filter(
//     //   (w) => new Date(w.date) >= weekStart && new Date(w.date) <= weekEnd
//     // );

//     const weekWorkouts = workouts.filter(
//       (w) => new Date(w.createdAt) >= weekStart && new Date(w.createdAt) <= weekEnd
//     );

//     const totalWeight = weekWorkouts.reduce((acc, workout) => {
//       return acc + (workout.reps * workout.weight * workout.sets);
//     }, 0);

//     const totalSets = weekWorkouts.reduce((acc, workout) => {
//       return acc + workout.sets;
//     }, 0);

//     return {
//       week: format(weekStart, 'MMM d'),
//       totalWeight,
//       totalSets,
//     };
//   }).reverse();

//   return (
//     <div className="p-4 max-w-4xl mx-auto">
//       <h1 className="text-2xl font-bold mb-6">Weekly Progress</h1>

//       <div className="grid gap-6 md:grid-cols-2">
//         {/* Total Weight Lifted */}
//         <div className="bg-white rounded-lg shadow-md p-4">
//           <h2 className="text-lg font-semibold mb-4">Total Weight Lifted</h2>
//           <div className="h-64">
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart data={weeklyData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="week" />
//                 <YAxis />
//                 <Tooltip />
//                 <Line
//                   type="monotone"
//                   dataKey="totalWeight"
//                   stroke="#3B82F6"
//                   strokeWidth={2}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Total Sets Completed */}
//         <div className="bg-white rounded-lg shadow-md p-4">
//           <h2 className="text-lg font-semibold mb-4">Total Sets Completed</h2>
//           <div className="h-64">
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart data={weeklyData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="week" />
//                 <YAxis />
//                 <Tooltip />
//                 <Line
//                   type="monotone"
//                   dataKey="totalSets"
//                   stroke="#10B981"
//                   strokeWidth={2}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>

//       {/* Weekly Summary Table */}
//       <div className="mt-6 bg-white rounded-lg shadow-md p-4">
//         <h2 className="text-lg font-semibold mb-4">Weekly Summary</h2>
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Week
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Total Weight (kg)
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Total Sets
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {weeklyData.map((week) => (
//                 <tr key={week.week}>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                     {week.week}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {week.totalWeight.toLocaleString()}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {week.totalSets}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }



import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { format, subWeeks, startOfWeek, endOfWeek } from 'date-fns';
import axios from 'axios';
import { Workout } from '../types';// Import your Workout type

export function Progress() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch workouts from backend API
    const fetchWorkouts = async () => {
      try {
        const response = await axios.get<Workout[]>('http://localhost:8080/api/workouts'); 
        setWorkouts(response.data);
      } catch (error) {
        console.error('Error fetching workouts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  // Calculate weekly totals for the last 4 weeks
  const weeklyData = [...Array(4)].map((_, i) => {
    const weekStart = startOfWeek(subWeeks(new Date(), i));
    const weekEnd = endOfWeek(weekStart);

    const weekWorkouts = workouts.filter(
      (w) => new Date(w.createdAt) >= weekStart && new Date(w.createdAt) <= weekEnd
    );

    const totalWeight = weekWorkouts.reduce((acc, workout) => {
      return acc + (workout.reps * workout.weight * workout.sets);
    }, 0);

    const totalSets = weekWorkouts.reduce((acc, workout) => {
      return acc + workout.sets;
    }, 0);

    return {
      week: format(weekStart, 'MMM d'),
      totalWeight,
      totalSets,
    };
  }).reverse();

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Weekly Progress</h1>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Total Weight Lifted */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-semibold mb-4">Total Weight Lifted</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="totalWeight"
                  stroke="#3B82F6"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Total Sets Completed */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-semibold mb-4">Total Sets Completed</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="totalSets"
                  stroke="#10B981"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Weekly Summary Table */}
      <div className="mt-6 bg-white rounded-lg shadow-md p-4">
        <h2 className="text-lg font-semibold mb-4">Weekly Summary</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Week
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Weight (kg)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Sets
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {weeklyData.map((week) => (
                <tr key={week.week}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {week.week}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {week.totalWeight.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {week.totalSets}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}