"use client";

import { useState } from "react";
import { GoSearch } from "../icons/Icons";

const DocsSearch = (props: {
	setSearchTerm: React.Dispatch<React.SetStateAction<string | null>>;
	placeholder: string;
}) => {
	const { setSearchTerm, placeholder } = props;
	const [isFocused, setIsFocused] = useState<boolean>(false);

	return (
		<div className="flex justify-center items-center">
			<div
				className="flex justify-center items-center w-full
				shadow rounded-md overflow-hidden
				2xl:w-2/3"
			>
				<input
					className="flex-1 h-10 px-4
					text-gray-200
					bg-white/10 placeholder-white/40 outline-none"
					placeholder={isFocused ? undefined : placeholder}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				<div
					className="flex justify-center items-center w-14 h-10 \
					text-gray-400
					bg-white/10"
				>
					<GoSearch size={20} />
				</div>
			</div>
		</div>
	);
};

export default DocsSearch;
