import React, { useReducer } from 'react'
import axios from 'axios'
import ContactContext from './contactContext'
import ContactReducer from './contactReducer'

import {
  GET_CONTACTS,
  ADD_CONTACT,
  UPDATE_CONTACT,
  DELETE_CONTACT,
  CLEAR_CONTACTS,
  SET_CURRENT,
  CLEAR_CURRENT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERRORS,
} from '../types'

const ContactState = (props) => {
  const apiUrl = process.env.REACT_APP_API_BASE_URL

  const initialState = {
    contacts: [],
    current: null,
    filtered: null,
    loading: true,
    errors: null,
  }

  // useReducer hook
  const [state, dispatch] = useReducer(ContactReducer, initialState)

  // get contacts
  const getContacts = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/contacts`)
      dispatch({
        type: GET_CONTACTS,
        payload: res.data,
      })
    } catch (err) {
      dispatch({
        type: CONTACT_ERRORS,
        payload: err.response.data.errors,
      })
    }
  }

  // add contact
  const addContact = async (contact) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    try {
      const res = await axios.post(`${apiUrl}/api/contacts`, contact, config)
      dispatch({
        type: ADD_CONTACT,
        payload: res.data,
      })
    } catch (err) {
      dispatch({
        type: CONTACT_ERRORS,
        payload: err.response.data.errors,
      })
    }
  }

  // update contact
  const updateContact = async (contact) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    try {
      const res = await axios.put(
        `${apiUrl}/api/contacts/${contact._id}`,
        contact,
        config
      )

      dispatch({
        type: UPDATE_CONTACT,
        payload: res.data,
      })
    } catch (err) {
      dispatch({
        type: CONTACT_ERRORS,
        payload: err.response.data.msg,
      })
    }
  }

  // delete contact
  const deleteContact = async (id) => {
    try {
      await axios.delete(`${apiUrl}/api/contacts/${id}`)
      dispatch({
        type: DELETE_CONTACT,
        payload: id,
      })
    } catch (err) {
      dispatch({
        type: CONTACT_ERRORS,
        payload: err.response.data.msg,
      })
    }
  }

  // clear contacts
  const clearContacts = () => {
    dispatch({
      type: CLEAR_CONTACTS,
    })
  }

  // set current
  const setCurrent = (contact) => {
    dispatch({
      type: SET_CURRENT,
      payload: contact,
    })
  }

  // clear current
  const clearCurrent = () => {
    dispatch({
      type: CLEAR_CURRENT,
    })
  }

  // filter contacts
  const filterContacts = (text) => {
    dispatch({
      type: FILTER_CONTACTS,
      payload: text.toLowerCase(),
    })
  }

  // clear contact
  const clearFilter = () => {
    dispatch({
      type: CLEAR_FILTER,
    })
  }

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        loading: state.loading,
        errors: state.errors,
        getContacts,
        addContact,
        updateContact,
        deleteContact,
        clearContacts,
        setCurrent,
        clearCurrent,
        filterContacts,
        clearFilter,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  )
}

export default ContactState
