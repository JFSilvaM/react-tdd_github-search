import {Button, Grid, TextField, Typography} from '@mui/material'
import {Container} from '@mui/system'

export const GithubSearchPage = () => (
  <Container>
    <Typography variant="h3" component="h1">
      Github repositories list
    </Typography>

    <Grid container spacing={2} justifyContent="space-between">
      <Grid item md={6} xs={12}>
        <TextField fullWidth label="Filter by" id="filterBy" />
      </Grid>

      <Grid item md={3} xs={12}>
        <Button fullWidth color="primary" variant="contained">
          Search
        </Button>
      </Grid>
    </Grid>
  </Container>
)

export default GithubSearchPage
