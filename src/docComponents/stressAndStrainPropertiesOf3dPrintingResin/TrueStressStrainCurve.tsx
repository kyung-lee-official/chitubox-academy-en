"use client";

import { useMemo } from "react";
import { ParentSize } from "@visx/responsive";
import { LinePath } from "@visx/shape";
import { curveMonotoneX } from "@visx/curve";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { scaleLinear } from "@visx/scale";
import { GlyphCircle } from "@visx/glyph";

export const TrueStressStrainCurve = () => {
	const data = useMemo(() => {
		return [
			{ x: 0, y: 0 },
			{ x: 0.025, y: 100 },
			{ x: 0.05, y: 250 },
			{ x: 0.07, y: 380 },
			{ x: 0.075, y: 390 },
			{ x: 0.077, y: 400 },
			{ x: 0.175, y: 610 },
			{ x: 0.25, y: 650 },
			{ x: 0.272, y: 560 },
			{ x: 0.2775, y: 440 },
			{ x: 0.28, y: 0 },
		];
	}, []);

	return (
		<div
			className="max-w-[600px] my-8
			bg-white
			shadow-md rounded-md
			overflow-x-auto horizontal-scrollbar"
		>
			<div className="w-[600px] h-80">
				<ParentSize>
					{(parent) => {
						const { width, height } = parent;

						const p = { top: 30, right: 40, bottom: 70, left: 80 };

						const scaleX = scaleLinear({
							domain: [0, 0.3],
							range: [0, width - p.right - p.left],
						});

						const scaleY = scaleLinear({
							domain: [0, 700],
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
									{/* {data.map((d, i) => {
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
										data={data}
										stroke="#222"
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
										label="Stress σ (MPa)"
										labelProps={{
											fontSize: 18,
											x: -scaleY(200),
											y: -scaleX(0.03),
										}}
									/>
									<AxisBottom
										scale={scaleX}
										numTicks={6}
										tickLabelProps={{
											fontSize: 14,
										}}
										label="Strain ε"
										labelProps={{
											fontSize: 18,
											x: scaleX(0.13),
											y: 50,
										}}
										top={height - p.bottom - p.top}
									/>
								</g>
							</svg>
						);
					}}
				</ParentSize>
			</div>
		</div>
	);
};
