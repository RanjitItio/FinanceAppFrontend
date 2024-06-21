import {Main, DrawerHeader} from '../Content';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';
import axiosInstance from '../Authentication/axios';

  


export default function MerchantPayments({open}) {
    const [businessTransactionData, updateBusinessTransactionData] = useState([])


    useEffect(() => {
        axiosInstance.get(`api/v4/merchant/business/transactions/`).then((res)=> {
            // console.log(res.data.data)
            const sortedData = res.data.data.sort((a, b) => new Date(b.business_transaction.id) - new Date(a.business_transaction.id));
            updateBusinessTransactionData(sortedData)

        }).catch((error)=> {
            console.log(error)

        })
    }, [])
    
    const rows = businessTransactionData

    const getStatusColor = (status)=> {
        switch (status) {
            case 'Success':
                return 'success'
            case 'Cancelled':
                return 'danger' 
            case 'Pending':
                return 'warning' 
            default:
                return 'defaultColor';
        }
    };

    return (
        <Main open={open}>
        <DrawerHeader />

            <div className="d-flex justify-content-center">
                <p className='fs-3'>PAYMENTS</p>
            </div>
            <div className="d-flex justify-content-center">
                <p className='text-muted'>List of all payments you received from customers</p>
            </div>
            <br />

            <div sx={{minWidth:'800px', overflowX:'auto'}}>
            <TableContainer>
                <Table size="small" aria-label="responsive table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Sl No.</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell align="right">Merchant</TableCell>
                            <TableCell align="right">Payer</TableCell>
                            <TableCell align="right">Method</TableCell>
                            <TableCell align="right">Order ID</TableCell>
                            <TableCell align="right">Amount</TableCell>
                            <TableCell align="right">Fee</TableCell>
                            <TableCell align="right">Total</TableCell>
                            <TableCell align="right">Currency</TableCell>
                            <TableCell align="right">Status</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                    {rows.map((row) => (
                        <TableRow
                        key={row.business_transaction.id}
                        // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {row.business_transaction ? row.business_transaction.id : '-'}
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {row.business_transaction ? row.business_transaction.date : '-'}
                        </TableCell>
                        <TableCell align="right">{row.business_transaction ? row.business_transaction.merchant : '-'}</TableCell>
                        <TableCell align="right">{row.business_transaction ? row.business_transaction.payer : '-'}</TableCell>
                        <TableCell align="right">{row.business_transaction ? row.business_transaction.pay_mode : '-'}</TableCell>
                        <TableCell align="right">{row.business_transaction ? row.business_transaction.order_id : '-'}</TableCell>
                        <TableCell align="right">{row.business_transaction ? row.business_transaction.amount : '-'}</TableCell>
                        <TableCell align="right">{row.business_transaction ? row.business_transaction.fee : '-'}</TableCell>
                        <TableCell align="right">{row.business_transaction ? row.business_transaction.total_amount : '-'}</TableCell>
                        <TableCell align="right">{row.business_transaction ? row.business_transaction.currency : '-'}</TableCell>
                        <TableCell align="right">
                            <span className={`text-${getStatusColor(row.business_transaction?.status)}`}>
                                {row.business_transaction ? row.business_transaction.status : '-'}
                            </span>
                        </TableCell>
                        
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
                </div>

        </Main>
    )

};


