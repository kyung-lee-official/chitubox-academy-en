"use client";

import { useEffect, useMemo, useState } from "react";
import DocsCard from "@/components/docsCard/DocsCard";
import DocsSearch from "@/components/docsSearch/DocsSearch";
import _ from "lodash";
import Pagination from "@/components/pagination/Pagination";
import { DocsContext, MdxFile } from "@/utils/types";
import docsContext from "@/preload/docsContext.json";

const Content = () => {
	const casesInstance = useMemo(() => {
		return (docsContext as DocsContext).find(
			(item) => item.instanceName === "cases"
		);
	}, []);

	const availableTags = useMemo(() => {
		const allTags = casesInstance?.mdxFiles
			.map((mdxFile) => {
				return mdxFile.metadata.keywords;
			})
			.flat();
		return _.uniq(allTags).sort();
	}, []);

	const [selectedTags, setSelectedTags] = useState<string[]>([]);
	const [filteredDocs, setFilteredDocs] = useState<MdxFile[] | undefined>(
		casesInstance?.mdxFiles
	);
	const [searchTerm, setSearchTerm] = useState<string | null>(null);
	const [searchResult, setSearchResult] = useState<MdxFile[] | undefined>(
		casesInstance?.mdxFiles
	);
	const sorted = searchResult?.sort((a, b) => {
		return (
			Date.parse(b.metadata.releaseDate) -
			Date.parse(a.metadata.releaseDate)
		);
	});
	const [pagedSearchResult, setPagedSearchResult] = useState<MdxFile[][]>(
		_.chunk(sorted, 9)
	);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [currentPageContent, setCurrentPageContent] = useState<MdxFile[]>(
		pagedSearchResult[currentPage - 1]
	);

	useEffect(() => {
		if (selectedTags.length === 0) {
			setFilteredDocs(casesInstance?.mdxFiles);
		} else {
			/* Filter out docs that don't contain all selected tags */
			const filteredResult = casesInstance?.mdxFiles.filter((mdxFile) => {
				const { metadata } = mdxFile;
				const { keywords } = metadata;

				return selectedTags.every((selectedTag: string) =>
					keywords.includes(selectedTag)
				);
			});
			setFilteredDocs(filteredResult);
		}
	}, [selectedTags]);

	useEffect(() => {
		if (searchTerm === null || searchTerm === "") {
			const sorted = filteredDocs?.sort((a, b) => {
				return (
					Date.parse(b.metadata.releaseDate) -
					Date.parse(a.metadata.releaseDate)
				);
			});
			setSearchResult(sorted);
		} else {
			const searched = filteredDocs?.filter((mdxFile) => {
				const { metadata } = mdxFile;
				const { title, description } = metadata;
				return (
					title.toLowerCase().includes(searchTerm.toLowerCase()) ||
					description.toLowerCase().includes(searchTerm.toLowerCase())
				);
			});
			const sorted = searched?.sort((a, b) => {
				return (
					Date.parse(b.metadata.releaseDate) -
					Date.parse(a.metadata.releaseDate)
				);
			});
			setSearchResult(sorted);
		}
	}, [filteredDocs, searchTerm]);

	useEffect(() => {
		const pagedSearchResult = _.chunk(searchResult, 9);
		setPagedSearchResult(pagedSearchResult);
		if (pagedSearchResult.length > 0) {
			setCurrentPageContent(pagedSearchResult[0]);
		} else {
			setCurrentPageContent([]);
		}
		setCurrentPage(1);
	}, [searchResult]);

	useEffect(() => {
		setCurrentPageContent(pagedSearchResult[currentPage - 1]);
	}, [currentPage]);

	return (
		<div className="flex flex-col max-w-[1200px] min-h-screen p-10 mx-auto gap-16">
			<div className="flex justify-center items-center h-28">
				<span
					className="text-6xl font-bold
					bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent
					[filter:drop-shadow(-65px_-5px_40px_rgba(6,182,212,1))_drop-shadow(70px_-5px_40px_#3b82f6)]"
				>
					Cases
				</span>
			</div>
			<DocsSearch
				setSearchTerm={setSearchTerm}
				placeholder={"Search Cases"}
			/>
			{/* <TagFilter
				availableTags={availableTags}
				selectedTags={selectedTags}
				setSelectedTags={setSelectedTags}
			/> */}
			<div
				className="grid justify-items-stretch gap-8 mx-auto
				grid-cols-1 max-w-[340px]
				md:grid-cols-2 md:max-w-[712px]
				xl:grid-cols-3 xl:min-w-full"
			>
				{currentPageContent.map((mdxFile) => {
					const { url, metadata, toc } = mdxFile;
					const { title, description, openGraph } = metadata;
					return (
						<div
							className="flex justify-center items-center"
							key={url}
						>
							<DocsCard
								url={url}
								title={title}
								description={description}
								ogImage={openGraph.images[0]}
							/>
						</div>
					);
				})}
			</div>
			<Pagination
				pagedSearchResult={pagedSearchResult}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
			/>
		</div>
	);
};

export default Content;
