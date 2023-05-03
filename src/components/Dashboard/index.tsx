import React from "react";
import Typography from "@mui/material/Typography";
import OnlineIndicator from "../OnlineIndicator";
import { Box, Button, Chip, Grid, Paper, Stack, styled } from "@mui/material";
import FaceIcon from "@mui/icons-material/Face";
import { useServers } from "../../stores";
import DashboardChart from "./Chart";
import ServerConfig from "../ServerConfig";

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: "center",
	color: theme.palette.text.secondary,
}));

const Dashboard: React.FC = () => {
	const store = useServers();
	const server = store.current;

	return (
		<>
			{!!server ? (
				<>
					<Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
						<Typography variant="h4">{server.name}</Typography>
						<Chip icon={<FaceIcon />} label={server.username} />
						<OnlineIndicator />
					</Box>
					<Grid container spacing={2}>
						<Grid item xs={12} md={2}>
							<Item elevation={0}>
								<Stack spacing={2}>
									<Button variant="contained">Start</Button>
									<Button variant="contained">Stop</Button>
									<Button variant="contained">Backup</Button>
									<Button variant="contained">Postgres</Button>
								</Stack>
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
									<Typography paragraph>
										Version: Ubuntu 20.04
									</Typography>
								</Box>
							</Item>
						</Grid>
					</Grid>
					<ServerConfig onClose={store.stopEdit} open={!!store.currentEdit} server={store.currentEditServer} />
				</>
			) : (
				<Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
					<Typography paragraph>
						Select a server to view its dashboard.
					</Typography>
				</Box>
			)}
		</>
	);
};

export default Dashboard;
