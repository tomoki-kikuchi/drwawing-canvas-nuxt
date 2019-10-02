import { fabric } from 'fabric'

export default class DrawableCanvas {
  constructor(id) {
    this.canvas = new fabric.Canvas(id, {
      isDrawingMode: true,
      selection: true,
      stateful: true
    })
    this.canvas.freeDrawingBrush = new fabric.PencilBrush(this.canvas)

    this.canvas.on('object:added', (e) => {
      const object = e.target
      if (!this.isRedoing) {
        this.canvasHistory = []
      }
      this.isRedoing = false
    })
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
}
