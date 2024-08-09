"use client";

import { Dosis } from "next/font/google";
import { type FC, useState } from "react";

const dosisFont = Dosis({
	subsets: ["latin"],
	display: "swap",
});

export const BoardComponent: FC = () => {
	const controlWord = "bingo";
	const numbersPerChar = 15;

	const [selecteds, setSelecteds] = useState<number[]>([]);

	const selectedsHist = selecteds.map((arg) => {
		const selectedWord = controlWord[Math.floor((arg - 1) / numbersPerChar)];
		return `${selectedWord.toUpperCase()}-${String(arg).padStart(2, "0")}`;
	});

	return (
		<div
			className={`${dosisFont.className} grid-cols-2 grid h-fit w-fit auto-rows-fr auto-cols-fr`}
		>
			<div className="grid grid-cols-5 divide-x-2">
				{Array.from(controlWord).map((arg, columnIndex) => (
					<div
						className="grid grid-cols-2 auto-rows-fr auto-cols-fr gap-2 p-2"
						key={arg}
					>
						<div className="uppercase p-1 flex items-center justify-center col-span-2 row-span-2 text-6xl font-bold border-b-2">
							{arg}
						</div>

						{Array.from({ length: numbersPerChar }).map((_, cellIndex) => {
							const cellPosition = cellIndex + 1;
							const cellKey = numbersPerChar * columnIndex + cellPosition;

							return (
								<button
									type="button"
									data-multiple={cellPosition === numbersPerChar}
									data-selected={selecteds.includes(cellKey)}
									className="bg-neutral-200 aspect-square rounded-full p-1 font-medium text-lg flex items-center justify-center data-[multiple=true]:col-span-2 data-[multiple=true]:row-span-2 data-[multiple=true]:text-xl data-[selected=true]:bg-neutral-800 data-[selected=true]:text-white"
									key={String(cellIndex)}
									onClick={() => {
										setSelecteds((state) =>
											state.includes(cellKey)
												? state.filter((arg) => arg !== cellKey)
												: [...state, cellKey],
										);
									}}
								>
									{String(cellKey).padStart(2, "0")}
								</button>
							);
						})}
					</div>
				))}
			</div>

			<div className="w-full h-full flex flex-col justify-center items-center">
				<div className="w-full flex justify-between items-start text-4xl gap-8">
					<div className="relative w-full p-4 border-2 border-black rounded-full flex justify-center">
						{selectedsHist[selectedsHist.length - 3] ?? "-"}

						<span className="absolute text-sm top-[-12px] right-0 bg-purple-700 rounded-full p-2 text-white">
							antepenúltimo
						</span>
					</div>

					<div className="relative w-full p-4 border-2 border-black rounded-full flex justify-center">
						{selectedsHist[selectedsHist.length - 2] ?? "-"}

						<span className="absolute text-sm top-[-12px] right-0 bg-purple-700 rounded-full p-2 text-white">
							penúltimo
						</span>
					</div>
				</div>

				<div className="w-full h-full flex flex-col justify-center items-center text-9xl gap-2">
					{selectedsHist[selectedsHist.length - 1] ?? "🙂"}

					<span className="text-sm bg-purple-700 rounded-full p-2 text-white">
						último
					</span>
				</div>
			</div>
		</div>
	);
};
