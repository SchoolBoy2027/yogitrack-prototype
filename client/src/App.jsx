import CardDeck from "./components/CardDeck";

function App() {
  return (
    <CardDeck
      api="/api/dashboard-main"
      title="YogiTrack Dashboard"
    />
  );
}

export default App
