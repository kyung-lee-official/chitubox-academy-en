"use client";

import { useEffect } from "react";

const KatexHtmlSanitizer = () => {
	function sanitize() {
		const katexHtmls = document.getElementsByClassName("katex-html");
		/* Remove all katex-html elements */
		for (let i = 0; i < katexHtmls.length; i++) {
			katexHtmls[i].remove();
		}
	}

	function onScroll(e: Event) {
		sanitize();
	}

	useEffect(() => {
		sanitize();
		document.addEventListener("scroll", onScroll);
		return () => {
			document.removeEventListener("scroll", onScroll);
		};
	}, []);
	return null;
};

export default KatexHtmlSanitizer;
