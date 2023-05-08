import React from "react";
import { Box, Button, Chip, CircularProgress, Grid, Paper, Stack, Typography, styled } from "@mui/material";
import FaceIcon from "@mui/icons-material/Face";
import { useServers } from "../../stores";
import ServerDashboard from "./ServerDashboard";



const Dashboard: React.FC = () => {
   const store = useServers();
   // const server = store.current;
   if (!store.selected)
      return (
         <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Typography paragraph>Select a server to view its dashboard.</Typography>
         </Box>
      );
   else return <ServerDashboard />;

   
};



export default Dashboard;
