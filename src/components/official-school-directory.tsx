import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { Icon } from '@/components/ui';
import { palette } from '@/constants/theme';
import { ABA_ALPHABETICAL_DIRECTORY_URL, abaApprovedSchools } from '@/data/abaSchools';
import { openExternalLink } from '@/utils/openExternalLink';

type Props = {
  title: string;
  subtitle: string;
  ctaLabel: string;
  initialLimit?: number;
};

const PAGE_SIZE = 24;
const preferenceFilters = ['All', 'Full-time', 'Part-time', 'LSAT', 'GRE', 'JD-Next'] as const;

export function OfficialSchoolDirectory({ title, subtitle, ctaLabel, initialLimit = 12 }: Props) {
  const [query, setQuery] = useState('');
  const [preference, setPreference] = useState<(typeof preferenceFilters)[number]>('All');
  const [state, setState] = useState('All');
  const [limit, setLimit] = useState(initialLimit);
  const states = useMemo(() => ['All', ...Array.from(new Set(abaApprovedSchools.map((school) => school.state))).sort()], []);
  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return abaApprovedSchools.filter((school) => {
      const matchesQuery = !normalized || `${school.name} ${school.state}`.toLowerCase().includes(normalized);
      const matchesState = state === 'All' || school.state === state;
      const matchesPreference = preference === 'All'
        || (preference === 'Full-time' || preference === 'Part-time' ? school.schedules.includes(preference) : school.tests.includes(preference));
      return matchesQuery && matchesState && matchesPreference;
    });
  }, [preference, query, state]);
  const visible = filtered.slice(0, limit);

  return (
    <View style={styles.section}>
      <View style={styles.headingRow}>
        <View style={styles.headingText}>
          <Text style={styles.eyebrow}>OFFICIAL ABA DIRECTORY</Text>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.count}><Text style={styles.countNumber}>198</Text><Text style={styles.countLabel}>J.D. programs</Text></View>
      </View>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <View style={styles.search}>
        <Icon ios="magnifyingglass" android="search" size={18} color={palette.inkMuted} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search all 198 schools"
          placeholderTextColor="#98A39E"
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
        />
        {query ? <Pressable accessibilityLabel="Clear search" onPress={() => setQuery('')}><Icon ios="xmark.circle.fill" android="cancel" size={18} color="#98A39E" /></Pressable> : null}
      </View>
      <Text style={styles.filterLabel}>PROGRAM & ADMISSIONS</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filters} contentContainerStyle={styles.filterContent}>
        {preferenceFilters.map((item) => <FilterChip key={item} label={item} selected={preference === item} onPress={() => { setPreference(item); setLimit(initialLimit); }} />)}
      </ScrollView>
      <Text style={styles.filterLabel}>STATE OR TERRITORY</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filters} contentContainerStyle={styles.filterContent}>
        {states.map((item) => <FilterChip key={item} label={item === 'All' ? 'All states' : item} selected={state === item} onPress={() => { setState(item); setLimit(initialLimit); }} />)}
      </ScrollView>
      <Text style={styles.resultText}>{filtered.length} {filtered.length === 1 ? 'school' : 'schools'}</Text>
      {visible.map((school) => {
        const status = school.status ?? 'Fully approved';
        const flagged = status !== 'Fully approved';
        return (
          <Pressable key={`${school.name}-${school.approvalYear}`} onPress={() => openExternalLink(school.website, school.name)} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
            <View style={styles.mark}><Text style={styles.markText}>{school.name.charAt(0)}</Text></View>
            <View style={styles.body}>
              <Text style={styles.schoolName}>{school.name}</Text>
              <View style={styles.metaRow}>
                <Text style={[styles.status, flagged && styles.statusFlagged]}>{status}</Text>
                <Text style={styles.dot}>•</Text>
                <Text style={styles.year}>Approved {school.approvalYear}</Text>
                <Text style={styles.dot}>•</Text>
                <Text style={styles.year}>{school.state}</Text>
              </View>
              <Text style={styles.attributes}>{school.schedules.join(' · ')} · {school.tests.join(' · ')}</Text>
              <Text style={styles.cta}>{ctaLabel}</Text>
            </View>
            <Icon ios="arrow.up.right" android="open_in_new" size={15} color={palette.green} />
          </Pressable>
        );
      })}
      {visible.length === 0 ? <View style={styles.empty}><Text style={styles.emptyTitle}>No schools found</Text><Text style={styles.emptyBody}>Try a shorter school name.</Text></View> : null}
      {visible.length < filtered.length ? (
        <Pressable onPress={() => setLimit((current) => Math.min(current + PAGE_SIZE, filtered.length))} style={({ pressed }) => [styles.more, pressed && styles.pressed]}>
          <Text style={styles.moreText}>Show {Math.min(PAGE_SIZE, filtered.length - visible.length)} more</Text>
          <Icon ios="chevron.down" android="expand_more" size={16} color={palette.green} />
        </Pressable>
      ) : null}
      <Pressable onPress={() => openExternalLink(ABA_ALPHABETICAL_DIRECTORY_URL, 'ABA approved schools')} style={styles.sourceRow}>
        <Icon ios="checkmark.seal.fill" android="verified" size={16} color={palette.green} />
        <Text style={styles.sourceText}>Verify on the American Bar Association directory</Text>
        <Icon ios="chevron.right" android="chevron_right" size={14} color={palette.green} />
      </Pressable>
      <Text style={styles.note}>Approval year reflects provisional approval. Part-time status is from the ABA; GRE is from ETS; JD-Next means the school has a variance to consider it, not necessarily a current acceptance policy. Always verify with the school.</Text>
    </View>
  );
}

function FilterChip({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) {
  return <Pressable onPress={onPress} style={[styles.chip, selected && styles.chipSelected]}><Text style={[styles.chipText, selected && styles.chipTextSelected]}>{label}</Text></Pressable>;
}

const styles = StyleSheet.create({
  section: { marginTop: 28 }, headingRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }, headingText: { flex: 1 }, eyebrow: { color: palette.green, fontSize: 10, fontWeight: '900', letterSpacing: 1.1 }, title: { color: palette.ink, fontSize: 21, lineHeight: 26, fontWeight: '800', marginTop: 5 }, subtitle: { color: palette.inkMuted, fontSize: 13, lineHeight: 19, marginTop: 7 },
  count: { alignItems: 'center', backgroundColor: palette.mintSoft, borderRadius: 13, paddingHorizontal: 11, paddingVertical: 8 }, countNumber: { color: palette.green, fontSize: 18, fontWeight: '900' }, countLabel: { color: palette.greenDark, fontSize: 8, fontWeight: '700', marginTop: 1 },
  search: { height: 48, borderRadius: 15, backgroundColor: palette.surface, borderWidth: 1, borderColor: palette.line, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, gap: 9, marginTop: 15 }, input: { flex: 1, color: palette.ink, fontSize: 14 }, resultText: { color: palette.inkMuted, fontSize: 10, fontWeight: '700', marginTop: 9, marginBottom: 9 },
  filterLabel: { color: palette.inkMuted, fontSize: 9, fontWeight: '900', letterSpacing: 0.7, marginTop: 13, marginBottom: 6 }, filters: { marginHorizontal: -20 }, filterContent: { paddingHorizontal: 20, paddingBottom: 2 }, chip: { borderRadius: 16, borderWidth: 1, borderColor: palette.line, backgroundColor: palette.surface, paddingHorizontal: 12, paddingVertical: 8, marginRight: 7 }, chipSelected: { backgroundColor: palette.deep, borderColor: palette.green }, chipText: { color: palette.inkMuted, fontSize: 11, fontWeight: '700' }, chipTextSelected: { color: 'white' },
  card: { minHeight: 104, backgroundColor: palette.surface, borderRadius: 17, borderWidth: 1, borderColor: palette.line, padding: 13, marginBottom: 9, flexDirection: 'row', alignItems: 'center' }, pressed: { opacity: 0.76 }, mark: { width: 43, height: 43, borderRadius: 13, backgroundColor: palette.mintSoft, alignItems: 'center', justifyContent: 'center', marginRight: 11 }, markText: { color: palette.green, fontSize: 17, fontWeight: '900' }, body: { flex: 1, paddingRight: 7 }, schoolName: { color: palette.ink, fontSize: 14, lineHeight: 18, fontWeight: '800' }, metaRow: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 5, marginTop: 4 }, status: { color: palette.green, fontSize: 9, fontWeight: '800' }, statusFlagged: { color: '#E7B06C' }, dot: { color: '#9AA7A1', fontSize: 8 }, year: { color: palette.inkMuted, fontSize: 9, fontWeight: '600' }, attributes: { color: palette.inkMuted, fontSize: 9, lineHeight: 13, marginTop: 5 }, cta: { color: palette.green, fontSize: 10, fontWeight: '800', marginTop: 7 },
  more: { height: 46, borderRadius: 14, borderWidth: 1, borderColor: palette.green, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 7, marginTop: 3 }, moreText: { color: palette.green, fontSize: 12, fontWeight: '800' }, sourceRow: { minHeight: 48, flexDirection: 'row', alignItems: 'center', gap: 7, marginTop: 13, paddingHorizontal: 4 }, sourceText: { flex: 1, color: palette.green, fontSize: 11, lineHeight: 16, fontWeight: '800' }, note: { color: '#8A9690', fontSize: 9, lineHeight: 14, textAlign: 'center', paddingHorizontal: 12, marginTop: 4 },
  empty: { alignItems: 'center', paddingVertical: 28 }, emptyTitle: { color: palette.ink, fontSize: 15, fontWeight: '800' }, emptyBody: { color: palette.inkMuted, fontSize: 12, marginTop: 4 },
});
