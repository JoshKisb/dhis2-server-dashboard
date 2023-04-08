import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import {
	Box,
	Button,
	Card,
	CardActionArea,
	CardContent,
	Typography,
} from "@mui/material";
import { useServers } from "../../stores";

const drawerWidth = 320;

const Sidebar: React.FC<{}> = () => {
	const store = useServers();

	const handleAddServer = () => {
		store.add({
			id: store.servers.length + 1,
			name: `Server ${store.servers.length + 1}`,
		});
	};

	return (
		<Drawer
			sx={{
				width: drawerWidth,
				flexShrink: 0,
				"& .MuiDrawer-paper": {
					width: drawerWidth,
					backgroundColor: "#f3f4f5",
					marginTop: "48px",
					paddingBottom: "120px",
					boxSizing: "border-box",
				},
			}}
			variant="permanent"
			anchor="left"
		>
			<>
				{store.servers.map((server) => (
					<Box sx={{ mx: 1, my: 1.2 }}>
						<Card
							key={server.id}
							sx={{
								minWidth: 50,
								backgroundColor:
									server.id == store.selected ? "#dddedf" : "#fff",
							}}
						>
							<CardActionArea onClick={() => store.selectServer(server.id)}>
								<CardContent>
									<Typography
										variant="h4"
										color="text.primary"
										marginBottom={0}
									>
										{server.name}
									</Typography>
								</CardContent>
							</CardActionArea>
						</Card>
					</Box>
				))}
				<Box
					sx={{
						position: "fixed",
						bottom: 0,
						backgroundColor: "#e9eaeb",
						width: drawerWidth,
					}}
				>
					<Box sx={{ mx: 1, mb: "1rem", mt: "1.5rem" }}>
						<Button variant="contained" onClick={handleAddServer}>
							New Instance
						</Button>
					</Box>
				</Box>
			</>
			<Divider />
		</Drawer>
	);
};

export default Sidebar;
