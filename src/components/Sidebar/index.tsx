import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Box, Button, Card, CardActions, CardContent, Typography } from "@mui/material";

const drawerWidth = 320;

const Sidebar: React.FC<{}> = () => {
	return (
		<Drawer
			sx={{
				width: drawerWidth,
				flexShrink: 0,
				"& .MuiDrawer-paper": {
					width: drawerWidth,
					backgroundColor: "#f3f4f5",
					marginTop: "48px",
					paddingBottom: "100px",
					boxSizing: "border-box",
				},
			}}
			variant="permanent"
			anchor="left"
		>
			<>
				{["1", "2", "3", "4", "5", "6", "7"].map((text, index) => (
					<Box sx={{ mx: 1, my: 1.5 }}>
						<Card
							key={text}
							sx={{
								minWidth: 50,
								backgroundColor: text === "2" ? "#dddedf" : "#fff",
							}}
						>
							<CardContent>
								<Typography variant="h4" color="text.primary" marginBottom={0}>
									Server {text}
								</Typography>
							</CardContent>
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
						<Button variant="contained">New Instance</Button>
					</Box>
				</Box>
			</>
			<Divider />
		</Drawer>
	);
};

export default Sidebar;
