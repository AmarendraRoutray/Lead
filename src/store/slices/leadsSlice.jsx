// import { createSlice } from "@reduxjs/toolkit";
// import { fakeData } from "../pages/LeadsManager/Leads";

// const leadsSlice = createSlice({
//   name: "leads",
//   initialState: {
//     items: fakeData,
//   },
//   reducers: {
//     addLead: (state, action) => {
//       state.items.push(action.payload);
//     },
//     updateLead: (state, action) => {
//       const index = state.items.findIndex((l) => l.id === action.payload.id);
//       if (index !== -1) state.items[index] = action.payload;
//     },
//     deleteLead: (state, action) => {
//       state.items = state.items.filter((l) => l.id !== action.payload);
//     },
//   },
// });

// export const { addLead, updateLead, deleteLead } = leadsSlice.actions;
// export default leadsSlice.reducer;





import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Static initial data (for now)
const initialData = [
  { id: 1, name: "John Doe", mobile: "9876543210", followupDate: "2025-09-18", project: "Skyline Residency", status: "", intent: "New Lead", note: "Interested in 2BHK", source: "Facebook Ads", city: "Bhubaneswar" },
  { id: 2, name: "Jane Smith", mobile: "9988776655", followupDate: "2025-09-20", project: "Green Valley", status: "", intent: "New Lead", note: "Requested brochure", source: "Website", city: "Cuttack" },
  { id: 3, name: "Mark Johnson", mobile: "9123456789", followupDate: "2025-09-22", project: "Riverfront Villas", status: "", intent: "New Lead", note: "Scheduled site visit", source: "Referral", city: "Pune" },
  { id: 4, name: "Alice Brown", mobile: "9786543210", followupDate: "2025-09-25", project: "Ocean Heights", status: "", intent: "New Lead", note: "Paid initial booking amount", source: "Google Ads", city: "Mumbai" },
  { id: 5, name: "Chris Evans", mobile: "9234567890", followupDate: "2025-09-28", project: "Hilltop Residency", status: "", intent: "New Lead", note: "Not interested anymore", source: "Walk-in", city: "Delhi" },
];

// Async thunk for fetching leads from API (placeholder)
export const fetchLeads = createAsyncThunk(
  "leads/fetchLeads",
  async (_, thunkAPI) => {
    try {
      // Replace this with your real API call
      // const response = await fetch("/api/leads");
      // const data = await response.json();
      const data = initialData; // fallback for now
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const leadsSlice = createSlice({
  name: "leads",
  initialState: {
    items: initialData,
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {
    updateLead: (state, action) => {
      const index = state.items.findIndex((lead) => lead.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    addLead: (state, action) => {
      state.items.push(action.payload);
    },
    deleteLead: (state, action) => {
      state.items = state.items.filter((lead) => lead.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeads.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLeads.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchLeads.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { updateLead, addLead, deleteLead } = leadsSlice.actions;

export default leadsSlice.reducer;
