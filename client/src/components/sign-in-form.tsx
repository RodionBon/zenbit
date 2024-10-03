import axios, { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import ServerRoutes from "../enums/server-routes";
import { Link, useNavigate } from "react-router-dom";
import ClientRoutes from "../enums/client-routes";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signIn } from "../slices/user.slice";

const SignInForm = () => {
	const { register, handleSubmit } = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
	});
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [errors, setErrors] = useState<string[]>([""]);
	const formattedErrors = errors.map((error) => {
		return <p key={crypto.randomUUID()}>{error}</p>;
	});

	const onSubmit = async (data: { email: string; password: string }) => {
		try {
			const response = await axios.post(
				`${ServerRoutes.SERVER_ADDRESS}/${ServerRoutes.SIGN_IN}`,
				{
					...data,
				}
			);
			if (response.status === 201) {
				localStorage.setItem("token", response.data.token);
				const user = { email: response.data.email };
				dispatch(signIn({ user }));
				navigate("/");
			}
		} catch (error) {
			if (error instanceof AxiosError) {
				const message = error.response?.data.message;
				const newMessage = [];
				if (Array.isArray(message)) newMessage.push(...message);
				else newMessage.push(message);
				setErrors(newMessage);
			}
		}
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)} className="login__form">
			<h1 className="login__form-title">Login</h1>
			<label htmlFor="email-input" className="login__form-label">
				Email
			</label>
			<input
				type="Email"
				placeholder="Password"
				id="email-input"
				className="login__form-input"
				autoComplete="email"
				{...register("email")}
			/>
			<label htmlFor="password-input" className="login__form-label">
				Password
			</label>
			<input
				type="text"
				placeholder="Password"
				id="password-input"
				className="login__form-input"
				autoComplete="current-password"
				{...register("password")}
			/>
			<p className="login__form-forgot-password">
				<a href="">Forgot password?</a>
			</p>

			<div>{formattedErrors}</div>
			<button type="submit" className="login__form-submit">
				Sign In
			</button>
			<p className="login__no-account">
				Don't have an account?{" "}
				<Link to={`/${ClientRoutes.SIGN_UP}`}>Sign Up</Link>
			</p>
		</form>
	);
};
export default SignInForm;
