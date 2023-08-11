// module.exports = {
//   presets: ['module:metro-react-native-babel-preset'],
//   plugins: ['react-native-reanimated/plugin'],
//   plugins: [
//     ["module:react-native-dotenv", {
//       "moduleName": "@env",
//       "path": ".env",
//     }]
//   ]
// };



module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    "react-native-reanimated/plugin",
    ["module:react-native-dotenv", {
      envName: "APP_ENV",
      moduleName: "@env",
      path: ".env",
    }]
  ]
}
