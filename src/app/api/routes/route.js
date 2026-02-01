import dbConnect from '@/lib/dbConnect';
import Route from '@/lib/models/Route';
import { processRoute } from '@/lib/services/routeCalculations';
import { geocodeAddress } from '@/lib/services/geocoding';
import { getRouteCoordinates, getModeProfile } from '@/lib/services/routing';

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();
    const { start, end, routeType, mode, time, distance } = body;

    const startCoords = geocodeAddress(start);
    if (!startCoords) {
      return Response.json(
        { error: `Could not find coordinates for start address: "${start}"` },
        { status: 400 }
      );
    }

    let endCoords = null;
    let routeCoordinates = null;
    let routeDistance = 0;
    let routeDuration = 0;

    if (routeType === 'one-way' && end) {
      endCoords = geocodeAddress(end);
      if (!endCoords) {
        return Response.json(
          { error: `Could not find coordinates for end address: "${end}"` },
          { status: 400 }
        );
      }

      const profile = getModeProfile(mode);
      const routing = await getRouteCoordinates(
        startCoords.lat,
        startCoords.lon,
        endCoords.lat,
        endCoords.lon,
        profile
      );

      if (routing) {
        routeCoordinates = routing.coordinates;
        routeDistance = routing.distance;
        routeDuration = routing.duration;
      } else {
        routeCoordinates = [
          [startCoords.lon, startCoords.lat],
          [endCoords.lon, endCoords.lat],
        ];
        routeDistance = Math.sqrt(
          Math.pow(endCoords.lat - startCoords.lat, 2) +
            Math.pow(endCoords.lon - startCoords.lon, 2)
        ) * 111;
      }
    }

    const routeData = processRoute({
      routeType,
      mode,
      time: parseInt(time),
      start,
      end: end || null,
      startCoords,
      endCoords,
    });

    const route = await Route.create({
      start,
      end: end || null,
      routeType,
      mode,
      time: parseInt(time),
      distance: routeDistance || routeData.distance,
      calculatedDistance: routeDistance || routeData.distance,
      duration: routeDuration || routeData.duration,
      dogParks: routeData.dogParks,
      routeCoordinates: routeCoordinates,
      coordinates: {
        start: startCoords,
        end: endCoords,
      },
    });

    return Response.json(route, { status: 201 });
  } catch (error) {
    console.error('Error saving route:', error);
    return Response.json({ error: error.message }, { status: 400 });
  }
}

export async function GET() {
  try {
    await dbConnect();

    const routes = await Route.find({}).sort({ createdAt: -1 });
    return Response.json(routes);
  } catch (error) {
    console.error('Error fetching routes:', error);
    return Response.json({ error: error.message }, { status: 400 });
  }
}
