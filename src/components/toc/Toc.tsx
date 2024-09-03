"use client";

import { useEffect, useMemo, useState } from "react";
import docsContext from "@/preload/docsContext.json";
import Link from "next/link";
import { DocsContext, MediaQuery } from "@/utils/types";
import { usePathname } from "next/navigation";
import { useMediaQuery } from "react-responsive";

const Li = (props: any) => {
	const { children, ...rest } = props;
	return (
		<li
			className="flex justify-start items-center
			text-gray-200 font-semibold hover:text-sky-400"
			{...rest}
		>
			{children}
		</li>
	);
};

const Toc = () => {
	const [headerHeight, setHeaderHeight] = useState("0px");

	useEffect(() => {
		const header = document.getElementById("header");
		if (!header) return;
		const resizeObserver = new ResizeObserver(() => {
			/* Do what you want to do when the size of the element changes */
			setHeaderHeight(`${header.clientHeight}px`);
		});
		resizeObserver.observe(header);
		return () => resizeObserver.disconnect(); /* clean up */
	}, []);

	const pathname = usePathname();
	const title = useMemo(() => {
		const instanceContext = (docsContext as DocsContext).find(
			(instance: any) => instance.instanceName === pathname.split("/")[1]
		);
		const docContext = instanceContext?.mdxFiles.find((item: any) => {
			if (instanceContext.instanceName === "tutorials") {
				return item.url.split("/")[6] === pathname.split("/")[4];
			} else {
				return item.url.split("/")[4] === pathname.split("/")[2];
			}
		});
		return docContext?.metadata.title;
	}, []);

	const flattenToc = useMemo(() => {
		const instanceContext = (docsContext as DocsContext).find(
			(instance: any) => instance.instanceName === pathname.split("/")[1]
		);
		const docContext = instanceContext?.mdxFiles.find((item: any) => {
			if (instanceContext.instanceName === "tutorials") {
				return item.url.split("/")[6] === pathname.split("/")[4];
			} else {
				return item.url.split("/")[4] === pathname.split("/")[2];
			}
		});
		const toc = docContext?.toc[0].children;
		const flattenToc: any[] = toc?.reduce((toc: any, item: any) => {
			if (item.children) {
				toc.push(item);
				for (const child of item.children) {
					toc.push(child);
				}
			} else {
				toc.push(item);
			}
			return toc;
		}, []);
		return flattenToc;
	}, []);

	const isXl = useMediaQuery({ query: MediaQuery.xl });

	if (isXl) {
		return (
			<div
				className="sticky
				flex flex-col w-[300px] p-8 gap-4"
				style={{
					top: headerHeight,
					height: `calc(100vh - ${headerHeight})`,
				}}
			>
				{title && (
					<h3
						className="flex justify-start
						font-bold text-base text-gray-200 select-none"
					>
						{title}
					</h3>
				)}
				{flattenToc && (
					<ul
						className="flex flex-col gap-2
						text-sm
						overflow-y-auto scrollbar"
					>
						{flattenToc.map((item: any) => {
							if (item.depth === 2) {
								return (
									<Li key={item.id}>
										<Link
											className="font-normal
											overflow-x-hidden whitespace-nowrap text-ellipsis"
											href={"#" + item.id}
											title={item.value}
										>
											{item.value}
										</Link>
									</Li>
								);
							} else {
								return (
									<Li key={item.id}>
										<Link
											className="ml-8
											font-normal
											overflow-x-hidden whitespace-nowrap text-ellipsis"
											href={"#" + item.id}
											title={item.value}
										>
											{item.value}
										</Link>
									</Li>
								);
							}
						})}
					</ul>
				)}
			</div>
		);
	} else {
		return null;
	}
};

export default Toc;
