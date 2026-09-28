import { Redirect, Stack, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import { Animated, Easing, Image, StyleSheet, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';

import { AuthProvider, useAuth } from '@/contexts/auth-context';
import { palette } from '@/constants/theme';

void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return <AuthProvider><AppShell /></AuthProvider>;
}

function AppShell() {
  const { user, isReady } = useAuth();
  const segments = useSegments();
  const [showLaunch, setShowLaunch] = useState(true);
  const [fade] = useState(() => new Animated.Value(0));
  const [scale] = useState(() => new Animated.Value(0.94));

  useEffect(() => {
    if (!isReady) return;
    void SplashScreen.hideAsync();
    Animated.parallel([
      Animated.timing(fade, { toValue: 1, duration: 520, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.sequence([
        Animated.timing(scale, { toValue: 1.035, duration: 620, easing: Easing.out(Easing.back(1.2)), useNativeDriver: true }),
        Animated.timing(scale, { toValue: 1, duration: 260, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      ]),
    ]).start();
    const timer = setTimeout(() => {
      Animated.timing(fade, { toValue: 0, duration: 380, useNativeDriver: true }).start(() => setShowLaunch(false));
    }, 1050);
    return () => clearTimeout(timer);
  }, [isReady, fade, scale]);

  const inSignIn = segments[0] === 'sign-in';
  if (isReady && user && inSignIn) return <Redirect href="/(tabs)" />;
  if (isReady && !user && !inSignIn) return <Redirect href="/sign-in" />;

  return (
    <>
      <StatusBar style="light" />
      {!isReady ? null : <Stack
        screenOptions={{
          headerBackButtonDisplayMode: 'minimal',
          headerShadowVisible: false,
          headerTintColor: '#F3F6F4',
          headerTitleStyle: { fontWeight: '700', color: '#F3F6F4' },
          headerStyle: { backgroundColor: '#000000' },
          contentStyle: { backgroundColor: '#000000' },
        }}>
        <Stack.Screen name="sign-in" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="school/[id]" options={{ title: 'School profile', headerTransparent: true, headerBlurEffect: 'systemChromeMaterial' }} />
        <Stack.Screen name="connect/[id]" options={{ title: 'Connect profile', headerTransparent: true, headerBlurEffect: 'systemChromeMaterial' }} />
        <Stack.Screen name="resources/[id]" options={{ title: '', headerTransparent: true, headerBlurEffect: 'systemChromeMaterial' }} />
        <Stack.Screen name="browser" options={({ route }) => ({ title: typeof route.params === 'object' && route.params && 'title' in route.params && typeof route.params.title === 'string' ? route.params.title : 'Web page' })} />
        <Stack.Screen name="profile" options={{ title: 'Your profile', presentation: 'modal', headerTransparent: true, headerBlurEffect: 'systemChromeMaterial' }} />
      </Stack>}
      {showLaunch && isReady ? (
        <Animated.View pointerEvents="none" style={[styles.launch, { opacity: fade }]}>
          <Animated.View style={{ alignItems: 'center', transform: [{ scale }] }}>
            <Image source={require('../../assets/images/jdprep-icon-generated.png')} style={styles.launchIcon} />
            <Text style={styles.launchName}>JDPrep</Text>
          </Animated.View>
        </Animated.View>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  launch: { ...StyleSheet.absoluteFill, alignItems: 'center', justifyContent: 'center', backgroundColor: palette.canvas },
  launchIcon: { width: 104, height: 104, borderRadius: 27 },
  launchName: { color: palette.ink, fontSize: 21, fontWeight: '800', marginTop: 15, letterSpacing: -0.4 },
});
