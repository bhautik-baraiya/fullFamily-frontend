import { createSlice } from "@reduxjs/toolkit";

const updateSlice = createSlice({
  name: "Update",
  initialState: {
    isOpen: false,
    isEdit: false,
    objFamily: null,
    ListOfFamily: null,
  },
  reducers: {
    setOpen(state, action) {
      state.isOpen = action.payload;
    },
    setIsEdit(state, action) {
      state.isEdit = action.payload;
    },
    setObjFamily(state, action) {
      state.objFamily = action.payload;
    },
    LstFamily(state, action) {
      state.ListOfFamily = action.payload;
    },
  },
});

export const { setOpen, setIsEdit, setObjFamily, LstFamily } =
  updateSlice.actions;
export default updateSlice.reducer;
