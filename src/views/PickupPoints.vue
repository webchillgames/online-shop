<template>
  <div class="pickup-points">
    <div class="wrapper">
      <h2>{{ $t('pickupPoints') }}</h2>

      <div class="pickup-points__content">
        <div class="pickup-points__map">
          <LMap ref="map" v-model:zoom="zoom" :center="[-8.6538237, 115.1825386]">
            <LTileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              layer-type="base"
              name="OpenStreetMap"
            ></LTileLayer>

            <LMarker v-for="p in points" :lat-lng="p.coords" :key="p.id"></LMarker>
          </LMap>
        </div>

        <div class="pickup-points__list">
          <ul>
            <li v-for="p in points" :key="p.id" class="pickup-points__point">
              <p>
                <CIcon icon="map-point" />
                {{ p.info.title }}
              </p>

              <ul>
                <li v-for="(h, i) in p.info.workingHours" :key="i">
                  <p class="pickup-points__working-hours">
                    <span>{{ h.day }}</span>
                    <span v-if="h.from && h.to">{{ h.from }}-{{ h.to }}</span>
                    <span v-else class="pickup-points__closed">{{ $t('closed') }}</span>
                  </p>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import 'leaflet/dist/leaflet.css'
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet'
import CIcon from '@/components/CIcon.vue'
const points = [
  {
    id: 1,
    info: {
      workingHours: [
        { day: 'monday', from: '11:00', to: '16.00' },
        { day: 'tuesday', from: '11:00', to: '16.00' },
        { day: 'wednesday', from: '11:00', to: '16.00' },
        { day: 'thursday', from: '11:00', to: '16.00' },
        { day: 'friday', from: '11:00', to: '16.00' },
        { day: 'saturday', from: '11:00', to: '16.00' },
        { day: 'sunday', from: '11:00', to: '14.00' }
      ],
      title: 'Pickup point Kuta,  Bali'
    },
    coords: [-8.71835, 115.170252]
  },
  {
    id: 2,
    info: {
      workingHours: [
        { day: 'monday', from: '11:00', to: '16.00' },
        { day: 'tuesday', from: '11:00', to: '16.00' },
        { day: 'wednesday', from: '11:00', to: '16.00' },
        { day: 'thursday', from: '11:00', to: '16.00' },
        { day: 'friday', from: '11:00', to: '16.00' },
        { day: 'saturday', from: '11:00', to: '16.00' },
        { day: 'sunday', from: null, to: null }
      ],
      title: 'Pickup point Nusa Dua'
    },
    coords: [-8.79714, 115.223759]
  },
  {
    id: 3,
    info: {
      workingHours: [
        { day: 'monday', from: '11:00', to: '16.00' },
        { day: 'tuesday', from: '11:00', to: '16.00' },
        { day: 'wednesday', from: '11:00', to: '16.00' },
        { day: 'thursday', from: '11:00', to: '16.00' },
        { day: 'friday', from: '11:00', to: '16.00' },
        { day: 'saturday', from: '11:00', to: '15.00' },
        { day: 'sunday', from: null, to: null }
      ],
      title: 'Pickup point Denpasar'
    },
    coords: [-8.67052, 115.208014]
  },
  {
    id: 3,
    info: {
      workingHours: [
        { day: 'monday', from: '11:00', to: '16.00' },
        { day: 'tuesday', from: '11:00', to: '16.00' },
        { day: 'wednesday', from: '11:00', to: '16.00' },
        { day: 'thursday', from: '11:00', to: '16.00' },
        { day: 'friday', from: '11:00', to: '16.00' },
        { day: 'sunday', from: null, to: null },
        { day: 'sunday', from: null, to: null }
      ],
      title: 'Pickup point Ubud'
    },
    coords: [-8.507542, 115.264328]
  }
]

export default defineComponent({
  components: {
    LMap,
    LTileLayer,
    LMarker,
    CIcon
  },
  setup() {
    const zoom = ref(10)

    return { zoom, points }
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

  &__list {
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

    // scrollbar-color: #6969dd #e0e0e0;
    // scrollbar-width: thin;

    p {
      display: flex;
    }
  }

  &__working-hours {
    padding-left: 40px;
    span:first-child {
      font-weight: 700;
      margin-right: 4px;
    }
  }

  &__closed {
    color: $accent;
    font-weight: 700;
  }

  &__point {
    cursor: pointer;
    padding: 20px;
    border: 2px solid $primary;
    border-radius: 16px;
    margin-bottom: 20px;
    margin-left: 20px;
  }
}
</style>
