import IDeal from "../interfaces/deal";
const DealCard = (props: { deal: IDeal }) => {
	return (
		<div
			style={{ backgroundImage: `url("${props.deal.filePath}")` }}
			className="deal"
		>
			<div className="deal__description">
				<h3 className="deal__title">{props.deal.title}</h3>
				<div className="deal__description-stats">
					<span>{props.deal.price} Dhs</span>
					<span>Yield:{props.deal.yield}% </span>
					<span>Sold {props.deal.soldPercents} %</span>
					<span>Ticket - {props.deal.ticketPrice} Dhs</span>
					<span>Days left - {props.deal.daysLeft}</span>
				</div>
			</div>
		</div>
	);
};
export default DealCard;
