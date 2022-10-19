import ErrorBoundary from './components/error-boundary/error-boundary'
import {GithubSearchPage} from './components/github-search-page'

function App() {
  return (
    <ErrorBoundary>
      <GithubSearchPage />
    </ErrorBoundary>
  )
}

export default App
