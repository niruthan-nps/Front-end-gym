export type WorkoutType = 'push' | 'pull' | 'legs' | 'cardio';

export interface Set {
  reps: number;
  weight: number;
}

export interface Exercise {
  id: string;
  name: string;
  sets: Set[];
}

// export interface Workout {
//   id: string;
//   name: string;
//   type: WorkoutType;
//   notes: string;
//   exercises: Exercise[];
//   date: string;
// }

export interface Workout {
  id: string;
  title: string;
  type: string;
  description: string;
  reps: number;
  sets: number;
  weight: number;
}