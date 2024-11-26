import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IChat, IContact } from '../../../../shared/types/prisma'
import { RootState } from '../store'

export type TopNavButtonStateType = 'NEW_CHAT' | 'DEFAULT'

interface MiscState {
    initialUrl: string
    topNavButtonState: TopNavButtonStateType
    rightPanelChat: {
        user: Partial<IContact> | undefined
        chat: Partial<IChat> | undefined
    }
    leftPanelSelectedTab: Partial<IContact> | undefined
}

const initialState: MiscState = {
    initialUrl: '',
    topNavButtonState: 'DEFAULT',
    rightPanelChat: {
        chat: undefined,
        user: undefined
    },
    leftPanelSelectedTab: undefined
}

export const miscSlice = createSlice({
    name: 'misc',
    initialState,
    reducers: {
        reset: (state) => {
            initialState.topNavButtonState = state.topNavButtonState
            return initialState
        },
        setTopNavButton: (
            state,
            action: PayloadAction<MiscState['topNavButtonState']>
        ) => {
            state.topNavButtonState = action.payload
        },
        setRightPanelChat: (
            state,
            action: PayloadAction<MiscState['rightPanelChat']>
        ) => {
            state.rightPanelChat = action.payload
        },

        setLeftPanelSelectedTab: (
            state,
            action: PayloadAction<MiscState['leftPanelSelectedTab']>
        ) => {
            state.leftPanelSelectedTab = action.payload
        }
    }
})

const reducerMisc = miscSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectMisc = (state: RootState) => state.misc

export default reducerMisc
