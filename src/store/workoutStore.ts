// import { create } from 'zustand';
// import { Workout, Exercise } from '../types';

// interface WorkoutStore {
//   workouts: Workout[];
//   addWorkout: (workout: Workout) => void;
//   deleteWorkout: (id: string) => void;
//   updateWorkout: (workout: Workout) => void;
// }

// export const useWorkoutStore = create<WorkoutStore>((set) => ({
//   workouts: [],
//   addWorkout: (workout) =>
//     set((state) => ({ workouts: [...state.workouts, workout] })),
//   deleteWorkout: (id) =>
//     set((state) => ({
//       workouts: state.workouts.filter((w) => w.id !== id),
//     })),
//   updateWorkout: (workout) =>
//     set((state) => ({
//       workouts: state.workouts.map((w) => (w.id === workout.id ? workout : w)),
//     })),
// }));