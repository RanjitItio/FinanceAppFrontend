




export default function CryptoFiatTabs({CryptoContent}) {
  
  return (
    <>
        <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
                <button className="nav-link" id="crypto-tab" data-bs-toggle="tab" data-bs-target="#crypto" type="" role="tab" aria-controls="crypto" aria-selected="true">
                   <b>Crypto</b>
                </button>
            </li>
            <span className="my-2">||</span>

            <li className="nav-item" role="presentation">
                <button className="nav-link" id="fiat-tab" data-bs-toggle="tab" data-bs-target="#fiat" type="" role="tab" aria-controls="fiat" aria-selected="false">
                    <b>Fiat</b>
                </button>
            </li>
        </ul>

        <div className="tab-content" id="myTabContent">
            <div className="tab-pane fade show active" id="crypto" role="tabpanel" aria-labelledby="crypto-tab">
               <CryptoContent />
            </div>
            <div className="tab-pane fade" id="fiat" role="tabpanel" aria-labelledby="fiat-tab">
               Fiat
            </div>
        </div>
</>
  );
}