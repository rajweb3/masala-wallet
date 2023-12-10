"use client";
import React from "react";
import TableOne from "../Tables/TableOne";
import CardDataStats from "../CardDataStats";
// import Map from "../Maps/TestMap";

// without this the component renders on server and throws an error
import NewCard from "../NewCard";
import ImageCard from "../ImageCard";

const ECommerce: React.FC = () => {
	return (
		<>
			<div>
				<NewCard title={"Powerloom"} />
			</div>
			<div>
				<ImageCard title={"Mashala Wallet"} />
			</div>
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
				<CardDataStats
					title="Total views"
					total="$3.456K"
					rate="0.43%"
				></CardDataStats>
				<CardDataStats
					title="Total Profit"
					total="$45,2K"
					rate="4.35%"
				></CardDataStats>
				<CardDataStats
					title="Total Product"
					total="2.450"
					rate="2.59%"
				></CardDataStats>
				<CardDataStats
					title="Total Users"
					total="3.456"
					rate="0.95%"
				></CardDataStats>
			</div>

			<div className="mt-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
				<div className="col-span-12 xl:col-span-8">
					<TableOne />
				</div>
			</div>
		</>
	);
};

export default ECommerce;
