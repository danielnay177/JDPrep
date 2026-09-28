# JDPrep

A mobile-first Expo SDK 57 app for people preparing and applying to ABA-approved JD programs in the United States.

## Run locally

```bash
npm ci
npx expo start
```

## Sign in

JDPrep uses Firebase Authentication for guest (anonymous) access and email/password accounts. Auth sessions persist between launches on iOS and Android. Firebase's client configuration is in `src/lib/firebase.ts`; it is a public client identifier, not a server credential. Protect your Firebase data with Security Rules before adding database access.

Enable the **Anonymous** and **Email/Password** providers in Firebase Authentication for project `jdprep-14213` before running sign-in flows.

## TestFlight builds

The iOS bundle ID is `com.danielnay177.jdprep`. Codemagic reads `codemagic.yaml`, generates the iOS project from Expo config, signs the IPA, and submits it to TestFlight. Connect the GitHub repository in Codemagic and add an App Store Connect API key integration named `JDPrep App Store Connect` with App Manager access before the first build.

```bash
npx expo lint
npx tsc --noEmit
```

Use `i` for the iOS simulator, `a` for Android, or `w` for web.

## Product areas

- Home: daily planning, admissions tips, and law-school updates
- Prepare: application materials and progress
- Schools: searchable, filterable program directory
- Events: official admissions events and registration links
- Support: admissions teams, faculty, students, and alumni

The current content is local sample data in `src/data/content.ts`, intentionally isolated so it can later be replaced with Firebase collections and live school feeds.

> This prototype is not affiliated with the American Bar Association. Verify all admissions requirements, statistics, and deadlines using current official sources.
