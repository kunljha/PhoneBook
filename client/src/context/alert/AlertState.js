import React, { useReducer } from 'react'
import { v4 as uuidv4 } from 'uuid'
import AlertContext from './alertContext'
import AlertReducer from './alertReducer'
import { SET_ALERT, REMOVE_ALERT } from '../types'

const AlertState = (props) => {
	const initialState = {
		alerts: [],
	}

	const [state, dispatch] = useReducer(AlertReducer, initialState)

	// set & remove alerts
	const setAlert = (msg, type) => {
		const id = uuidv4()
		dispatch({
			type: SET_ALERT,
			payload: { msg, type, id },
		})

		setTimeout(() => {
			dispatch({
				type: REMOVE_ALERT,
				payload: id,
			})
		}, 3000)
	}

	return (
		<AlertContext.Provider
			value={{
				alerts: state.alerts,
				setAlert,
			}}
		>
			{props.children}
		</AlertContext.Provider>
	)
}

export default AlertState
