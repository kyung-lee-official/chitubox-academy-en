"use client";

import { BrowserOutlineIcon, ImageIcon } from "@/components/icons/Icons";
import {
	FacebookCircle,
	Patreon,
	TwitterX,
	YouTube,
} from "@/components/icons/Sns";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";

const CvProfile = (props: any) => {
	const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 1536px)" });

	const { src, title, sns, description, wex } = props;
	const { website, facebook, youtube, x, patreon } = sns;

	const targetAspectRatio = 1;

	const imgRef = useRef<HTMLImageElement | null>(null);
	const descriptionRef = useRef<HTMLImageElement | null>(null);

	const [imageSrc, setImageSrc] = useState<string | null>(null);
	const [showSeeMoreButton, setShowSeeMoreButton] = useState<boolean>(false);
	const [showFullDescription, setShowFullDescription] =
		useState<boolean>(false);

	const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
		/* Set img size */

		if (imgRef.current) {
			const imgAspectRatio =
				imgRef.current.naturalWidth / imgRef.current.naturalHeight;

			if (imgAspectRatio > targetAspectRatio) {
				imgRef.current.style.scale = imgAspectRatio.toFixed(6);
			}
		}
	};

	useEffect(() => {
		if (descriptionRef.current?.clientHeight) {
			if (
				descriptionRef.current?.clientHeight <
				descriptionRef.current?.scrollHeight
			) {
				setShowSeeMoreButton(true);
			}
		}

		async function fetchImage() {
			if (src) {
				try {
					const res = await axios.get(src, {
						responseType: "arraybuffer",
					});
					const imageUrl =
						`data:${res.headers["content-type"]};base64,` +
						Buffer.from(res.data, "binary").toString("base64");
					setImageSrc(imageUrl);
				} catch (error) {}
			}
		}
		fetchImage();
	}, []);

	return (
		<div
			className="flex flex-col max-w-[800px] my-12 p-6 gap-4
			bg-gradient-to-br from-slate-200/70 to-zinc-200/60
			shadow-md shadow-zinc-200 rounded-md"
		>
			{isDesktopOrLaptop ? (
				<div className="flex justify-start gap-10">
					<div
						className={`flex justify-center items-center w-40 h-40
						overflow-hidden rounded-full`}
					>
						{imageSrc ? (
							<img
								ref={imgRef}
								src={imageSrc}
								alt=""
								onLoad={onImageLoad}
							/>
						) : (
							<div
								className="flex justify-center items-center w-full h-full
								bg-gray-700"
							>
								<div
									className="flex justify-center items-center w-full h-full
									text-gray-300 animate-pulse"
								>
									<ImageIcon size={100} />
								</div>
							</div>
						)}
					</div>
					<div className="flex-1 flex flex-col items-start gap-4">
						<h1 className="text-gray-600 text-3xl font-bold">
							{title}
						</h1>
						<div className="flex justify-center items-center gap-2 text-gray-300">
							{website && (
								<a
									href={website}
									className="hover:text-gray-500 duration-300"
								>
									<BrowserOutlineIcon size={24} />
								</a>
							)}
							{facebook && (
								<a
									href={facebook}
									className="hover:text-blue-500 duration-300"
								>
									<FacebookCircle size={24} />
								</a>
							)}
							{youtube && (
								<a
									href={youtube}
									className="hover:text-red-500 duration-300"
								>
									<YouTube size={24} />
								</a>
							)}
							{x && (
								<a
									href={x}
									className="hover:text-gray-700  duration-300"
								>
									<TwitterX size={20} />
								</a>
							)}
							{patreon && (
								<a
									href={patreon}
									className="hover:text-orange-600 duration-300"
								>
									<Patreon size={24} />
								</a>
							)}
						</div>
						<i
							ref={descriptionRef}
							className={
								showFullDescription
									? "text-gray-500"
									: "text-gray-500 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] overflow-hidden"
							}
						>
							{description}
						</i>
						{showSeeMoreButton && !showFullDescription && (
							<button
								className="text-gray-500"
								onClick={() => {
									setShowFullDescription(true);
								}}
							>
								<i>
									<u>See More...</u>
								</i>
							</button>
						)}
					</div>
				</div>
			) : (
				<div className="flex flex-col items-center gap-6">
					<div
						className={`flex justify-center items-center w-36 h-36
						overflow-hidden rounded-full`}
					>
						{imageSrc ? (
							<img
								ref={imgRef}
								src={src}
								alt=""
								onLoad={onImageLoad}
							/>
						) : (
							<div
								className="flex justify-center items-center w-full h-full
								bg-gray-700"
							>
								<div
									className="flex justify-center items-center w-full h-full
									text-gray-300 animate-pulse"
								>
									<ImageIcon size={80} />
								</div>
							</div>
						)}
					</div>
					<h1 className="text-gray-600 text-xl font-bold">{title}</h1>
					<div className="flex justify-center items-center gap-2 text-gray-300">
						{website && (
							<a
								href={website}
								className="hover:text-gray-500 duration-300"
							>
								<BrowserOutlineIcon size={24} />
							</a>
						)}
						{facebook && (
							<a
								href={facebook}
								className="hover:text-blue-500 duration-300"
							>
								<FacebookCircle size={24} />
							</a>
						)}
						{youtube && (
							<a
								href={youtube}
								className="hover:text-red-500 duration-300"
							>
								<YouTube size={24} />
							</a>
						)}
						{x && (
							<a
								href={x}
								className="hover:text-gray-700  duration-300"
							>
								<TwitterX size={20} />
							</a>
						)}
						{patreon && (
							<a
								href={patreon}
								className="hover:text-orange-600 duration-300"
							>
								<Patreon size={24} />
							</a>
						)}
					</div>
					<i
						ref={descriptionRef}
						className={
							showFullDescription
								? "text-gray-500"
								: "text-gray-500 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] overflow-hidden"
						}
					>
						{description}
					</i>
					{showSeeMoreButton && !showFullDescription && (
						<button
							className="flex justify-start w-full text-gray-500"
							onClick={() => {
								setShowFullDescription(true);
							}}
						>
							<i>
								<u>See More...</u>
							</i>
						</button>
					)}
				</div>
			)}
			{wex && showFullDescription && (
				<ul
					className="list-outside list-disc pl-6
					text-base text-gray-500"
				>
					{wex.map((item: any, i: number) => (
						<li key={i}>
							<i>{item}</i>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default CvProfile;
