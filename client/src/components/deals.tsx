import { useEffect, useState } from "react";
import IDeal from "../interfaces/deal";
import DealCard from "./deal";
import axios from "axios";
import ServerRoutes from "../enums/server-routes";

const Deals = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [deals, setDeals] = useState<IDeal[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const deals = await axios.get(
					`${ServerRoutes.SERVER_ADDRESS}/${ServerRoutes.GET_DEAL}?`,
					{}
				);
				setDeals(deals.data);
			} catch (error) {
			} finally {
				setIsLoading(false);
			}
		};
		fetchData();
	}, []);

	return (
		<div className="deals__items">
			{!isLoading &&
				deals.map((deal) => {
					return <DealCard key={deal.id} deal={deal} />;
				})}
		</div>
	);
};
export default Deals;
