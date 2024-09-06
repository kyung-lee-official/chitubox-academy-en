import axios from "axios";
import qs from "qs";

export const getBannerInfo = async (lang: "en" | "zh-Hans"): Promise<any> => {
	const query = qs.stringify(
		{
			dataType: "chitubox-activity-page",
			pageLang: lang,
			dataName: "chitubox-page-data-activity",
		},
		{
			encodeValuesOnly: true,
		}
	);

	let res;
	if (process.env.NEXT_PUBLIC_ENV === "PROD") {
		res = await axios.get(
			`https://cms.chitubox.com/page/data/getPageDataDetail.do2?${query}`
		);
	} else {
		/* Test */
		res = await axios.get(`/chitubox-tests/activities`, {
			baseURL: process.env.NEXT_PUBLIC_API_HOST,
		});
	}

	return res.data.data;
};

export const getMainstreamProduct = async (): Promise<any> => {
	let res;
	if (process.env.NEXT_PUBLIC_ENV === "PROD") {
		res = await axios.get(
			`https://sac.chitubox.com/software/getMainstreamProduct.do2`
		);
	} else {
		/* Test */
		res = await axios.get(`/chitubox-tests/mainstream-product`, {
			baseURL: process.env.NEXT_PUBLIC_API_HOST,
		});
	}

	return res.data;
};

export const getDynamicDataQuery = async (): Promise<any> => {
	let res;

	const dateString = new Date().toISOString().split("T")[0];
	if (process.env.NEXT_PUBLIC_ENV === "PROD") {
		res = await axios.get(
			`https://fis.cbd-3d.com/chitubox/chitubox/public/render/language/website-en.json?t=${dateString}&s=${location.host}`
		);
	} else {
		/* Test */
		res = await axios.get(`/chitubox-tests/dynamic-data-en`, {
			baseURL: process.env.NEXT_PUBLIC_API_HOST,
		});
	}

	return res.data;
};

export const subscribeEdm = async (email: string): Promise<any> => {
	let res;

	if (process.env.NEXT_PUBLIC_ENV === "PROD") {
		res = await axios.post(
			"https://cas.chitubox.com/marketing/subscribeInfo.do2",
			{
				customerEmail: email,
				customerLocale: "en",
				subscribeSource: "render-foot",
			}
		);
	} else {
		/* Test */
		res = await axios.post(
			"/subscriptions/subscribe",
			{
				customerEmail: email,
				customerLocale: "en",
				subscribeSource: "render-foot",
			},
			{
				baseURL: process.env.NEXT_PUBLIC_API_HOST,
			}
		);
	}

	return res.data;
};

export const sendFeedback = async (data: any): Promise<any> => {
	const res = await axios.post("/chitubox-manual-feedbacks", data, {
		baseURL: process.env.NEXT_PUBLIC_API_HOST,
	});
	return res.data;
};
