import {Button, TextField, Typography} from '@mui/material'

export const GithubSearchPage = () => (
  <>
    <Typography variant="h3" component="h1">
      Github repositories list
    </Typography>

    <TextField label="Filter by" id="filterBy" />

    <Button>Search</Button>
  </>
)

export default GithubSearchPage
