export const YouTubeVideoContainer = ({ children }: any) => {
	return (
		<div className="relative h-0 my-4 pb-[56.25%] overflow-hidden">
			<iframe
				className="absolute top-0 left-0 w-full h-full"
				src={children.props.src}
				width="100%"
				title="YouTube video player"
				frameBorder={0}
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowFullScreen
			/>
		</div>
	);
};
