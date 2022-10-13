import {Typography} from '@mui/material'
import {Box} from '@mui/system'

export const Content = ({isSearchApplied, reposList, children}) => {
  const renderWithBox = callback => (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height={400}
    >
      {callback}
    </Box>
  )

  if (isSearchApplied && !!reposList.length) {
    return children
  }

  if (isSearchApplied && !reposList.length) {
    return renderWithBox(<Typography>You search has no results</Typography>)
  }

  return renderWithBox(
    <Typography>
      Please provide a search option and click in the search button
    </Typography>,
  )
}

export default Content
