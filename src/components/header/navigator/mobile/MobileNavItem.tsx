import { useState } from "react";
import Link from "next/link";
import { ChevronDownIcon } from "@/components/icons/Icons";
import { processHref } from "@/utils/data/data";
// import MainProduct from "./MainProduct";

export const MobileNavItem = (props: { item: any }) => {
	const { item } = props;

	const [showSubmenu, setshowSubmenu] = useState(false);

	if (!!item.href) {
		if (item.name === "Buy Pro") {
			return (
				<Link
					href={processHref(item.href)}
					className="flex justify-start items-center min-h-[44px] px-8
					text-white font-semibold 
					bg-[#E72000] hover:bg-[#FF5F45]
					border-b-[1px] border-gray-600"
					target="_blank"
				>
					{item.name}
				</Link>
			);
		} else {
			return (
				<Link
					href={processHref(item.href)}
					className="flex justify-start items-center min-h-[44px] px-8
					text-gray-400 font-semibold 
					bg-black
					border-b-[1px] border-gray-600"
				>
					{item.name}
				</Link>
			);
		}
	} else {
		if (item.dropdownNav) {
			return (
				<div className="flex flex-col">
					<button
						className="flex justify-between items-center min-h-[44px] px-8
						text-gray-400 font-semibold 
						bg-black
						border-b-[1px] border-gray-600"
						onClick={() => {
							setshowSubmenu(!showSubmenu);
						}}
					>
						{item.name}
						<div
							className={`${
								showSubmenu && "rotate-[-180deg]"
							} duration-100`}
						>
							<ChevronDownIcon size={24} />
						</div>
					</button>
					{showSubmenu && (
						<div className="bg-black pl-12">
							{item.dropdownNav.map(
								(subitem: any, index: number) => {
									return (
										<Link
											key={index}
											href={processHref(subitem.href)}
											className="flex justify-start items-center min-h-[44px] px-4
											text-gray-400 font-semibold 
											bg-black
											border-b-[1px] border-gray-600"
										>
											{subitem.text}
										</Link>
									);
								}
							)}
						</div>
					)}
				</div>
			);
		} else {
			return null;
		}
	}
};

export const DropdownMenuItem = (props: {
	children: any;
	href?: string;
	submenu?: any;
}) => {
	const { children, href, submenu } = props;
	const [showSubmenu, setshowSubmenu] = useState<boolean>(false);

	if (href) {
		return (
			<Link
				href={href}
				className="flex justify-start items-center min-h-[44px] px-8
				text-gray-400 font-semibold 
				bg-black
				border-b-[1px] border-gray-600"
			>
				{children}
			</Link>
		);
	} else {
		return (
			<div className="flex flex-col">
				<button
					className="flex justify-between items-center min-h-[44px] px-8
					text-gray-400 font-semibold 
					bg-black
					border-b-[1px] border-gray-600"
					onClick={() => {
						setshowSubmenu(!showSubmenu);
					}}
				>
					{children}
					{submenu && (
						<div
							className={`${
								showSubmenu && "rotate-[-180deg]"
							} duration-100`}
						>
							<ChevronDownIcon size={24} />
						</div>
					)}
				</button>
				{showSubmenu && <div className="bg-black px-12">{submenu}</div>}
			</div>
		);
	}
};
