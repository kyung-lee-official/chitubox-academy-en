import "./app/globals.css";
import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { LinkIcon } from "./components/icons/Icons";
import { Image } from "antd";
import { ImageContainer } from "./components/imageContainer/ImageContainer";
import { ImageComparison } from "./docComponents/imageComparison/ImageComparison";
import { ModelSource } from "./docComponents/modelSource/ModelSource";
import { Admonition } from "./docComponents/admonition/Admonition";
import { ResponsiveTable } from "./components/responsiveTable/ResponsiveTable";
import { References } from "./docComponents/references/References";
import { YouTubeVideoContainer } from "./docComponents/videoContainer/YouTubeVideoContainer";
import dynamic from "next/dynamic";

const DynamicCvProfile = dynamic(
	() => import("@/docComponents/cvProfile/CvProfile"),
	{
		ssr: false,
	}
);

const HeadingAnchor = (props: any) => {
	const { ...rest } = props;
	return (
		<Link
			{...rest}
			className="flex justify-center items-center no-underline opacity-20 hover:opacity-60 duration-200"
		>
			<LinkIcon size={20} />
		</Link>
	);
};

const AntdImage = (props: any) => {
	return <Image {...props} className="m-auto rounded-lg" />;
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
	const h1 = (props: any) => (
		<h1 {...props} className="text-5xl font-bold mb-10" />
	);

	const h2 = (props: any) => {
		const { id, children } = props;
		return (
			<h2
				id={id}
				className={`flex justify-start items-center gap-4 my-8
                text-4xl
				scroll-mt-20`}
			>
				<div>{children}</div>
				<HeadingAnchor href={`#${id}`} />
			</h2>
		);
	};

	const h3 = (props: any) => {
		const { id, children } = props;
		return (
			<h3
				id={id}
				className={`flex justify-start items-center gap-4 my-6
                text-3xl
				scroll-mt-20`}
			>
				<div>{children}</div>
				<HeadingAnchor href={`#${id}`} />
			</h3>
		);
	};

	const h4 = ({ children }: any) => {
		return (
			<h4
				id={children[0].props.href.slice(1)}
				className={`flex justify-start items-center gap-4 my-6
                text-2xl
				scroll-mt-20`}
			>
				{children[1]}
				<HeadingAnchor href={children[0].props.href}>#</HeadingAnchor>
			</h4>
		);
	};

	const h5 = ({ children }: any) => {
		return (
			<h5
				id={children[0].props.href.slice(1)}
				className={`flex justify-start items-center gap-4 my-6
                font-bold text-xl
				scroll-mt-20`}
			>
				{children[1]}
				<HeadingAnchor href={children[0].props.href}>#</HeadingAnchor>
			</h5>
		);
	};

	const h6 = ({ children }: any) => {
		return (
			<h6
				id={children[0].props.href.slice(1)}
				className={`flex justify-start items-center gap-4 my-4
                font-bold text-lg
				scroll-mt-20`}
			>
				{children[1]}
				<HeadingAnchor href={children[0].props.href}>#</HeadingAnchor>
			</h6>
		);
	};

	const p = (props: any) => <p {...props} className="my-4" />;

	const ul = ({ children }: any) => {
		return (
			<ul
				className="list-outside list-disc my-3 pl-4
                [&_>_li_>_ul]:list-outside
                [&_>_li_>_ul]:pl-4 [&_>_li_>_ul]:my-2
                [&_>_li_>_ul]:list-[circle]"
			>
				{children}
			</ul>
		);
	};

	const ol = ({ children }: any) => {
		return (
			<ol
				className="list-outside list-decimal my-3 pl-4
                [&_>_li]:my-2"
			>
				{children}
			</ol>
		);
	};

	return {
		h1: h1,
		h2: h2,
		h3: h3,
		h4: h4,
		h5: h5,
		h6: h6,
		p: p,
		ul: ul,
		ol: ol,
		table: ResponsiveTable,

		Link: (props) => {
			const { href, children } = props;
			return (
				<Link href={href} className="text-sky-500 underline">
					{children}
				</Link>
			);
		},

		AntdImage: AntdImage,
		ImageContainer: ImageContainer,
		ImageComparison: ImageComparison,
		Admonition: Admonition,
		ModelSource: ModelSource,
		References: References,
		YouTubeVideoContainer: YouTubeVideoContainer,
		CvProfile: DynamicCvProfile,

		...components,
	};
}
