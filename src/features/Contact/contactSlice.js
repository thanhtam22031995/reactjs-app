import { createSlice } from '@reduxjs/toolkit';

const getInitialContacts = () => {
  try {
    return (
      JSON.parse(localStorage.getItem('contacts')) || {
        name: '',
        email: '',
        phone: '',
        city: '',
        address: '',
      }
    );
  } catch (error) {}
};

const contactSlice = createSlice({
  name: 'cart',
  initialState: {
    contacts: getInitialContacts(),
  },
  reducers: {
    addContact(state, action) {
      state.contacts = action.payload;
    },

    clearContact(state) {
      state.contacts = {};
    },
  },
});

const { reducer, actions } = contactSlice;
export const { addContact, removeContact, clearContact } = actions;
export default reducer;
