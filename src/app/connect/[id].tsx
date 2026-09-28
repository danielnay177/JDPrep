import { useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Icon } from '@/components/ui';
import { palette, shadow } from '@/constants/theme';
import { connectProfiles, type ConnectResource } from '@/data/connectProfiles';
import { openExternalLink } from '@/utils/openExternalLink';

export default function ConnectProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const profile = useMemo(() => connectProfiles.find((item) => item.id === id) ?? connectProfiles[0], [id]);
  const [activeSectionId, setActiveSectionId] = useState(profile.sections[0].id);
  const activeSection = profile.sections.find((section) => section.id === activeSectionId) ?? profile.sections[0];
  const [expandedTitle, setExpandedTitle] = useState(activeSection.resources[0]?.title ?? '');

  const selectSection = (sectionId: string) => {
    const section = profile.sections.find((item) => item.id === sectionId);
    setActiveSectionId(sectionId);
    setExpandedTitle(section?.resources[0]?.title ?? '');
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      contentInsetAdjustmentBehavior="never">
      <View style={[styles.cover, { backgroundColor: profile.color }]}>
        <View style={styles.coverGlowLarge} />
        <View style={styles.coverGlowSmall} />
        <View style={styles.coverLabel}>
          <Icon ios="person.3.fill" android="groups" size={15} color="white" />
          <Text style={styles.coverLabelText}>Community profile</Text>
        </View>
        <View style={styles.coverMark}>
          <Text style={[styles.coverMarkText, { color: profile.color }]}>{profile.initials}</Text>
        </View>
      </View>

      <View style={styles.identity}>
        <Text style={styles.name}>{profile.name}</Text>
        <View style={styles.verified}>
          <Icon ios="checkmark.seal.fill" android="verified" size={16} color={palette.green} />
          <Text style={styles.verifiedText}>Official sources</Text>
        </View>
        <View style={styles.locationRow}>
          <Icon ios="mappin.and.ellipse" android="location_on" size={15} color={palette.inkMuted} />
          <Text style={styles.location}>{profile.location}</Text>
        </View>
        <Text style={styles.blurb}>{profile.blurb}</Text>
        <Pressable
          onPress={() => openExternalLink(profile.website, `${profile.shortName} official site`)}
          style={({ pressed }) => [styles.primary, pressed && styles.pressed]}>
          <Text style={styles.primaryText}>Official school site</Text>
          <Icon ios="arrow.up.right" android="open_in_new" size={15} color="white" />
        </Pressable>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabs} contentContainerStyle={styles.tabContent}>
        {profile.sections.map((section) => {
          const selected = section.id === activeSectionId;
          return (
            <Pressable key={section.id} onPress={() => selectSection(section.id)} style={[styles.tab, selected && styles.tabActive]}>
              <Text style={[styles.tabText, selected && styles.tabTextActive]}>{section.label}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <View style={styles.section}>
        <Text style={styles.sectionEyebrow}>EXPLORE {activeSection.label.toUpperCase()}</Text>
        <Text style={styles.sectionTitle}>{activeSection.label}</Text>
        <Text style={styles.sectionIntro}>{activeSection.intro}</Text>

        {activeSection.resources.map((resource) => (
          <ResourceAccordion
            key={resource.title}
            resource={resource}
            color={profile.color}
            expanded={expandedTitle === resource.title}
            onToggle={() => setExpandedTitle(expandedTitle === resource.title ? '' : resource.title)}
          />
        ))}
      </View>

      <View style={styles.fitCard}>
        <View style={styles.fitIcon}><Icon ios="heart.text.square.fill" android="favorite" size={22} color={palette.green} /></View>
        <View style={styles.fitCopy}>
          <Text style={styles.fitTitle}>Notice what feels like a fit</Text>
          <Text style={styles.fitBody}>As you explore, consider where you can find mentorship, belonging, hands-on learning, shared interests, and the support you may need to thrive.</Text>
        </View>
      </View>
      <Text style={styles.disclaimer}>Information and people can change. These links open official Syracuse Law pages so you can confirm the latest details directly with the school.</Text>
    </ScrollView>
  );
}

function ResourceAccordion({ resource, color, expanded, onToggle }: { resource: ConnectResource; color: string; expanded: boolean; onToggle: () => void }) {
  return (
    <View style={[styles.accordion, expanded && styles.accordionExpanded]}>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ expanded }}
        onPress={onToggle}
        style={({ pressed }) => [styles.accordionHeader, pressed && styles.pressed]}>
        <View style={[styles.resourceIcon, { backgroundColor: `${color}14` }]}>
          <Icon ios={resource.icon} android={resource.androidIcon} size={21} color={color} />
        </View>
        <Text style={styles.resourceTitle}>{resource.title}</Text>
        <Icon ios={expanded ? 'chevron.up' : 'chevron.down'} android={expanded ? 'expand_less' : 'expand_more'} size={17} color={palette.inkMuted} />
      </Pressable>
      {expanded ? (
        <View style={styles.accordionBody}>
          <Text style={styles.resourceDescription}>{resource.description}</Text>
          <Pressable
            onPress={() => openExternalLink(resource.url, resource.title)}
            style={({ pressed }) => [styles.linkButton, pressed && styles.pressed]}>
            <Text style={styles.linkButtonText}>{resource.action}</Text>
            <Icon ios="arrow.up.right" android="open_in_new" size={14} color={palette.green} />
          </Pressable>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: palette.canvas },
  content: { paddingBottom: 50 },
  cover: { height: 230, justifyContent: 'flex-end', paddingHorizontal: 20, overflow: 'hidden' },
  coverGlowLarge: { position: 'absolute', width: 310, height: 310, borderRadius: 155, backgroundColor: '#FFFFFF14', right: -70, top: -145 },
  coverGlowSmall: { position: 'absolute', width: 135, height: 135, borderRadius: 68, backgroundColor: '#FFFFFF0D', left: -42, bottom: 18 },
  coverLabel: { position: 'absolute', left: 20, top: 108, flexDirection: 'row', alignItems: 'center', gap: 7, backgroundColor: '#00000018', borderRadius: 20, paddingHorizontal: 11, paddingVertical: 7 },
  coverLabelText: { color: 'white', fontSize: 11, fontWeight: '800' },
  coverMark: { width: 86, height: 86, borderRadius: 25, backgroundColor: palette.surface, alignItems: 'center', justifyContent: 'center', marginBottom: -36, borderWidth: 4, borderColor: 'white', ...shadow },
  coverMarkText: { fontSize: 25, fontWeight: '900' },
  identity: { backgroundColor: palette.surface, paddingHorizontal: 20, paddingTop: 54, paddingBottom: 21 },
  name: { color: palette.ink, fontSize: 25, lineHeight: 30, fontWeight: '800', letterSpacing: -0.55 },
  verified: { flexDirection: 'row', gap: 5, alignItems: 'center', marginTop: 8 },
  verifiedText: { color: palette.green, fontSize: 11, fontWeight: '800' },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 13 },
  location: { color: palette.inkMuted, fontSize: 13 },
  blurb: { color: palette.ink, fontSize: 14, lineHeight: 21, marginTop: 11 },
  primary: { height: 47, borderRadius: 14, backgroundColor: palette.greenButton, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8, marginTop: 18 },
  primaryText: { color: 'white', fontWeight: '800', fontSize: 13 },
  tabs: { backgroundColor: palette.surface, borderTopWidth: 1, borderBottomWidth: 1, borderColor: palette.line },
  tabContent: { paddingHorizontal: 11 },
  tab: { paddingHorizontal: 13, paddingVertical: 15, borderBottomWidth: 2, borderBottomColor: 'transparent' },
  tabActive: { borderBottomColor: palette.green },
  tabText: { color: palette.inkMuted, fontSize: 13, fontWeight: '700' },
  tabTextActive: { color: palette.green },
  section: { paddingHorizontal: 20, paddingTop: 25 },
  sectionEyebrow: { color: palette.green, fontSize: 9, fontWeight: '900', letterSpacing: 1 },
  sectionTitle: { color: palette.ink, fontSize: 21, fontWeight: '800', marginTop: 5 },
  sectionIntro: { color: palette.inkMuted, fontSize: 13, lineHeight: 19, marginTop: 7, marginBottom: 16 },
  accordion: { backgroundColor: palette.surface, borderRadius: 18, marginBottom: 10, borderWidth: 1, borderColor: palette.line, overflow: 'hidden' },
  accordionExpanded: { borderColor: '#CFE1D8' },
  accordionHeader: { minHeight: 72, padding: 13, flexDirection: 'row', alignItems: 'center' },
  resourceIcon: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  resourceTitle: { flex: 1, color: palette.ink, fontSize: 14, fontWeight: '800', paddingRight: 8 },
  accordionBody: { paddingHorizontal: 16, paddingBottom: 16, paddingTop: 1, marginLeft: 56 },
  resourceDescription: { color: palette.inkMuted, fontSize: 12, lineHeight: 18 },
  linkButton: { minHeight: 42, borderRadius: 12, backgroundColor: palette.mintSoft, paddingHorizontal: 13, paddingVertical: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 },
  linkButtonText: { flex: 1, color: palette.greenDark, fontSize: 11, fontWeight: '800', paddingRight: 8 },
  fitCard: { marginHorizontal: 20, marginTop: 16, padding: 16, borderRadius: 18, backgroundColor: palette.mintSoft, flexDirection: 'row', borderWidth: 1, borderColor: '#D7E9DF' },
  fitIcon: { width: 42, height: 42, borderRadius: 13, backgroundColor: palette.surface, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  fitCopy: { flex: 1 },
  fitTitle: { color: palette.ink, fontSize: 14, fontWeight: '800' },
  fitBody: { color: palette.inkMuted, fontSize: 11, lineHeight: 17, marginTop: 4 },
  disclaimer: { color: '#929E98', fontSize: 10, lineHeight: 15, textAlign: 'center', paddingHorizontal: 32, marginTop: 24 },
  pressed: { opacity: 0.72 },
});
