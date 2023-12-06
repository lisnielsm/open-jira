import { Layout } from "@/components/layouts";
import { EntryList } from "@/components/ui";
import { Card, CardHeader, Grid } from "@mui/material";
import { NewEntry } from '../components/ui/NewEntry';

export default function HomePage() {
  return (
    <Layout title="Home - OpenJira">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "calc(100vh - 84px)"}}>
            <CardHeader title="Pendientes" />

            <NewEntry />

            <EntryList status="pending" />
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "calc(100vh - 84px)"}}>
            <CardHeader title="En Progreso" />

            <EntryList status="in-progress" />
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "calc(100vh - 84px)"}}>
            <CardHeader title="Completadas" />

            <EntryList status="finished" />
          </Card>
        </Grid>
      </Grid>
    </Layout>
  )
}
