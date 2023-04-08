import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Server {
	id: number;
	name: string;
	ip?: string;
	port?: number;
	password?: string;
	username?: string;
}

export interface ServersState {
	selected: number | null;
	servers: Array<Server>;
}

const initialState: ServersState = {
	selected: 1,
   servers: [
		{
			id: 1,
			name: "Server 1",
		},
		{
			id: 2,
			name: "Server 2",
		},
		{
			id: 3,
			name: "Server 3",
		}
	],
};

export const serversSlice = createSlice({
	name: "servers",
	initialState,
	reducers: {
		selectServer: (state, action: PayloadAction<number>) => {
			state.selected = action.payload;
		},
		add: (state, action: PayloadAction<Server>) => {
			state.servers.push(action.payload);
		},
		remove: (state, action: PayloadAction<number>) => {
         state.servers = state.servers.filter((server) => server.id !== action.payload);
      },
	},
});



// Action creators are generated for each case reducer function
export const { selectServer, add, remove } = serversSlice.actions;
export default serversSlice.reducer;


