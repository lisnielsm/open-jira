import { useState, useContext } from "react";

import { Box, Button, TextField } from "@mui/material";
import SaveOulinedIcon from "@mui/icons-material/SaveOutlined";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import { EntriesContext } from "../../context/entries/EntriesContext";
import { UIContext } from "../../context/ui/UIContext";

export const NewEntry = () => {
	const { addNewEntry } = useContext(EntriesContext);
	const { isAddingEntry, setIsAddingEntry } = useContext(UIContext);

	const [inputValue, setInputValue] = useState("");
	const [touched, setTouched] = useState(false);

	const onSave = () => {
		addNewEntry(inputValue);
		setInputValue("");
    setTouched(false);
		setIsAddingEntry(false);
	};

	const onCancel = () => {
		setInputValue("");
		setTouched(false);
		setIsAddingEntry(false);
	};

	return (
		<Box mb={2} p={2}>
			{isAddingEntry ? (
				<>
					<TextField
						fullWidth
						placeholder="Nueva entrada"
						helperText={
							inputValue.trim().length === 0 && touched
								? "Ingrese un valor"
								: ""
						}
						error={inputValue.trim().length === 0 && touched}
						autoFocus
						multiline
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
						onBlur={() => setTouched(true)}
						sx={{ pt: 2, pb: 1 }}
					/>

					<Box display="flex" justifyContent="space-between">
						<Button
							variant="text"
							onClick={onCancel}
						>
							Cancelar
						</Button>

						<Button
							variant="outlined"
							color="secondary"
							endIcon={<SaveOulinedIcon />}
							onClick={onSave}
							disabled={inputValue.trim().length === 0}
						>
							Guardar
						</Button>
					</Box>
				</>
			) : (
				<Button
					startIcon={<AddCircleOutlinedIcon />}
					variant="outlined"
					fullWidth
					onClick={() => setIsAddingEntry(true)}
				>
					Agregar Tarea
				</Button>
			)}
		</Box>
	);
};
