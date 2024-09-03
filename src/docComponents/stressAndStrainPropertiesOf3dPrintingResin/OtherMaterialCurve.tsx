"use client";

import { AxisBottom, AxisLeft } from "@visx/axis";
import { curveMonotoneX, curveNatural } from "@visx/curve";
import { GlyphCircle } from "@visx/glyph";
import { Legend, LegendItem, LegendLabel } from "@visx/legend";
import { MarkerArrow } from "@visx/marker";
import { ParentSize } from "@visx/responsive";
import { scaleLinear, scaleOrdinal } from "@visx/scale";
import { LinePath } from "@visx/shape";
import { useMemo } from "react";

export const OtherMaterialCurve = () => {
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
			className="max-w-[800px] my-8
			bg-white
			shadow-md rounded-md
			overflow-x-auto horizontal-scrollbar"
		>
			<div className="flex justify-between w-[800px] h-52">
				<ParentSize>
					{(parent) => {
						const data1 = [
							{ x: 0, y: 0 },
							{ x: 4, y: 6 },
							{ x: 5, y: 5.5 },
						];

						const { width, height } = parent;

						const p = { top: 30, right: 40, bottom: 60, left: 30 };

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
									{/* {data1.map((d, i) => {
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
										data={data1}
										stroke={"black"}
										strokeWidth={2}
										x={(d) => scaleX(d.x)}
										y={(d) => scaleY(d.y)}
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
										label="Brittle Material"
										labelProps={{
											fontSize: 16,
											x: scaleX(4),
											y: 30,
										}}
										top={height - p.bottom - p.top}
									/>
								</g>
							</svg>
						);
					}}
				</ParentSize>
				<ParentSize>
					{(parent) => {
						const { width, height } = parent;

						const p = { top: 30, right: 40, bottom: 60, left: 30 };

						const data2 = [
							{ x: 0, y: 0 },
							{ x: 3, y: 5 },
							{ x: 10, y: 5 },
						];

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
									{/* {data2.map((d, i) => {
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
										data={data2}
										stroke={"black"}
										strokeWidth={2}
										x={(d) => scaleX(d.x)}
										y={(d) => scaleY(d.y)}
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
										label="Ideal Ductile Material"
										labelProps={{
											fontSize: 16,
											x: scaleX(5),
											y: 30,
										}}
										top={height - p.bottom - p.top}
									/>
								</g>
							</svg>
						);
					}}
				</ParentSize>
				<ParentSize>
					{(parent) => {
						const { width, height } = parent;

						const p = { top: 30, right: 40, bottom: 60, left: 30 };

						const data3 = [
							{ x: 0, y: 0 },
							{ x: 2, y: 6.5 },
							{ x: 9, y: 8.5 },
						];

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
									{/* {data3.map((d, i) => {
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
										data={data3}
										stroke={"black"}
										strokeWidth={2}
										x={(d) => scaleX(d.x)}
										y={(d) => scaleY(d.y)}
										curve={curveNatural}
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
										label="Ductile Material"
										labelProps={{
											fontSize: 16,
											x: scaleX(5),
											y: 30,
										}}
										top={height - p.bottom - p.top}
									/>
								</g>
							</svg>
						);
					}}
				</ParentSize>
				<ParentSize>
					{(parent) => {
						const { width, height } = parent;

						const p = { top: 30, right: 40, bottom: 60, left: 30 };

						const data3 = [
							{ x: 0, y: 0 },
							{ x: 4, y: 7 },
							{ x: 4.3, y: 6.7 },
						];

						const data31 = [
							{ x: 4.3, y: 6.7 },
							{ x: 5, y: 6.8 },
							{ x: 6.5, y: 7.5 },
						];

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
									{/* {data3.map((d, i) => {
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
										data={data3}
										stroke={"black"}
										strokeWidth={2}
										x={(d) => scaleX(d.x)}
										y={(d) => scaleY(d.y)}
									/>
									<LinePath
										data={data31}
										stroke={"black"}
										strokeWidth={2}
										x={(d) => scaleX(d.x)}
										y={(d) => scaleY(d.y)}
										curve={curveNatural}
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
										label="Semi-ductile Material"
										labelProps={{
											fontSize: 16,
											x: scaleX(5),
											y: 30,
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
