import "./globals.css";
import { ReactNode } from "react";
import { Metadata } from "next";
import { Header } from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";

export async function generateMetadata(): Promise<Metadata> {
	return {
		metadataBase: new URL("https://chitubox.com/en/academy"),
		icons: {
			icon: "/logo.png",
		},
		title: {
			template: "%s | " + "CHITUBOX Academy",
			default: "CHITUBOX Academy",
		},
		description: "CHITUBOX Academy",
		openGraph: {
			title: {
				template: "%s | " + "CHITUBOX Academy",
				default: "CHITUBOX Academy",
			},
			description: "CHITUBOX Academy",
			images: "https://manual.chitubox.com/images/docs/og_logo.png",
		},
	};
}

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang={"en"}>
			<body
				className="font-[NotoSansCJKsc-Regular]
				bg-black
				bg-[linear-gradient(-18deg,#00000000_80%,#06b6d488),linear-gradient(-30deg,#06b6d488,#00000000_35%),radial-gradient(500px_500px_at_100%_25%,#06b6d455,#00000000),radial-gradient(500px_500px_at_0%_45%,#0ea5e977,#00000000),radial-gradient(400px_400px_at_20%_55%,#eab30833,#00000000),radial-gradient(500px_500px_at_100%_65%,#8b5cf655,#00000000)]
				scrollbar"
			>
				<Header />
				<main className="min-h-svh">{children}</main>
				<Footer />
			</body>
		</html>
	);
}
