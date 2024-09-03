import * as path from "path";
import { lstatSync, readdirSync } from "fs";
import { lstat, readdir, readFile, writeFile } from "fs/promises";
import { compile } from "@mdx-js/mdx";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import withToc from "@stefanprobst/rehype-extract-toc";

console.time("preload");

const docsDirs = ["tutorials", "advanced", "cases"];

/* Get all doc instances */
const absRootPath = path.resolve("../app");
const rootItems = await readdir(absRootPath);
const absInstancePaths: string[] = [];

for (const directory of docsDirs) {
	const absDirectoryPath = path.resolve(absRootPath, directory);
	const absDirectoryPathStat = await lstat(absDirectoryPath);
	if (absDirectoryPathStat.isDirectory()) {
		absInstancePaths.push(absDirectoryPath);
	}
}

type InstanceContext = {
	instanceName: string;
	mdxFiles: {
		url: string;
		metadata: {
			title: string;
			author: string;
			releaseDate: string;
			content: string;
			description: string;
			tags: string[];
			ogImage: string;
		};
		toc: any;
	}[];
};

/* Build mdx context tree */
const paramBasePath = "/en/academy";
let docsContext: any = [];
for (const absInstancePath of absInstancePaths) {
	let instanceContext: InstanceContext = { instanceName: "", mdxFiles: [] };
	const instanceName = path.basename(absInstancePath);
	instanceContext.instanceName = instanceName;

	function getAbsPathOfItemsRecursively(absRootPath: string) {
		let items: string[] = [];
		const absRootPathStat = lstatSync(absRootPath);
		if (absRootPathStat.isDirectory()) {
			const itemsInRootPath = readdirSync(absRootPath);
			for (const item of itemsInRootPath) {
				const absItemPath = path.resolve(absRootPath, item);
				const absItemStat = lstatSync(absItemPath);
				if (absItemStat.isDirectory()) {
					if (readdirSync(absItemPath).includes("page.mdx")) {
						items.push(absItemPath + "/page.mdx");
					} else {
						items.push(
							...getAbsPathOfItemsRecursively(absItemPath)
						);
					}
				}
			}
		}
		return items;
	}

	const absPathsOfItemsInInstanceFolder =
		getAbsPathOfItemsRecursively(absInstancePath);

	let mdxFilesInInstanceFolder: string[] =
		absPathsOfItemsInInstanceFolder.filter((item) => {
			if (path.extname(item) === ".mdx") {
				const itemStat = lstatSync(item);
				return itemStat.isFile();
			}
		});

	for (const absMdxFilePath of mdxFilesInInstanceFolder) {
		const compiledMdx = await getCompiledMdx(absMdxFilePath);
		let mdxContext = getMdxContext(compiledMdx);

		const relativeMdxFilePath = absMdxFilePath.replace(absRootPath, "");
		const url = `${paramBasePath}${relativeMdxFilePath
			.split(path.sep)
			.join("/")
			.replace("/page.mdx", "")}`;

		instanceContext.mdxFiles.push({ url, ...mdxContext });
	}

	docsContext.push(instanceContext);
}

await writeFile("./docsContext.json", JSON.stringify(docsContext, null, "\t"));

console.timeEnd("preload");

async function getCompiledMdx(absMdxPath: string) {
	const content = await readFile(absMdxPath, "utf-8");
	const compiled = await compile(content, {
		remarkPlugins: [remarkGfm, remarkMath],
		rehypePlugins: [rehypeKatex, rehypeSlug, withToc],
		providerImportSource: "@mdx-js/react",
	});
	return compiled;
}

function getMdxContext(compiledMdx: any) {
	const { data, value } = compiledMdx;
	const startingIndex = value.indexOf("const metadata = {");
	const endingIndex = value.indexOf("};", startingIndex);
	const metaString = value
		.slice(startingIndex + 17, endingIndex + 1)
		.replaceAll("\n", "");
	const metadata = eval(`const metadata = ${metaString};metadata;`);
	const { toc } = data;
	return { metadata, toc };
}
