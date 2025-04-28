// import React, { useState } from 'react';
// import { useWorkoutStore } from '../store/workoutStore';
// import { Workout, Exercise, WorkoutType } from '../types';
// import { Plus, Trash2 } from 'lucide-react';

// export function AddWorkout() {
//   const addWorkout = useWorkoutStore((state) => state.addWorkout);
//   const [name, setName] = useState('');
//   const [type, setType] = useState<WorkoutType>('push');
//   const [notes, setNotes] = useState('');
//   const [exercises, setExercises] = useState<Exercise[]>([]);

//   const handleAddExercise = () => {
//     setExercises([
//       ...exercises,
//       { id: crypto.randomUUID(), name: '', sets: [{ reps: 0, weight: 0 }] },
//     ]);
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const workout: Workout = {
//       id: crypto.randomUUID(),
//       name,
//       type,
//       notes,
//       exercises,
//       date: new Date().toISOString().split('T')[0],
//     };
//     addWorkout(workout);
//     setName('');
//     setType('push');
//     setNotes('');
//     setExercises([]);
//   };

//   return (
//     <div className="p-4 max-w-2xl mx-auto">
//       <h1 className="text-2xl font-bold mb-6">Add New Workout</h1>
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Workout Name
//           </label>
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700">Type</label>
//           <select
//             value={type}
//             onChange={(e) => setType(e.target.value as WorkoutType)}
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
//             value={notes}
//             onChange={(e) => setNotes(e.target.value)}
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

//           {exercises.map((exercise, exerciseIndex) => (
//             <div
//               key={exercise.id}
//               className="bg-gray-50 p-4 rounded-lg mb-4 space-y-4"
//             >
//               <div className="flex justify-between items-start">
//                 <input
//                   type="text"
//                   value={exercise.name}
//                   onChange={(e) => {
//                     const newExercises = [...exercises];
//                     newExercises[exerciseIndex].name = e.target.value;
//                     setExercises(newExercises);
//                   }}
//                   placeholder="Exercise name"
//                   className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setExercises(exercises.filter((_, i) => i !== exerciseIndex));
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
//                         const newExercises = [...exercises];
//                         newExercises[exerciseIndex].sets[setIndex].reps =
//                           Number(e.target.value);
//                         setExercises(newExercises);
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
//                         const newExercises = [...exercises];
//                         newExercises[exerciseIndex].sets[setIndex].weight =
//                           Number(e.target.value);
//                         setExercises(newExercises);
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
//                   const newExercises = [...exercises];
//                   newExercises[exerciseIndex].sets.push({
//                     reps: 0,
//                     weight: 0,
//                   });
//                   setExercises(newExercises);
//                 }}
//                 className="text-sm text-blue-600 hover:text-blue-800"
//               >
//                 + Add Set
//               </button>
//             </div>
//           ))}
//         </div>

//         <button
//           type="submit"
//           className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//         >
//           Save Workout
//         </button>
//       </form>
//     </div>
//   );
// }


import React, { useState } from 'react';
import axios from 'axios';

export function AddWorkout() {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('push');
  const [description, setDescription] = useState('');
  const [reps, setReps] = useState(0);
  const [sets, setSets] = useState(1);
  const [weight, setWeight] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const workout = {
        title,
        description: `Type: ${type}\nNotes: ${description}`, // you can separate if needed
        reps,
        sets,
        weight,
      };

      await axios.post('http://localhost:8080/api/workouts', workout);

      // Clear form after submission
      setTitle('');
      setType('push');
      setDescription('');
      setReps(0);
      setSets(1);
      setWeight(0);

      alert('Workout added successfully!');
    } catch (error) {
      console.error('Failed to add workout:', error);
      alert('Failed to add workout.');
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Add New Workout</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Workout Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Workout Name</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        {/* Workout Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows={3}
          />
        </div>

        {/* Reps */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Reps</label>
          <input
            type="number"
            value={reps}
            onChange={(e) => setReps(Number(e.target.value))}
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
            value={sets}
            onChange={(e) => setSets(Number(e.target.value))}
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
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            min="0"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Save Workout
        </button>
      </form>
    </div>
  );
}
