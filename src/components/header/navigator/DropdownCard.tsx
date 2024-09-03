import { processHref } from "@/utils/data/data";
import { useState } from "react";

export const DropdownCard = (props: { subitem: any }) => {
	const { subitem } = props;
	const { href, icon1, icon2, text, i18nUri } = subitem;

	const [hover, setHover] = useState<boolean>(false);

	return (
		<a
			className={`flex-[0_1_320px] flex flex-col justify-center items-center h-40 p-[30px]
			text-lg
            bg-white/5 hover:bg-[#0C88E0]
			rounded-[10px]
            transition-colors duration-200`}
			href={processHref(href)}
			onMouseEnter={() => {
				setHover(true);
			}}
			onMouseLeave={() => {
				setHover(false);
			}}
		>
			<div className="flex flex-col justify-center items-center gap-5">
				<div className="h-[32px]">
					<img
						src={hover ? icon2 : icon1}
						alt=""
						className="h-full"
					/>
				</div>
				<div className="font-bold">{text}</div>
			</div>
		</a>
	);
};
