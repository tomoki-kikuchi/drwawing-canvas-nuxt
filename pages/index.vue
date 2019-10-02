<template>
  <div class="pageContainer">
    <draw-canvas />
  </div>
</template>

<script>
import DrawCanvas from '~/components/DrawCanvas'

export default {
  components: {
    DrawCanvas
  }
}
</script>

<style>
.pageContainer {
  margin: 0 auto;
  min-height: 100vh;
}
</style>
