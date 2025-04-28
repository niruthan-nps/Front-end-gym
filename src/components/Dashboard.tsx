// import React, { useState } from 'react';
// import { useWorkoutStore } from '../store/workoutStore';
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from 'recharts';
// import { format, subDays } from 'date-fns';
// import { Pencil, Trash2 } from 'lucide-react';

// export function Dashboard() {
//   const { workouts, deleteWorkout } = useWorkoutStore((state) => ({
//     workouts: state.workouts,
//     deleteWorkout: state.deleteWorkout,
//   }));

//   // Calculate total sets for the last 7 days
//   const last7DaysData = [...Array(7)].map((_, i) => {
//     const date = subDays(new Date(), i);
//     const dateStr = format(date, 'yyyy-MM-dd');
//     const dayWorkouts = workouts.filter((w) => w.date === dateStr);
//     const totalSets = dayWorkouts.reduce(
//       (acc, workout) =>
//         acc + workout.exercises.reduce((sets, ex) => sets + ex.sets.length, 0),
//       0
//     );
//     return {
//       date: format(date, 'EEE'),
//       sets: totalSets,
//     };
//   }).reverse();

//   const handleDelete = (workoutId: string) => {
//     if (confirm('Are you sure you want to delete this workout?')) {
//       deleteWorkout(workoutId);
//     }
//   };

//   return (
//     <div className="p-4 max-w-4xl mx-auto">
//       <h1 className="text-2xl font-bold mb-6">Workout Dashboard</h1>
      
//       <div className="bg-white rounded-lg shadow-md p-4 mb-6">
//         <h2 className="text-lg font-semibold mb-4">Weekly Progress</h2>
//         <div className="h-64">
//           <ResponsiveContainer width="100%" height="100%">
//             <BarChart data={last7DaysData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="date" />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="sets" fill="#3B82F6" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       <div className="bg-white rounded-lg shadow-md p-4">
//         <h2 className="text-lg font-semibold mb-4">Recent Workouts</h2>
//         <div className="space-y-4">
//           {workouts.slice(0, 5).map((workout) => (
//             <div
//               key={workout.id}
//               className="border-b border-gray-200 last:border-0 pb-4"
//             >
//               <div className="flex justify-between items-start">
//                 <div>
//                   <h3 className="font-medium">{workout.name}</h3>
//                   <p className="text-sm text-gray-600">
//                     {format(new Date(workout.date), 'PPP')}
//                   </p>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <span className="inline-block px-2 py-1 text-sm rounded-full bg-blue-100 text-blue-800">
//                     {workout.type}
//                   </span>
//                   <button
//                     onClick={() => handleDelete(workout.id)}
//                     className="p-1 text-red-600 hover:text-red-800 transition-colors"
//                     title="Delete workout"
//                   >
//                     <Trash2 className="h-4 w-4" />
//                   </button>
//                   <button
//                     onClick={() => {
//                       // Store the workout data in localStorage for editing
//                       localStorage.setItem('editWorkout', JSON.stringify(workout));
//                       window.location.href = '#/edit';
//                     }}
//                     className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
//                     title="Edit workout"
//                   >
//                     <Pencil className="h-4 w-4" />
//                   </button>
//                 </div>
//               </div>
//               <p className="text-sm text-gray-600 mt-2">{workout.notes}</p>
//               <div className="mt-2">
//                 {workout.exercises.map((exercise) => (
//                   <div key={exercise.id} className="text-sm text-gray-600">
//                     <span className="font-medium">{exercise.name}</span>:{' '}
//                     {exercise.sets.map((set, idx) => (
//                       <span key={idx}>
//                         {set.reps}×{set.weight}kg
//                         {idx < exercise.sets.length - 1 ? ', ' : ''}
//                       </span>
//                     ))}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }




// import { useEffect, useState } from 'react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// import { format, subDays } from 'date-fns';
// import { Pencil, Trash2 } from 'lucide-react';
// import axios from 'axios';

// interface Set {
//   reps: number;
//   weight: number;
// }

// interface Exercise {
//   id: string;
//   name: string;
//   sets: Set[];
// }

// interface Workout {
//   id: string;
//   name: string;
//   date: string; // format: yyyy-MM-dd
//   type: string;
//   notes?: string;
//   exercises: Exercise[];
// }

// export function Dashboard() {
//   const [workouts, setWorkouts] = useState<Workout[]>([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch workouts from Spring Boot backend
//   const fetchWorkouts = async () => {
//     try {
//       const response = await axios.get<any[]>('http://localhost:8080/api/workouts');
      
//       const mappedWorkouts: Workout[] = response.data.map((item) => {
//         const createdAt = item.createdAt ? new Date(item.createdAt.$date) : null;
//         const date = createdAt && !isNaN(createdAt.getTime()) ? createdAt.toISOString().split('T')[0] : item.date;

//         return {
//           id: item._id?.$oid || item.id,
//           name: item.title || item.name,
//           date,
//           type: (item.description?.match(/Type:\s*(\w+)/)?.[1] || item.type || 'unknown'),
//           notes: (item.description?.match(/Notes:\s*(.*)/)?.[1] || item.notes),
//           exercises: item.exercises || [
//             {
//               id: 'auto',
//               name: 'Workout',
//               sets: [{ reps: item.reps || 0, weight: item.weight || 0 }],
//             },
//           ],
//         };
//       });

//       setWorkouts(mappedWorkouts);
//     } catch (error) {
//       console.error('Error fetching workouts:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchWorkouts();
//   }, []);

//   const deleteWorkout = async (workoutId: string) => {
//     if (confirm('Are you sure you want to delete this workout?')) {
//       try {
//         await axios.delete(`http://localhost:8080/api/workouts/${workoutId}`);
//         setWorkouts((prev) => prev.filter((w) => w.id !== workoutId)); // Remove from state after successful deletion
//       } catch (error) {
//         console.error('Error deleting workout:', error);
//       }
//     }
//   };

//   const handleEdit = (workoutId: string) => {
//     const workoutToEdit = workouts.find((w) => w.id === workoutId);
//     if (workoutToEdit) {
//       localStorage.setItem('editWorkout', JSON.stringify(workoutToEdit));
//       window.location.href = '#/edit';
//     }
//   };

//   // Weekly progress calculation
//   const last7DaysData = [...Array(7)].map((_, i) => {
//     const date = subDays(new Date(), i);
//     const dateStr = format(date, 'yyyy-MM-dd');
//     const dayWorkouts = workouts.filter((w) => w.date === dateStr);
//     const totalSets = dayWorkouts.reduce(
//       (acc, workout) => acc + workout.exercises.reduce((sets, ex) => sets + ex.sets.length, 0),
//       0
//     );
//     return {
//       date: format(date, 'EEE'),
//       sets: totalSets,
//     };
//   }).reverse();

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p className="text-gray-600">Loading workouts...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 max-w-6xl mx-auto">
//       <h1 className="text-2xl font-bold mb-8">Dashboard</h1>

//       {/* Weekly Progress Chart */}
//       <div className="bg-white rounded-lg shadow-md p-6 mb-8">
//         <h2 className="text-lg font-semibold mb-4">Weekly Sets Progress</h2>
//         <div className="h-72">
//           <ResponsiveContainer width="100%" height="100%">
//             <BarChart data={last7DaysData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="date" />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="sets" fill="#3B82F6" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       {/* Recent Workouts */}
//       <div className="bg-white rounded-lg shadow-md p-6">
//         <h2 className="text-lg font-semibold mb-6">Recent Workouts</h2>

//         {workouts.length === 0 ? (
//           <p className="text-gray-500">No workouts found. Start adding some!</p>
//         ) : (
//           <div className="space-y-6">
//             {workouts.slice(0, 5).map((workout) => (
//               <div key={workout.id} className="border-b border-gray-200 pb-6 last:border-0">
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <h3 className="text-lg font-semibold">{workout.name}</h3>
//                     <p className="text-sm text-gray-500">
//                       {workout.date && !isNaN(new Date(workout.date).getTime())
//                         ? format(new Date(workout.date), 'PPP')
//                         : 'No Date'}
//                     </p>
//                   </div>
//                   <div className="flex items-center space-x-3">
//                     <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs capitalize">
//                       {workout.type}
//                     </span>
//                     <button
//                       type="button"
//                       onClick={() => handleEdit(workout.id)}
//                       className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
//                       title="Edit Workout"
//                     >
//                       <Pencil className="h-5 w-5" />
//                     </button>
//                     <button
//                       type="button"
//                       onClick={() => deleteWorkout(workout.id)}
//                       className="p-1 text-red-600 hover:text-red-800 transition-colors"
//                       title="Delete Workout"
//                     >
//                       <Trash2 className="h-5 w-5" />
//                     </button>
//                   </div>
//                 </div>

//                 {workout.notes && <p className="text-sm text-gray-600 mt-2">{workout.notes}</p>}

//                 <div className="mt-3 space-y-2">
//                   {workout.exercises.map((exercise) => (
//                     <div key={exercise.id} className="text-sm text-gray-700">
//                       <span className="font-semibold">{exercise.name}</span>:&nbsp;
//                       {exercise.sets.map((set, idx) => (
//                         <span key={idx}>
//                           {set.reps}×{set.weight}kg
//                           {idx < exercise.sets.length - 1 ? ', ' : ''}
//                         </span>
//                       ))}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format, subDays } from 'date-fns';
import { Pencil, Trash2 } from 'lucide-react';
import axios from 'axios';

interface Workout {
  id: string;
  name: string;
  date: string; // format: yyyy-MM-dd
  type: string;
  notes?: string;
  reps: number;
  sets: number;
  weight: number;
}

export function Dashboard() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch workouts from Spring Boot backend
  const fetchWorkouts = async () => {
    try {
      const response = await axios.get<any[]>('http://localhost:8080/api/workouts');

      const mappedWorkouts: Workout[] = response.data.map((item) => {
        const createdAt = item.createdAt ? new Date(item.createdAt.$date) : null;
        const date = createdAt && !isNaN(createdAt.getTime()) ? createdAt.toISOString().split('T')[0] : item.date;

        return {
          id: item._id?.$oid || item.id,
          name: item.title || item.name,
          date,
          type: (item.description?.match(/Type:\s*(\w+)/)?.[1] || item.type || 'unknown'),
          notes: (item.description?.match(/Notes:\s*(.*)/)?.[1] || item.notes),
          reps: item.reps || 0,
          sets: item.sets || 0,
          weight: item.weight || 0,
        };
      });

      setWorkouts(mappedWorkouts);
    } catch (error) {
      console.error('Error fetching workouts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const deleteWorkout = async (workoutId: string) => {
    if (confirm('Are you sure you want to delete this workout?')) {
      try {
        await axios.delete(`http://localhost:8080/api/workouts/${workoutId}`);
        setWorkouts((prev) => prev.filter((w) => w.id !== workoutId));
      } catch (error) {
        console.error('Error deleting workout:', error);
      }
    }
  };

  const handleEdit = (workoutId: string) => {
    const workoutToEdit = workouts.find((w) => w.id === workoutId);
    if (workoutToEdit) {
      localStorage.setItem('editWorkout', JSON.stringify(workoutToEdit));
      window.location.href = '#/edit';
    }
  };

  // Weekly progress calculation
  const last7DaysData = [...Array(7)].map((_, i) => {
    const date = subDays(new Date(), i);
    const dateStr = format(date, 'yyyy-MM-dd');
    const dayWorkouts = workouts.filter((w) => w.date === dateStr);
    const totalSets = dayWorkouts.reduce((acc, workout) => acc + workout.sets, 0);
    return {
      date: format(date, 'EEE'),
      sets: totalSets,
    };
  }).reverse();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600">Loading workouts...</p>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Dashboard</h1>

      {/* Weekly Progress Chart */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Weekly Sets Progress</h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={last7DaysData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sets" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Workouts */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-6">Recent Workouts</h2>

        {workouts.length === 0 ? (
          <p className="text-gray-500">No workouts found. Start adding some!</p>
        ) : (
          <div className="space-y-6">
            {workouts.slice(0, 5).map((workout) => (
              <div key={workout.id} className="border-b border-gray-200 pb-6 last:border-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{workout.name}</h3>
                    <p className="text-sm text-gray-500">
                      {workout.date && !isNaN(new Date(workout.date).getTime())
                        ? format(new Date(workout.date), 'PPP')
                        : 'No Date'}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs capitalize">
                      {workout.type}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleEdit(workout.id)}
                      className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
                      title="Edit Workout"
                    >
                      <Pencil className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteWorkout(workout.id)}
                      className="p-1 text-red-600 hover:text-red-800 transition-colors"
                      title="Delete Workout"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {workout.notes && <p className="text-sm text-gray-600 mt-2">{workout.notes}</p>}

                {/* Display reps, sets, weight */}
                <div className="mt-3 text-sm text-gray-700">
                  <p><span className="font-semibold">Reps:</span> {workout.reps}</p>
                  <p><span className="font-semibold">Sets:</span> {workout.sets}</p>
                  <p><span className="font-semibold">Weight:</span> {workout.weight} kg</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}