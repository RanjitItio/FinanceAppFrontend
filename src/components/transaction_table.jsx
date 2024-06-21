import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, IconButton, Button, Typography, Box } from '@mui/material';
import { Visibility, Delete } from '@mui/icons-material';
import { styled } from '@mui/system';
import { Main, DrawerHeader } from './Content';

const TableContainerStyled = styled(TableContainer)(({ theme }) => ({
  width: '100%',
  overflowX: 'auto',
}));

const TableStyled = styled(Table)(({ theme }) => ({
  minWidth: 650,
}));

const statusStyles = {
  Success: { color: 'green' },
  Pending: { color: 'orange' },
  Canceled: { color: 'red' },
};

const transactions = [
  { invoice: 'B12341', name: 'Figma Pro', category: 'Software', type: 'Subscribe', date: 'October 20, 2022', time: '01:32 PM', amount: -32.00, status: 'Success' },
  { invoice: 'B32345', name: 'Fiver International', category: 'Freelance platform', type: 'Receive', date: 'November 01, 2022', time: '01:32 PM', amount: 100.00, status: 'Pending' },
  { invoice: 'B12341', name: 'Adobe', category: 'Software', type: 'Subscribe', date: 'October 20, 2022', time: '01:32 PM', amount: -32.00, status: 'Canceled' },
  { invoice: 'B12341', name: 'Starbucks', category: 'Freelance platform', type: 'Receive', date: 'November 01, 2022', time: '01:32 PM', amount: 100.00, status: 'Pending' },
  { invoice: 'B12341', name: 'Figma Pro', category: 'Software', type: 'Subscribe', date: 'October 20, 2022', time: '01:32 PM', amount: -32.00, status: 'Success' },
];

const TransactionTable = ({open}) => {
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

    <TableContainerStyled component={Paper}>
      <TableStyled aria-label="transaction table">
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox />
            </TableCell>
            <TableCell>Invoice</TableCell>
            <TableCell>Name/Business</TableCell>
            <TableCell>Transaction Type</TableCell>
            <TableCell>Date & Time</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.invoice}>
              <TableCell padding="checkbox">
                <Checkbox />
              </TableCell>
              <TableCell>{transaction.invoice}</TableCell>
              <TableCell>
                <Box display="flex" alignItems="center">
                  <img src={`/${transaction.name.replace(" ", "").toLowerCase()}.png`} alt={transaction.name} style={{ width: 24, height: 24, marginRight: 8 }} />
                  <Box>
                    <Typography variant="body2">{transaction.name}</Typography>
                    <Typography variant="caption">{transaction.category}</Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Button variant="contained" color="primary" size="small">{transaction.type}</Button>
              </TableCell>
              <TableCell>{`${transaction.date} ${transaction.time}`}</TableCell>
              <TableCell>{transaction.amount < 0 ? `-$${Math.abs(transaction.amount)}` : `$${transaction.amount}`}</TableCell>
              <TableCell>
                <Typography style={statusStyles[transaction.status]}>{transaction.status}</Typography>
              </TableCell>
              <TableCell>
                <IconButton><Visibility /></IconButton>
                <IconButton><Delete /></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableStyled>
    </TableContainerStyled>
    </Main>
  );
};

export default TransactionTable;
