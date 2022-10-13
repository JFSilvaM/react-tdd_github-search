import {
  Avatar,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'

const tableHeaders = [
  'Repository',
  'Stars',
  'Forks',
  'Open issues',
  'Updated at',
]

export const GithubTable = ({reposList}) => (
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
)

export default {GithubTable}
