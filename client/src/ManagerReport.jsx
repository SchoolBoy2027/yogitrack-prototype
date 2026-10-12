import CardDeck from "./components/CardDeck";

function ManagerReport() {
  return (
    <CardDeck
      api="/api/dashboard-manager"
      title="Manager Dashboard"
    />
  );
}

export default ManagerReport