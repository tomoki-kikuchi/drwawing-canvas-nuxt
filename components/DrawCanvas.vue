<template>
  <div class="canvasContainer">
    <canvas id="canvas" class="canvas" width="600" height="600"></canvas>
    <div class="toolContainer">
      <div class="tool">
        <Button type="default" @click="undo"><Icon type="undo"/></Button>
        <Button type="default" @click="redo"><Icon type="redo"/></Button>
        <Button type="default" @click="setStrokeColor"
          ><Icon type="font-colors"
        /></Button>
        <Button type="primary" download="" @click="saveImage"
          ><Icon type="download" />Download</Button
        >
        <Button type="danger" @click="deleteCanvas"
          ><Icon type="delete"
        /></Button>
      </div>
      <div class="tool">
        <p class="toolLabel">線の太さ</p>
        <Slider id="test" v-model="brushWidth" :min="1" :max="20" />
      </div>
    </div>
  </div>
</template>

<script>
import { Button, Icon, Slider } from 'ant-design-vue'
import DrawableCanvas from '~/plugins/DrawableCanvas'

export default {
  name: 'DrawCanvas',
  components: {
    Button,
    Icon,
    Slider
  },
  data() {
    return {
      canvas: null,
      brushWidth: 1,
      strokeColor: 'red'
    }
  },
  watch: {
    brushWidth(val) {
      this.setBrushWidth(val)
    }
  },
  mounted() {
    this.canvas = new DrawableCanvas('canvas')
  },
  methods: {
    undo() {
      this.canvas.undo()
    },
    redo() {
      this.canvas.redo()
    },
    deleteCanvas() {
      this.canvas.deleteAll()
    },
    setBrushWidth() {
      this.canvas.setBrushWidth(this.strokeColor)
    },
    setStrokeColor(color) {
      this.canvas.setStrokeColor('red')
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

.toolContainer {
  margin-top: 50px;
  .tool {
    margin-top: 10px;
    .toolLabel {
      margin-bottom: 10px;
    }
  }
}
</style>
