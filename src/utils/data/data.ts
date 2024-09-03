/**
 * Removes duplicates from an array
 * @param array the array to remove duplicates from
 * @returns the array without duplicates
 */
export function uniq(array: any[]) {
	return array.filter((value, index, self) => self.indexOf(value) === index);
}

export function processHref(href: string) {
	const baseUrl = "https://www.chitubox.com";
	const locales = ["en", "zh-Hans", "zh-Hant"];
	if (!href) {
		return "/";
	}
	if (href.startsWith("http")) {
		return href;
	} else {
		const splitedHref = href.split("/");
		if (locales.includes(splitedHref[1])) {
			return `${baseUrl}${splitedHref.join("/")}`;
		} else {
			return `${baseUrl}/en${splitedHref.join("/")}`;
		}
	}
}
