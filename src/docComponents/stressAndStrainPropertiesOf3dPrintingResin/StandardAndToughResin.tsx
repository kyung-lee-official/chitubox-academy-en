"use client";

import { AxisBottom, AxisLeft } from "@visx/axis";
import { curveMonotoneX } from "@visx/curve";
import { Legend, LegendItem, LegendLabel } from "@visx/legend";
import { ParentSize } from "@visx/responsive";
import { scaleLinear, scaleOrdinal } from "@visx/scale";
import { LinePath } from "@visx/shape";
import { useMemo } from "react";

export const StandardAndToughResin = () => {
	const dataStandard = useMemo(() => {
		return [
			{ x: 0, y: 0 },
			{ x: 1, y: 20 },
			{ x: 5, y: 60 },
			{ x: 10, y: 55 },
		];
	}, []);

	const dataTough = useMemo(() => {
		return [
			{ x: 0, y: 0 },
			{ x: 5, y: 40 },
			{ x: 15, y: 31 },
			{ x: 35, y: 31 },
		];
	}, []);

	const ordinalColorScale = scaleOrdinal({
		domain: ["Standard", "Tough"],
		range: ["#f29b38", "#8386f7"],
	});

	return (
		<div
			className="max-w-[600px] my-8
			bg-white
			shadow-md rounded-md
			overflow-x-auto horizontal-scrollbar"
		>
			<div className="relative w-[600px] h-80">
				<ParentSize>
					{(parent) => {
						const { width, height } = parent;

						const p = { top: 30, right: 40, bottom: 60, left: 80 };

						const scaleX = scaleLinear({
							domain: [0, 35],
							range: [0, width - p.right - p.left],
						});

						const scaleY = scaleLinear({
							domain: [0, 70],
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
									{/* {dataStandard.map((d, i) => {
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
										data={dataStandard}
										stroke={ordinalColorScale("Standard")}
										strokeWidth={3}
										x={(d) => scaleX(d.x)}
										y={(d) => scaleY(d.y)}
										curve={curveMonotoneX}
									/>
									<LinePath
										data={dataTough}
										stroke={ordinalColorScale("Tough")}
										strokeWidth={3}
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
										label="Stress σ (MPa)"
										labelProps={{
											fontSize: 18,
											x: -scaleY(20),
											y: -scaleX(3),
										}}
									/>
									<AxisBottom
										scale={scaleX}
										numTicks={6}
										tickLabelProps={{
											fontSize: 14,
										}}
										label="Strain ε (%)"
										labelProps={{
											fontSize: 18,
											x: scaleX(14),
											y: 50,
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
						<div className="absolute flex flex-col top-6 right-10">
							{labels.map((label, i) => {
								return (
									<LegendItem
										key={`legend-${i}`}
										className="flex items-center gap-4"
									>
										<svg width={30} height={4}>
											<rect
												fill={label.value}
												width={30}
												height={3}
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
		</div>
	);
};
