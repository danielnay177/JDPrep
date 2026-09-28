import { NativeTabs } from 'expo-router/unstable-native-tabs';

export default function TabsLayout() {
  return (
    <NativeTabs
      tintColor="#72D5A7"
      iconColor={{ default: '#A8B3AD', selected: '#72D5A7' }}
      labelStyle={{ default: { color: '#A8B3AD', fontSize: 10 }, selected: { color: '#72D5A7', fontWeight: '700' } }}
      backgroundColor="#000000"
      blurEffect="systemChromeMaterialDark"
      minimizeBehavior="never"
      labelVisibilityMode="labeled">
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf={'house' as never} md={'home' as never} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="prepare">
        <NativeTabs.Trigger.Label>Prepare</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf={'checklist' as never} md={'checklist' as never} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="schools">
        <NativeTabs.Trigger.Label>Schools</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf={'building.columns' as never} md={'account_balance' as never} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="events">
        <NativeTabs.Trigger.Label>Events</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf={'calendar' as never} md={'calendar_month' as never} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="connect">
        <NativeTabs.Trigger.Label>Connect</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf={'person.2' as never} md={'group' as never} />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
