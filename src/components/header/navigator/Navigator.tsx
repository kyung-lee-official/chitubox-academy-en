"use client";

import Link from "next/link";
import { LogoWithTextWithoutCopyright } from "../../icons/Icons";
import { FirstPlaceholder } from "./Placeholder";
import dynamic from "next/dynamic";

const DynamicNavItems = dynamic(
	() => import("@/components/header/navigator/navItems/NavItems"),
	{
		ssr: false,
	}
);

const DynamicSideArea = dynamic(
	() => import("@/components/header/navigator/SideArea"),
	{
		ssr: false,
	}
);

const DynamicMobileNavigator = dynamic(
	() => import("@/components/header/navigator/mobile/MobileNavigator"),
	{
		ssr: false,
	}
);

export function Navigator() {
	return (
		<div
			className={`relative flex justify-between items-center
			h-16
			xl:h-20
			px-10
			text-white
			bg-[#061216]
			transition-colors duration-300`}
		>
			<div
				className="flex-1 xl:flex-[0_0.5_1230px]
				flex items-center h-full"
			>
				<Link href="https://www.chitubox.com/en" className="pr-[40px]">
					<LogoWithTextWithoutCopyright size={153} />
				</Link>
				<FirstPlaceholder />
				<DynamicNavItems />
			</div>
			<DynamicSideArea />
			<DynamicMobileNavigator />
		</div>
	);
}
