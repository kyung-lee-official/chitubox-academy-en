import { CartIcon, Questionnaire, UserIcon } from "@/components/icons/Header";
import { getDynamicDataQuery } from "@/utils/api/api";
import { MediaQuery } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Link from "next/link";
import React from "react";
import { useMediaQuery } from "react-responsive";
import LanguageMenu from "./LanguageMenu";

const Placeholder = () => {
	return <div className="flex-[0_1_60px]"></div>;
};

function SideArea() {
	const dynamicDataQuery = useQuery<any, AxiosError>({
		queryKey: ["dynamicDataQuery"],
		queryFn: async () => {
			return await getDynamicDataQuery();
		},
	});

	const isXl = useMediaQuery({ query: MediaQuery.xl });

	if (isXl) {
		return (
			<div className="flex-[0_1_395px] flex justify-between">
				{dynamicDataQuery.data?.layout.header.questionnaire
					.isShowEntry && (
					<Link
						className="flex items-center h-8 px-[10px] gap-[10px]
						text-[rgba(232,230,227,0.8)] hover:text-[rgba(232,230,227,1)]
						bg-white/5
						whitespace-nowrap rounded-[4px] transition-colors duration-300"
						href={`https://www.chitubox.com/en${dynamicDataQuery.data?.layout.header.questionnaire.url}`}
						target="_blank"
					>
						<Questionnaire size={24} />
						<div className="flex-1 flex justify-center items-center whitespace-nowrap">
							{
								dynamicDataQuery.data?.layout.header
									.questionnaire.text
							}
						</div>
					</Link>
				)}
				<Placeholder />
				<Link
					className="flex justify-center items-center
					text-[rgba(232,230,227,0.8)] hover:text-[rgba(232,230,227,1)]
					transition-colors duration-300"
					href="https://cc.chitubox.com/customer/cart"
				>
					<CartIcon size={24} />
				</Link>
				<Placeholder />
				<Link
					className="flex justify-center items-center
					text-[rgba(232,230,227,0.8)] hover:text-[rgba(232,230,227,1)]
					transition-colors duration-300"
					href="https://cc.chitubox.com/"
				>
					<UserIcon size={24} />
				</Link>
				<Placeholder />
				<LanguageMenu />
			</div>
		);
	} else {
		return null;
	}
}

export default SideArea;
