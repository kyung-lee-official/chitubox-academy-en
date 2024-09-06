import Link from "next/link";
import { Placeholder } from "../Placeholder";
import { useEffect, useRef, useState } from "react";
import { DropdownCard } from "../DropdownCard";
import MainProduct from "./MainProduct";
import { processHref } from "@/utils/data/data";

export const NavItem = (props: { item: any }) => {
	const { item } = props;

	const itemRef = useRef<HTMLDivElement>(null);
	const [showDropdown, setShowDropdown] = useState(false);

	function onMouseMove(e: MouseEvent) {
		if (
			itemRef.current?.contains(e.target as Node) ||
			itemRef.current === e.target
		) {
			setShowDropdown(true);
		} else {
			setShowDropdown(false);
		}
	}

	useEffect(() => {
		document.addEventListener("mousemove", onMouseMove);
		return () => {
			document.removeEventListener("mousemove", onMouseMove);
		};
	}, []);

	if (!!item.href) {
		if (item.name === "Buy Pro") {
			return (
				<>
					<Link
						href={processHref(item.href)}
						className="relative flex-[0_0_84px] flex justify-center items-center h-full
						px-[10px]
						2xl:px-[42px]
						text-white
						bg-[#E72000] hover:bg-[#FF5F45]
						whitespace-nowrap cursor-pointer transition-colors duration-300"
						target="_blank"
					>
						{item.name}
					</Link>
					<Placeholder />
				</>
			);
		} else {
			return (
				<>
					<Link
						href={processHref(item.href)}
						className="flex-[0_0_84px] flex justify-center items-center h-full px-[10px]
						text-[rgba(232,230,227,0.8)] hover:text-[rgba(232,230,227,1)]
						active:text-[rgba(50,163,244,1)]
						whitespace-nowrap cursor-pointer transition-colors duration-300"
					>
						<div className="relative">
							{item.name}
							{item.name === "CHITUBOX" && <MainProduct />}
						</div>
					</Link>
					<Placeholder />
				</>
			);
		}
	} else {
		if (item.dropdownNav) {
			return (
				<>
					<div
						ref={itemRef}
						className={`flex-[0_0_84px] flex justify-center items-center h-full px-[10px]
						${
							item.name === "ACADEMY"
								? "text-[rgba(50,163,244,1)]"
								: "text-[rgba(232,230,227,0.8)] hover:text-[rgba(232,230,227,1)]"
						}
						active:text-[rgba(50,163,244,1)]
						whitespace-nowrap cursor-pointer transition-colors duration-300`}
					>
						<div className="relative">
							{item.name}
							{item.name === "CHITUBOX" && <MainProduct />}
						</div>
						{showDropdown && (
							<div className="absolute left-8 right-8 top-20 pt-[10px]">
								<div
									className="flex justify-center items-center h-[250px] p-10 gap-10
									text-[rgba(232,230,227,0.8)] hover:text-[rgba(232,230,227,1)]
									bg-[#061216]
									rounded-[16px] shadow-[0px_16px_16px_rgba(0,0,0,0.4)]"
								>
									{item.dropdownNav.map(
										(subitem: any, index: number) => {
											return (
												<DropdownCard
													key={index}
													subitem={subitem}
												/>
											);
										}
									)}
								</div>
							</div>
						)}
					</div>
					<Placeholder />
				</>
			);
		} else {
			return null;
		}
	}
};
