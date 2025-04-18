import AddHabitForm from "@/components/addHabitForm";
// import HabitsStreak from "@/components/habits-streak";
import HabitsList from "@/components/habitsList";
import { Container, Typography } from "@mui/material";

export default function Home() {

  return (
    <main>
      <Container>
        <Typography variant={"h2"} component={"h1"} gutterBottom align="center">
          Habit Tracker
        </Typography>
        <AddHabitForm />
        <HabitsList/>
      </Container>
    </main>
  );
}
