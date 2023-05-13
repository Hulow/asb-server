export const TEST_INPUT_PORT = Symbol.for('TestInputPort');

export interface TestInputPort {
  handle: () => string;
}
