import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import SplitButton from 'react-bootstrap/SplitButton';
import { useEffect, useState } from 'react';
import ImportExportIcon from '@mui/icons-material/ImportExport';



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



// Recent Crypto Transactions
export default function CryptoTransactions({CryptoData, initialCryptoConversion}) {

    const [selectedItem1, setSelectedItem1] = useState('BTC');
    const [selectedItem2, setSelectedItem2] = useState('ETH');
    const [convertedValue, setConvertedValue] = useState(0)
    const [inputValue, setInputValue] = useState('1');
    

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

    
    

    const handleCryptoConvert = ()=> {
       const dropdown1 = selectedItem1;
       const dropdown2 = selectedItem2;

       let first_Crypto_value_in_usd;
       let second_Crypto_value_in_usd;
       
       CryptoData.forEach(asset => {
        if(asset.asset_id == dropdown1){
            first_Crypto_value_in_usd = parseFloat(asset.price_usd)
        }
        if(asset.asset_id == dropdown2){
            second_Crypto_value_in_usd = parseFloat(asset.price_usd)
        }
    });

        if (first_Crypto_value_in_usd !== undefined && second_Crypto_value_in_usd !== undefined) {
            const input = inputValue;
            const inputMultiplication = parseFloat(first_Crypto_value_in_usd) * parseFloat(input);

            const FinalConversionValue = inputMultiplication / second_Crypto_value_in_usd;
            setConvertedValue(FinalConversionValue);
            // console.log(convertedValue)
        } else {
            console.log("Error: One or both selected cryptocurrencies not found");
        }
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
                            <Dropdown.Item eventKey="PLN">PLN</Dropdown.Item>
                            <Dropdown.Item eventKey="DOGE">DOGE</Dropdown.Item>
                            <Dropdown.Item eventKey="LTC">LTC</Dropdown.Item>
                            <Dropdown.Item eventKey="VEN">VEN</Dropdown.Item>
                        </DropdownType>
                    ))}
                    </div>
                </div>
            </div>

           {/* <a onClick={handleSwapItems} style={{cursor: 'pointer'}}>
                <ImportExportIcon style={{position: 'absolute', top: '18%', left: '45%', zIndex: '1'}} />
            </a> */}

            <div className="card mb-3">
                <div className="card-body">
                    <div className="d-flex justify-content-between">
                        <h6 className="card-subtitle my-1"><b>
                            {convertedValue ? convertedValue.toFixed(5) : initialCryptoConversion.toFixed(5)}</b></h6>
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
                                <Dropdown.Item eventKey="PLN">PLN</Dropdown.Item>
                                <Dropdown.Item eventKey="DOGE">DOGE</Dropdown.Item>
                                <Dropdown.Item eventKey="LTC">LTC</Dropdown.Item>
                                <Dropdown.Item eventKey="VEN">VEN</Dropdown.Item>
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