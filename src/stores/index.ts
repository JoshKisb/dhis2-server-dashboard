import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { Server, serversSlice } from './servers'
import { serversApi } from '../services/servers'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
  reducer: {
    servers: serversSlice.reducer,
    [serversApi.reducerPath]: serversApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(serversApi.middleware),
})

setupListeners(store.dispatch)


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

// custom hook to get the servers state
export const useServers = () => {
  const dispatch = useDispatch();
  const servers = useSelector((state: RootState) => state.servers.servers);
  const selected = useSelector((state: RootState) => state.servers.selected);
  const current = servers.find((server) => server.id === selected);
  const selectServer = (id: string) => dispatch(serversSlice.actions.selectServer(id));
  const add = (server: Server) => dispatch(serversSlice.actions.add(server));
  const update = (server: Server) => dispatch(serversSlice.actions.update(server));
  const currentEdit = useSelector((state: RootState) => state.servers.editing);
  const currentEditServer = servers.find((server) => server.id === currentEdit);
  const remove = (id: string) => dispatch(serversSlice.actions.remove(id));
  const edit = (id: string) => dispatch(serversSlice.actions.edit(id));
  const stopEdit = () => dispatch(serversSlice.actions.stopEdit());
  return { servers, selected, selectServer, add, remove, current, update, edit, stopEdit, currentEdit, currentEditServer };
}