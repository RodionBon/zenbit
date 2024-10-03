import Header from "../components/header";
import SignInForm from "../components/sign-in-form";

const SignIn = () => {
	return (
		<>
			<Header hideButtons={true} />
			<div className="login">
				<div className="login__form-container">
					<SignInForm />
				</div>
			</div>
		</>
	);
};
export default SignIn;
