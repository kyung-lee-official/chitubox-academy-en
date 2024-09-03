import { ChevronDownIcon } from "@/components/icons/Icons";
import { processHref } from "@/utils/data/data";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const DropdownMenu = (props: any) => {
	const { children } = props;
	return (
		<div
			className={`absolute top-16 right-0
			flex flex-col w-full max-h-[calc(90svh-64px)]
			overflow-y-auto`}
		>
			{children}
		</div>
	);
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

export const DropdownSubmenuLi = (props: { data: any }) => {
	const { data } = props;
	const { href, icon1, icon2, text, i18nUri } = data;

	const [hover, setHover] = useState<boolean>(false);

	return (
		<Link
			href={processHref(href)}
			className="flex justify-between items-center min-h-[44px] px-4
			text-gray-400 hover:text-gray-300 font-semibold
			bg-white/20
			rounded"
			onMouseEnter={() => {
				setHover(true);
			}}
			onMouseLeave={() => {
				setHover(false);
			}}
		>
			<div className="h-[24px]">
				<img src={hover ? icon2 : icon1} alt="" className="h-full" />
			</div>
			<div className="font-bold">{text}</div>
		</Link>
	);
};

export const LanguageDropdownMenu = (props: any) => {
	const router = useRouter();

	const [showLanguageDropdownMenu, setShowLanguageDropdownMenu] =
		useState<boolean>(false);

	return (
		<div>
			<button
				className="flex justify-between items-center w-full min-h-[44px] px-8
				text-gray-400 font-semibold 
				bg-black
				border-b-[1px] border-gray-600"
				onClick={() => {
					setShowLanguageDropdownMenu(!showLanguageDropdownMenu);
				}}
			>
				English
				<div
					className={`${
						showLanguageDropdownMenu && "rotate-[-180deg]"
					} duration-100`}
				>
					<ChevronDownIcon size={24} />
				</div>
			</button>
			{showLanguageDropdownMenu && (
				<ul
					className="flex flex-col px-12 py-1 gap-1
					bg-black"
				>
					<button
						className="flex justify-start items-center min-h-[44px] px-4
						text-gray-400 hover:text-gray-300 font-semibold
						bg-white/20
						rounded"
						onClick={() => {
							let pathArr = window.location.pathname.split("/");
							pathArr[1] = "en";
							router.push(
								window.location.origin + pathArr.join("/")
							);
						}}
					>
						English
					</button>
					<button
						className="flex justify-start items-center min-h-[44px] px-4
						text-gray-400 hover:text-gray-300 font-semibold
						bg-white/20
						rounded"
						onClick={() => {
							let pathArr = window.location.pathname.split("/");
							pathArr[1] = "zh-Hans";
							router.push(
								window.location.origin + pathArr.join("/")
							);
						}}
					>
						简体中文
					</button>
				</ul>
			)}
		</div>
	);
};
