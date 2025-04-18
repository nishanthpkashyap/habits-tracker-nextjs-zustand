"use client";

import useHabitStore, { Habit } from "@/store/store";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { FormEvent, useState } from "react";

export default function AddHabitForm() {
  const [name, setName] = useState("");
  const [frequency, setFrequency] = useState<Habit["frequency"]>("daily");
  const { addHabit } = useHabitStore();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(name.trim())
    addHabit(name.trim(), frequency);
    setName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box className="flex flex-col gap-4">
        <TextField
          label="Habit Name"
          value={name}
          placeholder="Enter habit name"
          onChange={(e) => {
            setName(e.target.value);
          }}
          fullWidth
          required
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Frequency</InputLabel>
          <Select
            value={frequency}
            label="Frequency"
            onChange={(e) => {
              setFrequency(e.target.value as typeof frequency);
            }}
            required
          >
            <MenuItem value={"daily"}>Daily</MenuItem>
            <MenuItem value={"weekly"}>Weekly</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained">
          Add Habit
        </Button>
      </Box>
    </form>
  );
}
