import { router } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Alert, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { Icon } from '@/components/ui';
import { palette, shadow } from '@/constants/theme';
import { useAuth } from '@/contexts/auth-context';

const rows = [
  ['Target cycle', 'Fall 2027', 'calendar'], ['Saved schools', '5 programs', 'bookmark'], ['Saved events', '1 upcoming', 'bell'], ['Application preferences', 'Tests, formats & regions', 'slider.horizontal.3'],
];

export default function ProfileScreen() {
  const { user, logOut, updateDisplayName, deleteAccount } = useAuth();
  const [editing, setEditing] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName ?? '');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function saveProfile() {
    setBusy(true);
    setError('');
    try {
      await updateDisplayName(displayName);
      setEditing(false);
    } catch {
      setError('We couldn’t save your profile. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  function confirmDelete() {
    Alert.alert('Delete your account?', 'This permanently deletes your Firebase sign-in account. You will lose access to this account.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete account', style: 'destructive', onPress: () => {
        void deleteAccount().catch((reason: { code?: string }) => {
          Alert.alert('Could not delete account', reason?.code === 'auth/requires-recent-login'
            ? 'For your security, sign out and sign in again, then retry account deletion.'
            : 'Please try again when you have a connection.');
        });
      } },
    ]);
  }

  return (
    <>
      <ScrollView style={styles.screen} contentContainerStyle={styles.content} contentInsetAdjustmentBehavior="automatic">
        <View style={styles.profile}>
          <View style={styles.avatar}><Text style={styles.avatarText}>{user?.isAnonymous ? 'G' : (user?.displayName?.slice(0, 2).toUpperCase() ?? user?.email?.slice(0, 2).toUpperCase() ?? 'JD')}</Text></View>
          <Text style={styles.name}>{user?.displayName || (user?.isAnonymous ? 'Guest account' : 'JDPrep member')}</Text>
          <Text style={styles.email}>{user?.isAnonymous ? 'Signed in as a guest' : user?.email}</Text>
          <Pressable accessibilityRole="button" onPress={() => { setDisplayName(user?.displayName ?? ''); setError(''); setEditing(true); }} style={styles.editButton}><Text style={styles.editText}>Edit profile</Text></Pressable>
          <View style={styles.badge}><Icon ios="leaf.fill" android="eco" size={13} color={palette.green} /><Text style={styles.badgeText}>Building my application</Text></View>
        </View>
        <View style={styles.progressCard}><View><Text style={styles.progressLabel}>OVERALL READINESS</Text><Text style={styles.progressTitle}>Your JD journey</Text><Text style={styles.progressBody}>Keep going—your foundation is taking shape.</Text></View><View style={styles.ring}><Text style={styles.ringText}>62%</Text></View></View>
        <Text style={styles.sectionTitle}>Planning</Text>
        <View style={styles.group}>{rows.map(([title, value, icon], i) => <Pressable key={title} style={[styles.row, i < rows.length - 1 && styles.rowBorder]}><View style={styles.rowIcon}><Icon ios={icon} android="settings" size={19} color={palette.green} /></View><View style={styles.rowText}><Text style={styles.rowTitle}>{title}</Text><Text style={styles.rowValue}>{value}</Text></View><Icon ios="chevron.right" android="chevron_right" size={15} color="#9CA7A2" /></Pressable>)}</View>
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.group}>
          <Pressable style={[styles.row, styles.rowBorder]}><View style={styles.rowIcon}><Icon ios="gearshape" android="settings" size={19} color={palette.green} /></View><View style={styles.rowText}><Text style={styles.rowTitle}>Settings</Text><Text style={styles.rowValue}>Notifications, privacy & appearance</Text></View><Icon ios="chevron.right" android="chevron_right" size={15} color="#9CA7A2" /></Pressable>
          <Pressable style={styles.row}><View style={styles.rowIcon}><Icon ios="questionmark.circle" android="help" size={19} color={palette.green} /></View><View style={styles.rowText}><Text style={styles.rowTitle}>Help & feedback</Text><Text style={styles.rowValue}>We’re here for you</Text></View><Icon ios="chevron.right" android="chevron_right" size={15} color="#9CA7A2" /></Pressable>
        </View>
        <Text style={styles.sectionTitle}>Legal</Text>
        <View style={styles.group}>
          <Pressable onPress={() => router.push('/legal/terms')} style={[styles.row, styles.rowBorder]}><View style={styles.rowIcon}><Icon ios="doc.text" android="description" size={19} color={palette.green} /></View><View style={styles.rowText}><Text style={styles.rowTitle}>Terms of Service</Text></View><Icon ios="chevron.right" android="chevron_right" size={15} color="#9CA7A2" /></Pressable>
          <Pressable onPress={() => router.push('/legal/privacy')} style={styles.row}><View style={styles.rowIcon}><Icon ios="hand.raised" android="privacy_tip" size={19} color={palette.green} /></View><View style={styles.rowText}><Text style={styles.rowTitle}>Privacy Policy</Text></View><Icon ios="chevron.right" android="chevron_right" size={15} color="#9CA7A2" /></Pressable>
        </View>
        <Text style={styles.footer}>JDPrep · Prototype 1.0{`\n`}Not affiliated with the American Bar Association.</Text>
        <Pressable accessibilityRole="button" onPress={() => void logOut()} style={styles.signOut}><Text style={styles.signOutText}>Log out</Text></Pressable>
        <Pressable accessibilityRole="button" onPress={confirmDelete} style={styles.deleteButton}><Text style={styles.deleteText}>Delete account</Text></Pressable>
      </ScrollView>
      <Modal visible={editing} transparent animationType="fade" onRequestClose={() => setEditing(false)}>
        <View style={styles.modalShade}><View style={styles.modalCard}>
          <Text style={styles.modalTitle}>Edit profile</Text>
          <Text style={styles.modalLabel}>Display name</Text>
          <TextInput accessibilityLabel="Display name" autoCapitalize="words" placeholder="Your name" placeholderTextColor="#89958E" value={displayName} onChangeText={setDisplayName} style={styles.input} maxLength={80} />
          {user?.email ? <Text style={styles.modalHint}>Email: {user.email}{'\n'}Changing your sign-in email requires a separate verification flow.</Text> : null}
          {error ? <Text accessibilityRole="alert" style={styles.error}>{error}</Text> : null}
          <View style={styles.modalActions}>
            <Pressable accessibilityRole="button" disabled={busy} onPress={() => setEditing(false)} style={styles.cancel}><Text style={styles.cancelText}>Cancel</Text></Pressable>
            <Pressable accessibilityRole="button" disabled={busy || !displayName.trim()} onPress={() => void saveProfile()} style={[styles.save, (busy || !displayName.trim()) && styles.disabled]}>{busy ? <ActivityIndicator color="#062218" /> : <Text style={styles.saveText}>Save</Text>}</Pressable>
          </View>
        </View></View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: palette.canvas }, content: { paddingHorizontal: 20, paddingTop: 45, paddingBottom: 50 }, profile: { alignItems: 'center' }, avatar: { width: 82, height: 82, borderRadius: 41, backgroundColor: palette.deep, alignItems: 'center', justifyContent: 'center', ...shadow }, avatarText: { color: 'white', fontSize: 24, fontWeight: '900' }, name: { color: palette.ink, fontSize: 24, fontWeight: '800', marginTop: 14 }, email: { color: palette.inkMuted, fontSize: 13, marginTop: 4 }, editButton: { paddingVertical: 8, paddingHorizontal: 13 }, editText: { color: palette.green, fontSize: 13, fontWeight: '800' }, badge: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: palette.mintSoft, borderRadius: 13, paddingHorizontal: 11, paddingVertical: 6, marginTop: 3 }, badgeText: { color: palette.green, fontSize: 10, fontWeight: '800' }, progressCard: { backgroundColor: palette.deep, borderRadius: 22, padding: 19, marginTop: 25, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', ...shadow }, progressLabel: { color: '#8AC7AC', fontSize: 9, fontWeight: '900', letterSpacing: 1 }, progressTitle: { color: 'white', fontSize: 19, fontWeight: '800', marginTop: 5 }, progressBody: { color: '#BCCBC5', fontSize: 11, marginTop: 5, maxWidth: 230 }, ring: { width: 58, height: 58, borderRadius: 29, borderWidth: 5, borderColor: '#79BE9E', borderTopColor: palette.gold, alignItems: 'center', justifyContent: 'center' }, ringText: { color: 'white', fontSize: 14, fontWeight: '900' }, sectionTitle: { color: palette.ink, fontSize: 17, fontWeight: '800', marginTop: 26, marginBottom: 11 }, group: { backgroundColor: palette.surface, borderRadius: 19, paddingHorizontal: 15, borderWidth: 1, borderColor: palette.line }, row: { minHeight: 67, flexDirection: 'row', alignItems: 'center' }, rowBorder: { borderBottomWidth: 1, borderBottomColor: palette.line }, rowIcon: { width: 37, height: 37, borderRadius: 11, backgroundColor: palette.mintSoft, alignItems: 'center', justifyContent: 'center', marginRight: 12 }, rowText: { flex: 1 }, rowTitle: { color: palette.ink, fontSize: 13, fontWeight: '800' }, rowValue: { color: palette.inkMuted, fontSize: 10, marginTop: 3 }, footer: { textAlign: 'center', color: '#9AA49F', fontSize: 10, lineHeight: 16, marginTop: 30 }, signOut: { alignItems: 'center', padding: 14, marginTop: 8 }, signOutText: { color: palette.inkMuted, fontSize: 14, fontWeight: '700' }, deleteButton: { alignItems: 'center', padding: 13 }, deleteText: { color: palette.coral, fontSize: 13, fontWeight: '700' }, modalShade: { flex: 1, backgroundColor: '#00000099', alignItems: 'center', justifyContent: 'center', padding: 24 }, modalCard: { width: '100%', maxWidth: 430, borderRadius: 22, padding: 22, backgroundColor: palette.surface, borderWidth: 1, borderColor: palette.line }, modalTitle: { fontSize: 20, color: palette.ink, fontWeight: '800', marginBottom: 18 }, modalLabel: { fontSize: 12, color: palette.inkMuted, fontWeight: '700', marginBottom: 8 }, input: { minHeight: 50, borderRadius: 13, paddingHorizontal: 14, color: palette.ink, backgroundColor: palette.canvas, borderWidth: 1, borderColor: palette.line, fontSize: 15 }, modalHint: { color: palette.inkMuted, fontSize: 12, lineHeight: 18, marginTop: 12 }, modalActions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 10, marginTop: 22 }, cancel: { minWidth: 90, minHeight: 46, borderRadius: 13, alignItems: 'center', justifyContent: 'center' }, cancelText: { color: palette.inkMuted, fontWeight: '700' }, save: { minWidth: 90, minHeight: 46, borderRadius: 13, alignItems: 'center', justifyContent: 'center', backgroundColor: palette.green }, saveText: { color: '#062218', fontWeight: '800' }, disabled: { opacity: 0.55 }, error: { color: palette.coral, marginTop: 10, fontSize: 12 },
});
