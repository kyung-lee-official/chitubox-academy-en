"use client";

import { LogoWithText } from "../icons/Icons";
import { Edm } from "./Edm";
import { Sns } from "./Sns";
import Columns from "./Columns";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "@/utils/tanstack-query";
import Footnote from "./footnote/Footnote";

export const Footer = () => {
	return (
		<footer
			className="flex flex-col items-center w-full
			text-base
			bg-[#0E0E0E]"
		>
			<QueryClientProvider client={queryClient}>
				<div className="flex justify-between items-center w-full max-w-[1600px] px-6 py-16 gap-4 flex-wrap">
					<div className="w-[174px] xl:w-[245px] pt-4">
						<LogoWithText />
					</div>
					<div
						className="flex gap-[60px] flex-wrap
						text-white font-bold
						leading-6"
					>
						<Edm />
						<Sns />
					</div>
				</div>
				<hr className="w-full border-white/20" />
				<div className="flex flex-col w-full max-w-[1600px] px-6 py-20 gap-4">
					<Columns />
					<Footnote />
				</div>
			</QueryClientProvider>
		</footer>
	);
};
