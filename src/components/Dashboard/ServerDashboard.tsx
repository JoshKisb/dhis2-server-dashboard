import React from "react";
import Typography from "@mui/material/Typography";
import OnlineIndicator, { SmallOnlineIndicator } from "../OnlineIndicator";
import {
   Box,
   Button,
   ButtonGroup,
   Chip,
   CircularProgress,
   Grid,
   Paper,
   Stack,
   ToggleButton,
   ToggleButtonGroup,
   styled,
} from "@mui/material";
import FaceIcon from "@mui/icons-material/Face";
import { useServers } from "../../stores";
import DashboardChart from "./Chart";
import { useGetServerByIdQuery, useRunScriptMutation } from "../../services/servers";

const Item = styled(Paper)(({ theme }) => ({
   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
   ...theme.typography.body2,
   padding: theme.spacing(1),
   textAlign: "center",
   color: theme.palette.text.secondary,
}));

const ServerDashboard: React.FC = () => {
   const store = useServers();
   const [selectedContainer, setSelectedContainer] = React.useState<string | null>(null);
   const [script, setScript] = React.useState<string|null>(null)
   const [runScript, { isLoading: isRunningScript, isError: scErr }] = useRunScriptMutation();
   const { data: server, isLoading, isError, error } = useGetServerByIdQuery(store.selected as any);
   const err: any = error; // coz ts being annoying
   if (isLoading)
      return (
         <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
         </Box>
      );

   if (isError)
      return (
         <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Typography paragraph>{err.data.error || error.toString()}</Typography>
         </Box>
      );

   const handleChange = (event: React.MouseEvent<HTMLElement>, nextView: string) => {
      console.log(nextView);
      setSelectedContainer(nextView);
   };

   const handleStart = () => {
      handleRun("start");
   };

   const handleStop = () => {
      handleRun("stop");
   };

   const handleRun = (script: string) => {
      if (!selectedContainer) return;
      setScript(script)
      runScript({ id: server!.id, formData: { container: selectedContainer, script } }).finally(() => {
         setScript(null)
      });
   }

   return (
      <>
         {!!server && (
            <>
               <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                  <Typography variant="h4">{server.name}</Typography>
                  <Chip icon={<FaceIcon />} label={server.username} />
                  <OnlineIndicator />
               </Box>

               <Grid container spacing={2}>
                  <Grid item xs={12} md={2}>
                     <Item elevation={0}>
                        <Box
                           sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              flexDirection: "column",
                              minHeight: "380px",
                           }}
                        >
                           <ToggleButtonGroup
                              fullWidth
                              orientation="vertical"
                              value={selectedContainer}
                              exclusive
                              onChange={handleChange}
                              disabled={isRunningScript}
                           >
                              {server.info?.containers.map((c) => (
                                 <ToggleButton
                                    sx={{ justifyContent: "flex-start" }}
                                    value={c.name}
                                    aria-label={c.name}
                                    color={c.state.toLowerCase() == "running" ? "success" : "error"}
                                 >
                                    <SmallOnlineIndicator active={c.state.toLowerCase() === "running"} />
                                    {c.name}
                                 </ToggleButton>
                              ))}
                           </ToggleButtonGroup>

                           <Box sx={{ marginTop: "16px" }}>
                              <Stack spacing={2}>
                                 <Button variant="contained" disabled={!selectedContainer || isRunningScript} onClick={handleStart}>
                                    Start
                                 </Button>
                                 <Button variant="contained" disabled={!selectedContainer || isRunningScript} onClick={handleStop}>
                                    Stop
                                 </Button>
                                 {/* <Button variant="contained">Backup</Button>
                            <Button variant="contained">Postgres</Button> */}
                              </Stack>
                           </Box>
                        </Box>
                     </Item>
                  </Grid>
                  <Grid item xs={12} md={10}>
                     <Item elevation={0}>
                        <DashboardChart />
                        <Box
                           sx={{
                              display: "flex",
                              flexDirection: "column",
                              mt: 2,
                              alignItems: "flex-end",
                           }}
                        >
                           <Typography paragraph>Total Space: 100 GB</Typography>
                           <Typography paragraph>Used Space: 50 GB</Typography>
                           <Typography paragraph>Free Space: 50 GB</Typography>
                           <Typography paragraph>RAM: 8 GB</Typography>
                           <Typography paragraph>Uptime: 1 day</Typography>
                           <Typography paragraph>Version: {server.info?.os?.PRETTY_NAME}</Typography>
                        </Box>
                     </Item>
                  </Grid>
               </Grid>
            </>
         )}
      </>
   );
};

export default ServerDashboard;
