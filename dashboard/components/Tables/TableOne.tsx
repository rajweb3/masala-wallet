import { BRAND } from "@/types/brand";
import Image from "next/image";

const brandData: any[] = [
	{
		logo: "/images/brand/brand-01.svg",
		number: 1,
		email: "moniratna@nordfinance.io",
		address: "0xDB1Ad91E5A5a2E2c868d9b75C65d56c4740B7808",
		sales: 590,
		conversion: 4.8,
	},
	{
		logo: "/images/brand/brand-02.svg",
		number: 2,
		email: "mmoniratna@gmail.com",
		address: "0xDB1Ad91E5A5a2E2c868d9b75C65d56c4740B7808",
		sales: 467,
		conversion: 4.3,
	},
	{
		logo: "/images/brand/brand-03.svg",
		number: 3,
		email: "moniratna.munshi@gmail.com",
		address: "0xDB1Ad91E5A5a2E2c868d9b75C65d56c4740B7808",
		sales: 420,
		conversion: 3.7,
	},
	{
		logo: "/images/brand/brand-04.svg",
		number: 4,
		email: "moniratna.munshi123@gmail.com",
		address: "0xDB1Ad91E5A5a2E2c868d9b75C65d56c4740B7808",
		sales: 389,
		conversion: 2.5,
	},
	{
		logo: "/images/brand/brand-05.svg",
		number: 5,
		email: "moniratna@nordfinance.io",
		address: "0xDB1Ad91E5A5a2E2c868d9b75C65d56c4740B7808",
		sales: 390,
		conversion: 4.2,
	},
];

const TableOne = () => {
	return (
		<div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
			<h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
				Top Channels
			</h4>

			<div className="flex flex-col">
				<div className="grid gap-10 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
					<div className="p-2.5 text-left xl:p-5">
						<h5 className="text-sm font-medium uppercase xsm:text-base">
							Number
						</h5>
					</div>
					<div className="p-2.5 text-right xl:p-5">
						<h5 className="text-sm font-medium uppercase xsm:text-base">
							Email
						</h5>
					</div>
					<div className="p-2.5 text-right xl:p-5">
						<h5 className="text-sm font-medium uppercase xsm:text-base">
							Address
						</h5>
					</div>
				</div>

				{brandData.map((brand, key) => (
					<div
						className={`grid grid-cols-3 sm:grid-cols-5 ${
							key === brandData.length - 1
								? ""
								: "border-b border-stroke dark:border-strokedark"
						}`}
						key={key}
					>
						<div className="flex items-center gap-3 p-2.5 xl:p-5">
							<p className="hidden text-black text-right dark:text-white sm:block">
								{brand.number}
							</p>
						</div>

						<div className="flex items-center justify-start p-2.5 xl:p-5">
							<p className="text-black dark:text-white">{brand.email}</p>
						</div>

						<div className="flex items-center justify-start p-2.5 xl:p-5">
							<p className="text-meta-3">${brand.address}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default TableOne;
