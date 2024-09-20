import BasicSparkLine from "./MarketValueChart";
import { Table, TableHead, TableRow, TableCell, TableBody,
    TableContainer, Paper, Typography, Box, Button, Card
  } from '@mui/material'




function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];



const CurrencyMarketValue = [
    {
        curency_name: 'Bitcoin',
        price:        '$290',
        CAGR:         '24.65% / 6',
        chart_color:  'orange',
        crypto_color: 'orange'
    },
    {
        curency_name: 'Etherium',
        price:        '$860',
        CAGR:         '19.65% / 6',
        chart_color:  'blue',
        crypto_color: 'blue'
    },
    {
        curency_name: 'Dodgecoin',
        price:        '$590',
        CAGR:         '67.65% / 6',
        chart_color:  'yellow',
        crypto_color: 'yellow'
    },
]


export default function MarketValueCard() {

    return(
        <Box sx={{ overflowX: 'auto', maxWidth:'100%' }}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 10 }}>
                <caption>List of Currency values</caption>

                <TableHead>
                    <TableRow>
                        <TableCell sx={{ color: 'text.secondary' }}>
                            Currency Name
                        </TableCell>

                        <TableCell sx={{ color: 'text.secondary' }}>
                            Price
                        </TableCell>

                        <TableCell sx={{ color: 'text.secondary' }}>
                            CAGR / Month
                        </TableCell>

                        <TableCell sx={{ color: 'text.secondary' }}>
                            Statistics
                        </TableCell>

                        <TableCell sx={{ color: 'text.secondary' }}>
                            Exchanges
                        </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {CurrencyMarketValue.map((item, index) => (
                    <TableRow key={index} hover>
                        <TableCell component="th" scope="row">
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Box
                                sx={{
                                    width: 25,
                                    height: 25,
                                    borderRadius: '50%',
                                    backgroundColor: item.crypto_color,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    mr: 1
                                }}
                                >
                                <i
                                    className="bi bi-currency-bitcoin"
                                    style={{ color: 'white', fontSize: 20 }}
                                />
                                </Box>
                                {item.curency_name}
                            </Box>
                        </TableCell>

                        <TableCell>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                {item.price}
                            </Typography>
                        </TableCell>

                        <TableCell>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                {item.CAGR}
                            </Typography>
                        </TableCell>

                        <TableCell>
                            <BasicSparkLine ChartColor={item.chart_color} />
                        </TableCell>

                        <TableCell>
                            <Button variant="outlined" color="success" size="small">
                                Transfer Now
                            </Button>
                        </TableCell>

                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};