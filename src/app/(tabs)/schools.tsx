import { Pressable, StyleSheet, Text, View } from 'react-native';

import { OfficialSchoolDirectory } from '@/components/official-school-directory';
import { AppHeader, Icon, SchoolCard, Screen } from '@/components/ui';
import { palette } from '@/constants/theme';
import { schoolResearchResources, schools } from '@/data/content';
import { openExternalLink } from '@/utils/openExternalLink';

export default function SchoolsScreen() {
  return (
    <Screen>
      <AppHeader eyebrow="Official ABA directory" title="Find your law school" subtitle="Explore all 198 Council-approved programs that confer the J.D. degree." />
      <OfficialSchoolDirectory title="All approved J.D. programs" subtitle="Search the current ABA directory. Every result includes the official approval year, current status, and school website." ctaLabel="Open official school website ↗" initialLimit={24} />
      <View style={styles.featuredHeader}><Text style={styles.researchEyebrow}>PLANNING PROFILES</Text><Text style={styles.researchTitle}>Featured comparisons</Text><Text style={styles.researchIntro}>Use these sample profiles to explore the app’s comparison tools, then confirm every detail with the official school link.</Text></View>
      {schools.map((school) => <SchoolCard key={school.id} school={school} />)}
      <View style={styles.researchHeader}><Text style={styles.researchEyebrow}>TRUSTED RESEARCH</Text><Text style={styles.researchTitle}>Go beyond the shortlist</Text><Text style={styles.researchIntro}>Confirm accreditation first, then compare program fit, admissions ranges, cost, debt, and outcomes. Rankings are one input—not the decision.</Text></View>
      {schoolResearchResources.map((resource) => (
        <Pressable key={resource.url} onPress={() => openExternalLink(resource.url, resource.source)} style={({ pressed }) => [styles.resourceCard, pressed && styles.resourcePressed]}>
          <View style={styles.resourceIcon}><Icon ios={resource.icon} android={resource.androidIcon} size={21} color={palette.green} /></View>
          <View style={styles.resourceBody}><Text style={styles.resourceSource}>{resource.source}</Text><Text style={styles.resourceTitle}>{resource.title}</Text><Text style={styles.resourceDescription}>{resource.description}</Text></View>
          <Icon ios="chevron.right" android="chevron_right" size={16} color="#9AA7A1" />
        </Pressable>
      ))}
      <View style={styles.caution}><Icon ios="info.circle.fill" android="info" size={18} color={palette.green} /><Text style={styles.cautionText}>Non-ABA-approved schools may carry bar-eligibility limitations. Review the rules for every jurisdiction where you may practice before applying.</Text></View>
      <Text style={styles.note}>School cards contain sample planning data. Statistics and deadlines change; verify them with current ABA disclosures, LSAC resources, and each school’s official site.</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  note: { color: '#96A09C', fontSize: 10, lineHeight: 15, textAlign: 'center', marginTop: 12, paddingHorizontal: 15 }, featuredHeader: { marginTop: 30, marginBottom: 13 },
  researchHeader: { marginTop: 28, marginBottom: 13 }, researchEyebrow: { color: palette.green, fontSize: 10, fontWeight: '900', letterSpacing: 1.1 }, researchTitle: { color: palette.ink, fontSize: 21, fontWeight: '800', marginTop: 5 }, researchIntro: { color: palette.inkMuted, fontSize: 13, lineHeight: 19, marginTop: 6 },
  resourceCard: { backgroundColor: palette.surface, borderRadius: 18, borderWidth: 1, borderColor: palette.line, padding: 14, marginBottom: 10, flexDirection: 'row', alignItems: 'center' }, resourcePressed: { opacity: 0.78 }, resourceIcon: { width: 42, height: 42, borderRadius: 13, backgroundColor: palette.mintSoft, alignItems: 'center', justifyContent: 'center', marginRight: 11 }, resourceBody: { flex: 1, paddingRight: 8 }, resourceSource: { color: palette.green, fontSize: 9, fontWeight: '900', textTransform: 'uppercase', letterSpacing: 0.5 }, resourceTitle: { color: palette.ink, fontSize: 14, fontWeight: '800', marginTop: 3 }, resourceDescription: { color: palette.inkMuted, fontSize: 11, lineHeight: 16, marginTop: 4 },
  caution: { flexDirection: 'row', alignItems: 'flex-start', gap: 9, backgroundColor: palette.mintSoft, borderRadius: 16, padding: 14, marginTop: 4 }, cautionText: { flex: 1, color: palette.greenDark, fontSize: 11, lineHeight: 17, fontWeight: '600' },
});
