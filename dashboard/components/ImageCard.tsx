import Image from "next/image";
import React, { ReactNode } from "react";

const ImageCard: React.FC<any> = () => {
	return (
		<div className="w-full rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
			{/* <div className="mt-4"> */}
			<div className="flex justify-center">
				<Image src={"/images/logo/masala.png"} alt="" width={800} height={80} />
				{/* <h4 className="text-title-md text-center font-bold text-black dark:text-white">
						{title}
					</h4> */}
			</div>
			<h4 className="text-title-md text-center font-bold text-black dark:text-white">
				{"Masala Wallet: Securely Spicing Up wallet Accessibility"}
			</h4>
			{/* </div> */}
		</div>
	);
};

export default ImageCard;
