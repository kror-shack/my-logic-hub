module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleNameMapper: {
    "^.+\\.(css|less|scss)$": "identity-obj-proxy",
    "\\.svg": "<rootDir>/src/__mocks__/fileMock.ts",
  },

  testRegex: "(/__tests__/.*|\\.(test|spec))\\.(js|jsx|ts|tsx)$",
  moduleFileExtensions: ["js", "json", "jsx", "ts", "tsx"],

  collectCoverage: true,
};
