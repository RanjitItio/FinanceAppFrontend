import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';





export default function PaymentSuccess() {
    return (
        <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 1,
          },
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          padding: '20px',
        }}
      >
        <Paper elevation={3} sx={{ maxWidth: '400px', padding: '20px', borderRadius: '20px', minWidth: '300px' }}>

            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                <IconButton aria-label="cancel"  sx={{color:'green', fontSize: '10px'}}>
                    <CheckCircleOutlineOutlinedIcon />
                </IconButton>
            </Box>

            <Typography variant="h6" gutterBottom sx={{display:'flex', justifyContent: 'center'}}>
                Success!
            </Typography>

            <Typography 
                  variant="p" 
                  gutterBottom  
                  sx={{display:'flex', justifyContent: 'center', marginBottom: '20px'}}
                  >
                Payment Successfull
            </Typography>

            <Button variant="contained" fullWidth>Home</Button>
            
        </Paper>
      </Box>
    );
};