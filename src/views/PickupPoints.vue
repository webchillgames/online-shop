<template>
  <div class="pickup-points">
    <div class="wrapper">
      <h2>{{ $t('pickupPoints') }}</h2>

      <div class="pickup-points__content">
        <div class="pickup-points__map" id="map" ref="mapRef">
          <CButton :title="$t('showAll')" />
        </div>

        <div class="pickup-points__points">
          <!-- <div v-if="points.length"> -->
          <PointInfo
            v-for="p in points"
            :key="p.id"
            :point="p"
            @toggleShowPoint="toggleShowPoint"
            :current="currentPointInfo === p.id"
          />
          <!-- </div> -->
          <!-- <div v-else>{{ $t('nothingFound') }}...</div> -->
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
import CButton from '@/components/CButton.vue'

const CENTER = { lat: -8.6538237, lng: 115.1825386 }

export default defineComponent({
  components: {
    PointInfo,
    CButton
  },
  setup() {
    const zoom = ref(10)
    const points = ref<IPoint[]>([])
    const map = ref<L.Map>()
    const mapRef = ref()
    // const markers = ref<L.Marker[]>([])
    const currentMarkers = ref<L.Marker[]>()
    const currentPointInfo = ref<null | number>(null)

    const markers = computed(() =>
      points.value.map((v) => L.marker({ lat: v.coords[0], lng: v.coords[1] }))
    )

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
      return L.map(mapRef).setView(CENTER, 10)
    }

    function setTileLayer(mapDiv: L.Map) {
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18
      }).addTo(mapDiv)
    }

    function setCurrentMarkers(point?: IPoint) {
      if (currentPointInfo.value && point) {
        currentMarkers.value = []
        currentMarkers.value.push(L.marker({ lat: point.coords[0], lng: point.coords[1] }))
      } else {
        currentMarkers.value = markers.value
      }
    }

    function addMarkersToMap() {
      console.log(currentMarkers.value)

      if (map.value && currentMarkers.value) {
        currentMarkers.value.forEach((v) => v.addTo(map.value as L.Map))
      }
    }

    function clearMap() {
      if (currentMarkers.value) {
        currentMarkers.value.forEach((v) => v.remove())
      }
    }

    function toggleShowPoint(point: IPoint, id: number) {
      if (map.value) {
        if (!currentPointInfo.value) {
          currentPointInfo.value = id
          clearMap()
          setCurrentMarkers(point)
          addMarkersToMap()
        } else if (currentPointInfo.value === id) {
          currentPointInfo.value = null
          clearMap()
          setCurrentMarkers()
          addMarkersToMap()
        }
      }
    }

    onMounted(async () => {
      points.value = await getPoints()
      map.value = createMapContainer(mapRef.value)
      setTileLayer(map.value)
      setCurrentMarkers()
      addMarkersToMap()
    })

    return { zoom, points, toggleShowPoint, mapRef, map, markers, currentPointInfo }
  }
})
</script>

<style lang="scss">
.pickup-points {
  height: 100%;
  .wrapper {
    padding-bottom: 40px;
  }

  &__content {
  }

  h2 {
    text-transform: capitalize;
  }

  &__map {
    flex-shrink: 0;
    border-radius: 8px;
    overflow: hidden;
    width: 50%;
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
}
</style>
