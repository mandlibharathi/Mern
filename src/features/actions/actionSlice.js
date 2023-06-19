import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import actionService from './actionService'
// import { deleteAction } from '../../../../backend/controlers/actioncontroler'

const initialState = {
  actions: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new goal--
export const createAction = createAsyncThunk(
  'action/create',
  async (actionData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await actionService.createAction(actionData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get user goals
export const getactions = createAsyncThunk(
  'action/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await actionService.getActions(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)


export const getActionById = createAsyncThunk(
  'action/getactionbyId',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await actionService.getActionsById(id)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)
// Delete user goal
export const deleteAction = createAsyncThunk(
  'actions/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await actionService.deleteAction(id, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// update user goal
export const updateAction = createAsyncThunk(
  'actions/update',
  async (id,userdata, thunkAPI) => {
    console.log('udata',userdata)
    try {
      const token = thunkAPI.getState().auth.user.token
      return await actionService.updateAction(id,userdata,token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)
export const actionSlice = createSlice({
  name: 'action',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAction.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createAction.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.actions.push(action.payload)
      })
      .addCase(createAction.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getactions.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getactions.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.actions = action.payload
      })
      .addCase(getactions.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteAction.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteAction.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.actions = state.actions.filter(
          (goal) => goal._id !== action.payload.id
        )
      })
      .addCase(deleteAction.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = actionSlice.actions
export default actionSlice.reducer