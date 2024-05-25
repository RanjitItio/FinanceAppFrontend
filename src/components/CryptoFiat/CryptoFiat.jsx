import CryptoContent from "./Crypto"
import FiatDashboard from "./Fiat/FiatBoard";
import CryptoFiatTabs from "./Tabs"
import {Main, DrawerHeader} from '../Content';





export default function CryptoFiat({open}) {

    return (
        <>
            <Main open={open}>
            <DrawerHeader />
                <CryptoFiatTabs  CryptoContent={CryptoContent} FiatDashboard={FiatDashboard} />
            </Main>
        </>
    )
}

