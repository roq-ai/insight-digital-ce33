const mapping: Record<string, string> = {
  'analytics-data': 'analytics_data',
  organizations: 'organization',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
