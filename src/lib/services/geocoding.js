const MOCK_ADDRESSES = {
  'tiergarten berlin': { lat: 52.5200, lon: 13.3373 },
  'checkpoint charlie': { lat: 52.5075, lon: 13.3904 },
  'alexanderplatz': { lat: 52.5219, lon: 13.4159 },
  'brandenburg gate': { lat: 52.5163, lon: 13.3777 },
  'reichstag': { lat: 52.5186, lon: 13.3755 },
  'berlin wall memorial': { lat: 52.5312, lon: 13.3886 },
  'museum island': { lat: 52.5172, lon: 13.3970 },
  'charlottenburg palace': { lat: 52.5200, lon: 13.2950 },
  'victory column': { lat: 52.5149, lon: 13.3500 },
  'potsdamer platz': { lat: 52.5058, lon: 13.3656 },
  'kurfürstendamm': { lat: 52.5034, lon: 13.3320 },
  'zoo berlin': { lat: 52.5080, lon: 13.3344 },
  'east side gallery': { lat: 52.5048, lon: 13.4423 },
  'friedrichstrasse': { lat: 52.5197, lon: 13.3862 },
  'sony center': { lat: 52.5084, lon: 13.3673 },
};

export function geocodeAddress(address) {
  const normalizedAddress = address.toLowerCase().trim();

  if (MOCK_ADDRESSES[normalizedAddress]) {
    return MOCK_ADDRESSES[normalizedAddress];
  }

  for (const [key, coords] of Object.entries(MOCK_ADDRESSES)) {
    if (key.includes(normalizedAddress) || normalizedAddress.includes(key)) {
      return coords;
    }
  }

  return null;
}

export function isValidAddress(address) {
  return geocodeAddress(address) !== null;
}

export default {
  geocodeAddress,
  isValidAddress,
};
