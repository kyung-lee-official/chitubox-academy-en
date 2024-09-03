export const ImageContainer = (props: any) => {
	const { className, children, footnote } = props;
	return (
		<div className="flex flex-col items-center justify-center max-w-[800px] my-8 gap-2">
			<div
				className={`flex items-center
				drop-shadow-lg ${className}`}
			>
				{children}
			</div>
			{footnote && <div className="text-gray-400">{footnote}</div>}
		</div>
	);
};
