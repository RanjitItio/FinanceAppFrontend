import { Main, DrawerHeader } from "../../Content";
import Paper from '@mui/material/Paper';
import { Card, CardContent, Typography, IconButton, Tooltip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';




export default function MerchantBankAccounts ({open}) {
    const navigate = useNavigate();

    const handelAddBankAccountClicked = ()=> {
        navigate('/add/merchant/bank/account/')
    }

    const handelUpdateBankAccountClicked = ()=> {
        navigate('/update/merchant/bank/accounts/')
    }
    return (
        <>
        <Main open={open}>
            <DrawerHeader />
            <Card>
                <CardContent>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <AccountBalanceIcon fontSize="large" />
                        <Typography variant="h5" style={{ marginLeft: '8px' }}>
                        My Bank Accounts
                        </Typography>
                    </div>
                    <Tooltip title="Add New Bank Account" placement="top">
                        <IconButton color="primary" style={{ cursor: 'pointer' }} onClick={handelAddBankAccountClicked}>
                        <AddToDriveIcon fontSize="large" />
                        </IconButton>
                    </Tooltip>
                    </div>
                    <Box sx={{ overflowX: 'scroll', marginTop: 2 }}>
                    <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                        <TableRow>
                            <TableCell style={{ backgroundColor: '#0089BA', color: 'white' }}>Sl No</TableCell>
                            <TableCell style={{ backgroundColor: '#0089BA', color: 'white' }}>Account Holder Name</TableCell>
                            <TableCell style={{ backgroundColor: '#0089BA', color: 'white' }}>Account Number</TableCell>
                            <TableCell style={{ backgroundColor: '#0089BA', color: 'white' }}>Bank Name</TableCell>
                            <TableCell style={{ backgroundColor: '#0089BA', color: 'white' }}>Currency</TableCell>
                            <TableCell style={{ backgroundColor: '#0089BA', color: 'white' }}>Document</TableCell>
                            <TableCell style={{ backgroundColor: '#0089BA', color: 'white' }}>Action</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {[1, 2, 3].map((row) => (
                            <TableRow key={row}>
                            <TableCell>{row}</TableCell>
                            <TableCell>Mark</TableCell>
                            <TableCell>12***222</TableCell>
                            <TableCell>IDBI</TableCell>
                            <TableCell>INR</TableCell>
                            <TableCell>DOC</TableCell>
                            <TableCell>
                                <Tooltip title="Verified">
                                <DoneAllIcon style={{ color: 'green', cursor: 'pointer', marginRight: '8px' }} />
                                </Tooltip>
                                <Tooltip title="Edit">
                                <BorderColorIcon color="primary" style={{ cursor: 'pointer', marginRight: '8px' }} onClick={handelUpdateBankAccountClicked} />
                                </Tooltip>
                                <Tooltip title="Delete">
                                <DeleteForeverIcon color="error" style={{ cursor: 'pointer' }} />
                                </Tooltip>
                            </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </TableContainer>
                    </Box>
                </CardContent>
            </Card>
            
        </Main>
        </>
    );
};