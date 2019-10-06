<template>
  <div class="canvasContainer">
    <canvas :id="id" class="canvas" :width="width" :height="height"></canvas>
  </div>
</template>

<script>
import DrawableCanvas from '~/plugins/DrawableCanvas'

export default {
  name: 'DrawCanvas',
  components: {},
  props: {
    width: { type: Number, default: 600 },
    height: { type: Number, default: 600 },
    id: { type: String, required: true }
  },
  data() {
    return {
      canvas: null
    }
  },
  computed: {},

  mounted() {
    this.canvas = new DrawableCanvas(this.id)
  },
  methods: {
    undo() {
      this.canvas.undo()
    },
    redo() {
      this.canvas.redo()
    },
    deleteAll() {
      this.canvas.deleteAll()
    },
    setBrushWidth(width) {
      this.canvas.setBrushWidth(width)
    },
    setStrokeColor(color) {
      this.canvas.setStrokeColor(color)
    },
    setDrawingMode(flag) {
      this.canvas.drawingMode = flag
    },
    setStampImage(imagePath) {
      this.canvas.setStampImage(imagePath)
    },
    saveImage() {
      this.canvas.saveImage()
    }
  }
}
</script>

<style lang="scss" scoped>
.canvasContainer {
  width: 600px;
  margin: 0 auto;
  box-sizing: border-box;
}
.canvas {
  border: solid #494949 1px;
  max-width: 600px;
}
</style>
