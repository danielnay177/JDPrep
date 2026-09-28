import { router } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuth } from '@/contexts/auth-context';
import { palette } from '@/constants/theme';

export default function SignInScreen() {
  const { continueAsGuest, signIn, signUp } = useAuth();
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isBusy, setIsBusy] = useState(false);

  async function run(action: () => Promise<void>) {
    setError('');
    setIsBusy(true);
    try {
      await action();
      router.replace('/(tabs)');
    } catch (reason) {
      const code = (reason as { code?: string })?.code;
      if (code === 'auth/invalid-credential' || code === 'auth/wrong-password' || code === 'auth/user-not-found') {
        setError('That email and password combination wasn’t recognized.');
      } else if (code === 'auth/email-already-in-use') {
        setError('An account already uses this email. Try signing in instead.');
      } else if (code === 'auth/weak-password') {
        setError('Choose a password with at least 6 characters.');
      } else if (code === 'auth/invalid-email') {
        setError('Enter a valid email address.');
      } else {
        setError('We couldn’t connect right now. Check your connection and try again.');
      }
    } finally {
      setIsBusy(false);
    }
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <View style={styles.brand}>
            <Image source={require('../../assets/images/jdprep-icon-generated.png')} style={styles.logo} />
            <Text style={styles.brandName}>JDPrep</Text>
            <Text style={styles.tagline}>Your next chapter starts here.</Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.title}>{isCreatingAccount ? 'Create your account' : 'Welcome back'}</Text>
            <Text style={styles.subtitle}>Plan your law school journey at your pace.</Text>
            <TextInput
              accessibilityLabel="Email address"
              autoCapitalize="none"
              autoComplete="email"
              keyboardType="email-address"
              placeholder="Email address"
              placeholderTextColor="#7F8B85"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              textContentType="emailAddress"
            />
            <TextInput
              accessibilityLabel="Password"
              autoCapitalize="none"
              autoComplete={isCreatingAccount ? 'new-password' : 'password'}
              placeholder="Password"
              placeholderTextColor="#7F8B85"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              textContentType={isCreatingAccount ? 'newPassword' : 'password'}
            />
            {error ? <Text accessibilityRole="alert" style={styles.error}>{error}</Text> : null}
            <Pressable disabled={isBusy || !email.trim() || !password} onPress={() => run(() => isCreatingAccount ? signUp(email, password) : signIn(email, password))} style={({ pressed }) => [styles.primary, pressed && styles.pressed, (isBusy || !email.trim() || !password) && styles.disabled]}>
              {isBusy ? <ActivityIndicator color="#062218" /> : <Text style={styles.primaryText}>{isCreatingAccount ? 'Create account' : 'Sign in'}</Text>}
            </Pressable>
            <Pressable disabled={isBusy} onPress={() => { setError(''); setIsCreatingAccount(!isCreatingAccount); }} style={styles.modeSwitch}>
              <Text style={styles.switchText}>{isCreatingAccount ? 'Already have an account? ' : 'New to JDPrep? '}<Text style={styles.switchLink}>{isCreatingAccount ? 'Sign in' : 'Create account'}</Text></Text>
            </Pressable>
            <View style={styles.divider}><View style={styles.rule} /><Text style={styles.or}>OR</Text><View style={styles.rule} /></View>
            <Pressable disabled={isBusy} onPress={() => run(continueAsGuest)} style={({ pressed }) => [styles.guest, pressed && styles.pressed, isBusy && styles.disabled]}>
              <Text style={styles.guestText}>Continue as guest</Text>
            </Pressable>
            <Text style={styles.footnote}>You can explore as a guest and create an account whenever you’re ready.</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 }, safe: { flex: 1, backgroundColor: palette.canvas }, content: { flexGrow: 1, justifyContent: 'center', padding: 24, paddingBottom: 36 },
  brand: { alignItems: 'center', marginBottom: 35 }, logo: { width: 90, height: 90, borderRadius: 24 }, brandName: { color: palette.ink, fontSize: 25, fontWeight: '800', letterSpacing: -0.5, marginTop: 12 }, tagline: { color: palette.inkMuted, fontSize: 14, marginTop: 4 },
  form: { width: '100%', maxWidth: 430, alignSelf: 'center' }, title: { color: palette.ink, fontSize: 27, fontWeight: '800', letterSpacing: -0.6 }, subtitle: { color: palette.inkMuted, fontSize: 14, marginTop: 6, marginBottom: 22 },
  input: { minHeight: 54, borderRadius: 15, paddingHorizontal: 16, color: palette.ink, backgroundColor: palette.surface, borderWidth: 1, borderColor: palette.line, marginBottom: 12, fontSize: 15 },
  primary: { minHeight: 54, borderRadius: 15, alignItems: 'center', justifyContent: 'center', backgroundColor: palette.green, marginTop: 5 }, primaryText: { color: '#062218', fontSize: 16, fontWeight: '800' }, disabled: { opacity: 0.55 }, pressed: { opacity: 0.8 },
  modeSwitch: { alignItems: 'center', paddingVertical: 16 }, switchText: { color: palette.inkMuted, fontSize: 13 }, switchLink: { color: palette.green, fontWeight: '800' },
  divider: { flexDirection: 'row', alignItems: 'center', gap: 12, marginVertical: 5 }, rule: { height: 1, flex: 1, backgroundColor: palette.line }, or: { color: '#85918B', fontSize: 11, fontWeight: '800', letterSpacing: 1 },
  guest: { minHeight: 54, borderRadius: 15, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#49675A', marginTop: 17 }, guestText: { color: palette.ink, fontSize: 15, fontWeight: '700' }, footnote: { textAlign: 'center', color: '#8F9A94', fontSize: 12, lineHeight: 18, paddingHorizontal: 12, marginTop: 14 }, error: { color: '#F6A090', fontSize: 13, marginBottom: 12, lineHeight: 18 },
});
