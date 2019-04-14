/**
 * Clears and restores the mock
 *
 * @param {Object} mock
 * @return {Object}
 */
export function mockCR(mock) {
  mock.mockClear();
  mock.mockRestore();
  return mock;
}

export default mockCR;
