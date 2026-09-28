import { SymbolView } from 'expo-symbols';
import { router } from 'expo-router';
import { ReactNode } from 'react';
import { Pressable, ScrollView, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { palette, shadow } from '@/constants/theme';
import type { School } from '@/data/content';

export function Icon({ ios, android, size = 22, color = palette.ink }: { ios: string; android?: string; size?: number; color?: string }) {
  return <SymbolView name={{ ios, android: android ?? 'circle', web: android ?? 'circle' } as never} size={size} tintColor={color} />;
}

export function Screen({ children, scroll = true, style }: { children: ReactNode; scroll?: boolean; style?: StyleProp<ViewStyle> }) {
  const content = scroll ? (
    <ScrollView contentInsetAdjustmentBehavior="automatic" showsVerticalScrollIndicator={false} contentContainerStyle={[styles.scrollContent, style]}>{children}</ScrollView>
  ) : <View style={[styles.flex, style]}>{children}</View>;
  return <SafeAreaView edges={['top']} style={styles.screen}>{content}</SafeAreaView>;
}

export function AppHeader({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <View style={styles.header}>
      <View style={styles.headerText}>
        {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      <Pressable accessibilityRole="button" accessibilityLabel="Open profile" onPress={() => router.push('/profile')} style={({ pressed }) => [styles.avatar, pressed && styles.pressed]}>
        <Text style={styles.avatarText}>NT</Text>
        <View style={styles.avatarDot} />
      </Pressable>
    </View>
  );
}

export function SectionHeader({ title, action, onPress }: { title: string; action?: string; onPress?: () => void }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {action ? <Pressable onPress={onPress}><Text style={styles.action}>{action}</Text></Pressable> : null}
    </View>
  );
}

export function Chip({ label, selected, onPress }: { label: string; selected?: boolean; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.chip, selected && styles.chipSelected, pressed && styles.pressed]}>
      <Text style={[styles.chipText, selected && styles.chipTextSelected]}>{label}</Text>
    </Pressable>
  );
}

export function SchoolCard({ school }: { school: School }) {
  return (
    <Pressable onPress={() => router.push({ pathname: '/school/[id]', params: { id: school.id, tab: 'Overview' } })} style={({ pressed }) => [styles.schoolCard, pressed && styles.cardPressed]}>
      <View style={[styles.schoolMark, { backgroundColor: school.color }]}><Text style={styles.schoolMarkText}>{school.initials}</Text></View>
      <View style={styles.schoolBody}>
        <Text style={styles.schoolName} numberOfLines={2}>{school.shortName}</Text>
        <View style={styles.metaRow}><Icon ios="mappin.and.ellipse" android="location_on" size={14} color={palette.inkMuted} /><Text style={styles.meta}>{school.location}</Text></View>
        <Text style={styles.schoolBlurb} numberOfLines={2}>{school.blurb}</Text>
        <View style={styles.tagRow}>
          {[...school.format.slice(0, 1), ...school.tests.slice(0, 1)].map((tag) => <View key={tag} style={styles.miniTag}><Text style={styles.miniTagText}>{tag}</Text></View>)}
        </View>
      </View>
      <Icon ios="chevron.right" android="chevron_right" size={17} color="#9AA7A1" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 }, screen: { flex: 1, backgroundColor: palette.canvas },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 118 },
  header: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', paddingTop: 12, paddingBottom: 22 },
  headerText: { flex: 1, paddingRight: 16 }, eyebrow: { color: palette.green, fontSize: 12, fontWeight: '800', letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 5 },
  title: { color: palette.ink, fontSize: 32, lineHeight: 37, fontWeight: '800', letterSpacing: -1.1 },
  subtitle: { color: palette.inkMuted, fontSize: 15, lineHeight: 21, marginTop: 6 },
  avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: palette.deep, alignItems: 'center', justifyContent: 'center', marginTop: 4, ...shadow },
  avatarText: { color: 'white', fontSize: 13, fontWeight: '800' }, avatarDot: { position: 'absolute', right: 0, bottom: 1, width: 11, height: 11, borderRadius: 6, backgroundColor: '#49B684', borderWidth: 2, borderColor: palette.canvas },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 27, marginBottom: 14 },
  sectionTitle: { color: palette.ink, fontSize: 20, fontWeight: '800', letterSpacing: -0.35 }, action: { color: palette.green, fontSize: 14, fontWeight: '700' },
  chip: { paddingHorizontal: 15, paddingVertical: 9, borderRadius: 20, backgroundColor: palette.surface, borderWidth: 1, borderColor: palette.line, marginRight: 8 },
  chipSelected: { backgroundColor: palette.deep, borderColor: palette.green }, chipText: { color: palette.inkMuted, fontSize: 13, fontWeight: '600' }, chipTextSelected: { color: 'white' },
  schoolCard: { backgroundColor: palette.surface, borderRadius: 18, padding: 13, flexDirection: 'row', alignItems: 'center', marginBottom: 10, borderWidth: 1, borderColor: palette.line, ...shadow },
  schoolMark: { width: 46, height: 46, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginRight: 11 }, schoolMarkText: { color: 'white', fontSize: 15, fontWeight: '900', letterSpacing: -0.4 },
  schoolBody: { flex: 1, paddingRight: 7 }, schoolName: { color: palette.ink, fontSize: 16, lineHeight: 20, fontWeight: '800' }, metaRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 }, meta: { color: palette.inkMuted, fontSize: 12 }, schoolBlurb: { color: palette.inkMuted, fontSize: 12, lineHeight: 17, marginTop: 7 },
  tagRow: { flexDirection: 'row', gap: 6, marginTop: 9 }, miniTag: { backgroundColor: palette.mintSoft, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 7 }, miniTagText: { color: palette.greenDark, fontSize: 10, fontWeight: '700' },
  pressed: { opacity: 0.7 }, cardPressed: { opacity: 0.82, transform: [{ scale: 0.99 }] },
});
