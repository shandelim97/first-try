// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IContact } from '../../../../shared/types/prisma'

type LoginReqType = Pick<IContact, 'id' | 'username'>

// function providesList<R extends { id: string | number }[], T extends string>(
//     resultsWithIds: R | undefined,
//     tagType: T
// ) {
//     return resultsWithIds
//         ? [
//               { type: tagType, id: 'LIST' },
//               ...resultsWithIds.map(({ id }) => ({ type: tagType, id }))
//           ]
//         : [{ type: tagType, id: 'LIST' }]
// }

const apiAuthentication = createApi({
    reducerPath: 'apiAuthentication',
    tagTypes: ['Login'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001/api/authentication'
    }),
    endpoints: (build) => ({
        login: build.query<string, LoginReqType>({
            providesTags: (result, error, id) => {
                // console.log('result: ', result)
                // console.log('error: ', error)
                // console.log('id: ', id)
                return [{ type: 'Login' }]
            },
            // pick out data and prevent nested properties in a hook or selector
            transformResponse: (response: string, meta, arg) => {
                return response
            },
            // pick out errors and prevent nested properties in a hook or selector
            transformErrorResponse: (response, meta, arg) => {
                // console.log(response)
                return response
            },
            // // trigger side effects or optimistic updates
            // onQueryStarted(
            //     id,
            //     {
            //         dispatch,
            //         getState,
            //         extra,
            //         requestId,
            //         queryFulfilled,
            //         getCacheEntry,
            //         updateCachedData
            //     }
            // ) {},
            // // handle subscriptions etc
            // onCacheEntryAdded(
            //     id,
            //     {
            //         dispatch,
            //         getState,
            //         extra,
            //         requestId,
            //         cacheEntryRemoved,
            //         cacheDataLoaded,
            //         getCacheEntry,
            //         updateCachedData
            //     }
            // ) {},
            // queryFn: (arg, queryApi, extraOptions, baseQuery) => {
            //     // if (arg <= 0) {
            //     //     return {
            //     //       error: {
            //     //         status: 500,
            //     //         statusText: 'Internal Server Error',
            //     //         data: 'Invalid ID provided.',
            //     //       },
            //     //     }
            //     //   }
            //     return { data: '' }
            // }
            query: ({ id, username }) => ({
                url: `login`,
                method: 'POST',
                body: { id: id, name: username },
                params: { id: id, name: username }
            })
        })
        // testUpdate: build.mutation
    })
})

export const { useLoginQuery } = apiAuthentication
export default apiAuthentication
