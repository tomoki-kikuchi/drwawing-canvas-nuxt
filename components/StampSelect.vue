<template>
  <div>
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
</template>

<script>
import { Avatar } from 'ant-design-vue'
const stampList = [
  '/images/stamp/animal_buta.png',
  '/images/stamp/animal_kuma.png',
  '/images/stamp/animal_mitsubachi.png',
  '/images/stamp/animal_neko.png',
  '/images/stamp/animal_penguin.png',
  '/images/stamp/shinwa_hades.png'
]

export default {
  name: 'StampSelect',
  components: {
    Avatar
  },
  data() {
    return {
      selectStampIndex: null
    }
  },
  computed: {
    stampList() {
      return stampList
    }
  },
  methods: {
    selectStamp(index) {
      console.log('selectStamp', index)
      this.selectStampIndex = index
      this.$emit('selectImage', this.stampList[index])
      // this.canvas.setStampImage(this.stampList[index])
    }
  }
}
</script>

<style lang="scss" scoped>
.stamp {
  opacity: 1;
  &.isSelected {
    opacity: 1;
    border: solid 3px #ff0000;
  }
}
</style>
