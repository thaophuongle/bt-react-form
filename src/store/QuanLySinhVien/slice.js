import { createSlice } from "@reduxjs/toolkit";
const initialState = {};

const QuanLySinhVienSlice = createSlice({
  name: "QuanLySinhVien",
  initialState,
  reducers: {},
});

export const {
  reducer: quanLySinhVienReducer,
  actions: quanLySinhVienActions,
} = QuanLySinhVienSlice;
