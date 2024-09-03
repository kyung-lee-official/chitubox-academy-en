import Link from "next/link";
import Year from "../Year";
import { getDynamicDataQuery } from "@/utils/api/api";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useMediaQuery } from "react-responsive";
import { MediaQuery } from "@/utils/types";

function Legal() {
	const dynamicDataQuery = useQuery<any, AxiosError>({
		queryKey: ["dynamicDataQuery"],
		queryFn: async () => {
			return await getDynamicDataQuery();
		},
	});

	const isXl = useMediaQuery({ query: MediaQuery.xl });

	if (dynamicDataQuery.data) {
		const { privacyAndSecurity, legalNotice } =
			dynamicDataQuery.data.layout.newFooter;
		if (isXl) {
			return (
				<>
					<span className="text-white/60 h-fit">
						Copyright © <Year /> CHITUBOX. All rights reserved.
						<Link
							href="https://beian.miit.gov.cn/"
							target="_blank"
							className="hover:underline"
						>
							粤ICP备15098202号
						</Link>
					</span>
					<div
						className="flex items-end gap-16
						text-white/80"
					>
						<Link
							href="https://www.chitubox.com/en/article/law/privacy"
							className="hover:text-white text-nowrap"
						>
							{privacyAndSecurity}
						</Link>
						<Link
							href="https://www.chitubox.com/en/article/law/legal"
							className="hover:text-white text-nowrap"
						>
							{legalNotice}
						</Link>
					</div>
				</>
			);
		} else {
			return (
				<div className="flex-1 flex justify-between items-end flex-wrap">
					<span className="text-white/60">
						Copyright © <Year /> CHITUBOX. All rights reserved.
						<Link
							href="https://beian.miit.gov.cn/"
							target="_blank"
							className="hover:underline"
						>
							{" "}
							粤ICP备15098202号
						</Link>
					</span>
					<div
						className="flex items-end gap-16
						text-white/80"
					>
						<Link
							href="https://www.chitubox.com/en/article/law/privacy"
							className="hover:text-white text-nowrap"
						>
							{privacyAndSecurity}
						</Link>
						<Link
							href="https://www.chitubox.com/en/article/law/legal"
							className="hover:text-white text-nowrap"
						>
							{legalNotice}
						</Link>
					</div>
				</div>
			);
		}
	}
}

export default Legal;
