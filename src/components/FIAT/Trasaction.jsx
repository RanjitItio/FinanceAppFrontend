import { useState, useEffect } from "react";
import axiosInstance from '../Authentication/axios';
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, Table, TableBody, 
        TableCell, TableContainer, TableHead, 
        TableRow, Paper, Button, Box } from '@mui/material';




// User Fiat Recent Transactions
export default function FiatTransaction() {

    const navigate          = useNavigate();
    const [error, setError] = useState('');
    const [FiatTransactionsData, updateFiatTransactionsData] = useState([]);  // Transaction Dat

    
    // Fetch all Fiat Transactions
    useEffect(() => {
        try{
            axiosInstance.get(`/api/v4/users/fiat/recent/transactions/`).then((res)=> {
    
                if(res.data && res.data.all_fiat_recent_transactions) {
                    const sortedTransaction = res.data.all_fiat_recent_transactions.sort((a,b)=> {
                        return new Date(b.transaction.created_At) - new Date(a.transaction.created_At)
                    })
                    updateFiatTransactionsData(sortedTransaction)
                };
            })
        } catch(error) {
            console.log(error)
        }
       
    }, []);

    
    const handleRedirectAllTransaction = () => {
        navigate('/transactions/')
    };


    return(
        <Card sx={{borderRadius:'20px'}}>
            <CardContent>
                <Typography variant="h5" component="div" fontWeight="bold">
                    Transaction History
                </Typography>

                <TableContainer component={Paper} sx={{ maxHeight: '50rem' }}>
                    <Table stickyHeader sx={{ overflowX: 'auto' }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Transaction ID</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Credit/Debit</TableCell>
                                <TableCell>View</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {FiatTransactionsData.map((item, index) => (
                                <TableRow key={index} hover>
                                    <TableCell>
                                        <Box sx={{ maxWidth: '100px', overflow: 'scroll', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                                            <Typography variant="body2">
                                                {item.transaction?.transaction_id ? 
                                                `${item.transaction?.transaction_id.slice(0, 10)}...` : ''}
                                                </Typography>
                                        </Box>
                                    </TableCell>

                                    <TableCell>{item?.type || ''}</TableCell>

                                    <TableCell>
                                        <i>{item.transaction?.amount || ''} {item.currency.name}</i>
                                    </TableCell>

                                    <TableCell>{item.transaction?.created_At.split('T')[0] || ''}</TableCell>

                                    <TableCell>

                                        {item.transaction.status === 'Approved' ? (
                                            <Typography color="success.main">Approved</Typography>
                                        ) : item.transaction.status === 'Pending' ? (
                                            <Typography color="warning.main">Pending</Typography>
                                        ) : item.transaction.status === 'Cancelled' ? (
                                            <Typography color="error.main">Cancelled</Typography>
                                        ) : item.transaction.status === 'Hold' ? (
                                            <Typography color="primary">On Hold</Typography>
                                        ) : 'NA'}

                                    </TableCell>
                                    
                                    <TableCell className="text-primary">
                                        {item.transaction?.credited_amount ? item.transaction.credited_amount : ''} {item.transaction?.credited_currency ? item.transaction.credited_currency : ''}
                                    </TableCell>

                                    <TableCell>
                                        <Button variant="contained" color="primary" onClick={handleRedirectAllTransaction}>
                                            Detail
                                        </Button>
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>

    );
};