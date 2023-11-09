import { createSlice } from '@reduxjs/toolkit'

export const completePercent = createSlice({
  name: 'percentage',
  initialState: {
    value: 0,
  },
  reducers: {
    incrementByAmount: (state, action) => {
      state.value += action.payload
      console.log('Increase complete percentage', state.value)
    },
    decrementByAmount: (state, action) => {
      state.value -= action.payload
      console.log('Decrease complete percentage', state.value)
    },
  },
})

export const { incrementByAmount, decrementByAmount } = completePercent.actions

export default completePercent.reducer