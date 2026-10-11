import CardDeck from "./components/CardDeck";

function InstructorReport() {
  return (
    <CardDeck
      api="/api/dashboard-instructor"
      title="Instructor Dashboard"
    />
  );
}

export default InstructorReport