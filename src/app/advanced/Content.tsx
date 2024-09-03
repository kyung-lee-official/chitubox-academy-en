"use client";

import React, { useEffect, useMemo, useState } from "react";
import docsContext from "@/preload/docsContext.json";
import TagFilter from "@/components/tagFilter/TagFilter";
import DocsSearch from "@/components/docsSearch/DocsSearch";
import _ from "lodash";
import Pagination from "@/components/pagination/Pagination";
import DocsCard from "@/components/docsCard/DocsCard";
import { DocsContext } from "@/utils/types";

const Content = () => {
	const advancedInstance = useMemo(() => {
		return (docsContext as DocsContext).find(
			(item: any) => item.instanceName === "advanced"
		);
	}, []);

	const availableTags = useMemo(() => {
		const allTags = advancedInstance?.mdxFiles
			.map((mdxFile) => {
				return mdxFile.metadata.keywords;
			})
			.flat();
		return _.uniq(allTags).sort();
	}, []);

	const [selectedTags, setSelectedTags] = useState<string[]>([]);
	const [filteredDocs, setFilteredDocs] = useState(
		advancedInstance?.mdxFiles
	);
	const [searchTerm, setSearchTerm] = useState<string | null>(null);
	const [searchResult, setSearchResult] = useState<any>(
		advancedInstance?.mdxFiles
	);
	const [pagedSearchResult, setPagedSearchResult] = useState<unknown[][]>(
		_.chunk(searchResult, 9)
	);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [currentPageContent, setCurrentPageContent] = useState<unknown[]>(
		pagedSearchResult[currentPage - 1]
	);

	useEffect(() => {
		if (selectedTags.length === 0) {
			setFilteredDocs(advancedInstance?.mdxFiles);
		} else {
			/* Filter out docs that don't contain any of selected tags */
			const filteredResult = advancedInstance?.mdxFiles.filter(
				(mdxFile) => {
					const { metadata } = mdxFile;
					const { keywords } = metadata;

					return selectedTags.some((selectedTag: string) =>
						keywords.includes(selectedTag)
					);
				}
			);
			setFilteredDocs(filteredResult);
		}
	}, [selectedTags]);

	useEffect(() => {
		if (searchTerm === null || searchTerm === "") {
			setSearchResult(filteredDocs);
		} else {
			const searched = filteredDocs?.filter((mdxFile) => {
				const { metadata } = mdxFile;
				const { title, description } = metadata;
				return (
					title.toLowerCase().includes(searchTerm.toLowerCase()) ||
					description.toLowerCase().includes(searchTerm.toLowerCase())
				);
			});
			setSearchResult(searched);
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
					Advanced
				</span>
			</div>
			<DocsSearch
				setSearchTerm={setSearchTerm}
				placeholder={"Search Advanced"}
			/>
			<TagFilter
				availableTags={availableTags}
				selectedTags={selectedTags}
				setSelectedTags={setSelectedTags}
			/>
			<div
				className="grid justify-items-stretch gap-8 mx-auto
				grid-cols-1 max-w-[340px]
				md:grid-cols-2 md:max-w-[712px]
				xl:grid-cols-3 xl:min-w-full"
			>
				{currentPageContent.map((mdxFile: any) => {
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
