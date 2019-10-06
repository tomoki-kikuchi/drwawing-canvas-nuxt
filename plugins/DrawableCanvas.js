import { fabric } from 'fabric'

export default class DrawableCanvas {
  constructor(id) {
    console.log('constructor')

    this.selectStampPath = ''
    this.canvasHistory = []
    this.canvas = new fabric.Canvas(id, {
      isDrawingMode: false,
      selection: true,
      stateful: true,
      backgroundColor: 'rgba(255, 255, 255, 1)'
    })
    this.canvas.freeDrawingBrush = new fabric.PencilBrush(this.canvas)

    this.canvas.on('object:added', (e) => {
      const object = e.target
      if (!this.isRedoing) {
        this.canvasHistory = []
      }
      this.isRedoing = false
    })

    this.canvas.on('mouse:over', () => {
      console.log('mouse:over')
    })

    this.canvas.on('mouse:down', (e) => {
      console.log('x:', e.pointer.x, 'y:', e.pointer.y)
      if (!this.canvas.isDrawingMode) {
        const x = e.pointer.x
        const y = e.pointer.y

        this.drawStamp(x, y)
      }
    })

    // this.canvas.on({
    //   'touch:longpress': () => {
    //     console.log('longpress')
    //   },
    //   'touch:drag': () => {
    //     console.log('drag')
    //   }
    // })
  }
  get drawingMode() {
    return this.canvas.isDrawingMode
  }
  set drawingMode(val) {
    this.canvas.isDrawingMode = val
  }
  // 戻る
  undo() {
    if (this.canvas._objects.length > 0) {
      const undoObject = this.canvas._objects.pop()
      this.canvasHistory.push(undoObject)
      this.canvas.renderAll()
    }
  }
  // 進む
  redo() {
    if (this.canvasHistory.length > 0) {
      this.isRedoing = true
      const redoObject = this.canvasHistory.pop()
      this.canvas.add(redoObject)
    }
  }
  deleteAll() {
    console.log('deleteAll')
    const objects = this.canvas.getObjects()
    objects.forEach((object) => {
      this.canvas.remove(object)
    })
  }
  setBrushWidth(width) {
    this.canvas.freeDrawingBrush.width = width
  }

  setStrokeColor(color) {
    this.canvas.freeDrawingBrush.color = color
  }

  drawStamp(x = 250, y = 250) {
    fabric.Image.fromURL(this.selectStampPath, (img) => {
      this.canvas.add(
        img
          .set({
            left: x,
            top: y,
            angle: 0,
            originX: 'center',
            originY: 'center'
          })
          .scale(0.25)
      )
    })
  }
  setStampImage(imagePath) {
    this.selectStampPath = imagePath
  }

  saveImage() {
    const blob = this.getImageBlob()
    const link = document.createElement('a')
    const time = new Date().getTime()
    const fileName = `oekaki_${time}.png`
    link.href = window.URL.createObjectURL(blob)
    link.download = fileName
    link.click()
  }
  getImageBlob() {
    const type = 'image/png'
    const dataUri = this.canvas.toDataURL({ format: 'png' })
    const binData = atob(dataUri.split(',')[1])
    const buffer = new Uint8Array(binData.length)
    for (let i = 0; i < binData.length; i++) {
      buffer[i] = binData.charCodeAt(i)
    }
    const blob = new Blob([buffer.buffer], { type: type })
    return blob
  }
}
