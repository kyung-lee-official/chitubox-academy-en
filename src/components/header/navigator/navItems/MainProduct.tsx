import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getMainstreamProduct } from "@/utils/api/api";
import { ReactNode } from "react";

const Bubble = (props: { children: ReactNode }) => {
	const { children } = props;
	return (
		<div
			className="absolute flex justify-center items-center w-fit h-[18px] top-[-20px] left-1/2 px-2
			text-white text-xs text-nowrap
			bg-[#F50057] rounded-tl-full rounded-r-full"
		>
			{children}
		</div>
	);
};

export default function MainProduct() {
	const mainProductQuery = useQuery<any, AxiosError>({
		queryKey: ["mainProductQuery"],
		queryFn: async () => {
			return await getMainstreamProduct();
		},
	});

	if (mainProductQuery.data) {
		const { data } = mainProductQuery.data;

		switch (data.softwareId) {
			case "17839":
				return <Bubble>Basic {data.versionId.toUpperCase()}</Bubble>;
			case "17842":
				return <Bubble>Pro {data.versionId.toUpperCase()}</Bubble>;
			default:
				return null;
				break;
		}
	} else {
		return null;
	}
}
