"use client";

import { useMemo } from "react";
import { ParentSize } from "@visx/responsive";
import { LinePath } from "@visx/shape";
import { curveMonotoneX } from "@visx/curve";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { scaleLinear, scaleOrdinal } from "@visx/scale";
import { GlyphCircle } from "@visx/glyph";
import { MarkerArrow } from "@visx/marker";
import { Legend, LegendItem, LegendLabel } from "@visx/legend";

export const TrueAndEngineeringCurve = () => {
	const dataTrue = useMemo(() => {
		return [
			{ x: 0, y: 0 },
			{ x: 2, y: 4.7 },
			{ x: 4, y: 7 },
			{ x: 6, y: 8 },
			{ x: 8, y: 8.5 },
			{ x: 9, y: 8.6 },
		];
	}, []);

	const dataEngineering = useMemo(() => {
		return [
			{ x: 0, y: 0 },
			{ x: 2, y: 4.7 },
			{ x: 4, y: 6.3 },
			{ x: 6, y: 6.5 },
			{ x: 8, y: 6 },
		];
	}, []);

	const dataAxisX = useMemo(() => {
		return [
			{ x: 0, y: 0 },
			{ x: 10, y: 0 },
		];
	}, []);

	const dataAxisY = useMemo(() => {
		return [
			{ x: 0, y: 0 },
			{ x: 0, y: 10 },
		];
	}, []);

	const ordinalColorScale = scaleOrdinal({
		domain: ["Engineering", "True"],
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

						const p = { top: 30, right: 80, bottom: 60, left: 80 };

						const scaleX = scaleLinear({
							domain: [0, 10],
							range: [0, width - p.right - p.left],
						});

						const scaleY = scaleLinear({
							domain: [0, 10],
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
									{/* {dataEngineering.map((d, i) => {
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
										data={dataTrue}
										stroke={ordinalColorScale("True")}
										strokeWidth={2}
										strokeDasharray={"25,15"}
										x={(d) => scaleX(d.x)}
										y={(d) => scaleY(d.y)}
										curve={curveMonotoneX}
									/>
									<LinePath
										data={dataEngineering}
										stroke={ordinalColorScale(
											"Engineering"
										)}
										strokeWidth={2}
										x={(d) => scaleX(d.x)}
										y={(d) => scaleY(d.y)}
										curve={curveMonotoneX}
									/>
									{/* Axis Arrow */}
									<MarkerArrow
										id="marker-x"
										fill="#222"
										size={5}
									/>
									{/* X Axis */}
									<LinePath
										data={dataAxisX}
										stroke="#222"
										strokeWidth={2}
										x={(d) => scaleX(d.x)}
										y={(d) => scaleY(0)}
										markerEnd="url(#marker-x)"
									/>
									{/* Y Axis */}
									<LinePath
										data={dataAxisY}
										stroke="#222"
										strokeWidth={2}
										x={(d) => scaleX(0)}
										y={(d) => scaleY(d.y)}
										markerEnd="url(#marker-x)"
									/>
									<AxisLeft
										scale={scaleY}
										tickLineProps={{
											display: "none",
										}}
										tickLabelProps={{
											display: "none",
										}}
										label="Stress σ"
										labelProps={{
											fontSize: 18,
											x: -scaleY(4),
											y: -scaleX(0.6),
										}}
									/>
									<AxisBottom
										scale={scaleX}
										tickLineProps={{
											display: "none",
										}}
										tickLabelProps={{
											display: "none",
										}}
										label="Strain ε"
										labelProps={{
											fontSize: 18,
											x: scaleX(4.5),
											y: 30,
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
						<div
							className="absolute flex flex-col top-40 right-10
							text-black"
						>
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
										<LegendLabel align="left" margin={0}>
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
