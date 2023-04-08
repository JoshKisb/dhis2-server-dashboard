import React from "react";
import Typography from "@mui/material/Typography";
import OnlineIndicator from "../OnlineIndicator";
import { Box } from "@mui/material";
import { useServers } from "../../stores";

const Dashboard: React.FC = () => {
	const store = useServers();
	const server = store.current;

	return (
		<>
			{!!server ? (
				<>
					<Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
						<Typography variant="h4">{server.name}</Typography>
						<OnlineIndicator />
					</Box>
					<Typography paragraph>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua.
						Rhoncus dolor purus non enim praesent elementum facilisis leo vel.
						Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
						grav. Cursus euismod quis viverra nibh cras.
						Metus vulputate eu scelerisque felis imperdiet proin fermentum
						leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt
						lobortis feugiat vivamus at augue. At augue eget arcu dictum
						varius duis at consectetur lorem. Velit sed ullamcorper morbi
						tincidunt. Lorem donec massa sapien faucibus et molestie ac.
					</Typography>
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
