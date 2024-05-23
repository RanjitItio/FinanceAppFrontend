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
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';




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


export default function WithdrawalSettings({open}) {

    return (
        <>
         <Main open={open}>
            <DrawerHeader />

            <div className="d-flex justify-content-center">
                <p className='fs-3'>WITHDRAWAL SETTINGS</p>
            </div>
            <div className="d-flex justify-content-center">
                <p className='text-muted'>All the options you have or can create to withdraw from your wallet</p>
            </div>
            <br />
            <div className='d-flex justify-content-between'>
                <p className='text-muted'>All Withdrawal History</p>
            </div>

            <List>
            {TransactionData.map((transaction, index) => (
                <ListItem
                key={index}
                disablePadding
                secondaryAction={
                    <IconButton edge="end" aria-label="comments">
                        {transaction.transaction_icon}
                    </IconButton>
                }
                className='mb-2 shadow border border-secondary'
                >
                    <ListItemButton>
                            <ListItemAvatar>
                                <Avatar style={{backgroundColor: '#e3e6df',color: transaction.payment_method_icon_color}}>{transaction.payment_method_icon}</Avatar>
                            </ListItemAvatar>
                        <ListItemText
                        primary={
                            <>
                              <span><b>{transaction.payment_method}</b></span>
                            </>
                        }
                        />

                        <ListItemText
                             primary={
                                <>
                                  <span><b>{transaction.email}</b></span>
                                </>
                             }
                        />

                        <ListItemText
                        primary={
                            <>
                                <div className='d-flex justify-content-end'>
                                    <span><EditOutlinedIcon style={{fontSize:'30px'}} /></span>
                                    <div style={{borderLeft: '1px solid black', height: '20px', marginRight: '10px', marginLeft: '10px'}} ></div>
                                    <span><DeleteForeverOutlinedIcon /></span> 
                                </div>
                            </>
                        }
                        
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
    )
}