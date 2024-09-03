import { useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { getBannerInfo } from "@/utils/api/api";
dayjs.extend(isBetween);

function getQualifiedActivities(activities: any[]): any {
	const qualifiedActivities = activities.filter((activity) => {
		if (activity.isShow === "false") {
			return false;
		} else {
			const startDate = dayjs(activity.startTime);
			const endDate = dayjs(activity.endTime);
			const now = dayjs();
			if (now.isBetween(startDate, endDate)) {
				if (activity.noticeImg !== "") {
					return true;
				} else {
					return false;
				}
			} else {
				return false;
			}
		}
	});
	return qualifiedActivities;
}

function blockCountdownActivities(activities: any) {
	return activities.filter((activity: any) => {
		return activity.isShowCountDown === "false";
	});
}

export function Banner() {
	const [isImageAva, setIsImageAva] = useState(false);

	let currentActivity;

	const { isPending, isError, data, error } = useQuery({
		queryKey: ["bannerQuery"],
		queryFn: () => getBannerInfo("en"),
	});

	if (isPending) {
		return null;
	}

	if (isError) {
		console.error("Failed to fetch the banner info", error);
		return null;
	}

	if (data.dataValue) {
		const activities = JSON.parse(data.dataValue);
		if (activities) {
			const qualifiedActivities = blockCountdownActivities(
				getQualifiedActivities(activities)
			);
			if (qualifiedActivities.length > 0) {
				currentActivity = qualifiedActivities[0];

				axios
					.get(currentActivity.noticeImg)
					.then((res) => {
						setIsImageAva(true);
					})
					.catch((error) => {
						console.error(
							"Failed to fetch the banner image",
							error
						);
					});
				if (isImageAva) {
					return (
						<Link href={currentActivity.noticeLink}>
							<picture className="w-full">
								<img
									className="w-full align-middle"
									src={currentActivity.noticeImg}
									alt="banner"
								/>
							</picture>
						</Link>
					);
				} else {
					return null;
				}
			} else {
				return null;
			}
		}
	} else {
		return null;
	}
}
