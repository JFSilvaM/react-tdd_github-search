import {
  Avatar,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import {Box} from '@mui/system'

export const Content = ({isSearchApplied}) =>
  isSearchApplied ? (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Repository</TableCell>
            <TableCell>Stars</TableCell>
            <TableCell>Forks</TableCell>
            <TableCell>Open issues</TableCell>
            <TableCell>Updated at</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <Avatar alt="test" src="/logo192.png" />
              <Link href="http://localhost:3000/test">Test</Link>
            </TableCell>
            <TableCell>10</TableCell>
            <TableCell>5</TableCell>
            <TableCell>2</TableCell>
            <TableCell>03-10-2022</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height={400}
    >
      <Typography>
        Please provide a search option and click in the search button
      </Typography>
    </Box>
  )

export default Content
