import { CrossReferenceIcon } from "@/components/icons/Icons";

type ReferenceArray = {
	items: any[];
};

export const References = (props: ReferenceArray) => {
	const { items } = props;
	return (
		<div
			className="flex flex-col max-w-[800px] my-12 p-4 gap-2
			bg-gray-200/30 shadow-lg shadow-gray-100/10 rounded-md"
		>
			<div
				className="flex justify-start items-center gap-2
				text-lg text-gray-200 font-semibold"
			>
				<CrossReferenceIcon size={28} /> References
			</div>
			<div className="pl-8 text-gray-200">
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
