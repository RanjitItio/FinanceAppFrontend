import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import SplitButton from 'react-bootstrap/SplitButton';
import { useState } from 'react';



const RecentTransactions = [
    {
        currency_name: 'Send Bitcoin',
        time: '8:45 PM',
        amount: '-$20.90',
        text_color: 'red'
    },
    {
        currency_name: 'Receive Etherium',
        time: '8:60 PM',
        amount: '$70.90',
        text_color: 'green'
    },
    {
        currency_name: 'Send Dodge Coin',
        time: '7:30 AM',
        amount: '-$20.90',
        text_color: 'red'
    },
    {
        currency_name: 'Receive Polkstar',
        time: '6:50 PM',
        amount: '$20.90',
        text_color: 'green'
    },
    {
        currency_name: 'Send Bitcoin',
        time: '8:45 PM',
        amount: '-$20.90',
        text_color: 'red'
    },
    {
        currency_name: 'Send Bitcoin',
        time: '8:45 PM',
        amount: '-$20.90',
        text_color: 'red'
    },
]


export default function Transactions() {

    const [selectedItem, setSelectedItem] = useState(null);

    const handleSelect = (eventKey) => {
        setSelectedItem(eventKey);
      };
      

    return (
        <>
        <div>
            <div className="d-flex justify-content-center mb-2">
                <button type="button" className="btn btn-primary">Send</button>
                <button type="button" className="btn btn-light">Receive</button>
            </div>

            <div className="card mb-2">
                <div className="card-body" >
                    <div className="d-flex justify-content-between">
                    <h6 className="card-subtitle my-1"><b>230$</b></h6>
                    {[SplitButton].map((DropdownType, idx) => (
                        <DropdownType
                            as={ButtonGroup}
                            key={idx}
                            id={`dropdown-button-drop-${idx}`}
                            size="sm"
                            variant="light"
                            title={selectedItem ? selectedItem : "BTC"}
                            onSelect={handleSelect}
                        >
                            <Dropdown.Item eventKey="BTC">BTC</Dropdown.Item>
                            <Dropdown.Item eventKey="ETH">ETH</Dropdown.Item>
                            <Dropdown.Item eventKey="DC">DGC</Dropdown.Item>
                        </DropdownType>
                    ))}
                    </div>
                </div>
            </div>

            <div className="card mb-3">
                <div className="card-body">
                    <div className="d-flex justify-content-between">
                        <h6 className="card-subtitle my-1"><b>120$</b></h6>
                        {[SplitButton].map((DropdownType, idx) => (
                            <DropdownType
                                as={ButtonGroup}
                                key={idx}
                                id={`dropdown-button-drop-${idx}`}
                                size="sm"
                                variant="light"
                                title={selectedItem ? selectedItem : "ETH"}
                                onSelect={handleSelect}
                            >
                                <Dropdown.Item eventKey="BTC">BTC</Dropdown.Item>
                                <Dropdown.Item eventKey="ETH">ETH</Dropdown.Item>
                                <Dropdown.Item eventKey="DC">DGC</Dropdown.Item>
                            </DropdownType>
                        ))}
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button type="button" className="btn btn-primary mx-5" style={{ maxWidth: '200px' }}>Convert</button>
            </div>
        </div>

        <div>
            <div className="d-flex justify-content-between">
                <h6 className='my-4'><b>Transactions</b></h6>
                <a href="" className='my-3' style={{textDecoration: 'none'}}>see more</a>
            </div>
            

            {RecentTransactions.map((item, index)=> (
                <div className="d-flex justify-content-between" key={index}>
                    <div className='d-flex justify-content-start'>
                        <div className='d-flex align-items-center justify-content-center rounded-circle' style={{width: '25px', height: '25px', backgroundColor: '#FFA500'}}>
                            <i className="bi bi-currency-bitcoin" style={{color: 'white', fontSize: '20px'}}></i>
                        </div>
                        &nbsp;
                        <div className='mb-2'>
                            <p className="card-subtitle"  style={{textOverflow: 'ellipsis', overflow:'hidden' }}>{item.currency_name}</p>
                            <small className="card-subtitle mb-2 text-muted" style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>{item.time}</small>
                        </div>
                    </div>
                
                    <small style={{color: item.text_color}}><b>{item.amount}</b></small>
                </div>
            ))}
            
        </div>
        </>
    )
}