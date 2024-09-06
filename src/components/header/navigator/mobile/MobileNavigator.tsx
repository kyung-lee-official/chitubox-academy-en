import { AiOutlineMenu, DrawerClose } from "@/components/icons/Icons";
import { getDynamicDataQuery, getMainstreamProduct } from "@/utils/api/api";
import { MediaQuery } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { DropdownMenu, LanguageDropdownMenu } from "./Dropdown";
import { MobileNavItem } from "./MobileNavItem";
import Link from "next/link";

const MobileNavigator = () => {
	const isXl = useMediaQuery({ query: MediaQuery.xl });

	const dynamicDataQuery = useQuery<any, AxiosError>({
		queryKey: ["dynamicDataQuery"],
		queryFn: async () => {
			return await getDynamicDataQuery();
		},
	});

	// const mainProductQuery = useQuery<any, AxiosError>({
	// 	queryKey: ["mainProductQuery"],
	// 	queryFn: async () => {
	// 		return await getMainstreamProduct();
	// 	},
	// });

	const [showMobileDropDownMenu, setShowMobileDropDownMenu] =
		useState<boolean>(false);

	if (isXl) {
		return null;
	} else {
		return (
			<div className="flex-[0_1_0%]">
				<div className="flex justify-between items-center w-full">
					<button
						onClick={() => {
							setShowMobileDropDownMenu(!showMobileDropDownMenu);
						}}
					>
						{showMobileDropDownMenu ? (
							<DrawerClose size={24} />
						) : (
							<AiOutlineMenu size={24} />
						)}
					</button>
				</div>
				{showMobileDropDownMenu && dynamicDataQuery.data && (
					<DropdownMenu>
						{dynamicDataQuery.data?.layout.header.topNavConfig.map(
							(item: any, index: number) => {
								return (
									<MobileNavItem key={index} item={item} />
								);
							}
						)}
						<Link
							href={"https://cc.chitubox.com/customer/cart"}
							className="flex justify-start items-center min-h-[44px] px-8
							text-gray-400 font-semibold 
							bg-black
							border-b-[1px] border-gray-600"
						>
							CART
						</Link>
						<Link
							href={"https://cc.chitubox.com"}
							className="flex justify-start items-center min-h-[44px] px-8
							text-gray-400 font-semibold 
							bg-black
							border-b-[1px] border-gray-600"
						>
							USER CENTER
						</Link>
						<LanguageDropdownMenu />
					</DropdownMenu>
				)}
			</div>
		);
	}
};

export default MobileNavigator;
