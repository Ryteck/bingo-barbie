import { BoardComponent } from "@/components/board";
import type { FC } from "react";

const Page: FC = () => (
	<main className="w-screen h-screen flex justify-center items-center">
		<BoardComponent />
	</main>
);

export default Page;
