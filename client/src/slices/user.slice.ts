import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import ServerRoutes from "../enums/server-routes";

const getUser = async (): Promise<{ email: string } | null> => {
	try {
		const user = await axios.get(
			`${ServerRoutes.SERVER_ADDRESS}/${ServerRoutes.GET_USER}`,
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			}
		);
		return user.data;
	} catch (e) {
		return null;
	}
};

const userSlice = createSlice({
	initialState: {
		user: await getUser(),
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
