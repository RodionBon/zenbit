import { Link } from "react-router-dom";
import ClientRoutes from "../enums/client-routes";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import ServerRoutes from "../enums/server-routes";
import { signOut } from "../slices/user.slice";
import { RootState } from "../store";

interface Props {
	hideButtons: boolean;
}

const Header = (props: Props) => {
	const state = useSelector((state: RootState) => state.user.user);
	const dispatch = useDispatch();
	return (
		<header className="header flex-center">
			<div className="container flex-right">
				{!props.hideButtons && (
					<>
						{state ? (
							<>
								<button
									onClick={async () => {
										const token =
											localStorage.getItem("token");
										const request = await axios.post(
											`${ServerRoutes.SERVER_ADDRESS}/${ServerRoutes.SIGN_OUT}`,
											{
												email: state.email,
											},
											{
												headers: {
													Authorization: `Bearer ${token}`,
												},
											}
										);
										if (request.status === 201)
											dispatch(signOut());

										console.log(request);
									}}
									className="button header__button-login"
								>
									Sign Out
								</button>
							</>
						) : (
							<>
								<Link to={`/${ClientRoutes.SIGN_IN}`}>
									<div className="button header__button-login">
										Log In
									</div>
								</Link>
								<Link to={`/${ClientRoutes.SIGN_UP}`}>
									<div className="button header__button-signup">
										Sign Up
									</div>
								</Link>
							</>
						)}
					</>
				)}
			</div>
		</header>
	);
};
export default Header;
