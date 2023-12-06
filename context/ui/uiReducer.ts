import { UIState } from ".";

type UIType =
	| { type: "OPEN_SIDEBAR" }
	| { type: "CLOSE_SIDEBAR" }
	| { type: "SET_IS_ADDING_ENTRY"; payload: boolean }
	| { type: "SET_IS_DRAGGING"; payload: boolean };

export const uiReducer = (state: UIState, action: UIType): UIState => {
	switch (action.type) {
		case "OPEN_SIDEBAR":
			return {
				...state,
				sidemenuOpen: true,
			};
		case "CLOSE_SIDEBAR":
			return {
				...state,
				sidemenuOpen: false,
			};
		case "SET_IS_ADDING_ENTRY":
			return {
				...state,
				isAddingEntry: action.payload,
			};
		case "SET_IS_DRAGGING":
			return {
				...state,
				isDragging: action.payload,
			};
		default:
			return state;
	}
};
