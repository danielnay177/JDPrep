import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Icon } from '@/components/ui';
import { palette, shadow } from '@/constants/theme';
import { useAuth } from '@/contexts/auth-context';

const rows = [
  ['Target cycle', 'Fall 2027', 'calendar'], ['Saved schools', '5 programs', 'bookmark'], ['Saved events', '1 upcoming', 'bell'], ['Application preferences', 'Tests, formats & regions', 'slider.horizontal.3'],
];

export default function ProfileScreen() {
  const { user, logOut } = useAuth();
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} contentInsetAdjustmentBehavior="automatic">
      <View style={styles.profile}><View style={styles.avatar}><Text style={styles.avatarText}>{user?.isAnonymous ? 'G' : (user?.email?.slice(0, 2).toUpperCase() ?? 'JD')}</Text></View><Text style={styles.name}>{user?.isAnonymous ? 'Guest account' : (user?.email ?? 'JDPrep member')}</Text><Text style={styles.email}>{user?.isAnonymous ? 'Signed in as a guest' : 'Signed in with email'}</Text><View style={styles.badge}><Icon ios="leaf.fill" android="eco" size={13} color={palette.green} /><Text style={styles.badgeText}>Building my application</Text></View></View>
      <View style={styles.progressCard}><View><Text style={styles.progressLabel}>OVERALL READINESS</Text><Text style={styles.progressTitle}>Your JD journey</Text><Text style={styles.progressBody}>Keep going—your foundation is taking shape.</Text></View><View style={styles.ring}><Text style={styles.ringText}>62%</Text></View></View>
      <Text style={styles.sectionTitle}>Planning</Text>
      <View style={styles.group}>{rows.map(([title, value, icon], i) => <Pressable key={title} style={[styles.row, i < rows.length - 1 && styles.rowBorder]}><View style={styles.rowIcon}><Icon ios={icon} android="settings" size={19} color={palette.green} /></View><View style={styles.rowText}><Text style={styles.rowTitle}>{title}</Text><Text style={styles.rowValue}>{value}</Text></View><Icon ios="chevron.right" android="chevron_right" size={15} color="#9CA7A2" /></Pressable>)}</View>
      <Text style={styles.sectionTitle}>Account</Text>
      <View style={styles.group}><Pressable style={[styles.row, styles.rowBorder]}><View style={styles.rowIcon}><Icon ios="gearshape" android="settings" size={19} color={palette.green} /></View><View style={styles.rowText}><Text style={styles.rowTitle}>Settings</Text><Text style={styles.rowValue}>Notifications, privacy & appearance</Text></View><Icon ios="chevron.right" android="chevron_right" size={15} color="#9CA7A2" /></Pressable><Pressable style={styles.row}><View style={styles.rowIcon}><Icon ios="questionmark.circle" android="help" size={19} color={palette.green} /></View><View style={styles.rowText}><Text style={styles.rowTitle}>Help & feedback</Text><Text style={styles.rowValue}>We’re here for you</Text></View><Icon ios="chevron.right" android="chevron_right" size={15} color="#9CA7A2" /></Pressable></View>
      <Text style={styles.footer}>JD Path · Prototype 1.0{`\n`}Not affiliated with the American Bar Association.</Text>
      <Pressable accessibilityRole="button" onPress={() => void logOut()} style={styles.signOut}><Text style={styles.signOutText}>Sign out</Text></Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: palette.canvas }, content: { paddingHorizontal: 20, paddingTop: 45, paddingBottom: 50 }, profile: { alignItems: 'center' }, avatar: { width: 82, height: 82, borderRadius: 41, backgroundColor: palette.deep, alignItems: 'center', justifyContent: 'center', ...shadow }, avatarText: { color: 'white', fontSize: 24, fontWeight: '900' }, name: { color: palette.ink, fontSize: 24, fontWeight: '800', marginTop: 14 }, email: { color: palette.inkMuted, fontSize: 13, marginTop: 4 }, badge: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: palette.mintSoft, borderRadius: 13, paddingHorizontal: 11, paddingVertical: 6, marginTop: 10 }, badgeText: { color: palette.green, fontSize: 10, fontWeight: '800' }, progressCard: { backgroundColor: palette.deep, borderRadius: 22, padding: 19, marginTop: 25, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', ...shadow }, progressLabel: { color: '#8AC7AC', fontSize: 9, fontWeight: '900', letterSpacing: 1 }, progressTitle: { color: 'white', fontSize: 19, fontWeight: '800', marginTop: 5 }, progressBody: { color: '#BCCBC5', fontSize: 11, marginTop: 5, maxWidth: 230 }, ring: { width: 58, height: 58, borderRadius: 29, borderWidth: 5, borderColor: '#79BE9E', borderTopColor: palette.gold, alignItems: 'center', justifyContent: 'center' }, ringText: { color: 'white', fontSize: 14, fontWeight: '900' }, sectionTitle: { color: palette.ink, fontSize: 17, fontWeight: '800', marginTop: 26, marginBottom: 11 }, group: { backgroundColor: palette.surface, borderRadius: 19, paddingHorizontal: 15, borderWidth: 1, borderColor: palette.line }, row: { minHeight: 67, flexDirection: 'row', alignItems: 'center' }, rowBorder: { borderBottomWidth: 1, borderBottomColor: palette.line }, rowIcon: { width: 37, height: 37, borderRadius: 11, backgroundColor: palette.mintSoft, alignItems: 'center', justifyContent: 'center', marginRight: 12 }, rowText: { flex: 1 }, rowTitle: { color: palette.ink, fontSize: 13, fontWeight: '800' }, rowValue: { color: palette.inkMuted, fontSize: 10, marginTop: 3 }, footer: { textAlign: 'center', color: '#9AA49F', fontSize: 10, lineHeight: 16, marginTop: 30 }, signOut: { alignItems: 'center', padding: 14, marginTop: 8 }, signOutText: { color: palette.coral, fontSize: 14, fontWeight: '700' },
});
