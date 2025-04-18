"use client";

import { Box, LinearProgress, Typography } from "@mui/material";

export default function HabitsStreak() {
  return (
    <Box className="mt-2">
      <Typography>Current Streak:</Typography>
      <LinearProgress variant="determinate" value={10}/> 
    </Box>
  );
}
