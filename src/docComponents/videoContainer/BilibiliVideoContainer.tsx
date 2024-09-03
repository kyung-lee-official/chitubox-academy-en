import React from "react";

export const BilibiliVideoContainer: React.FC<any> = ({ children }) => {
	return (
		<div className="relative overflow-hidden pb-[56.25%] h-0 my-4">
			<iframe
				className="absolute top-0 left-0 w-full h-full"
				src={children.props.src}
				frameBorder="no"
				scrolling="no"
				allowFullScreen
				style={{ width: "100%" }}
			/>
		</div>
	);
};
