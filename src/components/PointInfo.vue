<template>
  <div class="point-info">
    <h3>{{ point.info.title }}</h3>
    <div class="point-info__street">
      <CIcon icon="map-point" />
      <span>{{ point.info.street }}</span>
    </div>

    <CButton @click="$emit('showPoint')" :title="$t('showOnMap')" />

    <div class="point-info__working-hours">
      <p>{{ $t('workingHours') }}:</p>
      <ul>
        <li v-for="(h, i) in point.info.workingHours" :key="i">
          <p>
            <span>{{ h.day }}</span>
            <span v-if="h.from && h.to">{{ h.from }}-{{ h.to }}</span>
            <span v-else class="point-info__closed">{{ $t('closed') }}</span>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import type { IPoint } from '@/interfaces'

import CIcon from '@/components/CIcon.vue'
import CButton from './CButton.vue'

export default defineComponent({
  components: { CIcon, CButton },
  emits: ['showPoint'],
  props: {
    point: {
      type: Object as PropType<IPoint>,
      required: true
    }
  },
  setup() {
    return {}
  }
})
</script>

<style lang="scss">
.point-info {
  padding: 16px;
  cursor: pointer;
  border-bottom: 2px solid $primary;

  button {
    @include borderedButton;
    display: block;
    margin: 32px auto;
  }

  &:last-child {
    border-bottom: none;
  }

  &__working-hours {
    padding-left: 10%;

    ul {
      padding-left: 5%;
      font-size: 16px;
      line-height: 18px;
    }

    span:first-child {
      font-weight: 700;
      margin-right: 4px;
    }
  }

  &__street {
    display: flex;
    align-items: center;

    svg {
      flex-shrink: 0;
      margin-right: 8px;
    }
  }

  &__closed {
    color: $accent;
    font-weight: 700;
  }
}
</style>
