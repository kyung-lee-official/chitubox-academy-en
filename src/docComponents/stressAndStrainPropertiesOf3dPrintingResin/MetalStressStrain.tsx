"use client";

import { AxisBottom, AxisLeft } from "@visx/axis";
import { curveMonotoneX } from "@visx/curve";
import { ParentSize } from "@visx/responsive";
import { scaleLinear, scaleOrdinal } from "@visx/scale";
import { LinePath } from "@visx/shape";
import { useMemo } from "react";
import { Legend, LegendItem, LegendLabel } from "@visx/legend";

export const MetalStressStrain = () => {
	const dataBrass = useMemo(() => {
		return [
			{ x: 0, y: 0 },
			{ x: 0.01, y: 300 },
			{ x: 0.02, y: 370 },
			{ x: 0.05, y: 400 },
			{ x: 0.15, y: 438 },
			{ x: 0.28, y: 450 },
			{ x: 0.31, y: 410 },
			{ x: 0.32, y: 0 },
		];
	}, []);

	const dataAluminum = useMemo(() => {
		return [
			{ x: 0, y: 0 },
			{ x: 0.01, y: 240 },
			{ x: 0.02, y: 260 },
			{ x: 0.073, y: 285 },
			{ x: 0.085, y: 250 },
			{ x: 0.09, y: 0 },
		];
	}, []);

	const dataCopper = useMemo(() => {
		return [
			{ x: 0, y: 0 },
			{ x: 0.01, y: 300 },
			{ x: 0.02, y: 380 },
			{ x: 0.034, y: 330 },
			{ x: 0.04, y: 200 },
			{ x: 0.044, y: 60 },
			{ x: 0.05, y: 0 },
		];
	}, []);

	const dataSteel = useMemo(() => {
		return [
			{ x: 0, y: 0 },
			{ x: 0.01, y: 300 },
			{ x: 0.02, y: 400 },
			{ x: 0.05, y: 500 },
			{ x: 0.1, y: 520 },
			{ x: 0.15, y: 525 },
			{ x: 0.175, y: 523 },
			{ x: 0.185, y: 500 },
			{ x: 0.19, y: 400 },
			{ x: 0.193, y: 200 },
			{ x: 0.2, y: 0 },
		];
	}, []);

	const ordinalColorScale = scaleOrdinal({
		domain: ["Brass", "Aluminum", "Copper", "Steel"],
		range: ["#fae856", "#f29b38", "#e64357", "#8386f7"],
	});

	return (
		<div
			className="relative
			w-[460px] h-80 my-8
			bg-white
			shadow-md rounded-md"
		>
			<ParentSize>
				{(parent) => {
					const { width, height } = parent;

					const p = { top: 30, right: 100, bottom: 60, left: 60 };

					const scaleX = scaleLinear({
						domain: [0, 0.4],
						range: [0, width - p.right - p.left],
					});

					const scaleY = scaleLinear({
						domain: [0, 600],
						range: [height - p.bottom - p.top, 0],
					});

					return (
						<svg width={width} height={height}>
							<g
								width={width - p.right - p.left}
								height={height - p.top - p.bottom}
								transform={`translate(${p.left},${p.top})`}
							>
								{/* Glyph for debugging */}
								{/* {dataSteel.map((d, i) => {
									return (
										<GlyphCircle
											key={`circle-${i}`}
											left={scaleX(d.x)}
											top={scaleY(d.y)}
											r={3}
											fill="#db27783e"
											size={40}
										/>
									);
								})} */}
								<LinePath
									data={dataBrass}
									stroke={ordinalColorScale("Brass")}
									strokeWidth={2}
									x={(d) => scaleX(d.x)}
									y={(d) => scaleY(d.y)}
									curve={curveMonotoneX}
								/>
								<LinePath
									data={dataAluminum}
									stroke={ordinalColorScale("Aluminum")}
									strokeWidth={2}
									x={(d) => scaleX(d.x)}
									y={(d) => scaleY(d.y)}
									curve={curveMonotoneX}
								/>
								<LinePath
									data={dataCopper}
									stroke={ordinalColorScale("Copper")}
									strokeWidth={2}
									x={(d) => scaleX(d.x)}
									y={(d) => scaleY(d.y)}
									curve={curveMonotoneX}
								/>
								<LinePath
									data={dataSteel}
									stroke={ordinalColorScale("Steel")}
									strokeWidth={2}
									x={(d) => scaleX(d.x)}
									y={(d) => scaleY(d.y)}
									curve={curveMonotoneX}
								/>
								<AxisLeft
									scale={scaleY}
									numTicks={7}
									tickLabelProps={{
										fontSize: 14,
									}}
								/>
								<AxisBottom
									scale={scaleX}
									numTicks={6}
									tickLabelProps={{
										fontSize: 14,
									}}
									top={height - p.bottom - p.top}
								/>
							</g>
						</svg>
					);
				}}
			</ParentSize>
			<Legend scale={ordinalColorScale}>
				{(labels) => (
					<div className="absolute flex flex-col top-6 right-2">
						{labels.map((label, i) => {
							return (
								<LegendItem
									key={`legend-metal-${i}`}
									className="flex items-center gap-4"
								>
									<svg width={30} height={4}>
										<rect
											fill={label.value}
											width={30}
											height={4}
										/>
									</svg>
									<LegendLabel
										align="left"
										margin={0}
										className="text-black"
									>
										{label.text}
									</LegendLabel>
								</LegendItem>
							);
						})}
					</div>
				)}
			</Legend>
		</div>
	);
};
