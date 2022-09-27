import {Button, Grid, TextField, Typography} from '@mui/material'
import {Container} from '@mui/system'
import {useState} from 'react'

export const GithubSearchPage = () => {
  const [isSearching, setIsSearching] = useState(false)

  const handleClick = async () => {
    setIsSearching(true)
    await Promise.resolve()
    setIsSearching(false)
  }

  return (
    <Container>
      <Typography variant="h3" component="h1">
        Github repositories list
      </Typography>

      <Grid container spacing={2} justifyContent="space-between">
        <Grid item md={6} xs={12}>
          <TextField fullWidth label="Filter by" id="filterBy" />
        </Grid>

        <Grid item md={3} xs={12}>
          <Button
            disabled={isSearching}
            fullWidth
            color="primary"
            variant="contained"
            onClick={handleClick}
          >
            Search
          </Button>
        </Grid>
      </Grid>

      <Typography
        display="flex"
        alignItems="center"
        justifyContent="center"
        height={400}
      >
        Please provide a search option and click in the search button
      </Typography>
    </Container>
  )
}

export default GithubSearchPage
