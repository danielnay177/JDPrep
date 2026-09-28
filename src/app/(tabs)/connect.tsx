import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AppHeader, Icon, Screen } from '@/components/ui';
import { palette, shadow } from '@/constants/theme';
import { connectProfiles } from '@/data/connectProfiles';

export default function ConnectScreen() {
  return (
    <Screen>
      <AppHeader
        eyebrow="Find your people"
        title="Connect"
        subtitle="Look beyond the numbers and explore the people, culture, support, and experiences that make each law school distinct."
      />

      <View style={styles.prompt}>
        <View style={styles.promptIcon}>
          <Icon ios="person.3.sequence.fill" android="diversity_3" size={26} color={palette.green} />
        </View>
        <View style={styles.promptCopy}>
          <Text style={styles.promptTitle}>Choose for fit, not just stats</Text>
          <Text style={styles.promptBody}>Meet the community, understand the culture, and use official channels when you are ready to reach out.</Text>
        </View>
      </View>

      <View style={styles.heading}>
        <Text style={styles.eyebrow}>COMMUNITY PROFILES</Text>
        <Text style={styles.title}>Explore a school’s vibe</Text>
        <Text style={styles.intro}>Tap a profile to explore admissions, faculty, students, experiential learning, visits, and alumni connections.</Text>
      </View>

      {connectProfiles.map((school) => (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Explore ${school.shortName} community profile`}
          key={school.id}
          onPress={() => router.push({ pathname: '/connect/[id]', params: { id: school.id } })}
          style={({ pressed }) => [styles.schoolCard, pressed && styles.cardPressed]}>
          <View style={[styles.schoolMark, { backgroundColor: school.color }]}>
            <Text style={styles.schoolMarkText}>{school.initials}</Text>
          </View>
          <View style={styles.schoolBody}>
            <Text style={styles.schoolName}>{school.shortName}</Text>
            <View style={styles.metaRow}>
              <Icon ios="mappin.and.ellipse" android="location_on" size={14} color={palette.inkMuted} />
              <Text style={styles.meta}>{school.location}</Text>
            </View>
            <Text style={styles.schoolBlurb} numberOfLines={3}>{school.blurb}</Text>
            <View style={styles.tagRow}>
              {school.tags.slice(0, 2).map((tag) => <View key={tag} style={styles.tag}><Text style={styles.tagText}>{tag}</Text></View>)}
            </View>
          </View>
          <Icon ios="chevron.right" android="chevron_right" size={18} color="#9AA7A1" />
        </Pressable>
      ))}

      <View style={styles.note}>
        <Icon ios="checkmark.seal.fill" android="verified" size={18} color={palette.green} />
        <Text style={styles.noteText}>Every connection opens an official school source so you can confirm current people, programs, and opportunities.</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  prompt: { backgroundColor: palette.mintSoft, borderRadius: 22, padding: 17, flexDirection: 'row', borderWidth: 1, borderColor: '#D7E9DF' },
  promptIcon: { width: 50, height: 50, borderRadius: 16, backgroundColor: palette.surface, alignItems: 'center', justifyContent: 'center', marginRight: 13 },
  promptCopy: { flex: 1 },
  promptTitle: { color: palette.ink, fontSize: 16, fontWeight: '800' },
  promptBody: { color: palette.inkMuted, fontSize: 12, lineHeight: 18, marginTop: 5 },
  heading: { marginTop: 28, marginBottom: 14 },
  eyebrow: { color: palette.green, fontSize: 10, fontWeight: '900', letterSpacing: 1.1 },
  title: { color: palette.ink, fontSize: 22, fontWeight: '800', marginTop: 5 },
  intro: { color: palette.inkMuted, fontSize: 13, lineHeight: 19, marginTop: 6 },
  schoolCard: { backgroundColor: palette.surface, borderRadius: 22, padding: 16, flexDirection: 'row', alignItems: 'center', marginBottom: 12, borderWidth: 1, borderColor: '#E5EAE6', ...shadow },
  cardPressed: { opacity: 0.82, transform: [{ scale: 0.99 }] },
  schoolMark: { width: 62, height: 62, borderRadius: 18, alignItems: 'center', justifyContent: 'center', marginRight: 14 },
  schoolMarkText: { color: 'white', fontSize: 19, fontWeight: '900' },
  schoolBody: { flex: 1, paddingRight: 8 },
  schoolName: { color: palette.ink, fontSize: 18, lineHeight: 22, fontWeight: '800' },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 5 },
  meta: { color: palette.inkMuted, fontSize: 12 },
  schoolBlurb: { color: palette.inkMuted, fontSize: 12, lineHeight: 17, marginTop: 8 },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 10 },
  tag: { backgroundColor: palette.mintSoft, paddingHorizontal: 9, paddingVertical: 5, borderRadius: 8 },
  tagText: { color: palette.greenDark, fontSize: 10, fontWeight: '700' },
  note: { flexDirection: 'row', alignItems: 'flex-start', gap: 9, padding: 15, marginTop: 14, borderRadius: 17, backgroundColor: palette.surface, borderWidth: 1, borderColor: palette.line },
  noteText: { flex: 1, color: palette.inkMuted, fontSize: 11, lineHeight: 17 },
});
