import { Image } from "antd";

export const ImageComparison = (props: {
	img1Src: string;
	text1: string;
	alt1: string;
	img2Src: string;
	text2: string;
	alt2: string;
	height?: number;
}) => {
	const { img1Src, text1, alt1, img2Src, text2, alt2, height } = props;
	return (
		<div
			className={`w-full flex max-w-[1000px] ${
				height ? `h-[${height}px] ` : ""
			}my-8 gap-4`}
		>
			<div className="flex-1 flex flex-col items-center gap-2">
				<Image
					src={img1Src}
					alt={alt1}
					height={height}
					className="m-auto shadow-md rounded-lg"
				/>
				<div className="flex-1 text-gray-500 p-2 text-center">
					{text1}
				</div>
			</div>
			<div className="flex-1 flex flex-col items-center gap-2">
				<Image
					src={img2Src}
					alt={alt2}
					height={height}
					className="m-auto shadow-md rounded-lg"
				/>
				<div className="flex-1 text-gray-500 p-2 text-center">
					{text2}
				</div>
			</div>
		</div>
	);
};
