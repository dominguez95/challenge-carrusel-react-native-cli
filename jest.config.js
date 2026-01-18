module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|react-redux|redux-persist|@react-navigation|react-native-safe-area-context|react-native-screens|react-native-gesture-handler|@reduxjs/toolkit|immer|@react-native-async-storage)/)',
  ],
};
