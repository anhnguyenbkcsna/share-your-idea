import { configureStore } from '@reduxjs/toolkit'
import completePercent from '../actions/createIdea'

export default configureStore({
  reducer: {
    percentage: completePercent,
  },
})  