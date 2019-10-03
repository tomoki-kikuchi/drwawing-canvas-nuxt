<template>
  <div class="canvasContainer">
    <canvas id="canvas" class="canvas" width="600" height="600"></canvas>
    <div class="toolContainer">
      <div class="tool">
        <div class="buttonContainer">
          <div class="buttonInner">
            <Button type="default" @click="undo"><Icon type="undo"/></Button>
            <Button type="default" @click="redo"><Icon type="redo"/></Button>
            <Button type="primary" @click="saveImage"
              ><Icon type="download" />Download</Button
            >
            <Checkbox :checked="isDrawingMode" @change="toggleDrawingMode"
              >手書きモード</Checkbox
            >
          </div>
          <Button type="danger" @click="deleteCanvas"
            ><Icon type="delete"
          /></Button>
        </div>
      </div>
      <div class="tool">
        <p class="toolLabel">線の太さ</p>
        <Slider id="test" v-model="brushWidth" :min="1" :max="20" />
      </div>
      <div class="tool">
        <p class="toolLabel">線の色</p>
        <client-only>
          <compact-picker v-model="strokeColor" />
        </client-only>
      </div>
      <div class="tool">
        <p class="toolLabel">スタンプ</p>
        <Avatar
          v-for="(stamp, index) in stampList"
          :key="index"
          class="stamp"
          size="large"
          :src="stamp"
          :class="{ isSelected: selectStampIndex === index }"
          @click="selectStamp(index)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { Avatar, Button, Checkbox, Icon, Slider } from 'ant-design-vue'
import { Compact } from 'vue-color'
import DrawableCanvas from '~/plugins/DrawableCanvas'

const stampList = [
  '/images/stamp/animal_buta.png',
  '/images/stamp/animal_kuma.png',
  '/images/stamp/animal_mitsubachi.png',
  '/images/stamp/animal_neko.png',
  '/images/stamp/animal_penguin.png'
]

export default {
  name: 'DrawCanvas',
  components: {
    Avatar,
    Button,
    Checkbox,
    Icon,
    Slider,
    'compact-picker': Compact
  },
  data() {
    return {
      canvas: null,
      brushWidth: 1,
      isDrawingMode: false,
      strokeColor: 'red',
      selectStampIndex: null
    }
  },
  computed: {
    stampList() {
      return stampList
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
    setStamp(imagePath) {
      this.canvas.setStamp(imagePath)
    },
    setStampImage(imagePath) {
      this.canvas.setStampImage(imagePath)
    },
    selectStamp(index) {
      this.selectStampIndex = index
      this.canvas.setStampImage(this.stampList[index])
    },

    saveImage() {
      this.canvas.saveImage()
    },
    toggleDrawingMode(e) {
      this.isDrawingMode = e.target.checked
      this.canvas.drawingMode = e.target.checked
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

.buttonContainer {
  display: flex;
  justify-content: space-between;
  .buttonInner {
  }
}

.stamp {
  opacity: 0.7;
  &.isSelected {
    opacity: 1;
  }
}
</style>
