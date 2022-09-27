import {render, screen} from '@testing-library/react'
import {GithubSearchPage} from './github-search-page'

describe('when the GithubSearchPage is mounted', () => {
  beforeEach(() => render(<GithubSearchPage />))

  test('must display the title', () => {
    expect(
      screen.getByRole('heading', {name: /github repositories list/i}),
    ).toBeInTheDocument()
  })

  test('must be an input text with label "filter by" field', () => {
    expect(screen.getByLabelText(/filter by/i)).toBeInTheDocument()
  })

  test('must be a Search Button', () => {
    expect(screen.getByRole('button', {name: /search/i})).toBeInTheDocument()
  })
})
