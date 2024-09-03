"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import _ from "lodash";
import { ReadingListIcon, VideoIcon } from "@/components/icons/Icons";
import DocsCard from "@/components/docsCard/DocsCard";
import Pagination from "@/components/pagination/Pagination";
import { DocsContext, MdxFile } from "@/utils/types";
import docsContext from "@/preload/docsContext.json";

const Button = (props: any) => {
	const { children, isActive, onClick } = props;
	return (
		<button
			className={
				isActive
					? `px-3 py-1
					text-gray-100 font-semibold
					bg-[#0c88e0]
					shadow-md shadow-blue-500/50
					rounded-full duration-200`
					: `px-3 py-1
					text-gray-300
					bg-white/20
					rounded-full duration-200`
			}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

const ContentFilter = (props: {
	basicPro: "basic" | "pro";
	setBasicPro: React.Dispatch<React.SetStateAction<"basic" | "pro">>;
	setBasicProAnimation: React.Dispatch<React.SetStateAction<"basic" | "pro">>;
	manualVideo: "manual" | "video";
	setManualVideo: React.Dispatch<React.SetStateAction<"manual" | "video">>;
}) => {
	const {
		basicPro,
		setBasicPro,
		setBasicProAnimation,
		manualVideo,
		setManualVideo,
	} = props;
	const [showDropdown, setShowDropdown] = useState<boolean>(false);

	const switchRef = useRef<HTMLDivElement | null>(null);
	const dropdownActiveAreaRef = useRef<HTMLDivElement | null>(null);
	const menuRef = useRef<HTMLUListElement | null>(null);

	const onMouseMove = (e: any) => {
		if (e.target === switchRef.current) {
			setShowDropdown(true);
		}

		if (
			e.target !== switchRef.current &&
			e.target !== dropdownActiveAreaRef.current &&
			e.target !== menuRef.current
		) {
			if (menuRef.current) {
				if (!menuRef.current.contains(e.target)) {
					setShowDropdown(false);
				}
			}
		}
	};

	useEffect(() => {
		window.addEventListener("mousemove", onMouseMove);
		return () => {
			window.removeEventListener("mousemove", onMouseMove);
		};
	}, [switchRef.current, dropdownActiveAreaRef.current, menuRef.current]);

	return (
		<div className="flex flex-col gap-6">
			<div
				className={`relative flex items-center w-56 h-[56px] p-1 mx-auto gap-4
				font-bold
				[box-shadow:-2px_-2px_6px_#0ea5e966,2px_2px_6px_#17255499] rounded-full cursor-pointer`}
				onClick={(e: any) => {
					if (
						e.target === menuRef.current ||
						menuRef.current?.contains(e.target)
					) {
						/* Menu is clicked, don't switch basicPro */
					} else {
						if (basicPro === "basic") {
							setBasicPro("pro");
						} else {
							setBasicPro("basic");
						}
					}
				}}
			>
				{/* If mouse leaves this area, the drop-down menu will hide */}
				<div
					ref={dropdownActiveAreaRef}
					className="absolute top-0 right-0 bottom-[-20px] left-0
					z-0"
				/>
				<div
					ref={switchRef}
					className="flex justify-between items-center w-full h-full px-6
					text-blue-300/40
					bg-blue-200/10
					rounded-full z-0"
				>
					<div className="pointer-events-none">Basic</div>
					<div className="pointer-events-none">Pro</div>
				</div>
				<div
					style={{
						justifyContent:
							basicPro === "basic" ? "flex-start" : "flex-end",
					}}
					className="absolute top-[4px] right-[4px] bottom-[4px] left-[4px] flex p-1
					rounded-full  pointer-events-none"
				>
					<motion.div
						layout
						animate={{
							backgroundColor:
								basicPro === "basic" ? "#0c88e0" : "#3b82f6",
						}}
						transition={{
							duration: 0.3,
							type: "spring",
							stiffness: 400,
							damping: 30,
						}}
						onAnimationComplete={() => {
							setBasicProAnimation(basicPro);
						}}
						className={`flex justify-center items-center w-36 h-10 p-2 
						text-sky-50 rounded-full
						shadow-md shadow-[#00305620] select-none`}
					>
						{basicPro === "basic" ? "Basic" : "Pro"}
					</motion.div>
				</div>
			</div>
			<div className="flex justify-start gap-4">
				<Button
					isActive={manualVideo === "video" ? true : false}
					onClick={() => {
						setManualVideo("video");
					}}
				>
					Video
				</Button>
				<Button
					isActive={manualVideo === "manual" ? true : false}
					onClick={() => {
						setManualVideo("manual");
					}}
				>
					Manual
				</Button>
			</div>
		</div>
	);
};

const Content = () => {
	const tutorialsInstance = useMemo(() => {
		return (docsContext as DocsContext).find(
			(item: any) => item.instanceName === "tutorials"
		);
	}, []);
	const chunkedBasicManualTutorials = useMemo(() => {
		const basicTutorials = tutorialsInstance?.mdxFiles.filter((result) => {
			if (result) {
				return result.url.split("/")[4] === "chitubox-basic";
			}
		});
		const basicManualTutorials = basicTutorials?.filter((result) => {
			return result.url.split("/")[5] === "manual";
		});
		return _.chunk(basicManualTutorials, 9);
	}, []);
	const chunckedBasicVideoTutorials = useMemo(() => {
		const basicTutorials = tutorialsInstance?.mdxFiles.filter((result) => {
			if (result) {
				return result.url.split("/")[4] === "chitubox-basic";
			}
		});
		const basicVideoTutorials = basicTutorials?.filter((result) => {
			return result.url.split("/")[5] === "video";
		});
		return _.chunk(basicVideoTutorials, 9);
	}, []);
	const chunkedProManualTutorials = useMemo(() => {
		const proTutorials = tutorialsInstance?.mdxFiles.filter((result) => {
			if (result) {
				return result.url.split("/")[4] === "chitubox-pro";
			}
		});
		const proManualTutorials = proTutorials?.filter((result) => {
			return result.url.split("/")[5] === "manual";
		});
		return _.chunk(proManualTutorials, 9);
	}, []);
	const chunckedProVideoTutorials = useMemo(() => {
		const proTutorials = tutorialsInstance?.mdxFiles.filter((result) => {
			if (result) {
				return result.url.split("/")[4] === "chitubox-pro";
			}
		});
		const proVideoTutorials = proTutorials?.filter((result) => {
			return result.url.split("/")[5] === "video";
		});
		return _.chunk(proVideoTutorials, 9);
	}, []);

	const [basicPro, setBasicPro] = useState<"basic" | "pro">("basic");
	const [basicProAnimation, setBasicProAnimation] = useState<"basic" | "pro">(
		"basic"
	);
	const [manualVideo, setManualVideo] = useState<"manual" | "video">("video");
	const [manualVideoAnimation, setManualVideoAnimation] = useState<
		"manual" | "video"
	>("video");

	const [pagedSearchResult, setPagedSearchResult] = useState<MdxFile[][]>(
		chunkedBasicManualTutorials
	);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [currentPageContent, setCurrentPageContent] = useState<MdxFile[]>(
		pagedSearchResult[currentPage - 1]
	);

	useEffect(() => {
		if (basicPro === "basic") {
			if (manualVideo === "manual") {
				setPagedSearchResult(chunkedBasicManualTutorials);
			} else {
				setPagedSearchResult(chunckedBasicVideoTutorials);
			}
		} else {
			if (manualVideo === "manual") {
				setPagedSearchResult(chunkedProManualTutorials);
			} else {
				setPagedSearchResult(chunckedProVideoTutorials);
			}
		}
	}, [basicProAnimation, manualVideoAnimation]);

	useEffect(() => {
		if (pagedSearchResult.length > 0) {
			setCurrentPageContent(pagedSearchResult[0]);
		} else {
			setCurrentPageContent([]);
		}
		setCurrentPage(1);
	}, [pagedSearchResult]);

	useEffect(() => {
		setCurrentPageContent(pagedSearchResult[currentPage - 1]);
	}, [currentPage]);

	return (
		<div className="flex flex-col max-w-[1200px] min-h-screen p-10 mx-auto gap-16">
			<div className="flex justify-center items-center h-28 gap-4">
				<span
					className="text-6xl font-bold
					bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent
					[filter:drop-shadow(-65px_-5px_40px_rgba(6,182,212,1))_drop-shadow(70px_-5px_40px_#3b82f6)]"
				>
					Tutorials
				</span>
				<AnimatePresence mode="wait">
					{manualVideo === "manual" ? (
						<motion.div
							key={"manual"}
							initial={{
								opacity: 0,
								y: -20,
							}}
							animate={{
								opacity: 1,
								y: 0,
							}}
							exit={{
								opacity: 0,
								y: -20,
							}}
							onAnimationComplete={() => {
								setManualVideoAnimation(manualVideo);
							}}
							className="flex justify-center items-start h-14"
						>
							<ReadingListIcon size={32} fill="#3b82f6" />
						</motion.div>
					) : (
						<motion.div
							key={"video"}
							initial={{
								opacity: 0,
								y: 20,
							}}
							animate={{
								opacity: 1,
								y: 0,
							}}
							exit={{
								opacity: 0,
								y: 20,
							}}
							onAnimationComplete={() => {
								setManualVideoAnimation(manualVideo);
							}}
							className="flex justify-center items-start h-14"
						>
							<VideoIcon size={32} fill="#3b82f6" />
						</motion.div>
					)}
				</AnimatePresence>
			</div>
			<ContentFilter
				basicPro={basicPro}
				setBasicPro={setBasicPro}
				setBasicProAnimation={setBasicProAnimation}
				manualVideo={manualVideo}
				setManualVideo={setManualVideo}
			/>
			<div
				className="grid justify-items-stretch gap-8 mx-auto
				grid-cols-1 max-w-[340px]
				md:grid-cols-2 md:max-w-[712px]
				xl:grid-cols-3 xl:min-w-full"
			>
				{currentPageContent &&
					currentPageContent.map((mdxFile) => {
						const { url, metadata, toc } = mdxFile;

						const { title, description, openGraph } = metadata;
						return (
							<div
								className="flex justify-center items-center"
								key={url}
							>
								<DocsCard
									url={url}
									title={title}
									description={description}
									ogImage={openGraph.images[0]}
								/>
							</div>
						);
					})}
			</div>
			<Pagination
				pagedSearchResult={pagedSearchResult}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
			/>
		</div>
	);
};

export default Content;
