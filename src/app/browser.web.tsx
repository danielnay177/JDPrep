import { useLocalSearchParams } from 'expo-router';
import { createElement, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { palette } from '@/constants/theme';

function getSafeUrl(value?: string) {
  if (!value) return null;

  try {
    const parsed = new URL(value);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:' ? parsed.toString() : null;
  } catch {
    return null;
  }
}

export default function BrowserScreen() {
  const params = useLocalSearchParams<{ url?: string; title?: string }>();
  const url = useMemo(() => getSafeUrl(params.url), [params.url]);

  if (!url) {
    return <View style={styles.message}><Text style={styles.title}>This link can’t be opened</Text><Text style={styles.body}>The address is missing or is not a supported web link.</Text></View>;
  }

  return (
    <View style={styles.container}>
      {createElement('iframe', {
        src: url,
        title: params.title ?? 'Web page',
        allow: 'autoplay; encrypted-media; picture-in-picture; fullscreen',
        allowFullScreen: true,
        referrerPolicy: 'strict-origin-when-cross-origin',
        style: { width: '100%', height: '100%', border: 0, backgroundColor: '#FFFFFF', colorScheme: 'light' },
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  message: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 28, backgroundColor: palette.canvas },
  title: { color: palette.ink, fontSize: 20, fontWeight: '800', textAlign: 'center' },
  body: { color: palette.inkMuted, fontSize: 14, lineHeight: 20, textAlign: 'center', marginTop: 8 },
});
