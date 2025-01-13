import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fields: [],
  currentField: null,
  nearbyFields: [],
  loading: false,
  error: null
};

const fieldSlice = createSlice({
  name: 'fields',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setFields: (state, action) => {
      state.fields = action.payload;
      state.loading = false;
    },
    setCurrentField: (state, action) => {
      state.currentField = action.payload;
      state.loading = false;
    },
    setNearbyFields: (state, action) => {
      state.nearbyFields = action.payload;
      state.loading = false;
    },
    addField: (state, action) => {
      state.fields.push(action.payload);
    },
    updateField: (state, action) => {
      const index = state.fields.findIndex(field => field._id === action.payload._id);
      if (index !== -1) {
        state.fields[index] = action.payload;
      }
    },
    deleteField: (state, action) => {
      state.fields = state.fields.filter(field => field._id !== action.payload);
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

export const {
  setLoading,
  setFields,
  setCurrentField,
  setNearbyFields,
  addField,
  updateField,
  deleteField,
  setError
} = fieldSlice.actions;

export default fieldSlice.reducer;