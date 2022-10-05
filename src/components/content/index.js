import {
  Avatar,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material'
import {Box} from '@mui/system'

const tableHeaders = [
  'Repository',
  'Stars',
  'Forks',
  'Open issues',
  'Updated at',
]

export const Content = ({isSearchApplied, reposList}) => {
  if (isSearchApplied && !!reposList.length) {
    return (
      <>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {tableHeaders.map(name => (
                  <TableCell key={name}>{name}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {reposList.map(
                ({
                  name,
                  id,
                  stargazers_count: stargazersCount,
                  forks_count: forksCount,
                  open_issues_count: openIssuesCount,
                  updated_at: updatedAt,
                  html_url: htmlUrl,
                  owner: {avatar_url: avatarUrl},
                }) => (
                  <TableRow key={id}>
                    <TableCell>
                      <Avatar alt={name} src={avatarUrl} />
                      <Link href={htmlUrl}>{name}</Link>
                    </TableCell>
                    <TableCell>{stargazersCount}</TableCell>
                    <TableCell>{forksCount}</TableCell>
                    <TableCell>{openIssuesCount}</TableCell>
                    <TableCell>{updatedAt}</TableCell>
                  </TableRow>
                ),
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[30, 50, 100]}
          component="div"
          count={1}
          rowsPerPage={30}
          page={0}
          onPageChange={() => {}}
          onRowsPerPageChange={() => {}}
        />
      </>
    )
  }

  if (isSearchApplied && !reposList.length) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height={400}
      >
        <Typography>You search has no results</Typography>
      </Box>
    )
  }

  return (
    <Typography>
      Please provide a search option and click in the search button
    </Typography>
  )
}

export default Content
