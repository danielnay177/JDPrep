import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { OfficialSchoolDirectory } from '@/components/official-school-directory';
import { AppHeader, Chip, Icon, Screen, SectionHeader } from '@/components/ui';
import { palette, shadow } from '@/constants/theme';
import { abaApprovedSchools } from '@/data/abaSchools';
import { EVENTS_VERIFIED_AT, events } from '@/data/content';
import { openExternalLink } from '@/utils/openExternalLink';

const categories = ['All events', 'School fair', 'JD recruitment', 'JD admissions', 'Application workshop', 'Personal statement', 'Student experience'];
const LSAC_EVENTS_URL = 'https://www.lsac.org/events';

export default function EventsScreen() {
  const [selected, setSelected] = useState('All events');
  const [selectedState, setSelectedState] = useState('All');
  const [saved, setSaved] = useState<string[]>([]);
  const states = useMemo(() => ['All', ...Array.from(new Set(abaApprovedSchools.map((school) => school.state))).sort()], []);
  const today = new Date();
  const todayKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  const verifiedLabel = new Date(`${EVENTS_VERIFIED_AT}T12:00:00`).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' });
  const visibleEvents = useMemo(() => events
    .filter((event) => event.date >= todayKey && (selected === 'All events' || event.type === selected) && (selectedState === 'All' || event.state === selectedState))
    .sort((a, b) => a.date.localeCompare(b.date)), [selected, selectedState, todayKey]);
  const toggleSaved = (id: string) => setSaved((current) => current.includes(id) ? current.filter((x) => x !== id) : [...current, id]);
  return (
    <Screen>
      <AppHeader eyebrow="Verified upcoming dates" title="Law school events" subtitle="Official fairs, J.D. admissions sessions, and application workshops—earliest dates first." />
      <Pressable onPress={() => openExternalLink(LSAC_EVENTS_URL, 'LSAC upcoming events')} style={styles.sourceBanner}>
        <View style={styles.sourceIcon}><Icon ios="checkmark.seal.fill" android="verified" size={22} color={palette.green} /></View>
        <View style={styles.sourceBody}><Text style={styles.sourceTitle}>Official and current event listings</Text><Text style={styles.sourceText}>Last source audit: {verifiedLabel}. Expired events are hidden automatically; open LSAC for live changes.</Text></View>
        <Icon ios="arrow.up.right" android="open_in_new" size={15} color={palette.green} />
      </Pressable>
      <Text style={styles.filterLabel}>EVENT TYPE</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories} contentContainerStyle={styles.categoriesContent}>
        {categories.map((item) => <Chip key={item} label={item} selected={item === selected} onPress={() => setSelected(item)} />)}
      </ScrollView>
      <Text style={styles.filterLabel}>SCHOOL STATE</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories} contentContainerStyle={styles.categoriesContent}>
        {states.map((item) => <Chip key={item} label={item === 'All' ? 'All states' : item} selected={item === selectedState} onPress={() => setSelectedState(item)} />)}
      </ScrollView>
      <SectionHeader title="Coming up" action={`${visibleEvents.length} events`} />
      {visibleEvents.map((event) => (
        <View key={event.id} style={styles.eventCard}>
          <View style={[styles.date, { backgroundColor: `${event.color}12` }]}><Text style={[styles.month, { color: event.color }]}>{event.month}</Text><Text style={[styles.day, { color: event.color }]}>{event.day}</Text></View>
          <View style={styles.eventBody}>
            <View style={styles.typeRow}><Text style={[styles.type, { color: event.color }]}>{event.type.toUpperCase()}</Text><Text style={styles.dot}>·</Text><Text style={styles.format}>{event.format} · {event.state}</Text></View>
            <Text style={styles.eventTitle}>{event.title}</Text>
            <Text style={styles.host}>{event.host}</Text>
            <Text style={styles.time}>{event.time}</Text>
            <View style={styles.linkRow}>
              <Pressable onPress={() => openExternalLink(event.url, `${event.title} registration`)}><Text style={styles.officialLink}>Register / details ↗</Text></Pressable>
              {'sourceUrl' in event && event.sourceUrl ? <Pressable onPress={() => openExternalLink(event.sourceUrl, `${event.host} events`)}><Text style={styles.sourceLink}>Official listing</Text></Pressable> : null}
            </View>
          </View>
          <Pressable accessibilityLabel="Save event" onPress={() => toggleSaved(event.id)} style={styles.save}><Icon ios={saved.includes(event.id) ? 'bookmark.fill' : 'bookmark'} android={saved.includes(event.id) ? 'bookmark' : 'bookmark_border'} size={20} color={saved.includes(event.id) ? palette.green : '#82908A'} /></Pressable>
        </View>
      ))}
      {visibleEvents.length === 0 ? <View style={styles.empty}><Icon ios="calendar.badge.exclamationmark" android="event_busy" size={30} color={palette.inkMuted} /><Text style={styles.emptyTitle}>No verified events match</Text><Text style={styles.emptyText}>Try another state or event type, or open the live LSAC calendar.</Text></View> : null}
      <Text style={styles.note}>Only verified J.D.-relevant events with official listings or registration links are shown. Past dates disappear automatically, and the official sources are checked regularly for additions, changes, and cancellations.</Text>
      <OfficialSchoolDirectory title="Find events from every school" subtitle="Open any ABA-approved school’s official website to check its current admissions sessions, campus visits, webinars, and registration details." ctaLabel="Visit official site for current events ↗" initialLimit={8} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  sourceBanner: { backgroundColor: palette.mintSoft, borderRadius: 18, borderWidth: 1, borderColor: '#D7E9DF', padding: 14, flexDirection: 'row', alignItems: 'center' }, sourceIcon: { width: 40, height: 40, borderRadius: 12, backgroundColor: palette.surface, alignItems: 'center', justifyContent: 'center', marginRight: 10 }, sourceBody: { flex: 1, paddingRight: 8 }, sourceTitle: { color: palette.ink, fontSize: 13, fontWeight: '800' }, sourceText: { color: palette.inkMuted, fontSize: 10, lineHeight: 15, marginTop: 3 }, filterLabel: { color: palette.inkMuted, fontSize: 9, fontWeight: '900', letterSpacing: 0.8, marginTop: 15, marginBottom: 7 }, categories: { marginHorizontal: -20 }, categoriesContent: { paddingHorizontal: 20, paddingBottom: 4 },
  eventCard: { backgroundColor: palette.surface, borderRadius: 20, padding: 15, flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12, borderWidth: 1, borderColor: palette.line, ...shadow }, date: { width: 54, minHeight: 61, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginRight: 13, paddingVertical: 9 }, month: { fontSize: 9, fontWeight: '900', letterSpacing: 0.6 }, day: { fontSize: 20, fontWeight: '800', marginTop: 1 }, eventBody: { flex: 1, paddingRight: 8 }, typeRow: { flexDirection: 'row', alignItems: 'center', gap: 4, flexWrap: 'wrap' }, type: { fontSize: 9, fontWeight: '900', letterSpacing: 0.7 }, dot: { color: '#9AA49F' }, format: { color: palette.inkMuted, fontSize: 9, fontWeight: '600' }, eventTitle: { color: palette.ink, fontSize: 15, lineHeight: 19, fontWeight: '800', marginTop: 5 }, host: { color: palette.inkMuted, fontSize: 11, lineHeight: 15, marginTop: 5 }, time: { color: palette.ink, fontSize: 11, fontWeight: '700', marginTop: 8 }, linkRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 14, marginTop: 8 }, officialLink: { color: palette.green, fontSize: 11, fontWeight: '800' }, sourceLink: { color: palette.inkMuted, fontSize: 10, fontWeight: '700', textDecorationLine: 'underline' }, save: { padding: 3 }, note: { color: '#96A09C', fontSize: 10, lineHeight: 15, textAlign: 'center', marginTop: 10, paddingHorizontal: 20 }, empty: { alignItems: 'center', paddingVertical: 34 }, emptyTitle: { color: palette.ink, fontSize: 15, fontWeight: '800', marginTop: 8 }, emptyText: { color: palette.inkMuted, fontSize: 11, lineHeight: 16, textAlign: 'center', maxWidth: 260, marginTop: 4 },
});
