// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Server } from '../stores/servers'
import { getApiUrl } from '../utils/helpers'

// Define a service using a base URL and expected endpoints
export const serversApi = createApi({
  reducerPath: 'serversApi',
  baseQuery: fetchBaseQuery({ baseUrl: getApiUrl() }),
  endpoints: (builder) => ({
    getAllServers: builder.query<Server[], void>({
        query: () => `servers`,
    }),
    getServerById: builder.query<Server, string>({
      query: (id) => `servers/${id}`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllServersQuery } = serversApi;