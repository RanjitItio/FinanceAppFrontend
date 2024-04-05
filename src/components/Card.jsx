import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";



function Cards({maxCards}) {
    const [showCards, setShowCards] = useState(false)

    const cards = [
        {
            title: "Visa Card",
            card_no: "**** **** ****6758",
            name_tile: "Name",
            name: "Ranjit Kumar Sahoo"
        },
        {
            title: "Visa Card",
            card_no: "**** **** ****6547",
            name_tile: "Name",
            name: "Manjesh Kumar Yadav"
           
        },
        {
            title: "Visa Card",
            card_no: "**** **** ****1245",
            name_tile: "Name",
            name: "Mohan Kumar"
            
        }
        
    ];

    const visibleCards = showCards ? cards : cards.slice(0, maxCards);

    return (
        <>
        {visibleCards.map((card, index) => (
            <Link to="/wallet/card-update" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="card my-2" style={{backgroundColor: "#22c1c3", color: "white"}} key={index}>
                <div className="card-body">
                    <div className="d-flex justify-content-between">
                        <h6 className="card-title" >{card.title}</h6>
                        <h5 className="card-title" ><b>{card.title}</b></h5>
                    </div>&nbsp;
                    <h6 className="card-subtitle mb-2" ><b>{card.card_no}</b></h6>

                    <p className="card-text" >{card.name_tile}</p><br/>
                    <p className="card-text" >{card.name}</p>
                </div>
                </div>
            </Link>
        ))}

            {!showCards && cards.length > maxCards && (
                <button className="btn btn-link" onClick={() => setShowCards(true)}>Show more</button>
            )}
     

        </>
        

       
       
    );
}


export default Cards;