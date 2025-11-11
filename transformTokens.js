import StyleDictionary from 'style-dictionary'
import deepMerge from "deepmerge"
import webConfig from './src/web/index.js'
import androidConfig from "./src/android/index.js"

StyleDictionary.registerTransform({
  name: 'size/px',
  type: 'value',
  filter: token => {
    return (token.unit === 'pixel' || token.type === 'dimension') && token.value !== 0
  },
  transform: token => {
    return `${token.value}px`
  }
})

StyleDictionary.registerTransform({
  name: 'size/percent',
  type: 'value',
  filter: token => {
    return token.unit === 'percent' && token.value !== 0
  },
  transform: token => {
    return `${token.value}%`
  }
})

StyleDictionary.registerFilter({
  name: 'validToken',
  filter: function(token) {
    return [
      "dimension",
      "string",
      "number",
      "color",
      "custom-spacing",
      "custom-gradient",
      "custom-fontStyle",
      "custom-radius",
      "custom-shadow",
    ].includes(token.type);
  }
})

const StyleDictionaryExtended = new StyleDictionary({
  ...deepMerge.all([androidConfig, webConfig]),
  source: ["tokens/*.json"],
  platforms: {
    scss: {
      transformGroup: "scss",
      buildPath: "build/scss/",
      files: [
        {
          destination: "_variables.scss",
          format: "scss/variables",
          filter: "validToken",
        },
      ],
    },
    css: {
      transformGroup: "css",
      buildPath: "build/css/",
      files: [
        {
          destination: "_variables.css",
          format: "css/variables",
          filter: "validToken",
          options: {
            showFileHeader: false,
          },
        },
      ],
    },
    "json-flat": {
      transformGroup: "js",
      buildPath: "build/json/",
      files: [
        {
          destination: "styles.json",
          format: "json/flat",
          filter: "validToken",
        },
      ],
    },
    ios: {
      transformGroup: "ios",
      buildPath: "build/ios/",
      files: [
        {
          destination: "StyleDictionaryColor.h",
          format: "ios/colors.h",
          className: "StyleDictionaryColor",
          type: "StyleDictionaryColorName",
          filter: {
            type: "color",
          },
        },
        {
          destination: "StyleDictionaryColor.m",
          format: "ios/colors.m",
          className: "StyleDictionaryColor",
          type: "StyleDictionaryColorName",
          filter: {
            type: "color",
          },
        },
        {
          destination: "StyleDictionarySize.h",
          format: "ios/static.h",
          className: "StyleDictionarySize",
          type: "float",
          filter: {
            type: "number",
          },
        },
        {
          destination: "StyleDictionarySize.m",
          format: "ios/static.m",
          className: "StyleDictionarySize",
          type: "float",
          filter: {
            type: "number",
          },
        },
      ],
    },

    "ios-swift-separate-enums": {
      transformGroup: "ios-swift-separate",
      buildPath: "build/ios-swift/",
      files: [
        {
          destination: "StyleDictionaryColor.swift",
          format: "ios-swift/enum.swift",
          className: "StyleDictionaryColor",
          filter: {
            type: "color",
          },
        },
        {
          destination: "StyleDictionarySize.swift",
          format: "ios-swift/enum.swift",
          className: "StyleDictionarySize",
          type: "float",
          filter: {
            type: "number",
          },
        },
      ],
    },

    "android": {
      "transformGroup": "android",
      "buildPath": "build/android/",
      "files": [
        {
          "destination": "font_dimens.xml",
          "format": "android/fontDimens"
        },
        {
          "destination": "colors.xml",
          "format": "android/colors"
        }
      ]
    },

    "compose": {
      "transformGroup": "compose",
      "buildPath": "build/compose/",
      "files": [
        {
          "destination": "StyleDictionaryColor.kt",
          "format": "compose/object",
          "options": {
            "className": "StyleDictionaryColor",
            "packageName": "StyleDictionaryColor"
          },
          "filter": {
            type: "color"
          }
        },
        {
          "destination": "StyleDictionarySize.kt",
          "format": "compose/object",
          "options": {
            "className": "StyleDictionarySize",
            "packageName": "StyleDictionarySize",
            "type": "float"
          },
          "filter": {
            type: "dimension"
          }
        }
      ]
    }

  },
});
console.log('StyleDictionaryExtended', StyleDictionaryExtended)


StyleDictionaryExtended.buildAllPlatforms()
