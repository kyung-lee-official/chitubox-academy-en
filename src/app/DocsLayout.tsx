import KatexHtmlSanitizer from "@/components/katexHtmlSanitizer/KatexHtmlSanitizer";
import dynamic from "next/dynamic";

const DynamicToc = dynamic(() => import("@/components/toc/Toc"), {
	ssr: false,
});

function DocsLayout(props: { children: React.ReactNode }) {
	const { children } = props;
	return (
		<section className="flex justify-center mx-auto">
			<KatexHtmlSanitizer />
			<DynamicToc />
			<div
				className="max-w-[900px] min-w-0 p-8
				text-white"
			>
				{children}
			</div>
		</section>
	);
}

export default DocsLayout;
