import CryptoContent from "./Crypto"
import CryptoNavbar from "./CryptoNav"
import CryptoFiatTabs from "./Tabs"





export default function CryptoFiat() {
    return (
        <>
        <CryptoNavbar />
        <CryptoFiatTabs  CryptoContent={CryptoContent} />
        </>
    )
}
// 