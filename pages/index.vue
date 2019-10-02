<template>
  <div class="container">
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
.container {
  background-color: #fff;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
