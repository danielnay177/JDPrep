import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AppHeader, Icon, Screen, SectionHeader } from '@/components/ui';
import { palette, shadow } from '@/constants/theme';
import { preparationItems } from '@/data/content';

export default function PrepareScreen() {
  return (
    <Screen>
      <AppHeader eyebrow="Application workspace" title="Prepare" subtitle="Everything you need, organized into a clear path." />
      <View style={styles.overview}>
        <View><Text style={styles.overviewLabel}>APPLICATION READINESS</Text><Text style={styles.overviewTitle}>5 areas in progress</Text></View>
        <View style={styles.score}><Text style={styles.scoreText}>62%</Text></View>
      </View>
      <SectionHeader title="Your application toolkit" action="8 areas" />
      <View style={styles.grid}>
        {preparationItems.map((item) => (
          <Pressable key={item.title} style={({ pressed }) => [styles.card, pressed && { opacity: 0.75, transform: [{ scale: 0.98 }] }]}>
            <View style={[styles.iconBox, { backgroundColor: `${item.color}18` }]}><Icon ios={item.icon} android={item.md} color={item.color} size={24} /></View>
            <Text style={styles.cardTitle}>{item.title}</Text><Text style={styles.cardSubtitle}>{item.subtitle}</Text>
            <View style={styles.progressRow}><View style={styles.track}><View style={[styles.fill, { width: `${item.progress}%`, backgroundColor: item.color }]} /></View><Text style={styles.percent}>{item.progress}%</Text></View>
          </Pressable>
        ))}
      </View>
      <View style={styles.planCard}>
        <View style={styles.planIcon}><Icon ios="wand.and.stars" android="auto_awesome" color={palette.gold} /></View>
        <View style={styles.planText}><Text style={styles.planTitle}>Build a stronger weekly plan</Text><Text style={styles.planBody}>Choose your target application date and we’ll help sequence the work.</Text></View>
        <Icon ios="chevron.right" android="chevron_right" size={16} color={palette.gold} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  overview: { backgroundColor: palette.deep, borderRadius: 22, padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', ...shadow }, overviewLabel: { color: '#82BFA5', fontSize: 10, fontWeight: '800', letterSpacing: 1 }, overviewTitle: { color: 'white', fontSize: 20, fontWeight: '800', marginTop: 5 }, score: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#2D715B', borderWidth: 4, borderColor: '#73BA9A', alignItems: 'center', justifyContent: 'center' }, scoreText: { color: 'white', fontSize: 15, fontWeight: '900' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 }, card: { width: '48%', flexGrow: 1, maxWidth: '49%', minHeight: 176, padding: 15, borderRadius: 20, backgroundColor: palette.surface, borderWidth: 1, borderColor: palette.line, ...shadow }, iconBox: { width: 43, height: 43, borderRadius: 13, alignItems: 'center', justifyContent: 'center', marginBottom: 13 }, cardTitle: { color: palette.ink, fontSize: 14, lineHeight: 18, fontWeight: '800' }, cardSubtitle: { color: palette.inkMuted, fontSize: 11, marginTop: 4 }, progressRow: { position: 'absolute', left: 15, right: 15, bottom: 15, flexDirection: 'row', alignItems: 'center', gap: 8 }, track: { flex: 1, height: 5, borderRadius: 3, backgroundColor: '#303A35', overflow: 'hidden' }, fill: { height: 5, borderRadius: 3 }, percent: { color: palette.inkMuted, fontSize: 9, fontWeight: '700' },
  planCard: { flexDirection: 'row', alignItems: 'center', marginTop: 18, padding: 16, backgroundColor: palette.goldSoft, borderRadius: 18, borderWidth: 1, borderColor: '#665126' }, planIcon: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#51401C', justifyContent: 'center', alignItems: 'center', marginRight: 12 }, planText: { flex: 1 }, planTitle: { color: palette.ink, fontWeight: '800', fontSize: 14 }, planBody: { color: '#E8DDBF', fontSize: 11, lineHeight: 16, marginTop: 3 },
});
