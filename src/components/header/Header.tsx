"use client";

import { Navigator } from "./navigator/Navigator";
import { Banner } from "./Banner";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "@/utils/tanstack-query";

export const Header = () => {
	return (
		<header id="header" className="sticky top-0 z-10">
			<QueryClientProvider client={queryClient}>
				<Banner />
				<Navigator />
			</QueryClientProvider>
		</header>
	);
};
