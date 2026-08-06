module.exports = {
  dependencies: {
    // toastify-react-native depends on the legacy "react-native-vector-icons"
    // package, which ships its own Ionicons.ttf under the same font family
    // name as @react-native-vector-icons/ionicons but with different glyph
    // codepoints. Having both native modules linked makes iOS register the
    // wrong "Ionicons" font, so icons render blank/wrong. Skip native
    // autolinking for the legacy package — the JS import toastify uses still
    // resolves fine without it.
    'react-native-vector-icons': {
      platforms: {
        ios: null,
        android: null,
      },
    },
  },
};
