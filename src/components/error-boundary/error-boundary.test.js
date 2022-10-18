import {fireEvent, render, screen} from '@testing-library/react'
const {ErrorBoundary} = require('./error-boundary')

jest.spyOn(console, 'error')

const ThrowError = () => {
  throw new Error('ups')
}

describe('when the component works without errors', () => {
  test('must render the component content', () => {
    render(
      <ErrorBoundary>
        <h1>Test pass</h1>
      </ErrorBoundary>,
    )

    expect(screen.getByText(/test pass/i)).toBeInTheDocument()
  })
})

describe('when the component throws an error', () => {
  test('must render the message "There is an unexpected error" and a reload button', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>,
    )

    expect(
      screen.getByText(/there is an unexpected error/i),
    ).toBeInTheDocument()
    expect(screen.getByRole('button', {name: /reload/i})).toBeInTheDocument()
  })
})

describe('when the user clicks on reload button', () => {
  delete window.location

  window.location = {reload: jest.fn()}

  render(
    <ErrorBoundary>
      <ThrowError />
    </ErrorBoundary>,
  )

  fireEvent.click(screen.getByRole('button', {name: /reload/i}))

  expect(window.location.reload).toHaveBeenCalledTimes(1)
})
