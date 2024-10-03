import axios, { AxiosError } from "axios";
import ServerRoutes from "../enums/server-routes";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const SignUpForm = () => {
	const { register, handleSubmit } = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
	});
	const navigate = useNavigate();

	const [errors, setErrors] = useState<string[]>([""]);
	const formattedErrors = errors.map((error) => {
		return <p key={crypto.randomUUID()}>{error}</p>;
	});

	const onSubmit = async (data: { email: string; password: string }) => {
		try {
			const response = await axios.post(
				`${ServerRoutes.SERVER_ADDRESS}/${ServerRoutes.SIGN_UP}`,
				{
					...data,
				}
			);
			if (response.status === 201) {
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
		} finally {
		}
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)} className="login__form">
			<h1 className="login__form-title">Sign Up</h1>
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
				autoComplete="new-password"
				{...register("password")}
			/>
			<div>{formattedErrors}</div>
			<button type="submit" className="login__form-submit">
				Sign Up
			</button>
			<p className="login__no-account">
				Already have an account?{" "}
				<Link to={`/${ServerRoutes.SIGN_IN}`}>Sign In</Link>
			</p>
		</form>
	);
};
export default SignUpForm;
