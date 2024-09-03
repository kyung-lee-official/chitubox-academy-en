"use client";

import { AxisBottom, AxisLeft } from "@visx/axis";
import { curveMonotoneX, curveNatural } from "@visx/curve";
import { GlyphCircle, Glyph } from "@visx/glyph";
import { MarkerArrow } from "@visx/marker";
import { ParentSize } from "@visx/responsive";
import { scaleLinear } from "@visx/scale";
import { Area, LinePath } from "@visx/shape";
import { ReactNode, useMemo } from "react";

const ArrowRightGlyph = ({ size, fill }: any): ReactNode => {
	return (
		<svg
			viewBox="0 0 20 20"
			height={size}
			width={size}
			focusable="false"
			role="img"
			fill="currentColor"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="m15 10-9 5V5l9 5z"></path>
		</svg>
	);
};

const ArrowLeftGlyph = ({ size, fill }: any): ReactNode => {
	return (
		<svg
			viewBox="0 0 20 20"
			height={size}
			width={size}
			focusable="false"
			role="img"
			fill="currentColor"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M14 5v10l-9-5 9-5z"></path>
		</svg>
	);
};

const ArrowTickGlyph = (): ReactNode => {
	return (
		<svg width={1} height={20}>
			<rect fill="black" width={1} height={20} />
		</svg>
	);
};

export const Limits = () => {
	const data1 = useMemo(() => {
		return [
			{ x: 0, y: 0 },
			{ x: 0.62, y: 5 },
			{ x: 0.75, y: 6 },
			{ x: 0.85, y: 5.9 },
		];
	}, []);

	const data2 = useMemo(() => {
		return [
			{ x: 0.85, y: 5.9 },
			{ x: 0.9, y: 5.87 },
			{ x: 0.95, y: 5.9 },
			{ x: 3.2, y: 6.2 },
		];
	}, []);

	const data3 = useMemo(() => {
		return [
			{ x: 3.2, y: 6.2 },
			{ x: 4.2, y: 6.45 },
			{ x: 5, y: 7 },
			{ x: 6, y: 7.7 },
			{ x: 7, y: 8 },
		];
	}, []);

	const data4 = useMemo(() => {
		return [
			{ x: 7, y: 8 },
			{ x: 8, y: 7.75 },
			{ x: 9, y: 7 },
		];
	}, []);

	const dataHorizonLineU = useMemo(() => {
		return [
			{ x: 0, y: 8 },
			{ x: 7, y: 8 },
		];
	}, []);

	const dataHorizonLineF = useMemo(() => {
		return [
			{ x: 0, y: 7 },
			{ x: 9, y: 7 },
		];
	}, []);

	const dataHorizonLineY = useMemo(() => {
		return [
			{ x: 0, y: 5.87 },
			{ x: 0.9, y: 5.87 },
		];
	}, []);

	const dataHorizonLineP = useMemo(() => {
		return [
			{ x: 0, y: 5 },
			{ x: 0.65, y: 5 },
		];
	}, []);

	const dataGlyph = useMemo(() => {
		return [
			{ x: 0.62, y: 5 },
			{ x: 0.75, y: 6 },
			{ x: 0.9, y: 5.87 },
			{ x: 7, y: 8 },
			{ x: 9, y: 7 },
		];
	}, []);

	const dataHorizonLineElastic = useMemo(() => {
		return [
			{ x: 0, y: -0.6 },
			{ x: 0.85, y: -0.6 },
		];
	}, []);

	const dataHorizonLinePlastic = useMemo(() => {
		return [
			{ x: 0.85, y: -0.6 },
			{ x: 9, y: -0.6 },
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

	// return (
	// 	<div className="flex w-full min-w-0 overflow-x-auto">
	// 		Loremipsumdolorsitametconsecteturadipisicingelit.Quisquamaperiamerrorcumminuseveniet,faciliscumquesapiente,officiaculpaveritatisundesimiliquerepudiandaemolestiasadipiscicupiditatenemodolorumearummollitia!
	// 	</div>
	// );

	return (
		<div
			className="flex w-full min-w-0 my-8
			bg-white
			shadow-md rounded-md
			overflow-x-auto horizontal-scrollbar"
		>
			<div className="flex justify-between w-[800px] h-[400px]">
				<ParentSize>
					{(parent) => {
						const { width, height } = parent;

						const p = { top: 30, right: 50, bottom: 85, left: 80 };

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
									<Area
										data={data1}
										strokeWidth={0}
										x={(d) => scaleX(d.x)}
										y0={(d) => scaleY(0)}
										y1={(d) => scaleY(d.y)}
										fill="#84cc16"
									/>
									<Area
										data={data2}
										strokeWidth={0}
										x={(d) => scaleX(d.x)}
										y0={(d) => scaleY(0)}
										y1={(d) => scaleY(d.y)}
										fill="#facc15"
										curve={curveMonotoneX}
									/>
									<Area
										data={data3}
										strokeWidth={0}
										x={(d) => scaleX(d.x)}
										y0={(d) => scaleY(0)}
										y1={(d) => scaleY(d.y)}
										fill="#f97316"
										curve={curveNatural}
									/>
									<Area
										data={data4}
										strokeWidth={0}
										x={(d) => scaleX(d.x)}
										y0={(d) => scaleY(0)}
										y1={(d) => scaleY(d.y)}
										fill="#dc2626"
										curve={curveNatural}
									/>
									<LinePath
										data={dataHorizonLineU}
										stroke={"black"}
										strokeWidth={1}
										strokeDasharray={"5,5"}
										x={(d) => scaleX(d.x)}
										y={(d) => scaleY(d.y)}
									/>
									<LinePath
										data={dataHorizonLineY}
										stroke={"black"}
										strokeWidth={1}
										strokeDasharray={"5,5"}
										x={(d) => scaleX(d.x)}
										y={(d) => scaleY(d.y)}
									/>
									<LinePath
										data={dataHorizonLineF}
										stroke={"black"}
										strokeWidth={1}
										strokeDasharray={"5,5"}
										x={(d) => scaleX(d.x)}
										y={(d) => scaleY(d.y)}
									/>
									<LinePath
										data={dataHorizonLineP}
										stroke={"black"}
										strokeWidth={1}
										strokeDasharray={"5,5"}
										x={(d) => scaleX(d.x)}
										y={(d) => scaleY(d.y)}
									/>
									<LinePath
										data={dataHorizonLineElastic}
										stroke={"black"}
										strokeWidth={1}
										x={(d) => scaleX(d.x)}
										y={(d) => scaleY(d.y)}
									/>

									{dataGlyph.map((d, i) => {
										return (
											<GlyphCircle
												key={`circle-${i}`}
												left={scaleX(d.x)}
												top={scaleY(d.y)}
												r={3}
												stroke="black"
												fill="white"
												size={40}
											/>
										);
									})}

									<Glyph
										left={scaleX(-0.06)}
										top={scaleY(-0.33)}
									>
										<ArrowLeftGlyph size={16} />
									</Glyph>
									<Glyph
										left={scaleX(0.66)}
										top={scaleY(-0.33)}
									>
										<ArrowRightGlyph size={16} />
									</Glyph>
									<LinePath
										data={dataHorizonLinePlastic}
										stroke={"black"}
										strokeWidth={1}
										x={(d) => scaleX(d.x)}
										y={(d) => scaleY(d.y)}
									/>
									<Glyph
										left={scaleX(0.79)}
										top={scaleY(-0.33)}
									>
										<ArrowLeftGlyph size={16} />
									</Glyph>
									<Glyph
										left={scaleX(8.84)}
										top={scaleY(-0.33)}
									>
										<ArrowRightGlyph size={16} />
									</Glyph>
									<Glyph
										left={scaleX(-0.01)}
										top={scaleY(-0.28)}
									>
										<ArrowTickGlyph />
									</Glyph>
									<Glyph
										left={scaleX(0.85)}
										top={scaleY(-0.28)}
									>
										<ArrowTickGlyph />
									</Glyph>
									<Glyph left={scaleX(9)} top={scaleY(-0.28)}>
										<ArrowTickGlyph />
									</Glyph>
									{/* Axis Arrows */}
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
									<text dx={scaleX(-1)} dy={scaleY(9)}>
										Stress σ
									</text>
									<text
										dx={scaleX(-0.4)}
										dy={scaleY(8)}
										className="text-2xl"
									>
										σ
									</text>
									<text
										dx={scaleX(-0.4 + 0.2)}
										dy={scaleY(8 - 0.2)}
										className="text-sm"
									>
										u
									</text>
									<text
										dx={scaleX(-0.4)}
										dy={scaleY(7)}
										className="text-2xl"
									>
										σ
									</text>
									<text
										dx={scaleX(-0.4 + 0.2)}
										dy={scaleY(7 - 0.2)}
										className="text-sm"
									>
										f
									</text>
									<text
										dx={scaleX(-0.4)}
										dy={scaleY(5.87)}
										className="text-2xl"
									>
										σ
									</text>
									<text
										dx={scaleX(-0.4 + 0.2)}
										dy={scaleY(5.87 - 0.2)}
										className="text-sm"
									>
										y
									</text>
									<text
										dx={scaleX(-0.5)}
										dy={scaleY(5)}
										className="text-2xl"
									>
										σ
									</text>
									<text
										dx={scaleX(-0.5 + 0.2)}
										dy={scaleY(5 - 0.2)}
										className="text-sm"
									>
										pl
									</text>
									<text
										dx={scaleX(1.5)}
										dy={scaleY(8.5)}
										className="text-2xl"
									>
										σ
									</text>
									<text
										dx={scaleX(1.5 + 0.2)}
										dy={scaleY(8.5 - 0.2)}
										className="text-sm"
									>
										el
									</text>
									<defs>
										<marker
											id="arrow"
											viewBox="0 0 10 10"
											refX="5"
											refY="5"
											markerWidth="6"
											markerHeight="6"
											orient="auto-start-reverse"
										>
											<path d="M 0 0 L 10 5 L 0 10 z" />
										</marker>
									</defs>
									<path
										d={`M ${scaleX(1.4)} ${scaleY(8.5)}
									C ${scaleX(0.75)} ${scaleY(8.5)},
									${scaleX(0.75)} ${scaleY(7)},
									${scaleX(0.75)} ${scaleY(6.4)}`}
										stroke="black"
										strokeWidth={1}
										fillOpacity={0}
										markerEnd="url(#arrow)"
									/>
									<text dx={scaleX(0)} dy={scaleY(-1.5)}>
										elastic
									</text>
									<text dx={scaleX(0)} dy={scaleY(-2.1)}>
										behavior
									</text>
									<text dx={scaleX(4)} dy={scaleY(-1.5)}>
										plastic behavior
									</text>

									<text
										dx={scaleX(0.12)}
										dy={scaleY(0.5)}
										className="text-base"
									>
										elastic
									</text>
									<text
										dx={scaleX(1.6)}
										dy={scaleY(0.5)}
										className="text-base"
									>
										yielding
									</text>
									<text
										dx={scaleX(4.2)}
										dy={scaleY(0.5)}
										className="text-base"
									>
										strain hardening
									</text>
									<text
										dx={scaleX(7.6)}
										dy={scaleY(0.5)}
										className="text-base"
									>
										necking
									</text>

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
										tickLineProps={{
											display: "none",
										}}
										tickLabelProps={{
											display: "none",
										}}
										label="Strain ε"
										labelProps={{
											fontSize: 16,
											x: scaleX(9.5),
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
