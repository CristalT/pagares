<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-toolbar-title>
          Imprimir Pagarés
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>



export default {
  name: 'MainLayout',
  data () {
    return {
      leftDrawerOpen: false,
    }
  }
}
</script>
