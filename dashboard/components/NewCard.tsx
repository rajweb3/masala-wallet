import React, { ReactNode } from "react";

const NewCard: React.FC<any> = ({ title }) => {
	return (
		<div className="w-full rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
			<div className="mt-4">
				<div>
					<h4 className="text-title-md text-center font-bold text-black dark:text-white">
						{title}
					</h4>
				</div>
			</div>
		</div>
	);
};

export default NewCard;
