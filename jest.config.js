const {defaults} = require('jest-config')
module.exports = {
  // ...
  roots: [
      "<rootDir>/pages"
    ],
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx', 'js', 'jsx'],
  // ...
  testEnvironment: 'jsdom',
  preset: 'ts-jest'
}