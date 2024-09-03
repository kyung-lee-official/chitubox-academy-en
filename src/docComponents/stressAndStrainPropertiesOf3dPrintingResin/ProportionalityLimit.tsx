"use client";

import { useMemo } from "react";
import { ParentSize } from "@visx/responsive";
import { LinePath } from "@visx/shape";
import { curveMonotoneX, curveNatural } from "@visx/curve";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { scaleLinear } from "@visx/scale";
import { GlyphCircle } from "@visx/glyph";

export const ProportionalityLimit = () => {
	const data = useMemo(() => {
		return [
			{ x: 0, y: 0 },
			{ x: 2.6, y: 6.1 },
			{ x: 7, y: 9 },
		];
	}, []);

	const dataDash1 = useMemo(() => {
		return [
			{ x: 0, y: 7 },
			{ x: 6, y: 7 },
		];
	}, []);

	const dataDash2 = useMemo(() => {
		return [
			{ x: 2, y: 0 },
			{ x: 3.8, y: 9 },
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

	return (
		<div
			className="max-w-[550px] my-8
			bg-white
			shadow-md rounded-md
			overflow-x-auto horizontal-scrollbar"
		>
			<div className="w-[500px] h-80">
				<ParentSize>
					{(parent) => {
						const { width, height } = parent;

						const p = { top: 30, right: 100, bottom: 70, left: 80 };

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
										curve={curveNatural}
									/>
									{/* Dash1 */}
									<LinePath
										data={dataDash1}
										stroke="#222"
										strokeWidth={1}
										strokeDasharray={"5,5"}
										x={(d) => scaleX(d.x)}
										y={(d) => scaleY(d.y)}
									/>
									{/* Dash1 */}
									<LinePath
										data={dataDash2}
										stroke="#222"
										strokeWidth={1}
										strokeDasharray={"5,5"}
										x={(d) => scaleX(d.x)}
										y={(d) => scaleY(d.y)}
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
									<text dx={scaleX(0.5)} dy={scaleY(7.3)}>
										proof stress
									</text>
									<text dx={scaleX(5)} dy={scaleY(3)}>
										Proof stress used when
									</text>
									<text dx={scaleX(5)} dy={scaleY(2)}>
										Yield Stress too hard to find.
									</text>
									<text dx={scaleX(1.5)} dy={scaleY(-1.2)}>
										0.2%
									</text>
									<AxisLeft
										scale={scaleY}
										numTicks={7}
										tickLineProps={{
											display: "none",
										}}
										tickLabelProps={{
											display: "none",
										}}
										label="Stress"
										labelProps={{
											fontSize: 18,
											x: -scaleY(7),
											y: -scaleX(0.7),
										}}
									/>
									<AxisBottom
										scale={scaleX}
										numTicks={6}
										tickLineProps={{
											display: "none",
										}}
										tickLabelProps={{
											display: "none",
										}}
										label="Strain ε"
										labelProps={{
											fontSize: 18,
											x: scaleX(11.5),
											y: 5,
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
