import { useLocalSearchParams } from 'expo-router';
import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Icon, Screen } from '@/components/ui';
import { palette, shadow } from '@/constants/theme';
import { admissionPathways, inspirationSections, mentorPrograms } from '@/data/homeResources';
import { openExternalLink } from '@/utils/openExternalLink';

type ResourceId = 'inspiration' | 'pathways' | 'mentors';

const pageMeta = {
  inspiration: {
    eyebrow: 'STORIES THAT STAY WITH YOU',
    title: 'The law-life watchlist',
    subtitle: 'Stories about law school, advocacy, setbacks, ethical choices, and building a meaningful legal life.',
    icon: 'sparkles.tv.fill',
    androidIcon: 'auto_awesome',
    color: palette.lavender,
  },
  pathways: {
    eyebrow: 'ALTERNATIVE ADMISSIONS',
    title: 'More ways into law school',
    subtitle: 'A curated starting point for test-optional and JD-Next pathways, linked to each school’s official policy.',
    icon: 'signpost.right.and.left.fill',
    androidIcon: 'alt_route',
    color: palette.blue,
  },
  mentors: {
    eyebrow: 'GUIDANCE & COMMUNITY',
    title: 'Find an admissions mentor',
    subtitle: 'Publicly available programs that connect aspiring lawyers with application support, mentors, and peer communities.',
    icon: 'person.2.wave.2.fill',
    androidIcon: 'diversity_3',
    color: palette.green,
  },
} as const;

export default function HomeResourceScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const resourceId: ResourceId = id === 'pathways' || id === 'mentors' ? id : 'inspiration';
  const meta = pageMeta[resourceId];

  return (
    <Screen style={styles.content}>
      <View style={[styles.hero, { backgroundColor: meta.color }]}>
        <View style={styles.heroGlow} />
        <View style={styles.heroIcon}><Icon ios={meta.icon} android={meta.androidIcon} size={29} color={meta.color} /></View>
        <Text style={styles.eyebrow}>{meta.eyebrow}</Text>
        <Text style={styles.title}>{meta.title}</Text>
        <Text style={styles.subtitle}>{meta.subtitle}</Text>
      </View>

      {resourceId === 'inspiration' ? <InspirationList color={meta.color} /> : null}
      {resourceId === 'pathways' ? <PathwayList color={meta.color} /> : null}
      {resourceId === 'mentors' ? <MentorList color={meta.color} /> : null}
    </Screen>
  );
}

function InspirationList({ color }: { color: string }) {
  return (
    <>
      <View style={styles.contextCard}>
        <Icon ios="heart.text.square.fill" android="favorite" size={20} color={palette.lavender} />
        <Text style={styles.contextText}>Use these stories for perspective and motivation—not as a literal picture of every school, lawyer, or legal system.</Text>
      </View>
      {inspirationSections.map((section) => (
        <View key={section.title} style={styles.section}>
          <View style={styles.sectionHeading}>
            <View style={[styles.sectionIcon, { backgroundColor: `${color}14` }]}><Icon ios={section.icon} android={section.androidIcon} size={20} color={color} /></View>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Text style={styles.count}>{section.items.length}</Text>
          </View>
          {section.items.map((item) => (
            <View key={item.title} style={styles.itemCard}>
              {item.trailerVideoId ? (
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={`Watch the ${item.trailerLabel === 'OFFICIAL TEASER' ? 'official teaser' : 'official trailer'} for ${item.title}`}
                  onPress={() => openExternalLink(`https://www.youtube.com/embed/${item.trailerVideoId}?playsinline=1&autoplay=1`, `${item.title} ${item.trailerLabel === 'OFFICIAL TEASER' ? 'teaser' : 'trailer'}`)}
                  style={({ pressed }) => [styles.trailerPreview, pressed && styles.pressed]}>
                  <Image
                    source={`https://img.youtube.com/vi/${item.trailerVideoId}/hqdefault.jpg`}
                    style={styles.trailerImage}
                    contentFit="cover"
                    cachePolicy="disk"
                    accessibilityLabel={`${item.title} video thumbnail`}
                    transition={150}
                  />
                  <View style={styles.playButton}><Icon ios="play.fill" android="play_arrow" size={23} color="white" /></View>
                  <View style={styles.trailerLabel}><Text style={styles.trailerLabelText}>{item.trailerLabel ?? 'OFFICIAL TRAILER'}</Text></View>
                </Pressable>
              ) : null}
              <View style={styles.itemTop}>
                {item.coverUrl ? (
                  <Image
                    source={item.coverUrl}
                    style={styles.bookCover}
                    contentFit="contain"
                    cachePolicy="disk"
                    accessibilityLabel={`${item.title} book cover`}
                    transition={150}
                  />
                ) : (
                  <View style={styles.itemNumber}><Text style={[styles.itemNumberText, { color }]}>{String(section.items.indexOf(item) + 1).padStart(2, '0')}</Text></View>
                )}
                <View style={styles.itemCopy}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.itemMeta}>{item.creator}{item.year ? ` · ${item.year}` : ''}</Text>
                </View>
              </View>
              <Text style={styles.itemDescription}>{item.note}</Text>
              <TagRow tags={item.tags} color={color} />
            </View>
          ))}
        </View>
      ))}
    </>
  );
}

function PathwayList({ color }: { color: string }) {
  return (
    <>
      <View style={styles.alertCard}>
        <Icon ios="exclamationmark.shield.fill" android="verified_user" size={21} color={palette.gold} />
        <Text style={styles.alertText}>Policies vary by cycle and program. A variance alone does not guarantee a school will use JD-Next as your only test. Confirm directly with admissions before applying.</Text>
      </View>
      <View style={styles.listHeader}>
        <Text style={styles.listHeaderTitle}>Verified alternative pathways</Text>
        <Text style={styles.listHeaderMeta}>{admissionPathways.length} official school pages</Text>
      </View>
      {admissionPathways.map((school) => (
        <View key={school.school} style={styles.linkCard}>
          <View style={styles.locationRow}><Icon ios="mappin.and.ellipse" android="location_on" size={13} color={palette.inkMuted} /><Text style={styles.location}>{school.location}</Text></View>
          <Text style={styles.linkCardTitle}>{school.school}</Text>
          <Text style={[styles.pathway, { color }]}>{school.pathway}</Text>
          <Text style={styles.linkCardDescription}>{school.detail}</Text>
          <TagRow tags={school.tags} color={color} />
          <OfficialLink title="Read official admissions policy" url={school.url} color={color} />
        </View>
      ))}
      <Text style={styles.disclaimer}>Reviewed September 22, 2026. Always verify the entry term, program, score-reporting steps, and whether an existing LSAT score changes review.</Text>
    </>
  );
}

function MentorList({ color }: { color: string }) {
  return (
    <>
      <View style={styles.contextCard}>
        <Icon ios="checkmark.seal.fill" android="verified" size={20} color={palette.green} />
        <Text style={styles.contextText}>These links go to the program or sponsoring institution—not private social profiles. Eligibility, dates, and cohort availability can change.</Text>
      </View>
      <View style={styles.listHeader}>
        <Text style={styles.listHeaderTitle}>Mentorship & pipeline programs</Text>
        <Text style={styles.listHeaderMeta}>{mentorPrograms.length} official resources</Text>
      </View>
      {mentorPrograms.map((program) => (
        <View key={program.name} style={styles.linkCard}>
          <View style={styles.providerRow}>
            <View style={[styles.providerIcon, { backgroundColor: `${color}14` }]}><Icon ios="person.2.fill" android="group" size={18} color={color} /></View>
            <Text style={styles.provider}>{program.provider}</Text>
          </View>
          <Text style={styles.linkCardTitle}>{program.name}</Text>
          <Text style={[styles.availability, { color }]}>{program.availability}</Text>
          <Text style={styles.linkCardDescription}>{program.description}</Text>
          <TagRow tags={program.tags} color={color} />
          <OfficialLink title="Visit official program" url={program.url} color={color} />
        </View>
      ))}
      <Text style={styles.disclaimer}>Reviewed September 22, 2026. Participation never guarantees admission. Check each official page for current eligibility and deadlines.</Text>
    </>
  );
}

function TagRow({ tags, color }: { tags: string[]; color: string }) {
  return <View style={styles.tags}>{tags.map((tag) => <View key={tag} style={[styles.tag, { backgroundColor: `${color}12` }]}><Text style={[styles.tagText, { color }]}>{tag}</Text></View>)}</View>;
}

function OfficialLink({ title, url, color }: { title: string; url: string; color: string }) {
  return (
    <Pressable accessibilityRole="link" onPress={() => openExternalLink(url, title)} style={({ pressed }) => [styles.officialButton, { backgroundColor: `${color}12` }, pressed && styles.pressed]}>
      <Text style={[styles.officialButtonText, { color }]}>{title}</Text>
      <Icon ios="arrow.up.right" android="open_in_new" size={14} color={color} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 0 },
  hero: { marginHorizontal: 20, marginTop: 8, borderRadius: 28, padding: 22, minHeight: 245, overflow: 'hidden', justifyContent: 'flex-end', ...shadow },
  heroGlow: { position: 'absolute', width: 250, height: 250, borderRadius: 125, backgroundColor: '#FFFFFF16', right: -58, top: -82 },
  heroIcon: { width: 54, height: 54, borderRadius: 17, backgroundColor: palette.surface, alignItems: 'center', justifyContent: 'center', marginBottom: 22 },
  eyebrow: { color: '#FFFFFFC9', fontSize: 10, fontWeight: '900', letterSpacing: 1.1 },
  title: { color: 'white', fontSize: 29, lineHeight: 33, fontWeight: '900', letterSpacing: -0.7, marginTop: 6 },
  subtitle: { color: '#FFFFFFD9', fontSize: 13, lineHeight: 19, marginTop: 8, maxWidth: 330 },
  contextCard: { marginHorizontal: 20, marginTop: 16, padding: 15, borderRadius: 18, backgroundColor: palette.surface, borderWidth: 1, borderColor: palette.line, flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  contextText: { flex: 1, color: palette.inkMuted, fontSize: 12, lineHeight: 18 },
  alertCard: { marginHorizontal: 20, marginTop: 16, padding: 15, borderRadius: 18, backgroundColor: palette.goldSoft, borderWidth: 1, borderColor: '#F4E1B2', flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  alertText: { flex: 1, color: '#E8DDBF', fontSize: 12, lineHeight: 18 },
  section: { marginTop: 28, paddingHorizontal: 20 },
  sectionHeading: { flexDirection: 'row', alignItems: 'center', marginBottom: 13 },
  sectionIcon: { width: 38, height: 38, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  sectionTitle: { flex: 1, color: palette.ink, fontSize: 21, fontWeight: '800' },
  count: { color: palette.inkMuted, fontSize: 12, fontWeight: '800', backgroundColor: palette.surface, paddingHorizontal: 9, paddingVertical: 5, borderRadius: 12, overflow: 'hidden' },
  itemCard: { backgroundColor: palette.surface, borderRadius: 19, padding: 16, marginBottom: 10, borderWidth: 1, borderColor: palette.line },
  trailerPreview: { height: 174, borderRadius: 14, overflow: 'hidden', backgroundColor: palette.deep, marginBottom: 14, justifyContent: 'center', alignItems: 'center' },
  trailerImage: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, width: '100%', height: '100%' },
  playButton: { width: 54, height: 54, borderRadius: 27, backgroundColor: '#111B', alignItems: 'center', justifyContent: 'center', paddingLeft: 3, borderWidth: 1, borderColor: '#FFFFFFB0' },
  trailerLabel: { position: 'absolute', left: 10, bottom: 10, paddingHorizontal: 8, paddingVertical: 5, borderRadius: 7, backgroundColor: '#111C' },
  trailerLabelText: { color: 'white', fontSize: 9, fontWeight: '900', letterSpacing: 0.7 },
  itemTop: { flexDirection: 'row', alignItems: 'center' },
  bookCover: { width: 82, height: 122, borderRadius: 5, backgroundColor: palette.canvas, marginRight: 12 },
  itemNumber: { width: 39, height: 39, borderRadius: 12, backgroundColor: palette.canvas, alignItems: 'center', justifyContent: 'center', marginRight: 11 },
  itemNumberText: { fontSize: 12, fontWeight: '900' },
  itemCopy: { flex: 1 }, itemTitle: { color: palette.ink, fontSize: 16, lineHeight: 20, fontWeight: '800' },
  itemMeta: { color: palette.inkMuted, fontSize: 11, marginTop: 3 },
  itemDescription: { color: palette.inkMuted, fontSize: 12, lineHeight: 18, marginTop: 12 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 12 },
  tag: { paddingHorizontal: 9, paddingVertical: 5, borderRadius: 8 }, tagText: { fontSize: 10, fontWeight: '800' },
  listHeader: { marginHorizontal: 20, marginTop: 26, marginBottom: 13 },
  listHeaderTitle: { color: palette.ink, fontSize: 21, fontWeight: '800' },
  listHeaderMeta: { color: palette.inkMuted, fontSize: 12, marginTop: 4 },
  linkCard: { marginHorizontal: 20, backgroundColor: palette.surface, borderRadius: 21, padding: 17, marginBottom: 11, borderWidth: 1, borderColor: palette.line, ...shadow },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 7 }, location: { color: palette.inkMuted, fontSize: 11, fontWeight: '600' },
  linkCardTitle: { color: palette.ink, fontSize: 17, lineHeight: 22, fontWeight: '800' },
  pathway: { fontSize: 11, lineHeight: 16, fontWeight: '900', textTransform: 'uppercase', letterSpacing: 0.5, marginTop: 7 },
  availability: { fontSize: 11, fontWeight: '800', marginTop: 7 },
  linkCardDescription: { color: palette.inkMuted, fontSize: 12, lineHeight: 18, marginTop: 9 },
  officialButton: { minHeight: 44, borderRadius: 13, paddingHorizontal: 13, paddingVertical: 11, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 14 },
  officialButtonText: { flex: 1, fontSize: 12, fontWeight: '800' },
  providerRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
  providerIcon: { width: 32, height: 32, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  provider: { flex: 1, color: palette.inkMuted, fontSize: 11, lineHeight: 15, fontWeight: '700' },
  disclaimer: { color: '#929E98', fontSize: 10, lineHeight: 15, textAlign: 'center', paddingHorizontal: 36, marginTop: 13 },
  pressed: { opacity: 0.7 },
});
