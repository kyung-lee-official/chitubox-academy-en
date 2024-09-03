"use client";

import { useMemo } from "react";
import { ParentSize } from "@visx/responsive";
import { Area, LinePath } from "@visx/shape";
import { curveMonotoneX } from "@visx/curve";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { scaleLinear } from "@visx/scale";
import { GlyphCircle } from "@visx/glyph";

export const BritleAndDuctile = () => {
	const dataBrittle = useMemo(() => {
		return [
			{ x: 0, y: 0 },
			{ x: 1.8, y: 7 },
			{ x: 3, y: 8 },
		];
	}, []);

	const dataDuctile = useMemo(() => {
		return [
			{ x: 0, y: 0 },
			{ x: 2, y: 5 },
			{ x: 4, y: 6.2 },
			{ x: 6, y: 6.5 },
			{ x: 8, y: 6.1 },
			{ x: 10, y: 4.9 },
		];
	}, []);

	return (
		<div
			className="w-[350px] h-80 my-8
			bg-white
			shadow-md rounded-md"
		>
			<ParentSize>
				{(parent) => {
					const { width, height } = parent;

					const p = { top: 30, right: 30, bottom: 40, left: 40 };

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
								{/* {dataDuctile.map((d, i) => {
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
								<Area
									data={dataBrittle}
									strokeWidth={2}
									x={(d) => scaleX(d.x)}
									y0={(d) => scaleY(0)}
									y1={(d) => scaleY(d.y)}
									curve={curveMonotoneX}
									fill="red"
									opacity={0.35}
								/>
								<Area
									data={dataDuctile}
									strokeWidth={2}
									x={(d) => scaleX(d.x)}
									y0={(d) => scaleY(0)}
									y1={(d) => scaleY(d.y)}
									curve={curveMonotoneX}
									fill="red"
									opacity={0.35}
								/>
								<LinePath
									data={dataBrittle}
									stroke="#222"
									strokeWidth={2}
									x={(d) => scaleX(d.x)}
									y={(d) => scaleY(d.y)}
									curve={curveMonotoneX}
								/>
								<LinePath
									data={dataDuctile}
									stroke="#222"
									strokeWidth={2}
									x={(d) => scaleX(d.x)}
									y={(d) => scaleY(d.y)}
									curve={curveMonotoneX}
								/>
								<AxisLeft
									scale={scaleY}
									hideTicks={true}
									tickLabelProps={{
										display: "none",
									}}
									label="Stress"
									labelProps={{
										fontSize: 18,
										x: -scaleY(4),
										y: -scaleX(0.4),
									}}
								/>
								<AxisBottom
									scale={scaleX}
									tickLength={0}
									tickComponent={({
										formattedValue,
										...tickProps
									}) => {
										if (formattedValue === "0") {
											return (
												<text
													{...tickProps}
													fontSize={16}
													dy={12}
													fill="black"
												>
													A
												</text>
											);
										}
										if (formattedValue === "3") {
											return (
												<text
													{...tickProps}
													fontSize={16}
													dy={12}
													fill="black"
												>
													B
												</text>
											);
										}
										if (formattedValue === "10") {
											return (
												<text
													{...tickProps}
													fontSize={16}
													dy={12}
													fill="black"
												>
													B&apos;
												</text>
											);
										}
										return null;
									}}
									top={height - p.bottom - p.top}
								/>
								<text dx={scaleX(1.7)} dy={scaleY(8.5)}>
									Brittle
								</text>
								<text dx={scaleX(4.5)} dy={scaleY(7)}>
									Ductile
								</text>
							</g>
						</svg>
					);
				}}
			</ParentSize>
		</div>
	);
};
