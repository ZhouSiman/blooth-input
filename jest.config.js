/**
 * Jest 配置文件
 */
module.exports = {
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/*.test.js',
    '!src/**/index.js',
  ],
  testMatch: ['**/tests/**/*.test.js'],
  verbose: true,
};
