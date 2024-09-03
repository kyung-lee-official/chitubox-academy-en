import { CaretRightIcon } from "@/components/icons/Header";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

function LanguageMenu() {
	const router = useRouter();

	const dropdownSwitchRef = useRef<HTMLDivElement>(null);

	const [showLanguageDropdownMenu, setShowLanguageDropdownMenu] =
		useState<boolean>(false);

	function dropdownReaction(e: any) {
		if (!dropdownSwitchRef.current?.contains(e.target)) {
			setShowLanguageDropdownMenu(false);
		}
	}

	useEffect(() => {
		window.addEventListener("click", dropdownReaction);
		return () => {
			window.removeEventListener("click", dropdownReaction);
		};
	}, []);

	return (
		<div className="relative flex items-center">
			<div
				ref={dropdownSwitchRef}
				className="flex items-center h-8 px-[10px] gap-6
				text-[rgba(232,230,227,0.8)] hover:text-[rgba(232,230,227,1)]
				active:text-[rgba(50,163,244,1)]
				bg-white/5
				whitespace-nowrap rounded-[4px] cursor-pointer select-none transition-colors duration-300"
				onClick={() => {
					setShowLanguageDropdownMenu(!showLanguageDropdownMenu);
				}}
			>
				<div>English</div>
				<div
					className={
						showLanguageDropdownMenu
							? "rotate-90 duration-150"
							: "duration-150"
					}
				>
					<CaretRightIcon size={7} />
				</div>
			</div>
			{showLanguageDropdownMenu && (
				<div
					className="absolute flex flex-col justify-center items-center w-20 py-1 top-10
					bg-white/10
					shadow-lg rounded"
				>
					<button
						className="flex justify-center items-center w-full h-7 hover:bg-gray-100/20 cursor-pointer"
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
						className="flex justify-center items-center w-full h-7 hover:bg-gray-100/20 cursor-pointer"
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
				</div>
			)}
		</div>
	);
}

export default LanguageMenu;
