import Deals from "../components/deals";
import Header from "../components/header";

const MainPage = () => {
	return (
		<>
			<Header hideButtons={false} />
			<div className="hero flex-center">
				<div className="flex-column-center container hero__content">
					<h1 className="hero__title">
						The chemical negatively charged
					</h1>
					<p className="hero__description">
						Numerous calculations predict, and experiments confirm,
						that the force field reflects the beam, while the mass
						defect is not formed. The chemical compound is
						negatively charged. Twhile the mass defect is
					</p>
					<button className="button hero__button">Get Started</button>
					<div className="hero__background-overlay"></div>
				</div>
			</div>
			<div className="flex-column-center">
				<div className="container deals">
					<h2 className="deals__title ">Open Deals</h2>
					<Deals />
				</div>
			</div>
		</>
	);
};
export default MainPage;
