import { router } from 'expo-router';

export function openExternalLink(url: string, title: string) {
  router.push({
    pathname: '/browser',
    params: { url, title },
  });
}
