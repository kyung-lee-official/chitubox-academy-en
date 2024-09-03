import React from "react";
import {
	FacebookCircle,
	DiscordAlt,
	YouTube,
	TwitterX,
	Instagram,
	GroupIcon,
} from "../icons/Sns";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getDynamicDataQuery } from "@/utils/api/api";

const A = (props: any) => {
	const { href, children, title } = props;
	return (
		<Link
			href={href}
			title={title}
			className="w-[30px] h-[30px]
			text-white/80 hover:text-white duration-200"
		>
			{children}
		</Link>
	);
};

export const Sns = () => {
	const dynamicDataQuery = useQuery<any, AxiosError>({
		queryKey: ["dynamicDataQuery"],
		queryFn: async () => {
			return await getDynamicDataQuery();
		},
	});

	if (dynamicDataQuery.data) {
		return (
			<div className="flex flex-col justify-start items-start h-[130px] gap-[15px]">
				<div>{dynamicDataQuery.data?.layout.newFooter.socialMedia}</div>
				<div className="grid grid-cols-3 items-center w-[172px] gap-y-[33px] gap-x-[41px]">
					<A
						href="https://www.facebook.com/chitubox/"
						title="Facebook"
					>
						<FacebookCircle size={30} />
					</A>
					<A href="https://discord.gg/E45UFqGPZh" title="Discord">
						<DiscordAlt size={30} />
					</A>
					<A
						href="https://www.youtube.com/channel/UC6mxsxtv6XwDEAq5vzQOXEw"
						title="YouTube"
					>
						<YouTube size={30} />
					</A>
					<A href="https://twitter.com/chitubox" title="X">
						<TwitterX size={30} />
					</A>
					<A
						href="https://www.instagram.com/chitubox_official/"
						title="Instagram"
					>
						<Instagram size={30} />
					</A>
					<A
						href="https://www.facebook.com/groups/104983723495672/"
						title="Facebook Group"
					>
						<GroupIcon size={30} />
					</A>
				</div>
			</div>
		);
	} else {
		return null;
	}
};
