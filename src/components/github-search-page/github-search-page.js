import {Box, Button, Grid, TextField, Typography} from '@mui/material'
import {Container} from '@mui/system'
import {useCallback, useEffect, useRef, useState} from 'react'
import Content from '../content'
import {getRepos} from '../../services'

export const GithubSearchPage = () => {
  const [isSearching, setIsSearching] = useState(false)
  const [isSearchApplied, setIsSearchApplied] = useState(false)
  const [reposList, setReposList] = useState([])
  const [searchBy, setSearchBy] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(30)

  const didMount = useRef(false)

  const handleSearch = useCallback(async () => {
    setIsSearching(true)
    const response = await getRepos({q: searchBy, rowsPerPage})
    const data = await response.json()
    setReposList(data.items)
    setIsSearchApplied(true)
    setIsSearching(false)
  }, [rowsPerPage, searchBy])

  const handleChange = ({target: {value}}) => setSearchBy(value)

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true
      return
    }

    handleSearch()
  }, [handleSearch, rowsPerPage])

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h3" component="h1">
          Github repositories list
        </Typography>
      </Box>

      <Grid container spacing={2} justifyContent="space-between">
        <Grid item md={6} xs={12}>
          <TextField
            value={searchBy}
            onChange={handleChange}
            fullWidth
            label="Filter by"
            id="filterBy"
          />
        </Grid>

        <Grid item md={3} xs={12}>
          <Button
            disabled={isSearching}
            fullWidth
            color="primary"
            variant="contained"
            onClick={handleSearch}
          >
            Search
          </Button>
        </Grid>
      </Grid>

      <Box my={4}>
        <Content
          isSearchApplied={isSearchApplied}
          reposList={reposList}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
        />
      </Box>
    </Container>
  )
}

export default GithubSearchPage
