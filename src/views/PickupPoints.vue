<template>
  <div class="pickup-points">
    <div class="wrapper" v-if="points.length">
      <h2>{{ $t('pickupPoints') }}</h2>

      <div class="pickup-points__content">
        <div class="pickup-points__map" id="map"></div>

        <div class="pickup-points__points">
          <PointInfo v-for="p in points" :key="p.id" :point="p" @showPoint="showPoint" />
        </div>
      </div>
    </div>

    <div class="wrapper" v-else>{{ $t('nothingFound') }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'

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
    const map = ref()

    async function getPoints() {
      try {
        const r = await customAxios.get('/api/points.json')
        return r.data.points
      } catch (e) {
        console.log("there aren't any points")
        return []
      }
    }

    function createMapContainer() {
      return L.map('map').setView(CENTER, 10)
    }

    function setTileLayer(mapDiv) {
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18
      }).addTo(mapDiv)
    }

    function setMarkers(points: IPoint[], mapDiv) {
      points.forEach((v) => {
        L.marker({ lat: v.coords[0], lng: v.coords[1] }).addTo(mapDiv)
      })
    }

    function showPoint() {}

    onMounted(async () => {
      points.value = await getPoints()
      map.value = createMapContainer()

      setTileLayer(map.value)
      setMarkers(points.value, map.value)
    })

    return { zoom, points, showPoint }
  }
})
</script>

<style lang="scss">
.pickup-points {
  height: 100%;

  &__content {
    display: flex;
    align-items: flex-start;
    overflow: hidden;
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
  }

  &__points {
    width: 50%;
    aspect-ratio: 1 / 1;
    overflow-y: scroll;

    &::-webkit-scrollbar {
      width: 10px;
    }

    &::-webkit-scrollbar-track {
      background-color: $bg;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 4px;
      background-image: linear-gradient(
        to top,
        #85b839,
        #9eba2f,
        #b7bb29,
        #cfbb26,
        #e7bb2a,
        #ffb933
      );
    }

    scrollbar-color: linear-gradient(to top, #85b839, #9eba2f, #b7bb29, #cfbb26, #e7bb2a, #ffb933);
    scrollbar-width: thin;
  }
}
</style>
