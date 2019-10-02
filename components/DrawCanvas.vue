<template>
  <div class="canvasContainer">
    <canvas id="canvas" class="canvas" width="600" height="600"></canvas>
    <div class="toolContainer">
      <div class="tool">
        <Button type="default" @click="undo"><Icon type="undo"/></Button>
        <Button type="default" @click="redo"><Icon type="redo"/></Button>
        <Button type="primary" @click="saveImage"
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
      <div class="tool">
        <p class="toolLabel">線の色</p>
        <no-ssr>
          <compact-picker v-model="strokeColor" />
        </no-ssr>
      </div>
    </div>
  </div>
</template>

<script>
import { Button, Icon, Slider } from 'ant-design-vue'
import { Compact } from 'vue-color'
import DrawableCanvas from '~/plugins/DrawableCanvas'

export default {
  name: 'DrawCanvas',
  components: {
    Button,
    Icon,
    Slider,
    'compact-picker': Compact
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
    },
    strokeColor(color) {
      this.setStrokeColor(color.hex)
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
    setBrushWidth(width) {
      this.canvas.setBrushWidth(width)
    },
    setStrokeColor(color) {
      this.canvas.setStrokeColor(color)
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
