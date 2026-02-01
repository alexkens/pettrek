import dogParks from '../../data/berlinDogParks.json';

const SPEEDS = {
  walking: 4,
  biking: 10,
};

export function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function calculateTime(distance, mode) {
  const speed = SPEEDS[mode] || SPEEDS.walking;
  return (distance / speed) * 60;
}

export function calculateDistanceFromTime(time, mode) {
  const speed = SPEEDS[mode] || SPEEDS.walking;
  return (time / 60) * speed;
}

export function findDogParksNearRoute(
  startLat,
  startLon,
  endLat,
  endLon,
  radiusKm = 2
) {
  const midLat = (startLat + endLat) / 2;
  const midLon = (startLon + endLon) / 2;

  return dogParks.filter((park) => {
    const distance = calculateDistance(
      midLat,
      midLon,
      park.latitude,
      park.longitude
    );
    return distance <= radiusKm;
  });
}

/**
 * @param {Object} data
 * @returns {Object}
 */
export function processRoute(data) {
  const { routeType, mode, time, start, end, startCoords, endCoords } = data;

  let distance = 0;
  let duration = 0;
  let nearbyParks = [];

  if (routeType === 'one-way') {
    if (!startCoords || !endCoords) {
      throw new Error('Start and end coordinates required for one-way route');
    }

    distance = calculateDistance(
      startCoords.lat,
      startCoords.lon,
      endCoords.lat,
      endCoords.lon
    );
    duration = calculateTime(distance, mode);
    nearbyParks = findDogParksNearRoute(
      startCoords.lat,
      startCoords.lon,
      endCoords.lat,
      endCoords.lon
    );
  } else if (routeType === 'round-trip') {
    if (!startCoords) {
      throw new Error('Start coordinates required for round-trip route');
    }

    distance = calculateDistanceFromTime(time, mode);
    duration = time;

    const radiusKm = distance / 2;
    nearbyParks = dogParks.filter((park) => {
      const distToStart = calculateDistance(
        startCoords.lat,
        startCoords.lon,
        park.latitude,
        park.longitude
      );
      return distToStart <= radiusKm;
    });
  }

  return {
    distance: Math.round(distance * 10) / 10,
    duration: Math.round(duration),
    dogParks: nearbyParks,
    mode,
    routeType,
  };
}

export default {
  calculateDistance,
  calculateTime,
  calculateDistanceFromTime,
  findDogParksNearRoute,
  processRoute,
};
