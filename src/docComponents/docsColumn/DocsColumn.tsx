export const DocsColumnContainer = (props: any) => {
	const { children } = props;
	return (
		<div
			className="flex justify-between gap-4
			overflow-x-auto horizontal-scrollbar"
		>
			{children}
		</div>
	);
};

export const DocsColumn = (props: any) => {
	const { children } = props;
	return <div className="flex flex-col gap-4">{children}</div>;
};
