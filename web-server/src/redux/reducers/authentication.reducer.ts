import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IContact } from '../../../../shared/types/prisma'

interface AuthenticationState {
    loggedInUser: IContact | undefined
}

const initialState: AuthenticationState = {
    loggedInUser: undefined
}

export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        reset: (state) => {
            return initialState
        },
        setLoggedInUser: (
            state,
            action: PayloadAction<IContact | undefined>
        ) => {
            state.loggedInUser = action.payload
        }
    }
})

const reducerAuthentication = authenticationSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectAuthentication = (state: RootState) => state.

export default reducerAuthentication
