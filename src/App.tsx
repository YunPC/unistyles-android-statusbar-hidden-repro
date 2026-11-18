// Minimal repro: rt.insets.top stays at the status bar height while the status bar
// is hidden by React Native's StatusBar on Android <= 10 (API < 30).
//
// Requirements
// - Android 10 or lower device/emulator (verified on Samsung Galaxy A8 2018, Android 9 / API 28)
// - edgeToEdgeEnabled=true in android/gradle.properties (RN's StatusBar then hides via
//   WindowInsetsControllerCompat, which sets SYSTEM_UI_FLAG_FULLSCREEN below API 30)
// - react-native-unistyles 3.8.2
import { useState } from 'react';
import { Pressable, StatusBar, Text, View } from 'react-native';
import { StyleSheet, UnistylesRuntime, useUnistyles } from 'react-native-unistyles';

export default function App() {
  const { rt } = useUnistyles();
  const [rnHidden, setRnHidden] = useState(false);
  const [uniHidden, setUniHidden] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar hidden={rnHidden} />
      {/* Red bar = rt.insets.top. It should disappear whenever the status bar is hidden. */}
      <View style={styles.topInset} />
      <Text style={styles.label}>rt.insets.top: {rt.insets.top}</Text>
      <Text style={styles.label}>
        RN StatusBar hidden: {String(rnHidden)} / Unistyles statusBar hidden: {String(uniHidden)}
      </Text>

      <Pressable style={styles.button} onPress={() => setRnHidden((v) => !v)}>
        <Text>Toggle RN StatusBar (bug: red bar stays)</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => {
          UnistylesRuntime.statusBar.setHidden(!uniHidden);
          setUniHidden(!uniHidden);
        }}
      >
        <Text>Toggle UnistylesRuntime.statusBar (works)</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create((_theme, rt) => ({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  topInset: {
    height: rt.insets.top,
    backgroundColor: 'red',
  },
  label: {
    padding: 12,
    color: 'black',
  },
  button: {
    margin: 12,
    padding: 12,
    backgroundColor: '#ddd',
  },
}));
