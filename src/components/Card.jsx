import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';



function Cards({maxCards}) {
    const [showCards, setShowCards] = useState(false)

    const cards = [
        {
            title: "",
            subtitle: "",
            text: "",
            links: [
                {label: "Card link", URL: "#"},
                {label: "Card link", URL: "#"}
            ]
        },
        {
            title: "",
            subtitle: "",
            text: "",
            links: [
                {label: "Card link", URL: "#"},
                {label: "Card link", URL: "#"}
            ]
        },
        {
            title: "",
            subtitle: "",
            text: "",
            links: [
                {label: "Card link", URL: "#"},
                {label: "Card link", URL: "#"}
            ]
        },
        {
            title: "",
            subtitle: "",
            text: "",
            links: [
                {label: "Card link", URL: "#"},
                {label: "Card link", URL: "#"}
            ]
        },
        {
            title: "",
            subtitle: "",
            text: "",
            links: [
                {label: "Card link", URL: "#"},
                {label: "Card link", URL: "#"}
            ]
        },
        {
            title: "",
            subtitle: "",
            text: "",
            links: [
                {label: "Card link", URL: "#"},
                {label: "Card link", URL: "#"}
            ]
        },
        {
            title: "",
            subtitle: "",
            text: "",
            links: [
                {label: "Card link", URL: "#"},
                {label: "Card link", URL: "#"}
            ]
        },
       
        
        
    ];

    const visibleCards = showCards ? cards : cards.slice(0, maxCards);

    return (
        <>
        {visibleCards.map((card, index) => (
           
            <div className="card my-2" style={{backgroundColor: ""}} key={index}>
            <div className="card-body">
                <h5 className="card-title" >{card.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted" >{card.subtitle}</h6>
                <p className="card-text" >{card.text}</p>
                <a href="#" className="card-link">Card link</a>
                <a href="#" className="card-link">Another link</a>
            </div>
            </div>
        ))}

            {!showCards && cards.length > maxCards && (
                <button className="btn btn-link" onClick={() => setShowCards(true)}>Show more</button>
            )}
     

        </>
        

       
       
    );
}


export default Cards;