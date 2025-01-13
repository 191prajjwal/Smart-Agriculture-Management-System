import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  analyses: [],
  currentAnalysis: null,
  soilHealth: null,
  cropHealth: null,
  loading: false,
  error: null
};

const analysisSlice = createSlice({
  name: 'analysis',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setAnalyses: (state, action) => {
      state.analyses = action.payload;
      state.loading = false;
    },
    setCurrentAnalysis: (state, action) => {
      state.currentAnalysis = action.payload;
      state.loading = false;
    },
    setSoilHealth: (state, action) => {
      state.soilHealth = action.payload;
      state.loading = false;
    },
    setCropHealth: (state, action) => {
      state.cropHealth = action.payload;
      state.loading = false;
    },
    addAnalysis: (state, action) => {
      state.analyses.push(action.payload);
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

export const {
  setLoading,
  setAnalyses,
  setCurrentAnalysis,
  setSoilHealth,
  setCropHealth,
  addAnalysis,
  setError
} = analysisSlice.actions;

export default analysisSlice.reducer;