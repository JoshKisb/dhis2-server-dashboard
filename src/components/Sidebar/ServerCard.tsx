import { useState } from "react";
import Divider from "@mui/material/Divider";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteDialog from "./DeleteDialog";
import {
	Box,
	Card,
	CardActionArea,
	CardHeader,
	IconButton,
	Menu,
	MenuItem,
} from "@mui/material";
import React from "react";
import { Server } from "../../stores/servers";
import { useServers } from "../../stores";

const ITEM_HEIGHT = 48;

interface ServerCardProps {
	server: Server;
}

const ServerCard: React.FC<ServerCardProps> = ({ server }) => {
	const store = useServers();
	const [anchorEl, setAnchorEl] = useState(null);
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleEdit = () => {
		setAnchorEl(null);
		store.edit(server.id);
	};

	const handleDelete = () => {
		setAnchorEl(null);
		setDeleteDialogOpen(true);
	};

	const handleDeleteConfirm = () => {
		store.remove(server.id);
		setDeleteDialogOpen(false);
	};

	const handleDeleteCancel = () => {
		setDeleteDialogOpen(false);
	};

	return (
		<Box sx={{ mx: 1, my: 1.2 }}>
			<Card
				key={server.id}
				sx={{
					minWidth: 50,
					backgroundColor: server.id === store.selected ? "#dddedf" : "#fff",
				}}
			>
				<CardHeader
					action={
						<IconButton aria-label="settings" onClick={handleClick}>
							<MoreVertIcon />
						</IconButton>
					}
					title={
						<CardActionArea
							onClick={() => {
								store.selectServer(server.id);
							}}
						>
							{server.name}
						</CardActionArea>
					}
				></CardHeader>

				<Menu
					id={`menu-${server.id}`}
					anchorEl={anchorEl}
					keepMounted
					open={Boolean(anchorEl)}
					onClose={handleClose}
					PaperProps={{
						style: {
							maxHeight: ITEM_HEIGHT * 4.5,
							width: "20ch",
						},
					}}
				>
					<MenuItem onClick={handleEdit}>Edit</MenuItem>
					<MenuItem>
						<Divider sx={{ my: 0.5 }} />
					</MenuItem>
					<MenuItem onClick={handleDelete} sx={{ color: "error.main" }}>
						Delete
					</MenuItem>
				</Menu>
				<DeleteDialog
					open={deleteDialogOpen}
					instanceName={server.name}
					onCancel={handleDeleteCancel}
					onConfirm={handleDeleteConfirm}
				/>
			</Card>
		</Box>
	);
};

export default ServerCard;
