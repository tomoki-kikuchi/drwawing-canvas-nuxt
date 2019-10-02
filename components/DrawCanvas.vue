<template>
  <div class="canvasContainer">
    <canvas id="canvas" width="600" height="600"></canvas>
    <div>
      <button @click="undo">戻る</button>
      <button @click="redo">進む</button>
    </div>
  </div>
</template>

<script>
import DrawableCanvas from '~/plugin/DrawableCanvas'

export default {
  name: 'DrawCanvas',
  data() {
    return {
      canvas: null
    }
  },
  mounted() {
    this.canvas = new DrawableCanvas('canvas')

    // const canvas = new fabric.Canvas('canvas', {
    //   isDrawingMode: true,
    //   selection: true,
    //   stateful: true
    // })
    //
    // canvas.freeDrawingBrush = new fabric.PencilBrush(canvas)
    // canvas.freeDrawingBrush.color = 'red'
    // canvas.freeDrawingBrush.width = 5
  },
  methods: {
    undo() {
      this.canvas.undo()
    },
    redo() {
      this.canvas.redo()
    }
  }
}
</script>

<style lang="scss" scoped></style>
