import React, { FC } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import {
	Button,
  capitalize,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	FormControl,
	FormControlLabel,
	FormLabel,
	Grid,
	IconButton,
	Radio,
	RadioGroup,
	TextField,
} from "@mui/material";

import { EntriesContext } from '../../context/entries/EntriesContext';
import { Layout } from "@/components/layouts";
import { Entry, EntryStatus } from '../../interfaces';
import { dbEntries } from '@/database';
import { dateFunctions } from '@/utils';

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished']; 

interface Props {
  entry: Entry;
}

const EntryPage:FC<Props> = ({ entry }) => {
  const { updateEntry, deleteEntry } = React.useContext(EntriesContext);
  const router = useRouter();

  const [inputValue, setInputState] = React.useState(entry.description);
  const [entryStatus, setEntryStatus] = React.useState<EntryStatus>(entry.status);
  const [touched, setTouched] = React.useState(false);

  const isNotValid = React.useMemo(() => inputValue.trim().length === 0 && touched, [inputValue, touched]);

  const onSave = () => {
    const updatedEntry: Entry = {
      ...entry,
      description: inputValue,
      status: entryStatus,
    }
    updateEntry(updatedEntry, true);
    router.push('/');
  }

  const onDelete = () => {
    deleteEntry(entry._id);
    router.push('/');
  }

	return (
		<Layout title={inputValue.substring(0,20) + '...'}>
			<Grid container justifyContent="center" mt={2}>
				<Grid item xs={12} sm={8} md={6}>
					<Card>
						<CardHeader
							title="Entrada"
							subheader={`Creada ${dateFunctions.getFormatDistanceToNow(entry.createdAt)}`}
              action={
                <IconButton
                  aria-label="Borrar tarea"
                  sx={{ backgroundColor: 'error.dark' }}
                  onClick={onDelete}  
                >
                  <DeleteOutlinedIcon />
                </IconButton>
              }
						/>
						<CardContent>
							<TextField
								fullWidth
								label="Nueva Entrada"
								multiline
                rows={3}
								autoFocus
                value={inputValue}
								placeholder="Nueva Entrada"
								sx={{ mb: 1, mt: 2 }}
                onChange={(e) => setInputState(e.target.value)}
                onBlur={() => setTouched(true)}
                helperText={ isNotValid ? "Ingrese un valor" : ""}
                error={isNotValid}
							/>

							<FormControl>
								<FormLabel sx={{ mt: 1 }}>Estado:</FormLabel>
                <RadioGroup
                  row
                  value={entryStatus}
                  onChange={(e) => setEntryStatus(e.target.value as EntryStatus)}
                >
                  {validStatus.map((status) => (
                    <FormControlLabel
                      key={status}
                      value={status}
                      control={<Radio />}
                      label={capitalize(status)}
                    />
                  ))}
                </RadioGroup>
							</FormControl>
						</CardContent>

						<CardActions>
							<Button
								startIcon={<SaveOutlinedIcon />}
								variant="contained"
								fullWidth
                disabled={inputValue.trim().length === 0}
                onClick={onSave}
							>
								Save
							</Button>
						</CardActions>
					</Card>
				</Grid>
			</Grid>
		</Layout>
	);
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };

  const entry = await dbEntries.getEntryById(id);

  if(!entry) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  return {
    props: {
      entry
    }
  }
}

export default EntryPage;
