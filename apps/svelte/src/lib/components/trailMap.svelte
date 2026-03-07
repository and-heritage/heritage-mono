<script lang="ts">
  import { onMount } from "svelte";
  import type { Map as LeafletMap, ImageOverlay, Marker } from "leaflet";
  import { d } from "$lib/utils/DelayHelper";
  import Swiper from 'swiper';
  import { Navigation, Pagination } from 'swiper/modules';
  import 'swiper/swiper-bundle.css';
  import { fly, fade } from "svelte/transition";
  import { locations } from "$lib/utils/DummyData";


  let mapContainer: HTMLDivElement;
  let map: LeafletMap;
  let imageOverlay: ImageOverlay;
  let markers: Marker[] = [];
  let selectedLocation: any = null;
  let showModal = false;
  let showFullscreen3D = false;
  let swiperContainer: HTMLDivElement;
  let swiperInstance: Swiper | null = null;
  let currentModelIndex = 0;


  function getCategoryColor(category: string): string {
    const colors: Record<string, string> = {
      Healthcare: "#ef4444",
      Community: "#3b82f6",
      "Women & Family": "#ec4899",
      "Elderly Care": "#8b5cf6",
      Fundraising: "#10b981",
      Youth: "#f59e0b",
      "Social Services": "#06b6d4",
    };
    return colors[category] || "#6366f1";
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

      const imageWidth = 3840;
      const imageHeight = 2160;
      const bounds: [[number, number], [number, number]] = [
        [0, 0],
        [imageHeight, imageWidth],
      ];
      const minZoomLevel = -1; // (-0.5, -1, atau 0)
      map = L.map(mapContainer, {
        crs: L.CRS.Simple,
        minZoom: minZoomLevel,
        maxZoom: 1,
        zoomControl: false,
        attributionControl: false,
        center: [imageHeight / 2, imageWidth / 2],
        zoom: minZoomLevel,
        maxBounds: bounds, 
        maxBoundsViscosity: 1.0, 
      });

      L.control.zoom({ position: "bottomright" }).addTo(map);

      imageOverlay = L.imageOverlay("/assets/map/map-trail.png", bounds).addTo(map);

      imageOverlay.once("load", () => {
        map.fitBounds(bounds);
        map.invalidateSize();
      });

      map.fitBounds(bounds);


      locations.forEach((location) => {
        const color = getCategoryColor(location.category);

        const marker = L.marker(location.coords as [number, number], {
          icon: L.divIcon({
            
            className: "!bg-transparent !border-none", // Override default leaflet style
            html: `
                          <div data-aos="fade-in" data-aos-anchor="trailMap" data-aos-delay=${d(location.id)} class="relative flex flex-col items-center cursor-pointer animate-[markerFloat_3s_ease-in-out_infinite] group">
                              <div class="relative z-10 w-[50px] h-[50px] rounded-full flex items-center justify-center shadow-lg hover:-translate-y-2.5 transition-transform duration-300">
								<img src="/assets/icons/poin_location.svg" class="w-full absolute -z-10"/>
                                  <span class="text-main-cream text-xl font-extrabold absolute translate-y-[-9px]">${location.id}</span>
									<!--  Name  -->
									<div class="absolute right-[-250px] w-[280px] h-[70px] -z-20 opacity-0 group-hover:opacity-100 transition-all duration-200 " >
										<div class="relative w-full h-full object-center flex items-center" >
											<div class=" w-full font-poppins font-semibold text-main-brown text-[16px] ml-[45px]" >
												${location.name}
											</div>

										<img src="/assets/icons/poin_location_paper.png" class="w-full min-w-[200px] absolute -top-4 -z-10 object-contain object-center"/>
										</div>
                          			</div>
									<!--  Name  -->
                              </div>
                          </div>
									

                      `,
            iconSize: [200, 100],
            iconAnchor: [100, 80],
          }),
        }).addTo(map);

        marker.on("click", () => openLocation(location));
        markers.push(marker);
      });

      setTimeout(() => {
        map.invalidateSize();
        map.fitBounds(bounds);
      }, 100);
    })();

    return () => {
      if (map) map.remove();
    };
  });
</script>

<div class="relative w-full h-full min-h-[700px] bg-[#1a1a2e]">
  <div class="w-full h-full z-0 bg-[#1a1a2e]" bind:this={mapContainer}></div>

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
        class="w-full max-w-6xl relative overflow-hidden animate-[slideUp_0.4s_ease] m-auto  flex flex-col lg:flex-row bg-[#FFF8E3] lg:bg-transparent lg:bg-[url('/assets/images/bg-popup-details.svg')] bg-cover bg-center bg-no-repeat p-10 pt-20 md:p-20 md:pt-20 lg:p-35 lg:pt-50 xl:p-32 xl:pt-40"
        role="dialog"
        on:click|stopPropagation
        on:keydown|stopPropagation
      >
        <button
          class="absolute top-[1rem] right-[1rem] md:right-[5%] md:top-[3%] lg:right-[8%] lg:top-[9rem] xl:right-[8rem] xl:top-[6rem]  w-10 h-10 rounded-md bg-main-brown text-white text-xl border-none cursor-pointer z-20 hover:bg-main-brown/80 transition-all flex items-center justify-center"
          on:click={closeModal}>✕</button
        >

        <!-- Left Column - 3D Model Viewer -->
        <div class="w-full lg:w-1/2 bg-[#3A3A3A] flex flex-col items-center justify-center min-h-[200px] md:min-h-[300px] lg:min-h-[450px] relative border-8 border-white rounded-md shadow-[0_0_18px_0_rgba(117,71,62,0.3)]">
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
            class="absolute bottom-4 right-4 w-10 h-10 rounded-md bg-main-brown text-white border-none cursor-pointer z-10 hover:bg-main-brown/80 transition-all flex items-center justify-center shadow-lg"
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
            <h2 class="font-averia m-0 mb-2 text-3xl md:text-3xl lg:text-3xl xl:text-4xl  font-bold leading-tight text-main-brown italic">
              {selectedLocation.name}
            </h2>
            <p class="font-averia m-0 text-md md:text-lg lg:text-xl xl:text-xl text-main-brown/70 font-medium italic">
              {selectedLocation.subname}
            </p>
            <hr class="h-px my-4 bg-black/50 border-0">
            <p class="text-secondary leading-relaxed text-base mb-8">
              {selectedLocation.description}
            </p>
            <a href="/explore/single">
              <button
              class=" px-12 py-3 rounded-lg font-semibold bg-main-brown text-white hover:opacity-90 transition-colors border-none cursor-pointer flex items-center gap-2 justify-center"
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
            class="absolute top-16 right-4 w-12 h-12 rounded-md bg-main-brown text-white text-2xl border-none cursor-pointer z-20 hover:bg-main-brown/90 transition-all flex items-center justify-center"
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
</div>

<!-- additional button controller -->
 <button  class="absolute bottom-[10px] left-[30px] bg-main-brown text-white font-semibold px-6 py-3 rounded-xl flex gap-2">
<span class="material-symbols-outlined">
feedback
</span>
	Feedback
 </button>

 <button 
  class="absolute bottom-[100px] right-[30px] z-[400] 
         w-[40px] h-[40px] flex justify-center items-center
         rounded-lg border-[3px] border-main-brown bg-main-cream text-main-brown
         hover:bg-main-brown hover:text-main-cream transition-colors cursor-pointer shadow-md"
  on:click={() => {
     map.flyTo([2160 / 2, 3840 / 2], -1); 
  }}
  title="Reset View"
>
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
    <path d="M3 3v5h5"/>
  </svg>
</button>

<style>
	/* custom Leaflet */
  :global(.leaflet-control-attribution) {
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
    background-color: rgba(0, 0, 0, 0.7) !important;
    color: var(--main-brown) !important;
    border: none !important;
    width: 40px !important;
    height: 40px !important;
    display: flex !important;
	justify-content: center !important;
	align-items: center !important;
    font-size: 20px !important;
	border-radius: 8px !important;
	border: 3px solid var(--main-brown) !important;
	background-color: var(--main-cream) !important;


  }

  :global(.leaflet-control-zoom a:hover) {
    background-color: var(--main-brown) !important;
	    color: var(--main-cream) !important;

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
