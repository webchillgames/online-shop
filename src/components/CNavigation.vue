<template>
  <nav class="c-navigation">
    <div class="wrapper">
      <nav>
        <ul class="c-navigation__links">
          <li class="c-navigation__all-categories">
            <CButton>
              <CIcon icon="bars" />
              <span>{{ $t('allCategories') }}</span>
            </CButton>

            <ul v-if="categoriesLinks.length" class="c-navigation__submenu c-navigation__submenu--categories">
              <li v-for="c in categoriesLinks" :key="c.id">
                <router-link :to="c.to">
                  <span>{{ c.title }}</span>
                </router-link>
              </li>
            </ul>
          </li>

          <li v-for="v in navElements" :key="v.link.id" class="c-navigation__submenu-trigger">
            <router-link :to="v.link.to">
              <span>{{ v.link.title }}</span>
              <CIcon icon="arrow" />
            </router-link>

            <ul v-if="v.submenu.length" class="c-navigation__submenu">
              <li v-for="j in v.submenu" :key="j.id">
                <router-link :to="v.link.to">
                  <span>{{ j.title }}</span>
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

import CButton from '@/components/CButton.vue'
import CIcon from '@/components/CIcon.vue'

export default defineComponent({
  components: { CIcon, CButton },
  setup() {
    const { t } = useI18n()

    const navElements = [
      {
        link: { id: 1, title: t('home'), to: '/' },
        submenu: [
          { id: 1, title: t('chairs'), to: '/' },
          { id: 2, title: t('lightning'), to: '/' }
        ]
      },
      {
        link: { id: 2, title: t('kitchen'), to: '/' },
        submenu: [
          { id: 1, title: t('tables'), to: '/' },
          { id: 2, title: t('chairs'), to: '/' }
        ]
      },
      {
        link: { id: 3, title: t('bathroom'), to: '/' },
        submenu: [
          { id: 1, title: t('mirrors'), to: '/' },
          { id: 2, title: t('lightning'), to: '/' }
        ]
      }
    ]

    const categoriesLinks = [
      { id: 1, title: t('chairs'), to: '/' },
      { id: 2, title: t('lightning'), to: '/' },
      { id: 3, title: t('mirrors'), to: '/' },
      { id: 4, title: t('tables'), to: '/' }
    ]
    return {
      categoriesLinks,
      navElements
    }
  }
})
</script>

<style lang="scss">
.c-navigation {
  background-color: $dark-bg;

  &__links {
    padding: 0;
    display: flex;
    margin: 0;
    list-style: none;
    position: relative;

    li {
      position: relative;
      text-transform: uppercase;
      font-weight: 700;
      letter-spacing: 0.05em;
    }

    a {
      color: $font;
      display: flex;
      align-items: center;
      padding: 18px 20px;
      text-decoration: none;

      svg {
        margin-left: 8px;
        transform: rotate(90deg);
      }
    }
  }

  &__all-categories {
    position: relative;
    margin-right: 32px;

    button {
      display: flex;
      align-items: center;
      padding: 18px 20px;
      border: none;
      text-transform: uppercase;
      font: inherit;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        top: -4%;
        left: 0;
        width: 100%;
        height: 108%;
        background-color: $primary;
        z-index: 0;
        border-radius: 4px;
      }

      span {
        color: #fff;
      }

      svg {
        stroke: #fff;
        margin-right: 8px;
      }

      span,
      svg {
        position: relative;
        z-index: 1;
      }
    }
  }

  .c-navigation__submenu {
    display: none;
    position: absolute;
    z-index: 90;
    width: 100%;
    top: 100%;
    background-color: #fff;
    box-shadow: $shadow;
    border-radius: 4px;
    min-width: 175px;
    padding: 0;
    box-sizing: border-box;

    a {
      transition: all 0.2s;
      color: $icons;
      font-size: 16px;
      text-transform: none;
    }
  }

  .c-navigation__submenu--categories {
    a {
      display: block;
      text-align: center;
      border-bottom: 1px solid $dark-bg;
      padding: 8px 0;
    }

    li:last-child a {
      border-bottom: none;
    }

    li:hover a {
      color: $primary;
    }
  }

  ul .c-navigation__submenu {
    a {
      padding: 11px 20px;
      font-size: 16px;
      text-transform: capitalize;
    }

    li {
      display: block;
      transition: all 0.2s;

      &:hover {
        background-color: $bg;

        a {
          color: $primary;
        }
      }
    }
  }

  .c-navigation__submenu-trigger:hover .c-navigation__submenu {
    display: block;
    animation-name: showMenu;
    animation-duration: 0.3s;
    animation-timing-function: ease-in;
    animation-fill-mode: forwards;
  }
}

@keyframes showMenu {
  0% {
    opacity: 0;
    transform: translate3d(0, 10%, 0);
  }

  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
</style>
