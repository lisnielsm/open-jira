import { fireEvent, render, screen } from "@testing-library/react";
import { EntryCard } from "../components/ui/EntryCard";
import { UIContext } from "../context/ui";
import { EntryStatus } from "@/interfaces";

describe("EntryCard", () => {
	let setIsDragging: jest.Mock;
	const uiContextValue = {
		sidemenuOpen: false,
		isAddingEntry: false,
		isDragging: false,
		openSideMenu: jest.fn(),
		closeSideMenu: jest.fn(),
		setIsAddingEntry: jest.fn(),
		setIsDragging: jest.fn(),
	};
	let entry: {
		_id: string;
		description: string;
		createdAt: number;
		status: EntryStatus;
	};

	beforeEach(() => {
		entry = {
			_id: "testId",
			description: "testDescription",
			createdAt: Date.now(),
			status: "pending",
		};
	});

	it("should handle drag start and end", () => {
		const dataTransfer = {
			setData: jest.fn(),
		};
		const event = new Event("dragstart") as any;
		event.dataTransfer = dataTransfer;

		render(
			<UIContext.Provider value={uiContextValue}>
				<EntryCard entry={entry} />
			</UIContext.Provider>
		);

		const card = screen.getByRole("button");
		fireEvent.dragStart(card);

		expect(dataTransfer.setData).toHaveBeenCalledWith("text", entry._id);
		expect(setIsDragging).toHaveBeenCalledWith(true);

		fireEvent.dragEnd(card);
		expect(setIsDragging).toHaveBeenCalledWith(false);
	});
});
