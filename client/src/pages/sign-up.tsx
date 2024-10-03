import Header from "../components/header";
import SignUpForm from "../components/sign-up-form";

const SignUp = () => {
	return (
		<>
			<Header hideButtons={true} />
			<div className="login">
				<div className="login__form-container">
					<SignUpForm />
				</div>
			</div>
		</>
	);
};

export default SignUp;
