"use client";
import "./globals.css";
import "./data-tables-css.css";
import { useState, useEffect } from "react";

import Header from "@/components/Header";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		setTimeout(() => setLoading(false), 1000);
	}, []);

	return (
		<html lang="en">
			<body suppressHydrationWarning={true}>
				<div className="dark:bg-boxdark-2 dark:text-bodydark">
					{loading ? (
						"loading...."
					) : (
						<div className="flex h-screen overflow-hidden">
							{/* <!-- ===== Sidebar Start ===== --> */}

							{/* <!-- ===== Sidebar End ===== --> */}

							{/* <!-- ===== Content Area Start ===== --> */}
							<div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
								{/* <!-- ===== Header Start ===== --> */}
								<Header
									sidebarOpen={sidebarOpen}
									setSidebarOpen={setSidebarOpen}
								/>
								{/* <!-- ===== Header End ===== --> */}

								{/* <!-- ===== Main Content Start ===== --> */}
								<main>
									<div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
										{children}
									</div>
								</main>
								{/* <!-- ===== Main Content End ===== --> */}
							</div>
							{/* <!-- ===== Content Area End ===== --> */}
						</div>
					)}
				</div>
			</body>
		</html>
	);
}
