const {
  compilerOptions
} = require('./tsconfig');
const {
  resolve
} = require('path');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageDirectory: "../coverage",
  rootDir: "src",
  testRegex: ".spec.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest"
  },
  moduleNameMapper: {
    "^@auth/(.*)$": resolve(__dirname, "./src/auth/$1"),
    "^@cart/(.*)$": resolve(__dirname, "./src/cart/$1"),
    "^@db/(.*)$": resolve(__dirname, "./src/db/$1"),
    "^@product/(.*)$": resolve(__dirname, "./src/product/$1"),
    "^@server/(.*)$": resolve(__dirname, "./src/server/$1"),
    "^@user/(.*)$": resolve(__dirname, "./src/user/$1"),
  },
  moduleFileExtensions: [
    "js",
    "json",
    "ts"
  ],
};