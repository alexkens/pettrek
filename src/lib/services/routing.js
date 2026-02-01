export async function getRouteCoordinates(startLat, startLon, endLat, endLon, profile = 'foot') {
  try {
    const url = `https://router.project-osrm.org/route/v1/${profile}/${startLon},${startLat};${endLon},${endLat}?overview=full&geometries=geojson`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to get route from OSRM');
    }

    const data = await response.json();

    if (data.routes && data.routes.length > 0) {
      const route = data.routes[0];
      return {
        coordinates: route.geometry.coordinates,
        distance: route.distance / 1000,
        duration: route.duration / 60,
      };
    }

    return null;
  } catch (error) {
    console.error('Routing error:', error);
    return null;
  }
}

export function getModeProfile(mode) {
  switch (mode) {
    case 'biking':
      return 'bike';
    case 'walking':
    default:
      return 'foot';
  }
}

export default {
  getRouteCoordinates,
  getModeProfile,
};
