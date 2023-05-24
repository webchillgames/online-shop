<template>
  <div class="pickup-points">
    <div class="wrapper">
      <h2>{{ $t('pickupPoints') }}</h2>

      <div class="pickup-points__content">
        <div class="pickup-points__map" id="map" ref="mapRef"></div>

        <div class="pickup-points__points">
          <div v-if="points.length">
            <PointInfo
              v-for="p in points"
              :key="p.id"
              :point="p"
              @togglePointShowing="togglePointShowing"
              :current="currentPointInfo === p.id"
            />
          </div>
          <div v-else>
            <p>{{ $t('nothingFound') }}...</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'

import 'leaflet/dist/leaflet.css'
import PointInfo from '@/components/PointInfo.vue'

import { customAxios } from '@/services/customAxios'
import type { IPoint } from '@/interfaces'

import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

const CENTER = { lat: -8.6538237, lng: 115.1825386 }

export default defineComponent({
  components: {
    PointInfo
  },
  setup() {
    const zoom = ref(10)
    const points = ref<IPoint[]>([])
    const map = ref<L.Map>()
    const mapRef = ref()
    const currentMarkers = ref<L.Marker[]>()
    const currentPointInfo = ref<null | number>(null)

    const markers = computed(() => {
      const options = {
        title: 'pickup poin',
        riseOnHover: true,
        clickable: true,
        interactive: true
      }
      return points.value.map((v) =>
        L.marker({ lat: v.coords[0], lng: v.coords[1] }, options).on('click', () =>
          togglePopupShowing(v)
        )
      )
    })

    async function getPoints() {
      try {
        const r = await customAxios.get('/api/points.json')
        return r.data.points
      } catch (e) {
        console.log("there aren't any points")
        return []
      }
    }

    function createMapContainer(mapRef: HTMLElement) {
      const options = {
        trackResize: true,
        preferCanvas: true
      }
      return L.map(mapRef, options).setView(CENTER, 10)
    }

    function setTileLayer(mapDiv: L.Map) {
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18
      }).addTo(mapDiv)
    }

    function addMarkersToMap() {
      if (map.value && currentMarkers.value) {
        currentMarkers.value.forEach((v) => v.addTo(map.value as L.Map))
      }
    }

    function clearMap() {
      if (currentMarkers.value) {
        currentMarkers.value.forEach((v) => v.remove())
        currentMarkers.value = []
      }
    }

    function setCurrentMarkers(point?: IPoint) {
      if (point) {
        currentMarkers.value = []
        currentMarkers.value.push(
          L.marker({ lat: point.coords[0], lng: point.coords[1] }).on('click', () =>
            togglePopupShowing(point)
          )
        )
      } else {
        currentMarkers.value = markers.value
      }
    }

    function togglePointShowing(point: IPoint) {
      console.log(33);
      
      clearMap()

      if (currentPointInfo.value !== point.id) {
        currentPointInfo.value = point.id
        setCurrentMarkers(point)
      } else {
        currentPointInfo.value = null
        setCurrentMarkers()
      }

      addMarkersToMap()
    }

    function togglePopupShowing(point: IPoint) {
      const popLocation = new L.LatLng(point.coords[0], point.coords[1])

      togglePointShowing(point)

      const popup = L.popup().setLatLng(popLocation).setContent(`
          <div>
            <p>${point.info.title}</p>
            <p>${point.info.street}</p>
            
            <ul>
               <li>
                <span>${point.info.workingHours[0].day}:</span>
                <span> ${point.info.workingHours[0].from} - ${point.info.workingHours[0].to}</span>
              </li>
              <li>
                <span>${point.info.workingHours[1].day}:</span>
                <span> ${point.info.workingHours[1].from} - ${point.info.workingHours[1].to}</span>
              </li>
              <li>
                <span>${point.info.workingHours[2].day}:</span>
                <span> ${point.info.workingHours[2].from} - ${point.info.workingHours[2].to}</span>
              </li>
              <li>
                <span>${point.info.workingHours[3].day}:</span>
                <span> ${point.info.workingHours[3].from} - ${point.info.workingHours[3].to}</span>
              </li>
              <li>
                <span>${point.info.workingHours[4].day}:</span>
                <span> ${point.info.workingHours[4].from} - ${point.info.workingHours[4].to}</span>
              </li>
              <li>
                <span>${point.info.workingHours[5].day}:</span>
                <span> ${
                  point.info.workingHours[5].from ? point.info.workingHours[5].from : 'closed'
                }
                </span>
              </li>
              <li>
                <span>${point.info.workingHours[6].day}:</span>
                <span> ${
                  point.info.workingHours[6].from ? point.info.workingHours[6].from : 'closed'
                }</span>
              </li>
            </ul>
          </div>
      `).on('remove', () => togglePointShowing(point))

      if (map.value) {
        popup.openOn(map.value)
      }
    }

    onMounted(async () => {
      points.value = await getPoints()
      map.value = createMapContainer(mapRef.value)
      setTileLayer(map.value)
      setCurrentMarkers()
      addMarkersToMap()
    })

    return {
      zoom,
      points,
      togglePointShowing,
      togglePopupShowing,
      mapRef,
      map,
      markers,
      currentPointInfo
    }
  }
})
</script>

<style lang="scss">
.pickup-points {
  height: 100%;

  .wrapper {
    padding-bottom: 40px;
  }

  h2 {
    text-transform: capitalize;
  }

  &__map {
    flex-shrink: 0;
    border-radius: 8px;
    overflow: hidden;
    width: 100%;
    aspect-ratio: 1 / 1;
    position: relative;
    z-index: 90;
  }

  &__points {
    margin-top: 40px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    flex-wrap: wrap;
    // width: 50%;
    // aspect-ratio: 1 / 1;
    // overflow-y: scroll;
    // padding: 20px;

    // &::-webkit-scrollbar {
    //   width: 10px;
    // }

    // &::-webkit-scrollbar-track {
    //   background-color: $bg;
    // }

    // &::-webkit-scrollbar-thumb {
    //   border-radius: 4px;
    //   background-image: linear-gradient(
    //     to top,
    //     #85b839,
    //     #9eba2f,
    //     #b7bb29,
    //     #cfbb26,
    //     #e7bb2a,
    //     #ffb933
    //   );
    // }

    // scrollbar-color: linear-gradient(to top, #85b839, #9eba2f, #b7bb29, #cfbb26, #e7bb2a, #ffb933);
    // scrollbar-width: thin;
  }

  @media (max-width: 768px) {
    &__points {
      grid-template-columns: 1fr;
    }
  }
}
</style>
