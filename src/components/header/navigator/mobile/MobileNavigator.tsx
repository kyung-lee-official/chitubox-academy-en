import { AiOutlineMenu, DrawerClose } from "@/components/icons/Icons";
import { getDynamicDataQuery, getMainstreamProduct } from "@/utils/api/api";
import { MediaQuery } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import {
	DropdownMenu,
	DropdownMenuItem,
	DropdownSubmenuLi,
	LanguageDropdownMenu,
} from "./Dropdown";

const MobileNavigator = () => {
	const isXl = useMediaQuery({ query: MediaQuery.xl });

	const dynamicDataQuery = useQuery<any, AxiosError>({
		queryKey: ["dynamicDataQuery"],
		queryFn: async () => {
			return await getDynamicDataQuery();
		},
	});

	const mainProductQuery = useQuery<any, AxiosError>({
		queryKey: ["mainProductQuery"],
		queryFn: async () => {
			return await getMainstreamProduct();
		},
	});

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
						<DropdownMenuItem href="https://www.chitubox.com/en/index">
							{
								dynamicDataQuery.data?.layout.header
									.topNavConfig[0].name
							}
						</DropdownMenuItem>
						<DropdownMenuItem
							submenu={
								<ul className="flex flex-col my-1 gap-1">
									<DropdownSubmenuLi
										data={
											dynamicDataQuery.data?.layout.header
												.topNavConfig[1].dropdownNav[0]
										}
									/>
									<DropdownSubmenuLi
										data={
											dynamicDataQuery.data?.layout.header
												.topNavConfig[1].dropdownNav[1]
										}
									/>
									<DropdownSubmenuLi
										data={
											dynamicDataQuery.data?.layout.header
												.topNavConfig[1].dropdownNav[2]
										}
									/>
									<DropdownSubmenuLi
										data={
											dynamicDataQuery.data?.layout.header
												.topNavConfig[1].dropdownNav[3]
										}
									/>
									<DropdownSubmenuLi
										data={
											dynamicDataQuery.data?.layout.header
												.topNavConfig[1].dropdownNav[4]
										}
									/>
								</ul>
							}
						>
							<div className="relative">
								<div>
									{
										dynamicDataQuery.data?.layout.header
											.topNavConfig[1].name
									}
								</div>
								{mainProductQuery.isSuccess && (
									<div
										className="absolute flex justify-center items-center w-20 h-[18px] top-[-20px] left-1/3 px-1
										text-white text-xs font-semibold
										bg-[#F50057] rounded-tl-full rounded-r-full"
									>
										{mainProductQuery.data.data
											.softwareId === "17842"
											? "Pro " +
											  mainProductQuery.data.data.versionId.toUpperCase()
											: mainProductQuery.data.data
													.softwareId === "17839"
											? "Basic " +
											  mainProductQuery.data.data.versionId.toUpperCase()
											: ""}
									</div>
								)}
							</div>
						</DropdownMenuItem>
						<DropdownMenuItem
							submenu={
								<ul className="flex flex-col my-1 gap-1">
									<DropdownSubmenuLi
										data={
											dynamicDataQuery.data?.layout.header
												.topNavConfig[2].dropdownNav[0]
										}
									/>
									<DropdownSubmenuLi
										data={
											dynamicDataQuery.data?.layout.header
												.topNavConfig[2].dropdownNav[1]
										}
									/>
									<DropdownSubmenuLi
										data={
											dynamicDataQuery.data?.layout.header
												.topNavConfig[2].dropdownNav[2]
										}
									/>
									<DropdownSubmenuLi
										data={
											dynamicDataQuery.data?.layout.header
												.topNavConfig[2].dropdownNav[3]
										}
									/>
								</ul>
							}
						>
							<div>
								{
									dynamicDataQuery.data?.layout.header
										.topNavConfig[2].name
								}
							</div>
						</DropdownMenuItem>
						<DropdownMenuItem
							submenu={
								<ul className="flex flex-col my-1 gap-1">
									<DropdownSubmenuLi
										data={
											dynamicDataQuery.data?.layout.header
												.topNavConfig[3].dropdownNav[0]
										}
									/>
									<DropdownSubmenuLi
										data={
											dynamicDataQuery.data?.layout.header
												.topNavConfig[3].dropdownNav[1]
										}
									/>
									<DropdownSubmenuLi
										data={
											dynamicDataQuery.data?.layout.header
												.topNavConfig[3].dropdownNav[2]
										}
									/>
								</ul>
							}
						>
							<div>
								{
									dynamicDataQuery.data?.layout.header
										.topNavConfig[3].name
								}
							</div>
						</DropdownMenuItem>
						<DropdownMenuItem
							submenu={
								<ul className="flex flex-col my-1 gap-1">
									<DropdownSubmenuLi
										data={
											dynamicDataQuery.data?.layout.header
												.topNavConfig[4].dropdownNav[0]
										}
									/>
									<DropdownSubmenuLi
										data={
											dynamicDataQuery.data?.layout.header
												.topNavConfig[4].dropdownNav[1]
										}
									/>
									<DropdownSubmenuLi
										data={
											dynamicDataQuery.data?.layout.header
												.topNavConfig[4].dropdownNav[2]
										}
									/>
								</ul>
							}
						>
							<div>
								{
									dynamicDataQuery.data?.layout.header
										.topNavConfig[4].name
								}
							</div>
						</DropdownMenuItem>
						<DropdownMenuItem href="https://www.chitubox.com/en/page/sdk">
							{
								dynamicDataQuery.data?.layout.header
									.topNavConfig[5].name
							}
						</DropdownMenuItem>
						<DropdownMenuItem href="https://www.chitubox.com/en/news">
							<div className="relative">
								<div>
									{
										dynamicDataQuery.data?.layout.header
											.topNavConfig[6].name
									}
								</div>
							</div>
						</DropdownMenuItem>
						<DropdownMenuItem href="https://cc.chitubox.com/customer/cart">
							CART
						</DropdownMenuItem>
						<DropdownMenuItem href="https://cc.chitubox.com/">
							USER CENTER
						</DropdownMenuItem>
						<LanguageDropdownMenu />
					</DropdownMenu>
				)}
			</div>
		);
	}
};

export default MobileNavigator;
