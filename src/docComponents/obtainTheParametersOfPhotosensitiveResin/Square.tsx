"use client";

import {
	CartesianGrid,
	ComposedChart,
	Label,
	LabelList,
	Legend,
	Line,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { useMediaQuery } from "react-responsive";

const dataSquare = [
	{
		time: 5,
	},
	{
		time: 10,
		x: 9.77,
		y: 9.75,
		z: 4.97,
	},
	{
		time: 15,
		x: 10.02,
		y: 10.02,
		z: 5.01,
	},
	{
		time: 17,
		x: 9.89,
		y: 9.88,
		z: 4.95,
	},
	{
		time: 20,
	},
];

export const Square = () => {
	const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 1536px)" });

	return (
		<div
			className="flex flex-col max-w-[800px] h-64 my-10 mx-auto gap-1 py-2
			bg-gray-700 shadow-md rounded-md
			2xl:h-[450px] 2xl:py-8 2xl:gap-2"
		>
			<div className="flex justify-center items-center">
				<div
					className="text-gray-50 text-lg
					2xl:text-3xl"
				>
					Square
				</div>
			</div>
			<ResponsiveContainer width="100%" height="100%">
				<ComposedChart
					data={dataSquare}
					margin={{
						top: isDesktopOrLaptop ? 40 : 30,
						right: isDesktopOrLaptop ? 60 : 35,
						bottom: isDesktopOrLaptop ? 40 : 30,
						left: isDesktopOrLaptop ? 60 : 35,
					}}
				>
					<CartesianGrid stroke="#f0f0f0" />
					<XAxis
						dataKey="time"
						scale="point"
						tick={{ fill: "#f0f0f0" }}
						height={isDesktopOrLaptop ? 35 : 5}
						className="text-sm 2xl:text-lg"
					>
						<Label
							value={"Exposure Time (s)"}
							position="bottom"
							offset={35}
							style={{
								textAnchor: "middle",
							}}
							className="text-sm fill-gray-200 2xl:text-xl"
						/>
					</XAxis>
					<YAxis
						tick={{ fill: "#f0f0f0" }}
						domain={[0, 12]}
						width={isDesktopOrLaptop ? 40 : 30}
						className="text-sm 2xl:text-lg"
						// ticks={[4.5, 6.3, 7.2, 8.1]}
						// tickCount={8}
					>
						<Label
							value={"Measure (mm)"}
							angle={-90}
							position="left"
							offset={10}
							style={{
								textAnchor: "middle",
							}}
							className="text-sm fill-gray-200 2xl:text-xl"
						/>
					</YAxis>
					<Tooltip />
					<Legend
						iconSize={14}
						wrapperStyle={{
							fontSize: isDesktopOrLaptop ? "18px" : "12px",
							transform: isDesktopOrLaptop
								? "translate(0px, 0px)"
								: "translate(0px, 10px)",
						}}
					/>
					<Line
						type="monotone"
						dataKey="x"
						stroke="#bae637"
						strokeWidth={isDesktopOrLaptop ? 5 : 2}
						name={"X"}
					>
						<LabelList
							dataKey="x"
							position="top"
							fill="#bae637"
							offset={20}
							className="text-sm 2xl:text-2xl"
						/>
					</Line>
					<Line
						type="monotone"
						dataKey="y"
						stroke="#69c0ff"
						strokeWidth={isDesktopOrLaptop ? 5 : 2}
						name={"Y"}
						strokeDasharray={isDesktopOrLaptop ? "10 10" : "5 5"}
					>
						<LabelList
							dataKey="y"
							position="bottom"
							fill="#69c0ff"
							offset={20}
							className="text-sm 2xl:text-2xl"
						/>
					</Line>
					<Line
						type="monotone"
						dataKey="z"
						stroke="#5cdbd3"
						strokeWidth={isDesktopOrLaptop ? 5 : 2}
						name={"Z"}
					>
						<LabelList
							dataKey="z"
							position="bottom"
							fill="#5cdbd3"
							offset={20}
							className="text-sm 2xl:text-2xl"
						/>
					</Line>
				</ComposedChart>
			</ResponsiveContainer>
		</div>
	);
};
