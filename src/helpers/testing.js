export function mockCR(mock) {
  mock.mockClear();
  mock.mockRestore();
  return mock;
}

export default mockCR;
