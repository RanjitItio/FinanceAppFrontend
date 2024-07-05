import { DevMain, DevDrawerHeader } from "./Content"
import { useState } from "react";
import DevLeftNavbar from "./Leftbar";
import DevUpperNavbar from "./Navbar";
import Box from '@mui/material/Box';


export default function DeveloperDocs() {

    const [open, setOpen] = useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
  
  return (
    <Box sx={{ display: 'flex' }}>
    <DevUpperNavbar handleDrawerOpen={handleDrawerOpen} open={open} />
    <DevLeftNavbar handleDrawerClose={handleDrawerClose} open={open} />

        <DevMain open={open}>
            <DevDrawerHeader />
            <p> Dev docs page</p>
        </DevMain>
    </Box>
  )
};
