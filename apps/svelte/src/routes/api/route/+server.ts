import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { RequestHandler } from './$types';

// Decode Google Polyline encoded geometry
function decodePolyline(encoded: string): [number, number][] {
  const coords: [number, number][] = [];
  let index = 0;
  let lat = 0;
  let lng = 0;

  while (index < encoded.length) {
    let shift = 0;
    let result = 0;
    let byte: number;

    do {
      byte = encoded.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);

    const dlat = result & 1 ? ~(result >> 1) : result >> 1;
    lat += dlat;

    shift = 0;
    result = 0;

    do {
      byte = encoded.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);

    const dlng = result & 1 ? ~(result >> 1) : result >> 1;
    lng += dlng;

    coords.push([lat / 1e5, lng / 1e5]);
  }

  return coords;
}

// Map route types to Google Directions API modes
function mapRouteType(routeType: string): string {
  const mapping: Record<string, string> = {
    walk: 'walking',
    drive: 'driving',
    pt: 'transit',
    walking: 'walking',
    driving: 'driving',
    transit: 'transit',
  };
  return mapping[routeType] || 'walking';
}

// Get icon for step based on travel mode and maneuver
function getStepIcon(step: any): string {
  const travelMode = step.travel_mode?.toLowerCase();

  if (travelMode === 'transit') {
    const vehicleType = step.transit_details?.line?.vehicle?.type?.toLowerCase();
    if (vehicleType === 'bus') return 'directions_bus';
    if (vehicleType === 'subway' || vehicleType === 'metro_rail') return 'subway';
    if (vehicleType === 'rail' || vehicleType === 'commuter_train') return 'train';
    if (vehicleType === 'tram' || vehicleType === 'light_rail') return 'tram';
    return 'directions_transit';
  }

  if (travelMode === 'driving') return 'directions_car';

  // Walking - check maneuver
  const maneuver = step.maneuver || '';
  if (maneuver.includes('left')) return 'turn_left';
  if (maneuver.includes('right')) return 'turn_right';
  if (maneuver.includes('uturn')) return 'u_turn_left';
  if (maneuver.includes('roundabout')) return 'roundabout_right';

  return 'straight';
}

export const GET: RequestHandler = async ({ url }) => {
  const startLat = url.searchParams.get('startLat');
  const startLng = url.searchParams.get('startLng');
  const endLat = url.searchParams.get('endLat');
  const endLng = url.searchParams.get('endLng');
  const routeType = url.searchParams.get('routeType') || 'walk';

  if (!startLat || !startLng || !endLat || !endLng) {
    return json({ error: 'Missing coordinates' }, { status: 400 });
  }

  const apiKey = env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    return json({ error: 'Google Maps API key not configured' }, { status: 500 });
  }

  try {
    const mode = mapRouteType(routeType);
    const origin = `${startLat},${startLng}`;
    const destination = `${endLat},${endLng}`;

    const googleUrl = new URL('https://maps.googleapis.com/maps/api/directions/json');
    googleUrl.searchParams.set('origin', origin);
    googleUrl.searchParams.set('destination', destination);
    googleUrl.searchParams.set('mode', mode);
    googleUrl.searchParams.set('key', apiKey);
    googleUrl.searchParams.set('region', 'sg');

    // For transit, request alternatives
    if (mode === 'transit') {
      googleUrl.searchParams.set('alternatives', 'false');
    }

    const response = await fetch(googleUrl.toString());

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Google Directions error:', errorText);
      return json({ error: 'Route request failed' }, { status: response.status });
    }

    const data = await response.json();

    if (data.status !== 'OK') {
      console.error('Google Directions API status:', data.status, data.error_message);
      return json({
        error: data.error_message || `Route not found: ${data.status}`,
        status: data.status
      }, { status: 400 });
    }

    const route = data.routes[0];
    const leg = route.legs[0];

    // Build coordinates from overview polyline
    const coordinates = decodePolyline(route.overview_polyline.points);

    // Build instructions from steps
    const instructions: Array<{
      instruction: string;
      distance: number;
      duration: number;
      streetName: string;
      icon: string;
      travelMode: string;
      transitDetails?: {
        lineName: string;
        lineShortName: string;
        vehicleType: string;
        departureStop: string;
        arrivalStop: string;
        numStops: number;
        headsign: string;
      };
    }> = [];

    for (const step of leg.steps) {
      const instruction: any = {
        instruction: step.html_instructions?.replace(/<[^>]*>/g, '') || '',
        distance: step.distance?.value || 0,
        duration: step.duration?.value || 0,
        streetName: '',
        icon: getStepIcon(step),
        travelMode: step.travel_mode?.toLowerCase() || 'walking',
      };

      // Add transit details if available
      if (step.transit_details) {
        const td = step.transit_details;
        instruction.transitDetails = {
          lineName: td.line?.name || '',
          lineShortName: td.line?.short_name || '',
          vehicleType: td.line?.vehicle?.type || '',
          departureStop: td.departure_stop?.name || '',
          arrivalStop: td.arrival_stop?.name || '',
          numStops: td.num_stops || 0,
          headsign: td.headsign || '',
        };
      }

      instructions.push(instruction);

      // For transit mode, also include walking sub-steps
      if (step.steps) {
        for (const subStep of step.steps) {
          instructions.push({
            instruction: subStep.html_instructions?.replace(/<[^>]*>/g, '') || '',
            distance: subStep.distance?.value || 0,
            duration: subStep.duration?.value || 0,
            streetName: '',
            icon: getStepIcon(subStep),
            travelMode: subStep.travel_mode?.toLowerCase() || 'walking',
          });
        }
      }
    }

    const result = {
      success: true,
      distance: leg.distance?.value || 0,
      duration: leg.duration?.value || 0,
      distanceText: leg.distance?.text || '',
      durationText: leg.duration?.text || '',
      startAddress: leg.start_address || '',
      endAddress: leg.end_address || '',
      coordinates,
      instructions,
      mode,
    };

    return json(result);
  } catch (error) {
    console.error('Route error:', error);
    return json({ error: 'Failed to get route' }, { status: 500 });
  }
};
