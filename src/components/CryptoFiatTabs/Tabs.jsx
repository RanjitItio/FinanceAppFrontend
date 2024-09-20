import {Main, DrawerHeader} from '../Content';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CryptoContent from '../Crypto/CryptoDashboard';
import FiatDashboard from '../FIAT/FiatBoard';


// Crypto Fiat Tabs
export default function CryptoFiatTabs({open}) {
    return (
        <Main open={open}>
        <DrawerHeader />

            <Tabs aria-label="Basic tabs" defaultValue={0}>
                <TabList>
                    <Tab>
                        <ListItemDecorator>
                            <CurrencyBitcoinIcon />
                        </ListItemDecorator>
                        Crypto
                    </Tab>

                    <Tab>
                        <ListItemDecorator>
                            <AttachMoneyIcon />
                        </ListItemDecorator>
                        FIAT
                    </Tab>
                </TabList>

                <TabPanel value={0}>
                    <CryptoContent />
                </TabPanel>

                <TabPanel value={1}>
                    <FiatDashboard />
                </TabPanel>
            </Tabs>

        </Main>
    );
};