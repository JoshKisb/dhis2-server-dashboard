import React from "react";
import { DataQuery } from "@dhis2/app-runtime";
import i18n from "@dhis2/d2-i18n";
import classes from "./App.module.css";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from '@mui/material/Toolbar';
import Box from "@mui/material/Box";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import "./styles/styles.css";

const query = {
	me: {
		resource: "me",
	},
};

const MyApp = () => (
	<Box sx={{ display: "flex" }}>
		<CssBaseline />
		<Sidebar />
		<Box component="main" sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}>			
			<Dashboard />
		</Box>
	</Box>
);

export default MyApp;
