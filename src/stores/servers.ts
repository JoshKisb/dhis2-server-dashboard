import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {v4 as uuidv4} from 'uuid';

export interface Server {
	id: string;
	name: string;
	ip?: string;
	port?: number;
	password?: string;
	username?: string;
}

export interface ServersState {
	selected: string | null;
	servers: Array<Server>;
	editing: string | null;
}

const initialState: ServersState = {
	selected: null,
   servers: [],
	editing: null,
};

export const serversSlice = createSlice({
	name: "servers",
	initialState,
	reducers: {
		selectServer: (state, action: PayloadAction<string>) => {
			state.selected = action.payload;
		},
		add: (state, action: PayloadAction<Server>) => {
			action.payload.id = uuidv4();
			state.servers.push(action.payload);
		},
		edit: (state, action: PayloadAction<string>) => {
			state.editing = action.payload;
		},
		stopEdit: (state) => {
			state.editing = null;
		},
		update: (state, action: PayloadAction<Server>) => {
			const index = state.servers.findIndex((server) => server.id === action.payload.id);
			if (index !== -1) {
				state.servers[index] = action.payload;
			}
		},
		remove: (state, action: PayloadAction<string>) => {
         state.servers = state.servers.filter((server) => server.id !== action.payload);
      },
	},
});



// Action creators are generated for each case reducer function
export const { selectServer, add, remove } = serversSlice.actions;
export default serversSlice.reducer;


