import { useEffect, useState } from "react";
import instructorReportsLogo from '../assets/instructorLogin.png'
import reportsLogo from '../assets/Reports.png'
import salesLogo from '../assets/sales.png'
import instructorLogo from '../assets/instructor.png'
import customerLogo from '../assets/senior.png'
import classLogo from '../assets/senior2.png'
import packageLogo from '../assets/wellness.png'
import scheduleLogo from '../assets/general.png'

//I frigging hate chaining.  
/*const imagePath = card.image;
let imageFilename = imagePath;
if (imagePath) {
    const imageParts = imagePath.split("/");
    imageFilename = imageParts.pop();
}
const imageUrl = images[imageFilename];

*/  
//equals
//card.image?.split("/").pop()


const images = {
    "scheduleLogo.png": scheduleLogo,
    "customerLogo.png": customerLogo,
    "classLogo.png": classLogo,
    "instructorLogo.png": instructorLogo,
    "salesLogo.png": salesLogo,
    "packageLogo.png": packageLogo,
    "reportsLogo.png": reportsLogo,
    "instructorReportsLogo.png": instructorReportsLogo
};

function CardDeck({ api, title }) {
    const [cards, setCards] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    console.log("Image mapping:", images);

    useEffect(() => {
        const fetchCards = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await fetch(api);

                if (!response.ok) {
                    throw new Error(`Request failed: ${response.status}`);
                }

                const data = await response.json();

                console.log("CardDeck API data:", data);

                if (!Array.isArray(data)) {
                    throw new Error("API did not return an array.");
                }

                setCards(
                    data
                        .filter((card) => card.is_active === true)
                        .sort((a, b) => a.order - b.order)
                );
            } catch (error) {
                console.error("CardDeck error:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (api) {
            fetchCards();
        }
    }, [api]);

    if (loading) {
        return <p className="text-white">Loading cards...</p>;
    }

    if (error) {
        return <p className="text-danger">{error}</p>;
    }

    return (
        <>
            
        <div className="row p-5 m-5 ">

                {cards.map((card) => (
                    <div className="card col-2 mt-0 pt-0 ms-5">
                    
                            <a href={card.path} title={card.title} >
                            <div className="row">    
                                <img src={images[card.image?.split("/").pop()]} className="card-img-top" alt={card.title} />
                           </div>
                                <div className=" row pl-1 pr-1 mb-0">
                                    <div className="btn btn-dark fw-bold dash-button">
                                        {card.title}
                                    </div>
                                </div>
                            </a>
                        
                        </div>
                ))}

            {cards.length === 0 && (
                <p className="text-white text-center">
                    Please wait....
                </p>
            )}
        </div>
        </>
    );
}

export default CardDeck;

