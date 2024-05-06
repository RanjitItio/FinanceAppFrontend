import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';




function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography variant='div'>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }


CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  };



export default function CryptoFiatTabs({CryptoContent, FiatDashboard, props}) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
  
  return (
    <>
        {/* <ul className="nav nav-tabs" id="myTab" role="tablist">
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
               <FiatDashboard />
            </div>
        </div> */}

    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Crypto" {...a11yProps(0)} />
          <Tab label="Fiat" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <CryptoContent />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <FiatDashboard />
      </CustomTabPanel>
      
    </Box>

</>
  );
};


