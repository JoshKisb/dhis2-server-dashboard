import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { Server, serversSlice } from './servers'

export const store = configureStore({
  reducer: {
    servers: serversSlice.reducer,
  },
})

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
  const selectServer = (id: number) => dispatch(serversSlice.actions.selectServer(id));
  const add = (server: Server) => dispatch(serversSlice.actions.add(server));
  const remove = (id: number) => dispatch(serversSlice.actions.remove(id));
  return { servers, selected, selectServer, add, remove, current };
}