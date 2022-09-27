import {fireEvent, render, screen, waitFor} from '@testing-library/react'
import {GithubSearchPage} from './github-search-page'

beforeEach(() => render(<GithubSearchPage />))

describe('when the GithubSearchPage is mounted', () => {
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

  test("must be a initial message 'Please provide a search option and click in the search button'", () => {
    expect(
      screen.getByText(
        /please provide a search option and click in the search button/i,
      ),
    ).toBeInTheDocument()
  })
})

describe('when the developer does a search', () => {
  test('the search button should be disabled until the search is done', async () => {
    expect(screen.getByRole('button', {name: /search/i})).not.toBeDisabled()

    fireEvent.click(screen.getByRole('button', {name: /search/i}))

    expect(screen.getByRole('button', {name: /search/i})).toBeDisabled()

    await waitFor(() =>
      expect(screen.getByRole('button', {name: /search/i})).not.toBeDisabled(),
    )
  })

  test('the data should be displayed as a sticky table', async () => {
    fireEvent.click(screen.getByRole('button', {name: /search/i}))

    await waitFor(() =>
      expect(
        screen.queryByText(
          /please provide a search option and click in the search button/i,
        ),
      ).not.toBeInTheDocument(),
    )

    expect(screen.getByRole('table')).toBeInTheDocument()
  })
})
