import CardDeck from "./components/CardDeck";

function Report() {
    return (
        <CardDeck
            api="/api/dashboard-main"
            title="Manager Dashboard"
        />
    );
}

export default Report