<script lang="ts">
  import { onMount } from "svelte";
  import type { Map as LeafletMap, Marker } from "leaflet";
  import Swiper from 'swiper';
  import { Navigation, Pagination } from 'swiper/modules';
  import 'swiper/swiper-bundle.css';
  import { fly, fade } from "svelte/transition";
  import { locations, areaPolygons } from "$lib/utils/DummyData";

  let mapContainer: HTMLDivElement;
  let map: LeafletMap;
  let markers: Marker[] = [];
  let selectedLocation: any = null;
  let showModal = false;
  let showFullscreen3D = false;
  let swiperContainer: HTMLDivElement;
  let swiperInstance: Swiper | null = null;
  let currentModelIndex = 0;

  // Wayfinding state
  let wayfindingMode = false;
  let startPoint: any = null;
  let endPoint: any = null;
  let routingControl: any = null;
  let routeLine: any = null;
  let routeMarkers: any[] = [];
  let routeInstructions: any[] = [];
  let routeDistance: string = '';
  let routeDuration: string = '';
  let selectedRouteType: 'walk' | 'drive' | 'pt' = 'walk';
  let isLoadingRoute = false;

  const routeTypes = [
    { id: 'walk', label: 'Walk', icon: 'directions_walk' },
    { id: 'pt', label: 'Public Transport', icon: 'directions_transit' },
    { id: 'drive', label: 'Drive', icon: 'directions_car' },
  ] as const;

  function getCategoryColor(category: string): string {
    const colors: Record<string, string> = {
      "Highlight Experiences": "#ef4444",
      "Projection Mapping": "#3b82f6",
      "Night Lights": "#ec4899",
      "Festival Villages": "#8b5cf6",
      "Performances": "#10b981",
      "Experiential Programmes": "#f59e0b",
      "National Day Activations": "#06b6d4",
    };
    return colors[category] || "#6366f1";
  }

  function handleMarkerClick(location: any) {
    if (wayfindingMode) {
      if (!startPoint) {
        startPoint = location;
      } else if (!endPoint && location.id !== startPoint.id) {
        endPoint = location;
        createRoute();
      }
    } else {
      openLocation(location);
    }
  }

  function toggleWayfinding() {
    wayfindingMode = !wayfindingMode;
    if (!wayfindingMode) {
      clearRoute();
    }
  }

  function clearRoute() {
    startPoint = null;
    endPoint = null;
    routeInstructions = [];
    routeDistance = '';
    routeDuration = '';
    if (routingControl && map) {
      map.removeControl(routingControl);
      routingControl = null;
    }
    if (routeLine && map) {
      map.removeLayer(routeLine);
      routeLine = null;
    }
    // Remove route markers
    routeMarkers.forEach(marker => {
      if (map) map.removeLayer(marker);
    });
    routeMarkers = [];
  }

  function getDirectionIcon(type: string, modifier: string): string {
    if (type === 'depart') return 'play_arrow';
    if (type === 'arrive') return 'flag';
    if (type === 'turn') {
      if (modifier?.includes('left')) return 'turn_left';
      if (modifier?.includes('right')) return 'turn_right';
      return 'straight';
    }
    if (type === 'continue') return 'straight';
    if (type === 'roundabout') return 'roundabout_right';
    return 'straight';
  }

  function formatDistance(meters: number): string {
    if (meters < 1000) return `${Math.round(meters)} m`;
    return `${(meters / 1000).toFixed(1)} km`;
  }

  function formatDuration(seconds: number): string {
    const mins = Math.round(seconds / 60);
    if (mins < 60) return `${mins} min`;
    const hrs = Math.floor(mins / 60);
    const remainMins = mins % 60;
    return `${hrs} hr ${remainMins} min`;
  }

  async function createRoute() {
    if (!startPoint || !endPoint || !map) return;

    isLoadingRoute = true;
    const L = await import("leaflet");

    // Remove existing route
    if (routeLine) {
      map.removeLayer(routeLine);
    }
    routeMarkers.forEach(marker => map.removeLayer(marker));
    routeMarkers = [];
    routeInstructions = [];

    const startCoords: [number, number] = [startPoint.coords[0], startPoint.coords[1]];
    const endCoords: [number, number] = [endPoint.coords[0], endPoint.coords[1]];

    // Try to get route from OneMap API
    try {
      const params = new URLSearchParams({
        startLat: startCoords[0].toString(),
        startLng: startCoords[1].toString(),
        endLat: endCoords[0].toString(),
        endLng: endCoords[1].toString(),
        routeType: selectedRouteType,
      });

      const response = await fetch(`/api/route?${params}`);
      const data = await response.json();

      if (data.success && data.coordinates?.length > 0) {
        // Different colors for different route types
        const routeColors = {
          walk: '#FF6B6B',
          pt: '#4ECDC4',
          drive: '#FFD93D',
        };

        routeLine = L.polyline(data.coordinates, {
          color: routeColors[selectedRouteType],
          weight: 5,
          opacity: 0.9,
        }).addTo(map);

        routeDistance = formatDistance(data.distance);
        routeDuration = formatDuration(data.duration);

        if (data.instructions?.length > 0) {
          routeInstructions = data.instructions.map((step: any) => ({
            instruction: step.instruction || 'Continue',
            distance: formatDistance(step.distance),
            icon: step.icon || 'straight',
            travelMode: step.travelMode || 'walking',
            transitDetails: step.transitDetails || null,
          }));
        }
      } else {
        throw new Error(data.error || 'No route found');
      }
    } catch (error) {
      console.log('Google routing failed, using straight line:', error);
      // Fallback to straight line
      routeLine = L.polyline([startCoords, endCoords], {
        color: '#FF6B6B',
        weight: 4,
        opacity: 0.8,
        dashArray: '10, 10',
      }).addTo(map);
      routeInstructions = [{ instruction: 'Walk directly to destination', icon: 'straight', distance: '', travelMode: 'walking', transitDetails: null }];
      isLoadingRoute = false;
    }

    // Add start and end markers
    const startMarker = L.circleMarker(startCoords, {
      radius: 10,
      fillColor: '#22c55e',
      color: '#fff',
      weight: 3,
      fillOpacity: 1,
    }).addTo(map).bindPopup(`Start: ${startPoint.name}`);

    const endMarker = L.circleMarker(endCoords, {
      radius: 10,
      fillColor: '#ef4444',
      color: '#fff',
      weight: 3,
      fillOpacity: 1,
    }).addTo(map).bindPopup(`End: ${endPoint.name}`);

    routeMarkers.push(startMarker, endMarker);

    // Fit map to show the route
    map.fitBounds(routeLine.getBounds(), { padding: [50, 50] });
    isLoadingRoute = false;
  }

  function openLocation(location: any) {
    selectedLocation = location;
    showModal = true;
  }

  function closeModal() {
    showModal = false;
    selectedLocation = null;
  }

  function openFullscreen3D() {
    showFullscreen3D = true;
  }

  function closeFullscreen3D() {
    showFullscreen3D = false;
  }

  function initSwiper() {
    if (swiperContainer && !swiperInstance) {
      swiperInstance = new Swiper(swiperContainer, {
        modules: [Navigation, Pagination],
        slidesPerView: 1,
        spaceBetween: 0,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        on: {
          slideChange: (swiper: Swiper) => {
            currentModelIndex = swiper.activeIndex;
          }
        }
      });
    }
  }

  function destroySwiper() {
    if (swiperInstance) {
      swiperInstance.destroy(true, true);
      swiperInstance = null;
    }
  }

  $: if (showModal && selectedLocation?.models?.length > 1) {
    setTimeout(() => initSwiper(), 100);
  } else {
    destroySwiper();
  }

  onMount(() => {
    (async () => {
      const L = await import("leaflet");
      await import("leaflet/dist/leaflet.css");

      // Singapore coordinates (centered on civic district / heritage area)
      const singaporeCenter: [number, number] = [1.2903, 103.8515];

      map = L.map(mapContainer, {
        zoomControl: false,
        attributionControl: false,
        center: singaporeCenter,
        zoom: 15,
        minZoom: 12,
        maxZoom: 18,
      });

      // Add CartoDB Dark Matter (dark mode style)
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
      }).addTo(map);

      // Add area polygons
      areaPolygons.forEach((area) => {
        L.polygon(area.coordinates as [number, number][], {
          color: area.color,
          fillColor: area.color,
          fillOpacity: 0.15,
          weight: 2,
        }).addTo(map).bindPopup(area.name);
      });

      L.control.zoom({ position: "bottomright" }).addTo(map);


      locations.forEach((location) => {
        const color = getCategoryColor(location.category);

        const marker = L.marker(location.coords as [number, number], {
          icon: L.divIcon({
            className: "!bg-transparent !border-none",
            html: `
              <div class="flex flex-col items-center cursor-pointer group">
                <div class="w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-110" style="background-color: ${color}">
                  <span class="text-white text-sm font-bold">${location.id}</span>
                </div>
                <div class="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent -mt-1" style="border-top-color: ${color}"></div>
              </div>
            `,
            iconSize: [32, 40],
            iconAnchor: [16, 40],
          }),
        }).addTo(map);

        marker.bindTooltip(location.name, { direction: 'top', offset: [0, -40] });
        marker.on("click", () => handleMarkerClick(location));
        markers.push(marker);
      });

      setTimeout(() => {
        map.invalidateSize();
      }, 100);
    })();

    return () => {
      if (map) map.remove();
    };
  });
</script>

<div class="relative w-full h-full min-h-[700px]">
  <div class="w-full h-full z-0" bind:this={mapContainer}></div>

  <!-- <div
    class="absolute bottom-8 left-1/2 -translate-x-1/2 z-[1000] pointer-events-none"
  >
    <div
      class="bg-black/70 backdrop-blur-md text-white px-8 py-4 rounded-full text-center shadow-lg"
    >
      <h3 class="m-0 mb-1 text-lg font-bold">Heritage Trail Map</h3>
      <p class="m-0 text-sm opacity-80">
        Drag to pan • Scroll to zoom • Click markers to explore
      </p>
    </div>
  </div> -->

  {#if showModal && selectedLocation}
  
    <div
    transition:fade={{ duration: 200 }}
      class="fixed inset-0 bg-black/80 backdrop-blur-sm z-10000 flex items-start md:items-center justify-center p-2 md:p-16 animate-[fadeIn_0.3s_ease] overflow-y-auto md:overflow-y-hidden scrollbar scrollbar-thumb-blue-500 scrollbar-track-gray-200"
      role="presentation"
      on:keydown={(e) => e.key === "Escape" && closeModal()}
    >
      <!-- svelte-ignore a11y_interactive_supports_focus -->
      <div
        class="w-full max-w-6xl relative overflow-hidden animate-[slideUp_0.4s_ease] m-auto flex flex-col lg:flex-row bg-main-dark-secondary rounded-2xl border border-main-accent/20 p-10 pt-20 md:p-20 md:pt-20 lg:p-16 lg:pt-16"
        role="dialog"
        on:click|stopPropagation
        on:keydown|stopPropagation
      >
        <button
          class="absolute top-[1rem] right-[1rem] w-10 h-10 rounded-md bg-main-accent text-white text-xl border-none cursor-pointer z-20 hover:bg-main-accent/80 transition-all flex items-center justify-center"
          on:click={closeModal}>✕</button
        >

        <!-- Left Column - 3D Model Viewer -->
        <div class="w-full lg:w-1/2 bg-[#1a1a2e] flex flex-col items-center justify-center min-h-[200px] md:min-h-[300px] lg:min-h-[450px] relative border-2 border-main-accent/30 rounded-lg shadow-[0_0_30px_0_rgba(255,107,107,0.15)]">
          {#if selectedLocation.models && selectedLocation.models.length > 1}
            <!-- Swiper for multiple models -->
            <div class="swiper w-full h-full" bind:this={swiperContainer}>
              <div class="swiper-wrapper">
                {#each selectedLocation.models as modelSrc, index}
                  <div class="swiper-slide">
                    <model-viewer
                      src={modelSrc}
                      alt="3D model {index + 1} of {selectedLocation.name}"
                      auto-rotate
                      camera-controls
                      shadow-intensity="1"
                      class="w-full h-full min-h-[250px] md:min-h-[300px]"
                    ></model-viewer>
                  </div>
                {/each}
              </div>
              <div class="swiper-pagination"></div>
              <div class="swiper-button-prev"></div>
              <div class="swiper-button-next"></div>
            </div>
          {:else}
            <!-- Single model -->
            <model-viewer
              src={selectedLocation.models?.[0] || "https://socialservicestrail.sg/upload/file/sites/673190474e016718e803270e/Former%20Social%20Welfare%20Department.glb"}
              alt="3D model of {selectedLocation.name}"
              auto-rotate
              camera-controls
              shadow-intensity="1"
              class="w-full h-full min-h-[250px] md:min-h-[300px]"
            ></model-viewer>
          {/if}
          
          <!-- Fullscreen Button -->
          <button
            class="absolute bottom-4 right-4 w-10 h-10 rounded-md bg-main-accent text-white border-none cursor-pointer z-10 hover:bg-main-accent/80 transition-all flex items-center justify-center shadow-lg"
            on:click={openFullscreen3D}
            title="View Fullscreen"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
            </svg>
          </button>
        </div>

        <!-- Right Column - Details -->
        <div
          class="w-full lg:w-1/2 py-8 md:py-8 lg:p-8 flex flex-col justify-center relative"
        >
          <div class="relative z-10">
            <h2 class="font-averia m-0 mb-2 text-3xl md:text-3xl lg:text-3xl xl:text-4xl font-bold leading-tight text-white italic">
              {selectedLocation.name}
            </h2>
            <p class="font-averia m-0 text-md md:text-lg lg:text-xl xl:text-xl text-main-accent font-medium italic">
              {selectedLocation.subname}
            </p>
            <hr class="h-px my-4 bg-white/20 border-0">
            <p class="text-white/80 leading-relaxed text-base mb-8">
              {selectedLocation.description}
            </p>
            <a href="/explore/single">
              <button
              class="px-12 py-3 rounded-lg font-semibold bg-main-accent text-white hover:brightness-110 transition-all border-none cursor-pointer flex items-center gap-2 justify-center"
              > <span class="material-symbols-outlined">visibility</span>
              More Details
            </button>
          </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Fullscreen 3D Model Popup -->
    {#if showFullscreen3D}
      <div
  in:fade={{ duration: 300, delay: 300 }}
  out:fade={{ duration: 300 }}
        class="fixed inset-0 bg-black/95 z-[10001] flex items-center justify-center animate-[fadeIn_0.3s_ease]"
        role="presentation"
        on:keydown={(e) => e.key === "Escape" && closeFullscreen3D()}
      >
        <!-- svelte-ignore a11y_interactive_supports_focus -->
        <div
          class="w-full h-full max-w-[95vw] max-h-[95vh] relative"
          role="dialog"
          on:click|stopPropagation
          on:keydown|stopPropagation
        >
          <button
            class="absolute top-16 right-4 w-12 h-12 rounded-md bg-main-accent text-white text-2xl border-none cursor-pointer z-20 hover:bg-main-accent/90 transition-all flex items-center justify-center"
            on:click={closeFullscreen3D}>✕</button
          >
          
          <model-viewer
            src="https://socialservicestrail.sg/upload/file/sites/673190474e016718e803270e/Former%20Social%20Welfare%20Department.glb"
            alt="3D model of {selectedLocation.name}"
            auto-rotate
            camera-controls
            shadow-intensity="1"
            environment-image="neutral"
            exposure="1"
            class="w-full h-full"
          ></model-viewer>
        </div>
      </div>
    {/if}
  {/if}

  <!-- Feedback Button -->
  <button class="absolute bottom-[10px] left-[30px] z-[400] bg-main-accent text-white font-semibold px-6 py-3 rounded-xl flex gap-2 hover:brightness-110 transition-all">
    <span class="material-symbols-outlined">feedback</span>
    Feedback
  </button>

  <!-- Zone Legend -->
  <div class="absolute top-[110px] left-[30px] z-[400] bg-main-dark-secondary/95 backdrop-blur-md rounded-xl shadow-lg border border-main-accent/20 p-4">
    <h3 class="text-sm font-semibold text-white mb-3 flex items-center gap-2">
      <span class="material-symbols-outlined text-lg">map</span>
      Festival Zones
    </h3>
    <div class="space-y-2">
      {#each areaPolygons as zone}
        <button
          class="flex items-center gap-3 w-full text-left hover:bg-white/10 rounded-lg px-2 py-1.5 transition-colors"
          on:click={() => {
            if (map) {
              const bounds = zone.coordinates;
              const centerLat = bounds.reduce((sum, coord) => sum + coord[0], 0) / bounds.length;
              const centerLng = bounds.reduce((sum, coord) => sum + coord[1], 0) / bounds.length;
              map.flyTo([centerLat, centerLng], 16);
            }
          }}
        >
          <div
            class="w-4 h-4 rounded-sm shrink-0"
            style="background-color: {zone.color};"
          ></div>
          <span class="text-sm text-white/80">{zone.name}</span>
        </button>
      {/each}
    </div>
  </div>

  <!-- Wayfinding Panel -->
  {#if wayfindingMode}
    <div class="absolute top-[110px] left-[30px] z-[100000] bg-main-dark-secondary/95 backdrop-blur-md rounded-xl shadow-lg border border-main-accent/20 p-4 w-[320px] max-h-[calc(100vh-200px)] overflow-hidden flex flex-col">
      <div class="flex items-center justify-between mb-3">
        <h3 class="font-semibold text-white">Wayfinding</h3>
        <button
          class="text-white/50 hover:text-white"
          on:click={toggleWayfinding}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Start/End Points -->
      <div class="space-y-2 text-sm mb-3">
        <div class="flex items-center gap-2">
          <div class="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs shrink-0">A</div>
          <span class="text-white/70 truncate">
            {startPoint ? startPoint.name : 'Select starting point'}
          </span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-6 h-6 rounded-full bg-main-accent flex items-center justify-center text-white text-xs shrink-0">B</div>
          <span class="text-white/70 truncate">
            {endPoint ? endPoint.name : 'Select destination'}
          </span>
        </div>
      </div>

      <!-- Route Type Selector -->
      <div class="mb-3">
        <h4 class="text-xs font-semibold text-white/50 uppercase mb-2">Travel Mode</h4>
        <div class="flex gap-1">
          {#each routeTypes as rt}
            <button
              class="flex-1 flex flex-col items-center gap-1 py-2 px-2 rounded-lg text-xs transition-colors
                     {selectedRouteType === rt.id
                       ? 'bg-main-accent text-white'
                       : 'bg-white/10 text-white/70 hover:bg-white/20'}"
              on:click={() => {
                selectedRouteType = rt.id;
                if (startPoint && endPoint) createRoute();
              }}
            >
              <span class="material-symbols-outlined text-lg">{rt.icon}</span>
              <span class="font-medium">{rt.label}</span>
            </button>
          {/each}
        </div>
      </div>

      <!-- Route Summary -->
      {#if routeDistance && routeDuration}
        <div class="flex items-center gap-4 py-2 px-3 bg-main-accent/20 rounded-lg mb-3">
          <div class="flex items-center gap-1 text-white">
            <span class="material-symbols-outlined text-lg">
              {selectedRouteType === 'walk' ? 'directions_walk' : selectedRouteType === 'pt' ? 'directions_transit' : 'directions_car'}
            </span>
            <span class="font-semibold">{routeDistance}</span>
          </div>
          <div class="flex items-center gap-1 text-white">
            <span class="material-symbols-outlined text-lg">schedule</span>
            <span class="font-semibold">{routeDuration}</span>
          </div>
        </div>
      {/if}

      <!-- Loading indicator -->
      {#if isLoadingRoute}
        <div class="flex items-center justify-center py-4">
          <div class="animate-spin rounded-full h-6 w-6 border-2 border-main-accent border-t-transparent"></div>
          <span class="ml-2 text-sm text-white/70">Finding route...</span>
        </div>
      {/if}

      <!-- Turn-by-turn Instructions -->
      {#if routeInstructions.length > 0 && !isLoadingRoute}
        <div class="flex-1 overflow-y-auto">
          <h4 class="text-xs font-semibold text-white/50 uppercase mb-2">Directions</h4>
          <div class="space-y-1">
            {#each routeInstructions as step, i}
              <div class="flex items-start gap-3 py-2 px-2 hover:bg-white/5 rounded-lg">
                <div class="w-8 h-8 rounded-full flex items-center justify-center shrink-0
                            {step.travelMode === 'transit' ? 'bg-blue-500/20' : 'bg-main-accent/20'}">
                  <span class="material-symbols-outlined text-lg
                              {step.travelMode === 'transit' ? 'text-blue-400' : 'text-main-accent'}">
                    {step.icon}
                  </span>
                </div>
                <div class="flex-1 min-w-0">
                  {#if step.transitDetails}
                    <!-- Transit step with details -->
                    <div class="text-sm text-white/90">
                      <div class="flex items-center gap-2 mb-1">
                        <span class="px-2 py-0.5 bg-blue-500 text-white text-xs font-bold rounded">
                          {step.transitDetails.lineShortName || step.transitDetails.lineName}
                        </span>
                        {#if step.transitDetails.headsign}
                          <span class="text-xs text-white/50">towards {step.transitDetails.headsign}</span>
                        {/if}
                      </div>
                      <p class="text-xs text-white/70">
                        {step.transitDetails.departureStop} → {step.transitDetails.arrivalStop}
                      </p>
                      <p class="text-xs text-white/50">{step.transitDetails.numStops} stops</p>
                    </div>
                  {:else}
                    <!-- Walking/Driving step -->
                    <p class="text-sm text-white/90 leading-tight">{step.instruction}</p>
                  {/if}
                  {#if step.distance}
                    <p class="text-xs text-white/50 mt-0.5">{step.distance}</p>
                  {/if}
                </div>
              </div>
            {/each}
          </div>
        </div>
      {/if}

      {#if startPoint || endPoint}
        <button
          class="mt-3 w-full py-2 px-4 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm transition-colors shrink-0"
          on:click={clearRoute}
        >
          Clear Route
        </button>
      {/if}
    </div>
  {/if}

  <!-- Wayfinding Toggle Button -->
  <button
    class="absolute bottom-[150px] right-[30px] z-[400]
           w-[44px] h-[44px] flex justify-center items-center
           rounded-lg border-[3px] transition-all cursor-pointer
           {wayfindingMode
             ? 'border-green-500 bg-green-500 text-white shadow-lg shadow-green-500/40'
             : 'border-blue-500 bg-blue-500 text-white hover:bg-blue-600 hover:border-blue-600 shadow-lg shadow-blue-500/40'}"
    on:click={toggleWayfinding}
    title="Get Directions"
  >
    <span class="material-symbols-outlined text-xl">directions</span>
  </button>

  <!-- Reset View Button -->
  <button
    class="absolute bottom-[100px] right-[30px] z-[400]
           w-[40px] h-[40px] flex justify-center items-center
           rounded-lg border-[3px] border-main-accent bg-main-dark-secondary text-main-accent
           hover:bg-main-accent hover:text-white transition-colors cursor-pointer shadow-md"
    on:click={() => {
       map.flyTo([1.2903, 103.8515], 15);
    }}
    title="Reset View"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
      <path d="M3 3v5h5"/>
    </svg>
  </button>
</div>

<style>
	/* custom Leaflet */
  :global(.leaflet-control-attribution) {
    display: none !important;
  }

  /* Hide routing machine instructions panel */
  :global(.leaflet-routing-container) {
    display: none !important;
  }

  :global(.leaflet-control-zoom) {
    border-radius: 8px !important;
	border: none !important;

    overflow: hidden;
    margin-top: 20px !important;
    margin-right: 30px !important;
	display: flex;
	flex-direction: column;
	gap: 5px;
  }

  :global(.leaflet-control-zoom a) {
    background-color: var(--main-dark-secondary) !important;
    color: var(--main-accent) !important;
    border: none !important;
    width: 40px !important;
    height: 40px !important;
    display: flex !important;
	justify-content: center !important;
	align-items: center !important;
    font-size: 20px !important;
	border-radius: 8px !important;
	border: 3px solid var(--main-accent) !important;
  }

  :global(.leaflet-control-zoom a:hover) {
    background-color: var(--main-accent) !important;
	color: white !important;
  }

  @keyframes markerFloat {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  @keyframes slideUp {
    from {
      transform: translateY(50px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>
