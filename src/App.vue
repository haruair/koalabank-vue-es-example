<template>
  <div id="app">
    <bank></bank>
  </div>
</template>

<script>
import Bank from './components/Bank'

export default {
  name: 'app',
  components: {
    Bank
  }
}
</script>

<style>
#app {
  height: 100%;
}
</style>
