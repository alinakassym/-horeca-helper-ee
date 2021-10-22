module.exports = {
  root: true,
  extends: ['plugin:react-hooks/recommended', '@react-native-community'],
  env: {
    'react-native/react-native': true,
  },
  plugins: ['react', 'react-native'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
};
