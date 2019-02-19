<template>
  <q-layout view="hHh lPr fFf">
    <q-layout-header>
      <q-toolbar
        color="primary"
        :glossy="$q.theme === 'mat'"
        :inverted="$q.theme === 'ios'"
      >
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
           Следим за атмосферкой тут...
          <div slot="subtitle">Running on Quasar v{{ $q.version }}</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>
    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
// import { openURL } from 'quasar';


export default {
  name: 'MyLayout',
  data() {
    return {
      leftDrawerOpen: false,
    };
  },
};
</script>

<style>
</style>
