import { FC, useReducer, useEffect } from 'react';
import { useSnackbar } from 'notistack';

import { EntriesContext, entriesReducer } from "./";
import { Entry } from "@/interfaces";
import { entriesApi } from '../../apis';

interface Props {
	children: React.ReactNode;
}

export interface EntriesState {
	entries: Entry[];
}

const ENTRIES_INITIAL_STATE: EntriesState = {
	entries: [],
};

export const EntriesProvider: FC<Props> = ({ children }) => {
	const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE);
	const { enqueueSnackbar } = useSnackbar();

	const addNewEntry = async (description: string) => {
		const { data } = await entriesApi.post<Entry>('/entries', { description });
		dispatch({ type: "Add-Entry",	payload: data });
	};

	const updateEntry = async ({ _id, description, status }: Entry, showSnackbar = false) => {
		try {
			const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, { description, status });
			dispatch({ type: "Entry-Updated",	payload: data });
			
			if(showSnackbar) {
				enqueueSnackbar('Entrada actualizada', {
					variant: 'success',
					autoHideDuration: 1500,
					anchorOrigin: {
						vertical: 'top',
						horizontal: 'right',
					}
				});
			}
		} catch (error) {
			console.log({error});
		}
	};

	const deleteEntry = async (entryId: string) => {
		try {
			await entriesApi.delete(`/entries/${entryId}`);
			dispatch({ type: "Entry-Deleted",	payload: entryId });
			enqueueSnackbar('Entrada borrada', {
				variant: 'success',
				autoHideDuration: 1500,
				anchorOrigin: {
					vertical: 'top',
					horizontal: 'right',
				}
			});
		} catch (error) {
			console.log({error});
		}
	};

	const refreshEntries = async () => {
		const { data } = await entriesApi.get<Entry[]>('/entries');
		dispatch({ type: 'Refresh-Data', payload: data });
	}

	useEffect(() => {
		refreshEntries();
	}, [])

	return (
		<EntriesContext.Provider
			value={{
				...state,
        addNewEntry,
				updateEntry,
				deleteEntry,
			}}
		>
			{children}
		</EntriesContext.Provider>
	);
};
