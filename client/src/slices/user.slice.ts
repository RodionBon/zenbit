import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import ServerRoutes from "../enums/server-routes";

const getUser = async () => {
	try {
		const user = await axios.get(
			`${ServerRoutes.SERVER_ADDRESS}/${ServerRoutes.GET_USER}`,
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			}
		);
		return user;
	} catch (e) {
		return null;
	}
};

const user = await getUser();

const userSlice = createSlice({
	initialState: {
		user: user?.data.user ? user.data.user : null,
	},
	name: "user",
	reducers: {
		signIn: (state, action) => {
			state.user = action.payload.user;
		},
		signOut: (state) => {
			state.user = null;
		},
	},
});

export const { signIn, signOut } = userSlice.actions;
export default userSlice.reducer;
