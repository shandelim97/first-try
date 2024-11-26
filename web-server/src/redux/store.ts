import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit'
import apiAuthentication from '../rtk-query/api/authentication.api'
import { miscSlice } from './reducers/misc.reducer'
import apiContacts from '../rtk-query/api/contact.api'
import { setupListeners } from '@reduxjs/toolkit/query'
import { authenticationSlice } from './reducers/authentication.reducer'
import apiChat from '../rtk-query/api/chat.api'

const store = configureStore({
    reducer: {
        misc: miscSlice.reducer,
        authentication: authenticationSlice.reducer,
        [apiAuthentication.reducerPath]: apiAuthentication.reducer,
        [apiContacts.reducerPath]: apiContacts.reducer,
        [apiChat.reducerPath]: apiChat.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(apiAuthentication.middleware)
            .concat(apiContacts.middleware)
            .concat(apiChat.middleware)
})
export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)
