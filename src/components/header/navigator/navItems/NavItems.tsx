import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { NavItem } from "./NavItem";
import { MediaQuery } from "@/utils/types";
import { useMediaQuery } from "react-responsive";
import { getDynamicDataQuery } from "@/utils/api/api";

function NavItems() {
	const dynamicDataQuery = useQuery<any, AxiosError>({
		queryKey: ["dynamicDataQuery"],
		queryFn: async () => {
			return await getDynamicDataQuery();
		},
	});

	const isXl = useMediaQuery({ query: MediaQuery.xl });

	if (isXl) {
		return (
			<>
				{dynamicDataQuery.data?.layout.header.topNavConfig.map(
					(item: any, index: number) => {
						return <NavItem key={index} item={item} />;
					}
				)}
			</>
		);
	} else {
		return null;
	}
}

export default NavItems;
