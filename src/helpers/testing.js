export function mockCR(mock) {
  mock.mockClear()
  mock.mockRestore();
  return mock;
}