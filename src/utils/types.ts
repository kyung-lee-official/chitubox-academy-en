export const enum MediaQuery {
	sm = "(min-width: 640px)",
	md = "(min-width: 768px)",
	lg = "(min-width: 1024px)",
	xl = "(min-width: 1280px)",
	"2xl" = "(min-width: 1536px)",
}

export type MdxFile = {
	url: string;
	toc: any[];
	metadata: {
		title: string;
		authors: { name: string }[];
		releaseDate: string;
		description: string;
		keywords: string[];
		searchKeywords: string[];
		openGraph: { images: string[] };
	};
};

export type DocsContext = {
	instanceName: string;
	mdxFiles: MdxFile[];
}[];
