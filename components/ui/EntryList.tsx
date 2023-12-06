import { FC, useContext, useMemo } from 'react';

import { List, Paper } from "@mui/material";

import { EntriesContext } from '@/context/entries';
import { UIContext } from '../../context/ui/';

import { EntryStatus } from "@/interfaces";
import { EntryCard } from "./";

import styles from './EntryList.module.css';

interface Props {
	status: EntryStatus;
}

export const EntryList:FC<Props> = ({status}) => {
	const { entries, updateEntry } = useContext(EntriesContext);
	const { isDragging, setIsDragging } = useContext(UIContext);

	const entriesByStatus = useMemo(() => entries.filter(entry => entry.status === status), [entries, status]);

	const allowDrop = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
	}

	const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
		const entryId = event.dataTransfer.getData('text');
		
		const entry = entries.find(entry => entry._id === entryId)!;
		entry.status = status;
		updateEntry(entry);
		setIsDragging(false);
	}

	return (
		<div
			onDrop={onDrop}
			onDragOver={allowDrop}
			className={isDragging ? styles.dragging : ""}
		>
			<Paper
        className="hideScrollbar"
				sx={{
					height: "calc(100vh - 150px)",
					backgroundColor: "transparent",
					overflowY: "auto",
					p: 1,
					pb: "84px",
					borderRadius: 0,
				}}
			>
				<List
					disablePadding
					sx={{
						opacity: isDragging ? 0.2 : 1,
						transition: "all 0.3s",
				}}>
					{ entriesByStatus.map(entry => (
						<EntryCard key={entry._id} entry={entry} />
					)) }
				</List>
			</Paper>
		</div>
	);
};
