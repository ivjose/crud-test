import '@testing-library/jest-dom'
// src/setupTests.js
import { server } from './mocks/server'
import { queryClient } from './test-utils/testing-library-utils'

// Establish API mocking before all tests.
beforeAll(() => server.listen())

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
  server.resetHandlers()
  queryClient.clear()
})

// Clean up after the tests are finished.
afterAll(() => server.close())
