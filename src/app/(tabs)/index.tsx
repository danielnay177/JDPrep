import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AppHeader, Icon, Screen, SectionHeader } from '@/components/ui';
import { palette, shadow } from '@/constants/theme';

const news = [
  { category: 'ADMISSIONS', title: 'Building your school list: reach, target, and foundation', time: '5 min read', color: palette.green, icon: 'building.columns' },
  { category: 'APPLICATIONS', title: 'What admissions readers look for in your résumé', time: '4 min read', color: palette.blue, icon: 'doc.text.magnifyingglass' },
  { category: 'ABA UPDATE', title: 'Understanding flexible JD program formats', time: '6 min read', color: palette.lavender, icon: 'sparkles.rectangle.stack' },
];

const discover = [
  { id: 'inspiration', eyebrow: 'WATCH · READ · LISTEN', title: 'Stories for the journey', description: 'Movies, shows, books, documentaries, and podcasts about law school, lawyers, purpose, and persistence.', count: '34 picks', color: palette.lavender, soft: '#30263E', icon: 'sparkles.tv.fill', androidIcon: 'auto_awesome' },
  { id: 'pathways', eyebrow: 'ADMISSION OPTIONS', title: 'Test-optional & JD-Next', description: 'Explore distinctive law-school pathways and check each school’s current policy at the official source.', count: '8 schools', color: palette.blue, soft: '#1E2A3E', icon: 'signpost.right.and.left.fill', androidIcon: 'alt_route' },
  { id: 'mentors', eyebrow: 'REAL GUIDANCE', title: 'Admissions mentors', description: 'Find public, reputable programs offering mentorship, admissions support, community, and preparation.', count: '8 programs', color: palette.green, soft: palette.mintSoft, icon: 'person.2.wave.2.fill', androidIcon: 'diversity_3' },
];

export default function HomeScreen() {
  return (
    <Screen>
      <AppHeader eyebrow="Tuesday, September 22" title="Good morning, Nay" subtitle="One focused step can move your application forward." />

      <View style={styles.hero}>
        <View style={styles.heroOrb}><Text style={styles.heroOrbText}>62%</Text></View>
        <View style={styles.heroContent}>
          <Text style={styles.heroKicker}>YOUR JD JOURNEY</Text>
          <Text style={styles.heroTitle}>You’re building momentum.</Text>
          <Text style={styles.heroBody}>5 of 8 preparation areas are underway.</Text>
          <Pressable onPress={() => router.push('/prepare')} style={styles.heroButton}>
            <Text style={styles.heroButtonText}>Continue preparing</Text><Icon ios="arrow.right" android="arrow_forward" size={15} color="white" />
          </Pressable>
        </View>
      </View>

      <View style={styles.tipCard}>
        <View style={styles.tipIcon}><Icon ios="lightbulb.fill" android="lightbulb" size={21} color={palette.gold} /></View>
        <View style={styles.tipText}><Text style={styles.tipLabel}>TODAY’S ADMISSION TIP</Text><Text style={styles.tipBody}>Specific moments make a personal statement memorable. Show the reader a scene—then explain why it matters.</Text></View>
      </View>

      <SectionHeader title="Your next steps" action="View plan" onPress={() => router.push('/prepare')} />
      <View style={styles.nextRow}>
        <Pressable onPress={() => router.push('/prepare')} style={styles.nextCard}>
          <View style={[styles.nextIcon, { backgroundColor: '#3B2723' }]}><Icon ios="doc.text" android="description" color={palette.coral} /></View>
          <Text style={styles.nextTitle}>Personal statement</Text><Text style={styles.nextMeta}>Continue draft · 72%</Text>
          <View style={styles.bar}><View style={[styles.barFill, { width: '72%', backgroundColor: palette.coral }]} /></View>
        </Pressable>
        <Pressable onPress={() => router.push('/events')} style={styles.nextCard}>
          <View style={[styles.nextIcon, { backgroundColor: palette.mintSoft }]}><Icon ios="calendar.badge.clock" android="event" color={palette.green} /></View>
          <Text style={styles.nextTitle}>Upcoming event</Text><Text style={styles.nextMeta}>Personal statement · Oct 3</Text>
          <Text style={styles.linkText}>View details →</Text>
        </Pressable>
      </View>

      <SectionHeader title="Explore your path" />
      <Text style={styles.discoverIntro}>Inspiration for the hard days, flexible admission routes, and people who can help you navigate the process.</Text>
      {discover.map((item) => (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Open ${item.title}`}
          key={item.id}
          onPress={() => router.push({ pathname: '/resources/[id]', params: { id: item.id } })}
          style={({ pressed }) => [styles.discoverCard, pressed && styles.cardPressed]}>
          <View style={[styles.discoverIcon, { backgroundColor: item.soft }]}>
            <Icon ios={item.icon} android={item.androidIcon} size={25} color={item.color} />
          </View>
          <View style={styles.discoverCopy}>
            <Text style={[styles.discoverEyebrow, { color: item.color }]}>{item.eyebrow}</Text>
            <Text style={styles.discoverTitle}>{item.title}</Text>
            <Text style={styles.discoverDescription}>{item.description}</Text>
            <Text style={[styles.discoverCount, { color: item.color }]}>{item.count}  →</Text>
          </View>
          <Icon ios="chevron.right" android="chevron_right" size={16} color="#9AA7A1" />
        </Pressable>
      ))}

      <SectionHeader title="The daily brief" action="See all" />
      {news.map((item) => (
        <Pressable key={item.title} style={({ pressed }) => [styles.newsCard, pressed && { opacity: 0.75 }]}>
          <View style={[styles.newsArt, { backgroundColor: `${item.color}14` }]}><Icon ios={item.icon} android="article" size={28} color={item.color} /></View>
          <View style={styles.newsText}><Text style={[styles.newsCategory, { color: item.color }]}>{item.category}</Text><Text style={styles.newsTitle}>{item.title}</Text><Text style={styles.newsTime}>{item.time}</Text></View>
          <Icon ios="chevron.right" android="chevron_right" size={15} color="#9AA7A1" />
        </Pressable>
      ))}
      <Text style={styles.disclaimer}>Planning information is illustrative. Always verify requirements and dates with each law school and the ABA.</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { backgroundColor: palette.deep, borderRadius: 26, padding: 22, minHeight: 190, overflow: 'hidden', flexDirection: 'row', alignItems: 'center', ...shadow },
  heroOrb: { width: 84, height: 84, borderRadius: 42, borderWidth: 8, borderColor: '#6DAE91', borderTopColor: palette.gold, alignItems: 'center', justifyContent: 'center', marginRight: 18 }, heroOrbText: { color: 'white', fontSize: 20, fontWeight: '800' },
  heroContent: { flex: 1 }, heroKicker: { color: '#8ED0B0', fontSize: 10, fontWeight: '800', letterSpacing: 1.2 }, heroTitle: { color: 'white', fontSize: 22, lineHeight: 26, fontWeight: '800', marginTop: 6 }, heroBody: { color: '#C9D8D2', fontSize: 13, marginTop: 5 },
  heroButton: { alignSelf: 'flex-start', marginTop: 17, backgroundColor: '#2B8064', borderRadius: 12, paddingHorizontal: 13, paddingVertical: 9, flexDirection: 'row', alignItems: 'center', gap: 7 }, heroButtonText: { color: 'white', fontSize: 12, fontWeight: '800' },
  tipCard: { marginTop: 15, borderRadius: 18, backgroundColor: palette.goldSoft, padding: 16, flexDirection: 'row', borderWidth: 1, borderColor: '#665126' }, tipIcon: { width: 38, height: 38, borderRadius: 12, backgroundColor: '#51401C', alignItems: 'center', justifyContent: 'center', marginRight: 12 }, tipText: { flex: 1 }, tipLabel: { color: palette.gold, fontWeight: '900', fontSize: 10, letterSpacing: 0.9 }, tipBody: { color: '#E8DDBF', fontSize: 13, lineHeight: 19, marginTop: 5 },
  nextRow: { flexDirection: 'row', gap: 10 }, nextCard: { flex: 1, minHeight: 144, borderRadius: 18, padding: 13, backgroundColor: palette.surface, borderWidth: 1, borderColor: palette.line, ...shadow }, nextIcon: { width: 36, height: 36, borderRadius: 11, justifyContent: 'center', alignItems: 'center', marginBottom: 10 }, nextTitle: { color: palette.ink, fontSize: 14, fontWeight: '800' }, nextMeta: { color: palette.inkMuted, fontSize: 11, lineHeight: 16, marginTop: 4 }, bar: { marginTop: 12, height: 5, borderRadius: 3, backgroundColor: '#28302C', overflow: 'hidden' }, barFill: { height: 5, borderRadius: 3 }, linkText: { color: palette.green, fontSize: 11, fontWeight: '800', marginTop: 12 },
  discoverIntro: { color: palette.inkMuted, fontSize: 13, lineHeight: 19, marginTop: -6, marginBottom: 13 },
  discoverCard: { backgroundColor: palette.surface, borderRadius: 18, padding: 13, marginBottom: 9, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: palette.line, ...shadow },
  discoverIcon: { width: 48, height: 48, borderRadius: 15, alignItems: 'center', justifyContent: 'center', marginRight: 11 },
  discoverCopy: { flex: 1, paddingRight: 8 }, discoverEyebrow: { fontSize: 9, fontWeight: '900', letterSpacing: 0.8 },
  discoverTitle: { color: palette.ink, fontSize: 16, lineHeight: 20, fontWeight: '800', marginTop: 4 },
  discoverDescription: { color: palette.inkMuted, fontSize: 11, lineHeight: 16, marginTop: 5 }, discoverCount: { fontSize: 10, fontWeight: '800', marginTop: 8 },
  cardPressed: { opacity: 0.8, transform: [{ scale: 0.99 }] },
  newsCard: { backgroundColor: palette.surface, borderRadius: 18, padding: 13, marginBottom: 10, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: palette.line }, newsArt: { width: 62, height: 62, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginRight: 13 }, newsText: { flex: 1, paddingRight: 6 }, newsCategory: { fontSize: 9, fontWeight: '900', letterSpacing: 0.8 }, newsTitle: { color: palette.ink, fontSize: 14, lineHeight: 18, fontWeight: '700', marginTop: 4 }, newsTime: { color: '#8B9691', fontSize: 10, marginTop: 5 }, disclaimer: { color: '#95A09B', fontSize: 10, lineHeight: 15, textAlign: 'center', marginTop: 16, paddingHorizontal: 18 },
});
