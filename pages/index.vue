<template>
  <div class="pageContainer">
    <draw-canvas :id="'canvas'" ref="drawCanvas" :width="600" :height="600" />
    <div class="toolContainer">
      <div class="tool">
        <div class="buttonContainer">
          <div class="buttonInner">
            <Button type="default" icon="undo" @click="undo" />
            <Button type="default" icon="redo" @click="redo" />
            <Button
              icon="edit"
              :type="isDrawingMode ? 'primary' : 'default'"
              @click="toggleDrawingMode"
            ></Button>
            <Button
              icon="picture"
              :type="isStampMode ? 'primary' : 'default'"
              @click="toggleStampMode"
            />
            <Button type="primary" icon="download" @click="saveImage"
              >Download</Button
            >
          </div>
          <Button type="danger" icon="delete" @click="deleteAll" />
        </div>
      </div>

      <transition name="tools">
        <div v-show="isDrawingMode">
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
        </div>
      </transition>
      <transition name="tools">
        <div v-show="isStampMode">
          <div class="tool">
            <stamp-select @selectImage="setStampImage" />
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { Button, Slider } from 'ant-design-vue'
import { Compact } from 'vue-color'
import DrawCanvas from '~/components/DrawCanvas'
import StampSelect from '~/components/StampSelect'

export default {
  components: {
    Button,
    'compact-picker': Compact,
    Slider,
    DrawCanvas,
    StampSelect
  },
  data() {
    return {
      brushWidth: 1,
      isDrawingMode: false,
      isStampMode: false,
      strokeColor: 'red',
      stampImage: ''
    }
  },
  watch: {
    brushWidth(val) {
      this.setBrushWidth(val)
    },
    strokeColor(color) {
      this.setStrokeColor(color.hex)
    },
    isDrawingMode(state, oldState) {
      if (state) {
        this.isStampMode = false
      }
      this.$refs.drawCanvas.setDrawingMode(state)
    }
  },
  methods: {
    undo() {
      this.$refs.drawCanvas.undo()
    },
    redo() {
      this.$refs.drawCanvas.redo()
    },
    saveImage() {
      this.$refs.drawCanvas.saveImage()
    },
    deleteAll() {
      this.$refs.drawCanvas.deleteAll()
    },
    setBrushWidth(width) {
      this.$refs.drawCanvas.setBrushWidth(width)
    },
    setStrokeColor(color) {
      this.$refs.drawCanvas.setStrokeColor(color)
    },
    setStampImage(imagePath) {
      this.$refs.drawCanvas.setStampImage(imagePath)
    },
    toggleDrawingMode() {
      this.isDrawingMode = !this.isDrawingMode
      this.isStampMode = false
    },
    toggleStampMode() {
      this.isDrawingMode = false
      this.isStampMode = !this.isStampMode
    }
  }
}
</script>

<style lang="scss" scoped>
.pageContainer {
  margin: 0 auto;
  min-height: 100vh;
  width: 600px;
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

.tools-enter-active,
.tools-leave-active {
  transition: opacity 0.5s;
}
.tools-enter,
.tools-leave-to {
  opacity: 0;
}
</style>
