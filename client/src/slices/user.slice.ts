import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import ServerRoutes from "../enums/server-routes";

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
	try {
		const response = await axios.get(
			`${ServerRoutes.SERVER_ADDRESS}/${ServerRoutes.GET_USER}`,
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			}
		);
		return response.data;
	} catch (error) {
		return null;
	}
});

const userSlice = createSlice({
	name: "user",
	initialState: {
		user: null,
		loading: false,
	},
	reducers: {
		signIn: (state, action) => {
			state.user = action.payload.user;
		},
		signOut: (state) => {
			state.user = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUser.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchUser.fulfilled, (state, action) => {
				state.user = action.payload;
				state.loading = false;
			})
			.addCase(fetchUser.rejected, (state) => {
				state.user = null;
				state.loading = false;
			});
	},
});

export const { signIn, signOut } = userSlice.actions;
export default userSlice.reducer;
