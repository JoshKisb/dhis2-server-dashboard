import { useState } from "react";
import Divider from "@mui/material/Divider";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteDialog from "./DeleteDialog";
import {
   Box,
   Card,
   CardActionArea,
   CardContent,
   CardHeader,
   IconButton,
   Menu,
   MenuItem,
   Typography,
} from "@mui/material";
import React from "react";
import { useServers } from "../../stores";
import { useDeleteServerMutation, useGetServerByIdQuery } from "../../services/servers";
import { Server } from "../../types/server";

const ITEM_HEIGHT = 48;

interface ServerCardProps {
   server: Server;
}

const ServerCard: React.FC<ServerCardProps> = ({ server }) => {
   const store = useServers();
   const { isLoading, data } = useGetServerByIdQuery(server.id);
   const [deleteServer, { isLoading: deleting }] = useDeleteServerMutation();
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
      deleteServer(server.id);
      setDeleteDialogOpen(false);
   };

   const handleDeleteCancel = () => {
      setDeleteDialogOpen(false);
   };

   const handleSelect = (id: string) => {
      store.selectServer(id);
   };

   return (
      <Box sx={{ mx: 1, my: 1.2 }}>
         <Card
            key={server.id}            
            sx={{
               minWidth: 50,
               height: "210px",
               overflow: "hidden",
               textOverflow: "ellipsis",
               backgroundColor: server.id === store.selected ? "#dddedf" : "#fff",
            }}
         >
            <CardActionArea
               sx={{ height: "100%" }}
               onClick={() => {
                  handleSelect(server.id);
               }}
            >
               <CardHeader
                  action={
                     <IconButton aria-label="settings" onClick={handleClick}>
                        <MoreVertIcon />
                     </IconButton>
                  }
                  title={server.name}
                  />

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

               <CardContent style={{ paddingTop: 4, height: "145px" }}>
                  {isLoading && <Typography variant="body2">Loading...</Typography>}
                  {!isLoading &&
                     !!data &&
                     data.info?.containers.map((container) => (
                        <Typography variant="body2" component="div">
                           {container.name}
                        </Typography>
                     ))}
               </CardContent>
            </CardActionArea>
         </Card>
      </Box>
   );
};

export default ServerCard;
