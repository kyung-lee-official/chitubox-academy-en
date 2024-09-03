import { CubeOutlineIcon } from "@/components/icons/Icons";
import { ReactNode } from "react";

type ModelSources = {
	items: ReactNode[];
};

export const ModelSource = (props: ModelSources) => {
	const { items } = props;
	return (
		<div
			className="flex flex-col max-w-[800px] my-12 p-4 gap-2
			bg-sky-200/30 shadow-lg shadow-sky-300/20 rounded-md"
		>
			<div
				className="flex justify-start items-center gap-2
				text-lg text-sky-200 font-semibold"
			>
				<CubeOutlineIcon size={28} /> Model Source
			</div>
			<div className="pl-8 text-sky-200">
				<ul>
					{items.map((item: any, index: number) => (
						<li key={index} className="list-disc">
							<a href={item[1]}>
								<u>{item[0]}</u>
							</a>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};
