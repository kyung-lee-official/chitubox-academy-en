"use client";

import React, { useMemo, useState } from "react";
import { Google, FacebookCircle } from "../icons/Sns";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { initializeApp } from "firebase/app";
import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	FacebookAuthProvider,
} from "firebase/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getDynamicDataQuery, subscribeEdm } from "@/utils/api/api";

interface IFormInput {
	email: string;
}

const schema = z.object({
	email: z.string().toLowerCase().email({ message: "Invalid email address" }),
});

export const Edm = () => {
	const dynamicDataQuery = useQuery<any, AxiosError>({
		queryKey: ["dynamicDataQuery"],
		queryFn: async () => {
			return await getDynamicDataQuery();
		},
	});

	const [isEdmSubsribed, setIsEdmSubsribed] = useState<boolean>(false);
	const [isEdmSubsribedWithGoogle, setIsEdmSubsribedWithGoogle] =
		useState<boolean>(false);
	const [isEdmSubsribedWithFacebook, setIsEdmSubsribedWithFacebook] =
		useState<boolean>(false);
	const [isFocused, setIsFocused] = useState<boolean>(false);

	const { register, handleSubmit, formState } = useForm<IFormInput>({
		mode: "onChange",
		resolver: zodResolver<any>(schema),
	});

	const subscribeEdmMutation = useMutation<any, AxiosError<any>, IFormInput>({
		mutationFn: async (data: IFormInput) => {
			const { email } = data;
			return subscribeEdm(email);
		},
		onSuccess: (data) => {
			if (data.success) {
				setIsEdmSubsribed(true);
			}
		},
	});

	const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
		subscribeEdmMutation.reset();
		subscribeEdmMutation.mutate(data);
	};

	const app = useMemo(() => {
		/* Initialize Firebase */
		const firebaseConfig = {
			apiKey: "AIzaSyBSPWjPFoy6m8V9vL1fFcSNUq11ih7Wtvw",
			authDomain: "chitubox-web.firebaseapp.com",
			projectId: "chitubox-web",
			storageBucket: "chitubox-web.appspot.com",
			messagingSenderId: "998506226946",
			appId: "1:998506226946:web:f01898e5c311b521b0ce1b",
		};
		const app = initializeApp(firebaseConfig);
		return app;
	}, []);

	return (
		<div className="flex-[0_1_420px] flex flex-col gap-[22px]">
			<div className="flex flex-col gap-[10px]">
				<div>{dynamicDataQuery.data?.layout.newFooter.subDesc}</div>
				<form
					className="flex justify-start items-center
					text-gray-400"
					onSubmit={handleSubmit(onSubmit)}
				>
					<input
						type="text"
						disabled={isEdmSubsribed}
						className={`w-full 2xl:w-[320px] h-[40px] p-2
						${
							isEdmSubsribed
								? "cursor-not-allowed"
								: formState.isValid
								? "text-gray-300 duration-300"
								: "text-red-600 duration-300"
						}
						bg-white/5
						rounded-l outline-none`}
						placeholder={isFocused ? undefined : "Email"}
						{...register("email")}
						onFocus={() => setIsFocused(true)}
						onBlur={() => setIsFocused(false)}
					/>
					<button
						type="submit"
						className={
							isEdmSubsribed
								? `flex justify-center items-center w-[100px] h-[40px] p-2
								text-white
								bg-green-500 rounded-r cursor-default duration-300`
								: subscribeEdmMutation.isPending
								? `flex justify-center items-center w-[100px] h-[40px] p-2
								text-gray-400
								bg-[hsl(201,100%,30%)] rounded-r cursor-wait duration-300`
								: formState.isValid
								? `flex justify-center items-center w-[100px] h-[40px] p-2
								text-white
								bg-[#0086cc] hover:bg-[#0086ee] rounded-r duration-300`
								: `flex justify-center items-center w-[100px] h-[40px] p-2
								text-gray-400
								bg-white/10 rounded-r cursor-not-allowed duration-300`
						}
						disabled={
							!formState.isValid ||
							subscribeEdmMutation.isPending ||
							isEdmSubsribed
						}
					>
						{isEdmSubsribed ? "Subscribed!" : "Subscribe"}
					</button>
				</form>
			</div>
			<div
				className="flex justify-between items-center gap-4
				2xl:w-[420px]"
			>
				<button
					disabled={isEdmSubsribedWithGoogle}
					className={`flex-[0_1_200px] flex justify-center items-center h-10 gap-[10px]
					text-base
					${isEdmSubsribedWithGoogle ? "text-white/40" : "text-white/80"} ${
						!isEdmSubsribedWithGoogle && "hover:text-white"
					}
					bg-white/5 hover:bg-white/10
					rounded duration-200 ${isEdmSubsribedWithGoogle && "cursor-not-allowed"}`}
					title="Google"
					onClick={() => {
						const auth = getAuth(app);
						const provider = new GoogleAuthProvider();
						signInWithPopup(auth, provider)
							.then((result) => {
								result.user.email &&
									subscribeEdmMutation.mutate({
										email: result.user.email,
									});
								setIsEdmSubsribed(true);
								setIsEdmSubsribedWithGoogle(true);
								/* This gives you a Google Access Token. You can use it to access the Google API. */
								const credential =
									GoogleAuthProvider.credentialFromResult(
										result
									);
								const token = credential?.accessToken;
								/* The signed-in user info. */
								const user = result.user;
							})
							.catch((error) => {
								/* Handle Errors here. */
								const errorCode = error.code;
								const errorMessage = error.message;
								/* The email of the user's account used. */
								const email = error.email;
								/* The AuthCredential type that was used. */
								const credential =
									GoogleAuthProvider.credentialFromError(
										error
									);
							});
					}}
				>
					<Google size={24} />
					Google
				</button>
				<button
					disabled={isEdmSubsribedWithFacebook}
					className={`flex-[0_1_200px] flex justify-center items-center h-10 gap-[10px]
					text-base
					${isEdmSubsribedWithFacebook ? "text-white/40" : "text-white/80"} ${
						!isEdmSubsribedWithFacebook && "hover:text-white"
					}
					bg-white/5 hover:bg-white/10
					rounded duration-200 ${isEdmSubsribedWithFacebook && "cursor-not-allowed"}`}
					title="Facebook"
					onClick={() => {
						const auth = getAuth(app);
						const provider = new FacebookAuthProvider();
						signInWithPopup(auth, provider)
							.then((result) => {
								result.user.email &&
									subscribeEdmMutation.mutate({
										email: result.user.email,
									});
								setIsEdmSubsribed(true);
								setIsEdmSubsribedWithFacebook(true);
								/* This gives you a Facebook Access Token. You can use it to access the Facebook API. */
								const credential =
									FacebookAuthProvider.credentialFromResult(
										result
									);
								const accessToken = credential?.accessToken;
								/* The signed-in user info. */
								const user = result.user;
							})
							.catch((error) => {
								/* Handle Errors here. */
								const errorCode = error.code;
								const errorMessage = error.message;
								/* The email of the user's account used. */
								const email = error.email;
								/* The AuthCredential type that was used. */
								const credential =
									FacebookAuthProvider.credentialFromError(
										error
									);
							});
					}}
				>
					<FacebookCircle size={24} />
					Facebook
				</button>
			</div>
		</div>
	);
};
