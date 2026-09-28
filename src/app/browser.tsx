import { router, Stack, useFocusEffect, useLocalSearchParams, useNavigation } from 'expo-router';
import * as Application from 'expo-application';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Appearance, BackHandler, Pressable, StyleSheet, Text, View } from 'react-native';
import { WebView, type WebViewNavigation } from 'react-native-webview';

import { Icon } from '@/components/ui';
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
  const navigation = useNavigation();
  const webViewRef = useRef<WebView>(null);
  const url = useMemo(() => getSafeUrl(params.url), [params.url]);
  const isYouTubeEmbed = url ? new URL(url).hostname === 'www.youtube.com' && new URL(url).pathname.startsWith('/embed/') : false;
  const source = url && isYouTubeEmbed && Application.applicationId
    ? { uri: url, headers: { Referer: `https://${Application.applicationId.toLowerCase()}` } }
    : { uri: url ?? '' };
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [canGoBack, setCanGoBack] = useState(false);

  useFocusEffect(useCallback(() => {
    // WKWebView and Android WebView use the host app's color scheme for
    // prefers-color-scheme. Expo Go can inherit the device's dark appearance
    // even when this project is configured for light mode.
    Appearance.setColorScheme('light');

    return () => Appearance.setColorScheme('unspecified');
  }, []));

  const goBack = useCallback(() => {
    if (canGoBack) {
      webViewRef.current?.goBack();
      return;
    }

    router.back();
  }, [canGoBack]);

  useEffect(() => {
    const removeListener = navigation.addListener('beforeRemove', (event) => {
      if (!canGoBack) return;

      event.preventDefault();
      webViewRef.current?.goBack();
    });

    const hardwareBackListener = BackHandler.addEventListener('hardwareBackPress', () => {
      if (!canGoBack) return false;

      webViewRef.current?.goBack();
      return true;
    });

    return () => {
      removeListener();
      hardwareBackListener.remove();
    };
  }, [canGoBack, navigation]);

  const handleNavigationChange = useCallback((state: WebViewNavigation) => {
    setCanGoBack(state.canGoBack);
  }, []);

  if (!url) {
    return <View style={styles.message}><Text style={styles.title}>This link can’t be opened</Text><Text style={styles.body}>The address is missing or is not a supported web link.</Text></View>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={canGoBack ? 'Go back to the previous web page' : 'Close web page'}
              hitSlop={12}
              onPress={goBack}
              style={({ pressed }) => [styles.backButton, pressed && styles.backButtonPressed]}>
              <Icon ios="chevron.left" android="arrow_back" size={22} color={palette.ink} />
            </Pressable>
          ),
        }}
      />
      <WebView
        ref={webViewRef}
        source={source}
        style={styles.webview}
        allowsInlineMediaPlayback
        allowsFullscreenVideo
        mediaPlaybackRequiresUserAction={!isYouTubeEmbed}
        javaScriptEnabled
        domStorageEnabled
        forceDarkOn={false}
        onNavigationStateChange={handleNavigationChange}
        onLoadStart={() => { setLoading(true); setFailed(false); }}
        onLoadEnd={() => setLoading(false)}
        onError={() => { setLoading(false); setFailed(true); }}
        onHttpError={() => { setLoading(false); setFailed(true); }}
        startInLoadingState
        renderLoading={() => <View style={styles.loading}><ActivityIndicator color={palette.green} size="large" /></View>}
      />
      {loading ? <View style={styles.progress}><View style={styles.progressBar} /></View> : null}
      {failed ? <View style={styles.errorBanner}><Text style={styles.errorText}>This page may be temporarily unavailable.</Text></View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  // External sites may leave parts of the document transparent. Keep the
  // native WebView fallback white so black site text never sits on our dark app canvas.
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  webview: { flex: 1, backgroundColor: '#FFFFFF' },
  loading: { position: 'absolute', inset: 0, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF' },
  progress: { position: 'absolute', left: 0, right: 0, top: 0, height: 3, backgroundColor: palette.mintSoft },
  progressBar: { width: '58%', height: 3, borderRadius: 2, backgroundColor: palette.green },
  errorBanner: { position: 'absolute', left: 14, right: 14, bottom: 14, padding: 12, borderRadius: 12, backgroundColor: palette.deep },
  errorText: { color: 'white', textAlign: 'center', fontSize: 12, fontWeight: '700' },
  backButton: { width: 36, height: 36, alignItems: 'flex-start', justifyContent: 'center' },
  backButtonPressed: { opacity: 0.55 },
  message: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 28, backgroundColor: palette.canvas },
  title: { color: palette.ink, fontSize: 20, fontWeight: '800', textAlign: 'center' },
  body: { color: palette.inkMuted, fontSize: 14, lineHeight: 20, textAlign: 'center', marginTop: 8 },
});
