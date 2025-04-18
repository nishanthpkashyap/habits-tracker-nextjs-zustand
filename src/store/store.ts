import { create } from "zustand";
import { persist } from "zustand/middleware";
import { devtools } from "zustand/middleware";

export type Habit = {
  id: string;
  name: string;
  frequency: "daily" | "weekly";
  completedDates: string[];
  createdAt: string;
};

type HabitState = {
  habits: Habit[];
  addHabit: (name: string, frequency: Habit["frequency"]) => void;
  removeHabit: (id: string) => void;
  toggleHabbit: (id: string, date: string) => void;
};

const useHabitStore = create<HabitState>()(
  devtools(
    persist(
      (set) => {
        return {
          habits: [],
          addHabit: (name, frequency) =>
            set((state) => {
              return {
                habits: [
                  ...state.habits,
                  {
                    id: Date.now().toString(),
                    name,
                    frequency,
                    completedDates: [],
                    createdAt: new Date().toISOString(),
                  },
                ],
              };
            }),
          removeHabit: (id) =>
            set((state) => {
              return {
                habits: state.habits.filter((habit) => habit.id !== id),
              };
            }),
          toggleHabbit: (id, date) =>
            set((state) => {
              return {
                habits: state.habits.map((habit) => {
                  if (habit.id !== id) return habit;

                  return {
                    ...habit,
                    completedDates: habit.completedDates.includes(date)
                      ? habit.completedDates.filter((d) => d !== date)
                      : habit.completedDates.concat(date),
                  };
                }),
              };
            }),
        };
      },
      { name: "habits-store" }
    )
  )
);

export default useHabitStore;
