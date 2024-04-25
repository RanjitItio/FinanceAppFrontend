import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import SplitButton from 'react-bootstrap/SplitButton';
import { useEffect, useState } from 'react';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import axios from 'axios';
import { error } from 'jquery';



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

    const [selectedItem1, setSelectedItem1] = useState('BTC');
    const [selectedItem2, setSelectedItem2] = useState('ETH');
    const [firstconvertData, setFirstconvertData] = useState('')
    const [secondconvertData, setSecondconvertData] = useState('1')
    const [convertedValue, setConvertedValue] = useState(0)
    const [inputValue, setInputValue] = useState('1');


    const API_KEY = '34EB65AE-B800-438F-B09D-24D745B17D0C'
    

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSelect = (eventKey, dropdown) => {
          if (dropdown == 'dropdown1'){
            setSelectedItem1(eventKey);
          }else {
            setSelectedItem2(eventKey);
          }
      };

    const handleSwapItems = ()=> {
        const temp = selectedItem1;
        setSelectedItem1(selectedItem2);
        setSelectedItem2(temp);
    }
    
    let timeID; 

    timeID = setTimeout(() => {
        const firstfetch = async()=> {
            const dropdown2 = selectedItem2;
            
            try{
                const response = await axios.get(`https://rest.coinapi.io/v1/assets/${dropdown2}`,{
                   headers: {
                    'X-CoinAPI-Key': API_KEY
                   },
                });
                // console.log(response.data)
                // price = parseFloat(response.data[0].price_usd)
                // setConvertedValue(response.data[0].price_usd)
                
            } catch(error) {
                console.error(console.error.response)
            }
        };

        firstfetch();

    }, 700);

    
    

    const handleCryptoConvert = ()=> {
       const dropdown1 = selectedItem1;
       const dropdown2 = selectedItem2;

     
        const fetchdata1 = async()=> {
            try{
                const response1 = await axios.get(`https://rest.coinapi.io/v1/assets/${dropdown1}`,{
                   headers: {
                    'X-CoinAPI-Key': API_KEY
                   },
                });
                // console.log(response1.data)
                setFirstconvertData(response1.data[0].price_usd);
            } catch(error) {
                console.error(console.error.response)
            }
        };

        const fetchdata2 = async()=> {
            try{
                const response2 = await axios.get(`https://rest.coinapi.io/v1/assets/${dropdown2}`, {
                    headers: {
                        'X-CoinAPI-Key': API_KEY
                    },
                });
                // console.log(response2.data)
                setSecondconvertData(response2.data[0].price_usd);
            }catch(error) {
               console.error(console.error.response)
            }
        };


        setTimeout(() => {
            fetchdata1();
            setTimeout(() => {
                fetchdata2();
           }, 400);
        }, 100);

        
    
    setTimeout(() => {
        const input = inputValue;
        
        const firstValue = parseFloat(firstconvertData) * parseFloat(input);
        const secondValue = parseFloat(secondconvertData);
        

        if (!isNaN(firstValue) && !isNaN(secondValue) && secondValue !== 0) {
            const finalValue  = firstValue / secondValue
            setConvertedValue(finalValue);
            
    } else {
        console.error("Error: Unable to convert string values to numbers or divide by zero.");
    }

    }, 500);
    

    }
      

    return (
        <>
        <div>
            <div className="d-flex justify-content-center mb-2">
                <button type="button" className="btn btn-primary">Send</button>
                <button type="button" className="btn btn-light">Receive</button>
            </div>

            <div className="card mb-2" >
                <div className="card-body" style={{ position: 'relative' }} >
                    <div className="d-flex justify-content-between">
                    
                    <input 
                    type="number" 
                    name="" 
                    id="" 
                    style={{width: '30%'}} 
                    value={inputValue}
                    onChange={handleInputChange}
                    />
                    {[SplitButton].map((DropdownType, idx) => (
                        <DropdownType
                            as={ButtonGroup}
                            key={idx}
                            id={`dropdown-button-drop-${idx}`}
                            size="sm"
                            variant="light"
                            title={selectedItem1 ? selectedItem1 : "BTC"}
                            onSelect={(eventKey)=> handleSelect(eventKey, 'dropdown1')}
                        >
                            <Dropdown.Item eventKey="BTC">BTC</Dropdown.Item>
                            <Dropdown.Item eventKey="ETH">ETH</Dropdown.Item>
                            <Dropdown.Item eventKey="DC">PLN</Dropdown.Item>
                            <Dropdown.Item eventKey="DC">DOGE</Dropdown.Item>
                            <Dropdown.Item eventKey="DC">LTC</Dropdown.Item>
                            <Dropdown.Item eventKey="DC">VEN</Dropdown.Item>
                        </DropdownType>
                    ))}
                    </div>
                </div>
            </div>

           <a onClick={handleSwapItems} style={{cursor: 'pointer'}}>
                <ImportExportIcon style={{position: 'absolute', top: '18%', left: '45%', zIndex: '1'}} />
            </a>

            <div className="card mb-3">
                <div className="card-body">
                    <div className="d-flex justify-content-between">
                        <h6 className="card-subtitle my-1"><b>{convertedValue.toFixed(5)}</b></h6>
                        {[SplitButton].map((DropdownType, idx) => (
                            <DropdownType
                                as={ButtonGroup}
                                key={idx}
                                id={`dropdown-button-drop-${idx}`}
                                size="sm"
                                variant="light"
                                title={selectedItem2 ? selectedItem2 : "ETH"}
                                onSelect={(eventKey)=> handleSelect(eventKey, 'dropdown2')}
                            >
                                <Dropdown.Item eventKey="BTC">BTC</Dropdown.Item>
                                <Dropdown.Item eventKey="ETH">ETH</Dropdown.Item>
                                <Dropdown.Item eventKey="DC">PLN</Dropdown.Item>
                                <Dropdown.Item eventKey="DC">DOGE</Dropdown.Item>
                                <Dropdown.Item eventKey="DC">LTC</Dropdown.Item>
                                <Dropdown.Item eventKey="DC">VEN</Dropdown.Item>
                            </DropdownType>
                        ))}
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button type="button" className="btn btn-primary mx-5" style={{ maxWidth: '200px' }} onClick={handleCryptoConvert}>Convert</button>
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