import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react'
import {GithubSearchPage} from './github-search-page'
import {rest} from 'msw'
import {setupServer} from 'msw/node'

const fakeRepo = {
  id: '56757919',
  name: 'django-rest-framework-reactive',
  owner: {
    avatar_url: 'https://avatars0.githubusercontent.com/u/2120224?v=4',
  },
  html_url: 'https://github.com/genialis/django-rest-framework-reactive',
  updated_at: '03-10-2022',
  stargazers_count: 58,
  forks_count: 9,
  open_issues_count: 0,
}

const server = setupServer(
  rest.get('/search/repositories', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        total_count: 8643,
        incomplete_results: false,
        items: [fakeRepo],
      }),
    )
  }),
)

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())

beforeEach(() => render(<GithubSearchPage />))

const fireClickSearch = () =>
  fireEvent.click(screen.getByRole('button', {name: /search/i}))

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

    fireClickSearch()

    expect(screen.getByRole('button', {name: /search/i})).toBeDisabled()

    await waitFor(() =>
      expect(screen.getByRole('button', {name: /search/i})).not.toBeDisabled(),
    )
  })

  test('the data should be displayed as a sticky table', async () => {
    fireClickSearch()

    await waitFor(() =>
      expect(
        screen.queryByText(
          /please provide a search option and click in the search button/i,
        ),
      ).not.toBeInTheDocument(),
    )

    expect(screen.getByRole('table')).toBeInTheDocument()
  })

  test('the table header must contain: Repository, stars, forks, open issues and updated at', async () => {
    fireClickSearch()

    const table = await screen.findByRole('table')

    const tableHeaders = within(table).getAllByRole('columnheader')

    expect(tableHeaders).toHaveLength(5)

    const [repository, stars, forks, openIssues, updatedAt] = tableHeaders

    expect(repository).toHaveTextContent(/repository/i)
    expect(stars).toHaveTextContent(/stars/i)
    expect(forks).toHaveTextContent(/forks/i)
    expect(openIssues).toHaveTextContent(/open issues/i)
    expect(updatedAt).toHaveTextContent(/updated at/i)
  })

  test(`each table result must contain: owner avatar image, name, stars, updated at, forks, open issues,
  it should have a link that opens in a new tab`, async () => {
    fireClickSearch()

    const table = await screen.findByRole('table')

    const withinTable = within(table)

    const tableCells = withinTable.getAllByRole('cell')

    const [repository, stars, forks, openIssues, updatedAt] = tableCells

    const avatarImg = within(repository).getByRole('img', {name: fakeRepo.name})

    expect(avatarImg).toBeInTheDocument()

    expect(tableCells).toHaveLength(5)

    expect(repository).toHaveTextContent(fakeRepo.name)
    expect(stars).toHaveTextContent(fakeRepo.stargazers_count)
    expect(forks).toHaveTextContent(fakeRepo.forks_count)
    expect(openIssues).toHaveTextContent(fakeRepo.open_issues_count)
    expect(updatedAt).toHaveTextContent(fakeRepo.updated_at)

    expect(withinTable.getByText(fakeRepo.name).closest('a')).toHaveAttribute(
      'href',
      fakeRepo.html_url,
    )

    expect(avatarImg).toHaveAttribute('src', fakeRepo.owner.avatar_url)
  })

  test('must display the total results number of the search and the current number of results', async () => {
    fireClickSearch()

    await screen.findByRole('table')

    expect(screen.getByText(/1–1 of 1/)).toBeInTheDocument()
  })

  test('results size per page select/combobox with the options: 30, 50, 100. The default is 30', async () => {
    fireClickSearch()

    await screen.findByRole('table')

    expect(screen.getByLabelText(/rows per page/i)).toBeInTheDocument()

    fireEvent.mouseDown(screen.getByLabelText(/rows per page/i))

    const listbox = screen.getByRole('listbox', {mame: /rows per page/i})

    const options = within(listbox).getAllByRole('option')

    const [option30, option50, option100] = options

    expect(option30).toHaveTextContent(/30/)
    expect(option50).toHaveTextContent(/50/)
    expect(option100).toHaveTextContent(/100/)
  })

  test('must exists the next and previous pagination button', async () => {
    fireClickSearch()

    await screen.findByRole('table')

    const previousBtn = screen.getByRole('button', {name: /previous page/i})

    expect(previousBtn).toBeInTheDocument()

    expect(screen.getByRole('button', {name: /next page/i})).toBeInTheDocument()

    expect(previousBtn).toBeDisabled()
  })
})

describe('when the developer does a search without results', () => {
  test('must show a empty state message "You search has no results"', async () => {
    server.use(
      rest.get('/search/repositories', (req, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json({
            total_count: 0,
            incomplete_results: false,
            items: [],
          }),
        ),
      ),
    )

    fireClickSearch()

    await waitFor(() =>
      expect(
        screen.getByText(/you search has no results/i),
      ).toBeInTheDocument(),
    )

    expect(screen.queryByRole('table')).not.toBeInTheDocument()
  })
})
