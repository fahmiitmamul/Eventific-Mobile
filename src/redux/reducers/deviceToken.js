import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: null,
};

const deviceToken = createSlice({
  name: 'deviceToken',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const {setToken} = deviceToken.actions;
export default deviceToken.reducer;
