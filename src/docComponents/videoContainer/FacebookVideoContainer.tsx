import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

const VideoContainer: React.FC<any> = (props: any) => {
	const { heightWidthRatio, children } = props;
	return (
		<div
			className={`relative h-0 pb-${
				heightWidthRatio * 100
			}% my-4 overflow-hidden`}
		>
			{children}
		</div>
	);
};

const HorizontalIframe = (props: any) => {
	const { src } = props;
	return <iframe src={src} className="absolute top-0 left-0 w-full h-full" />;
};

const VerticalVideoContainerForDesktop = (props: any) => {
	const { height, children } = props;
	return (
		<div className={`flex justify-center h-[${height}px]`}>{children}</div>
	);
};

const FacebookVideoContainer: React.FC<any> = ({ children }) => {
	const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 1280px)" });
	const [isDesktop, setIsDesktop] = useState(isDesktopOrLaptop);
	useEffect(() => {
		setIsDesktop(isDesktopOrLaptop);
	}, [isDesktopOrLaptop]);

	if (isDesktop) {
		if (children.props.width > children.props.height) {
			return (
				<VideoContainer
					heightWidthRatio={
						children.props.height / children.props.width
					}
				>
					<HorizontalIframe
						src={children.props.src}
						frameBorder={0}
					/>
				</VideoContainer>
			);
		} else {
			return (
				<VerticalVideoContainerForDesktop
					$height={children.props.height}
				>
					{children}
				</VerticalVideoContainerForDesktop>
			);
		}
	} else {
		return (
			<VideoContainer
				heightWidthRatio={children.props.height / children.props.width}
			>
				<HorizontalIframe src={children.props.src} frameBorder={0} />
			</VideoContainer>
		);
	}
};

export default FacebookVideoContainer;
