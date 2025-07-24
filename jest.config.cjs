module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest"
  },
  moduleFileExtensions: ["js", "jsx"],
  moduleNameMapper: {
    // Ignora CSS e outros arquivos estáticos
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|svg)$": "<rootDir>/__mocks__/fileMock.js"
  }
};
