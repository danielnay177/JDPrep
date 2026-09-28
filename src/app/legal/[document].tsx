import { useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { palette } from '@/constants/theme';

const privacySections = [
  ['Information used by JDPrep', 'JDPrep uses Firebase Authentication to create and maintain your sign-in. If you use email sign-in, Firebase processes your email address and authentication credentials. Guest sign-in uses an anonymous Firebase user identifier. If you add a display name, it is saved to your Firebase Authentication profile. JDPrep does not receive or store your password.'],
  ['How information is used', 'Authentication information is used to sign you in, keep your session active, and provide account actions such as profile editing and account deletion. The current app does not use Firestore or another JDPrep cloud database for your planning data.'],
  ['Service providers and retention', 'Firebase is provided by Google and processes authentication data under Google’s terms and privacy practices. Account information is retained while your Firebase account exists. You can request deletion from the Profile screen; account deletion may require a recent sign-in.'],
  ['Your choices and contact', 'You may use guest sign-in or email sign-in. You may delete your account from Profile. For privacy questions about this test release, contact the JDPrep developer through TestFlight feedback.'],
  ['Changes', 'This notice may be updated as JDPrep adds features. The version included with each app release describes the data practices for that release.'],
];

const termsSections = [
  ['Using JDPrep', 'JDPrep provides planning tools and educational resources for people exploring law school applications. You are responsible for keeping your account credentials secure and for activity under your account.'],
  ['Educational information', 'JDPrep is for general informational and organizational purposes. It is not legal, admissions, financial, or professional advice, and it does not guarantee admission or any outcome. Admissions policies, deadlines, requirements, and school information can change. Confirm details with the relevant school or official source.'],
  ['Accounts', 'You may sign in anonymously or create an account with email and password. You can edit your display name or request account deletion in Profile. You are responsible for providing accurate account information and using the service lawfully.'],
  ['Availability and changes', 'JDPrep is provided as available. Features, content, or availability may change as the app develops. We may suspend access when needed to protect the service or users.'],
  ['Contact', 'For questions about these terms, contact the JDPrep developer through TestFlight feedback.'],
];

export default function LegalDocumentScreen() {
  const { document } = useLocalSearchParams<{ document: string }>();
  const isPrivacy = document === 'privacy';
  const sections = isPrivacy ? privacySections : termsSections;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} contentInsetAdjustmentBehavior="automatic">
      <Text style={styles.kicker}>JDPREP</Text>
      <Text style={styles.title}>{isPrivacy ? 'Privacy Policy' : 'Terms of Service'}</Text>
      <Text style={styles.updated}>Effective September 28, 2026</Text>
      {sections.map(([heading, body]) => <View key={heading} style={styles.section}><Text style={styles.heading}>{heading}</Text><Text style={styles.body}>{body}</Text></View>)}
    </ScrollView>
  );
}

const styles = StyleSheet.create({ screen: { flex: 1, backgroundColor: palette.canvas }, content: { padding: 22, paddingBottom: 48 }, kicker: { color: palette.green, fontSize: 11, fontWeight: '900', letterSpacing: 1.2 }, title: { color: palette.ink, fontSize: 29, lineHeight: 36, fontWeight: '900', marginTop: 8 }, updated: { color: palette.inkMuted, fontSize: 12, marginTop: 7, marginBottom: 20 }, section: { paddingVertical: 15, borderTopWidth: 1, borderTopColor: palette.line }, heading: { color: palette.ink, fontSize: 16, fontWeight: '800', marginBottom: 7 }, body: { color: palette.inkMuted, fontSize: 14, lineHeight: 22 } });
