/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

export const palette = {
  ink: '#F3F6F4', inkMuted: '#B8C2BD', green: '#72D5A7', greenDark: '#A4E4C1',
  greenButton: '#176345',
  mint: '#244638', mintSoft: '#1A3027', gold: '#F0C66C', goldSoft: '#352A16',
  coral: '#F0957D', blue: '#8EAEF0', lavender: '#B8A0E8', surface: '#151A18',
  canvas: '#050706', line: '#2A332F', deep: '#10221B',
} as const;

export const shadow = {
  shadowColor: '#000000', shadowOffset: { width: 0, height: 7 }, shadowOpacity: 0.24,
  shadowRadius: 18, elevation: 3,
};
