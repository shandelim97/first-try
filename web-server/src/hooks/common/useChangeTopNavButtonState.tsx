import { useEffect } from 'react'
import { useAppDispatch } from '../../redux/hooks'
import reducerMisc, {
    TopNavButtonStateType
} from '../../redux/reducers/misc.reducer'

export default function useChangeTopNavButtonState() {
    // -- Redux
    const dispatch = useAppDispatch()

    // -- Use Effects
    useEffect(() => {}, [])

    // -- Function
    function onClick(buttonType: TopNavButtonStateType) {
        dispatch(reducerMisc.setTopNavButton(buttonType))
    }

    return {
        onClick: onClick
    }
}
