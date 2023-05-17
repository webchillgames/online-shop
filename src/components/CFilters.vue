<template>
  <div class="c-filters">
    <div v-if="$route.params.subcategory" class="c-filters__breadcrumbs">
      <router-link :to="`/category/${$route.params.name}`">
        {{ $t(`${$route.params.name}`) }}
      </router-link>
      <CIcon icon="arrow" />
      <span>{{ $t(`${$route.params.subcategory}`) }}</span>
    </div>

    <div class="c-filters__title">
      <h2 v-if="$route.params.subcategory">{{ $t(`${$route.params.subcategory}`) }}</h2>
      <h2 v-else>{{ $t(`${$route.params.name}`) }}</h2>
    </div>

    <div v-if="subcategories && subcategories.length">
      <div class="c-filters__subcategories">
        <p>{{ $t('categories') }}</p>
        <ul>
          <li v-for="c in subcategories" :key="c.id" class="products-view__checkbox">
            <router-link :to="`/category/${category.category.to}/${c.to}`" @click="$emit('update', c.to)">{{ c.title }}</router-link>
          </li>
        </ul>
      </div>
    </div>

    <div class="c-filters__colors">
      <p>{{ $t('color') }}</p>
      <ul>
        <li v-for="color in colors" :key="color.id">
          <input type="checkbox" :id="color.value" />
          <label :for="color.value" :style="{ 'background-color': `${color.value}` }"></label>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import type { IFilterColor, ILink, ICategory } from '@/interfaces'
import CIcon from './CIcon.vue'

export default defineComponent({
  emits: ['update'],
  props: {
    subcategories: {
      type: Array as PropType<ILink[]>,
      required: true
    },
    category: {
      type: Object as PropType<ICategory>,
      required: true
    }
  },
  setup() {
    const colors: IFilterColor[] = [
      { id: 1, value: 'peru' },
      { id: 2, value: 'darkGrey' },
      { id: 3, value: 'black' },
      { id: 4, value: 'darkSeaGreen' }
    ]
    return {
      colors
    }
  },
  components: { CIcon }
})
</script>

<style lang="scss">
.c-filters {
  &__title {
    padding: 10px;

    h2 {
      margin: 0;
    }
  }

  &__subcategories {
    a {
      @include baseLink;
      display: block;
      background-color: $bg;
      padding: 4px 8px;
      border-radius: 8px;
    }

    p {
      text-transform: capitalize;
    }
  }

  &__breadcrumbs {
    display: flex;
    align-items: center;
    padding: 10px;
    margin-bottom: 10px;

    a {
      @include baseLink;
      color: $accent;

      &:hover {
        color: rgba($accent, 0.6);
      }
    }

    span {
      color: rgba($font, 0.5);
    }

    svg {
      width: 12px;
      height: 12px;
      margin: 0 8px;
    }
  }

  &__colors {
    p {
      text-transform: capitalize;
    }

    ul {
      display: flex;
      flex-wrap: wrap;
    }

    li {
      position: relative;

      input[type="checkbox"] {
        position: absolute;
      }

      label {
        width: 30px;
        height: 30px;
        display: block;
        border-radius: 50%;
      }
    }
  }
}
</style>
