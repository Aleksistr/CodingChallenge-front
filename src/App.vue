
<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            {{$t('home_page.drawer.drawer_title')}}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{$t('home_page.drawer.drawer_subtitle')}}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="item.to"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>{{$t('home_page.app_title')}}</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
      <notifications
        group="notify"
        position="bottom center"
      />
    </v-main>
  </v-app>
</template>

<script>
import i18n from '@/i18n'  
export default {
    data: () => ({ 
      drawer: null,
      items: [
          {
            title: i18n.t('home_page.nav_items.search'),
            icon: 'mdi-magnify',
            to: '/search'
          },
          {
            title: i18n.t('home_page.nav_items.library'),
            icon: 'mdi-playlist-music',
            to: '/my-library'
          },
        ],
        right: null, 
    }),
  }
</script>