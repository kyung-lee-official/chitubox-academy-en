import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

/** @type {import('next').NextConfig} */
const nextConfig = {
	basePath: "/en/academy",
	/* Configure `pageExtensions` to include MDX files */
	pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
};

const withMDX = createMDX({
	extension: /\.mdx?$/,
	options: {
		/** If you use remark-gfm, you'll need to use next.config.mjs
		 * as the package is ESM only
		 * https://github.com/remarkjs/remark-gfm#install 
		 */
		remarkPlugins: [remarkGfm, remarkMath],
		rehypePlugins: [rehypeKatex, rehypeSlug, rehypeAutolinkHeadings],
	},
});

const withMDXConfig = withMDX(nextConfig);

export default withMDXConfig;

