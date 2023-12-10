import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Dashboard",
	description: "This is a dashboard.",
	// other metadata
};

export default function Home() {
	return (
		<>
			<ECommerce />
		</>
	);
}
