import {
  Box,
  Button,
  Grid,
  TablePagination,
  TextField,
  Typography,
} from '@mui/material'
import {Container} from '@mui/system'
import {useCallback, useEffect, useRef, useState} from 'react'
import {getRepos} from '../../services'
import Content from '../content'
import {GithubTable} from '../github-table'

const ROWS_PER_PAGE_DEFAULT = 30
const INITIAL_CURRENT_PAGE = 0
const INITIAL_TOTAL_COUNT = 0

export const GithubSearchPage = () => {
  const [isSearching, setIsSearching] = useState(false)
  const [isSearchApplied, setIsSearchApplied] = useState(false)
  const [reposList, setReposList] = useState([])
  const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE_DEFAULT)
  const [currentPage, setCurrentPage] = useState(INITIAL_CURRENT_PAGE)
  const [totalCount, setTotalCount] = useState(INITIAL_TOTAL_COUNT)

  const didMount = useRef(false)
  const searchByInput = useRef(null)

  const handleSearch = useCallback(async () => {
    try {
      setIsSearching(true)
      const response = await getRepos({
        q: searchByInput.current.value,
        rowsPerPage,
        currentPage,
      })

      if (!response.ok) {
        throw response
      }

      const data = await response.json()

      setReposList(data.items)
      setTotalCount(data.total_count)
      setIsSearchApplied(true)
    } catch (err) {
      const data = await err.json()

      setIsOpen(true)
      setErrorMessage(data.message)
    } finally {
      setIsSearching(false)
    }
  }, [rowsPerPage, currentPage])

  const handleChangeRowsPerPage = ({target: {value}}) => setRowsPerPage(value)

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage)
  }

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
            inputRef={searchByInput}
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
        <Content isSearchApplied={isSearchApplied} reposList={reposList}>
          <>
            <GithubTable reposList={reposList} />

            <TablePagination
              rowsPerPageOptions={[30, 50, 100]}
              component="div"
              count={totalCount}
              rowsPerPage={rowsPerPage}
              page={currentPage}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        </Content>
      </Box>
    </Container>
  )
}

export default GithubSearchPage
