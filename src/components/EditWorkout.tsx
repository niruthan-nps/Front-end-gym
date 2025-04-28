// import React, { useState, useEffect } from 'react';
// import { useWorkoutStore } from '../store/workoutStore';
// import { Workout, Exercise, WorkoutType } from '../types';
// import { Plus, Trash2 } from 'lucide-react';

// export function EditWorkout() {
//   const updateWorkout = useWorkoutStore((state) => state.updateWorkout);
//   const [workout, setWorkout] = useState<Workout | null>(null);

//   useEffect(() => {
//     const savedWorkout = localStorage.getItem('editWorkout');
//     if (savedWorkout) {
//       setWorkout(JSON.parse(savedWorkout));
//       localStorage.removeItem('editWorkout');
//     }
//   }, []);

//   if (!workout) {
//     return <div>No workout to edit</div>;
//   }

//   const handleAddExercise = () => {
//     setWorkout({
//       ...workout,
//       exercises: [
//         ...workout.exercises,
//         { id: crypto.randomUUID(), name: '', sets: [{ reps: 0, weight: 0 }] },
//       ],
//     });
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (workout) {
//       updateWorkout(workout);
//       window.location.href = '#/';
//     }
//   };

//   return (
//     <div className="p-4 max-w-2xl mx-auto">
//       <h1 className="text-2xl font-bold mb-6">Edit Workout</h1>
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Workout Name
//           </label>
//           <input
//             type="text"
//             value={workout.name}
//             onChange={(e) => setWorkout({ ...workout, name: e.target.value })}
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700">Type</label>
//           <select
//             value={workout.type}
//             onChange={(e) =>
//               setWorkout({ ...workout, type: e.target.value as WorkoutType })
//             }
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//           >
//             <option value="push">Push</option>
//             <option value="pull">Pull</option>
//             <option value="legs">Legs</option>
//             <option value="cardio">Cardio</option>
//           </select>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700">Notes</label>
//           <textarea
//             value={workout.notes}
//             onChange={(e) => setWorkout({ ...workout, notes: e.target.value })}
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//             rows={3}
//           />
//         </div>

//         <div>
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-lg font-medium">Exercises</h2>
//             <button
//               type="button"
//               onClick={handleAddExercise}
//               className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
//             >
//               <Plus className="h-4 w-4 mr-1" />
//               Add Exercise
//             </button>
//           </div>

//           {workout.exercises.map((exercise, exerciseIndex) => (
//             <div
//               key={exercise.id}
//               className="bg-gray-50 p-4 rounded-lg mb-4 space-y-4"
//             >
//               <div className="flex justify-between items-start">
//                 <input
//                   type="text"
//                   value={exercise.name}
//                   onChange={(e) => {
//                     const newExercises = [...workout.exercises];
//                     newExercises[exerciseIndex].name = e.target.value;
//                     setWorkout({ ...workout, exercises: newExercises });
//                   }}
//                   placeholder="Exercise name"
//                   className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={() => {
//                     const newExercises = workout.exercises.filter(
//                       (_, i) => i !== exerciseIndex
//                     );
//                     setWorkout({ ...workout, exercises: newExercises });
//                   }}
//                   className="ml-2 text-red-600 hover:text-red-800"
//                 >
//                   <Trash2 className="h-5 w-5" />
//                 </button>
//               </div>

//               {exercise.sets.map((set, setIndex) => (
//                 <div key={setIndex} className="flex gap-4">
//                   <div className="flex-1">
//                     <label className="block text-sm font-medium text-gray-700">
//                       Reps
//                     </label>
//                     <input
//                       type="number"
//                       value={set.reps}
//                       onChange={(e) => {
//                         const newExercises = [...workout.exercises];
//                         newExercises[exerciseIndex].sets[setIndex].reps =
//                           Number(e.target.value);
//                         setWorkout({ ...workout, exercises: newExercises });
//                       }}
//                       className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//                       min="0"
//                       required
//                     />
//                   </div>
//                   <div className="flex-1">
//                     <label className="block text-sm font-medium text-gray-700">
//                       Weight (kg)
//                     </label>
//                     <input
//                       type="number"
//                       value={set.weight}
//                       onChange={(e) => {
//                         const newExercises = [...workout.exercises];
//                         newExercises[exerciseIndex].sets[setIndex].weight =
//                           Number(e.target.value);
//                         setWorkout({ ...workout, exercises: newExercises });
//                       }}
//                       className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//                       min="0"
//                       required
//                     />
//                   </div>
//                 </div>
//               ))}

//               <button
//                 type="button"
//                 onClick={() => {
//                   const newExercises = [...workout.exercises];
//                   newExercises[exerciseIndex].sets.push({
//                     reps: 0,
//                     weight: 0,
//                   });
//                   setWorkout({ ...workout, exercises: newExercises });
//                 }}
//                 className="text-sm text-blue-600 hover:text-blue-800"
//               >
//                 + Add Set
//               </button>
//             </div>
//           ))}
//         </div>

//         <div className="flex gap-4">
//           <button
//             type="button"
//             onClick={() => {
//               window.location.href = '#/';
//             }}
//             className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//           >
//             Save Changes
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Workout } from '../types';

export function EditWorkout() {
  const [workout, setWorkout] = useState<Workout | null>(null);

  useEffect(() => {
    const savedWorkout = localStorage.getItem('editWorkout');
    if (savedWorkout) {
      setWorkout(JSON.parse(savedWorkout));
      localStorage.removeItem('editWorkout');
    }
  }, []);

  if (!workout) {
    return <div>No workout to edit</div>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const updatedWorkout = {
        title: workout.title,
        description: `Type: ${workout.type}\nNotes: ${workout.description}`,
        reps: workout.reps,
        sets: workout.sets,
        weight: workout.weight,
      };

      await axios.put(`http://localhost:8080/api/workouts/${workout.id}`, updatedWorkout);

      alert('Workout updated successfully!');
      window.location.href = '#/';
    } catch (error) {
      console.error('Failed to update workout:', error);
      alert('Failed to update workout.');
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Workout</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Workout Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Workout Name</label>
          <input
            type="text"
            value={workout.title}
            onChange={(e) => setWorkout({ ...workout, title: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        {/* Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Type</label>
          <select
            value={workout.type}
            onChange={(e) => setWorkout({ ...workout, type: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="push">Push</option>
            <option value="pull">Pull</option>
            <option value="legs">Legs</option>
            <option value="cardio">Cardio</option>
          </select>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Notes</label>
          <textarea
            value={workout.description}
            onChange={(e) => setWorkout({ ...workout, description: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows={3}
          />
        </div>

        {/* Reps */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Reps</label>
          <input
            type="number"
            value={workout.reps}
            onChange={(e) => setWorkout({ ...workout, reps: Number(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            min="0"
            required
          />
        </div>

        {/* Sets */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Sets</label>
          <input
            type="number"
            value={workout.sets}
            onChange={(e) => setWorkout({ ...workout, sets: Number(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            min="0"
            required
          />
        </div>

        {/* Weight */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
          <input
            type="number"
            value={workout.weight}
            onChange={(e) => setWorkout({ ...workout, weight: Number(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            min="0"
            required
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => {
              window.location.href = '#/';
            }}
            className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}