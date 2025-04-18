"use client";

import useHabitStore, { Habit } from "@/store/store";
import { CheckCircle, Delete } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  LinearProgress,
  Paper,
  Typography,
} from "@mui/material";

export default function HabitsList({}) {
  const { habits, removeHabit, toggleHabbit } = useHabitStore();
  const today = new Date().toISOString().split("T")[0];

  const getStreak = (completedDates: Habit["completedDates"]) => {
    let streak = 0;
    const streakDate = new Date();

    while (true) {
      const dateString = streakDate.toISOString().split("T")[0];
      if (completedDates.includes(dateString)) {
        streak++;
        streakDate.setDate(streakDate.getDate() - 1);
      } else break;
    }

    return streak;
  };

  return (
    <Box className="flex flex-col gap-2 mt-4">
      {habits.map(({ id, completedDates, frequency, name }) => {
        const isCompleted = completedDates.includes(today);
        const streak = getStreak(completedDates);

        return (
          <Paper key={id} elevation={2} className="p-2">
            <Grid container alignItems={"center"}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="h6">{name}</Typography>
                <Typography variant="body2" color="text-secondary">
                  {frequency}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Box className="flex justify-end gap-1">
                  <Button
                    variant="outlined"
                    color={isCompleted ? "success" : "primary"}
                    startIcon={<CheckCircle />}
                    onClick={() => {
                      toggleHabbit(id, today);
                    }}
                  >
                    {isCompleted ? "Completed" : "Mark Complete"}
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<Delete />}
                    onClick={() => {
                      removeHabit(id);
                    }}
                  >
                    Remove
                  </Button>
                </Box>
              </Grid>
            </Grid>
            <Box className="mt-4">
              <Typography>Current Streak: {streak}</Typography>
              <LinearProgress
                variant="determinate"
                value={(streak / 30) * 100}
                className="mt-1"
              />
            </Box>
          </Paper>
        );
      })}
    </Box>
  );
}
