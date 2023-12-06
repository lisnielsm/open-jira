import { DragEvent, FC, useContext } from 'react';

import { Card, CardActionArea, CardContent, Typography } from "@mui/material";

import { Entry } from "@/interfaces";
import CardActions from "@mui/material/CardActions";
import { UIContext } from '../../context/ui';
import { useRouter } from 'next/router';
import { dateFunctions } from '@/utils'; 

interface Props {
  entry: Entry;
}

export const EntryCard:FC<Props> = ({entry}) => {
  const { setIsDragging } = useContext(UIContext);
  const router = useRouter();
  
  const onDragStart = (event: DragEvent) => {
    event.dataTransfer.setData('text', entry._id);
    setIsDragging(true);
  }

  const onDragEnd = () => {
    setIsDragging(false);
  }

  const onClick = () => {
    router.push(`/entries/${entry._id}`);
  }
  
  return (
    <Card
      draggable
      sx={{ mb: 1 }}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={onClick}
    >
      <CardActionArea>
        <CardContent>
          <Typography whiteSpace={'pre-line'}>{entry.description}</Typography>
        </CardContent>

        <CardActions sx={{ display: 'flex', justifyContent: 'end', pr: 2 }}>
          <Typography variant="body2">{dateFunctions.getFormatDistanceToNow(entry.createdAt)}</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  )
}
