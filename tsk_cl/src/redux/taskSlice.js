import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getTasks = createAsyncThunk("task/getTasks", async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(
    "http://localhost:8000/api/tasks",
    config
  );
  return response.data;
});

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    apiData: [],
    filteredTasks: [],
    loading: false,
  },
  reducers: {
    searchQuery: (state, { payload }) => {
      const query = payload.toLowerCase();
      state.filteredTasks = state.apiData.filter((item) =>
        item.title.toLowerCase().includes(query)
      );
    },

    setCustomFilter: (state, { payload }) => {
      state.filteredTasks = [];
      for (let query in payload) {
        if (payload[query]) {
          const data = state.apiData.filter(
            (item) =>
              item.brand.toLowerCase().includes(query.toLowerCase()) ||
              item.category.toLowerCase().includes(query.toLowerCase()) ||
              item.title.toLowerCase().includes(query.toLowerCase()) ||
              item.description.toLowerCase().includes(query.toLowerCase())
          );
          state.filteredTasks = [...state.filteredTasks, ...data];
        }
      }
    },
    setApiData: (state, { payload }) => {
      state.apiData = payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getTasks.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getTasks.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.apiData = payload;
    });
    builder.addCase(getTasks.rejected, (state, error) => {
      state.loading = true;
      console.log(error);
    });
  },
});

export const { searchQuery, setCustomFilter, setApiData } = taskSlice.actions;
export default taskSlice.reducer;
