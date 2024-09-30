import {Main, DrawerHeader} from '../Content';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import Pagination from '@mui/material/Pagination';
import { useEffect, useState } from 'react';
import axiosInstance from '../Authentication/axios';
import UpgradeIcon from '@mui/icons-material/Upgrade';





const TransactionData = [
    {
        payment_method: 'Paypal',
        transaction_icon: <ArrowRightIcon />, 
        transaction_date: '31-03-2024',
        transaction_time: '9:47 PM',
        email: 'ranjit@mail.com',
        currency: 'USD',
        amount: '78',
        status: 'Success',
        status_color: 'green',
        payment_method_icon: <i class="bi bi-paypal" sx={{fontSize: 18}}></i>,
        payment_method_icon_color: 'blue',
    },
    {
        payment_method: 'Paypal',
        transaction_icon: <ArrowRightIcon />, 
        transaction_date: '31-03-2024',
        transaction_time: '9:47 PM',
        email: 'ranjit@mail.com',
        currency: 'USD',
        amount: '78',
        status: 'Pending',
        status_color: 'orange',
        payment_method_icon: <i class="bi bi-paypal" sx={{fontSize: 18}}></i>,
        payment_method_icon_color: 'blue',
    },
    {
        payment_method: 'Bank',
        transaction_icon: <ArrowRightIcon />, 
        transaction_date: '31-03-2024',
        transaction_time: '9:47 PM',
        email: 'ranjit@mail.com',
        currency: 'USD',
        amount: '78',
        status: 'Cancelled',
        status_color: 'red',
        payment_method_icon: <AccountBalanceIcon sx={{fontSize: 18}} />,
        payment_method_icon_color: '#cda307',
    },
    {
        payment_method: 'Bank',
        transaction_icon: <ArrowRightIcon />, 
        transaction_date: '31-03-2024',
        transaction_time: '9:47 PM',
        email: 'ranjit@mail.com',
        currency: 'USD',
        amount: '78',
        status: 'Success',
        status_color: 'green',
        payment_method_icon: <AccountBalanceIcon sx={{fontSize: 18}} />,
        payment_method_icon_color: '#cda307',
    },
    {
        payment_method: 'Paypal',
        transaction_icon: <ArrowRightIcon />, 
        transaction_date: '31-03-2024',
        transaction_time: '9:47 PM',
        email: 'ranjit@mail.com',
        currency: 'USD',
        amount: '78',
        status: 'Pending',
        status_color: 'orange',
        payment_method_icon: <i class="bi bi-paypal" sx={{fontSize: 18}}></i>,
        payment_method_icon_color: 'blue',
    },
    {
        payment_method: 'Paypal',
        transaction_icon: <ArrowRightIcon />, 
        transaction_date: '31-03-2024',
        transaction_time: '9:47 PM',
        email: 'ranjit@mail.com',
        currency: 'USD',
        amount: '78',
        status: 'Success',
        status_color: 'green',
        payment_method_icon: <i class="bi bi-paypal" sx={{fontSize: 18}}></i>,
        payment_method_icon_color: 'blue',
    },
    {
        payment_method: 'Bank',
        transaction_icon: <ArrowRightIcon />, 
        transaction_date: '31-03-2024',
        transaction_time: '9:47 PM',
        email: 'ranjit@mail.com',
        currency: 'USD',
        amount: '78',
        status: 'Pending',
        status_color: 'orange',
        payment_method_icon: <AccountBalanceIcon sx={{fontSize: 18}} />,
        payment_method_icon_color: '#cda307',
    },
    {
        payment_method: 'Paypal',
        transaction_icon: <ArrowRightIcon />, 
        transaction_date: '31-03-2024',
        transaction_time: '9:47 PM',
        email: 'ranjit@mail.com',
        currency: 'USD',
        amount: '78',
        status: 'Success',
        status_color: 'green',
        payment_method_icon: <i class="bi bi-paypal" sx={{fontSize: 18}}></i>,
        payment_method_icon_color: 'blue',
    },
];

// Status Color
const getStattusColor = (status)=> {
    switch (status) {
        case 'Approved':
            return 'green'
        case 'Pending':
            return 'orange'
        case 'Cancelled':
            return 'red'
        case 'Hold':
            return 'blue'
        default:
            return 'blue'
    }
};


// Users Withrawal List
export default function WithdrawalList({open}) {
    const [withdrawalData, updateWithdrawalData] = useState([]);

    
    useEffect(() => {
        axiosInstance.get(`/api/v5/user/fiat/withdrawal/`).then((res)=> {

            if (res.status === 200 && res.data.success == true) {
                updateWithdrawalData(res.data.all_fiat_withdrawals)
            };

        }).catch((error)=> {
            console.log(error)
        })
    }, []);
    
 
    return (
        <>
         <Main open={open}>
            <DrawerHeader />


            <div className="d-flex justify-content-center">
                <p className='fs-3'>Withdrawal List</p>
            </div>
            <div className="d-flex justify-content-center">
                <p className='text-muted'>History of all your withdrawals in your account</p>
            </div>
            <br />
            <div className='d-flex justify-content-between'>
                <p className='text-muted'>All Withdrawal History</p>
            </div>

            <List>
            {withdrawalData.map((transaction, index) => (
                <ListItem
                    key={index}
                    disablePadding
                    secondaryAction={
                        <IconButton edge="end" aria-label="comments">
                            <ArrowRightIcon />
                        </IconButton>
                    }
                    className='mb-2 shadow border border-secondary'
                >
                    <ListItemButton>
                            <ListItemAvatar>
                                <Avatar style={{backgroundColor: '#e3e6df', color: 'blue'}}>
                                    <UpgradeIcon />
                                </Avatar>
                            </ListItemAvatar>
                        <ListItemText
                        primary={
                            <>
                              <span><b>{transaction?.transaction_id ? `${transaction.transaction_id.slice(0, 10)}...` : ''  || ''}</b></span>
                            </>
                        }
                        secondary={`${transaction?.created_At.split('T')[0] || ''} ${transaction?.created_At.split('T')[1] || ''}`}
                        />

                        <ListItemText
                             primary={
                                <>
                                  <span><b>{transaction?.user_email || ''}</b></span>
                                </>
                             }
                        />

                        <ListItemText
                        primary={
                            <>
                                <span style={{marginRight: '1%'}}>{transaction.withdrawal_currency}</span>
                                <span>{transaction.amount}</span>
                            </>
                        }
                        secondary={
                            <span style={{ color: getStattusColor(transaction.status) }}>{transaction.status}</span>
                        }
                        sx={{ flex: 'auto', textAlign: 'right' }}
                        />

                    </ListItemButton>
                </ListItem>
            ))}
            </List>

            <div className="my-3">
                <Pagination count={10} color="primary" />
            </div>
        </Main>

        </>
    );
};