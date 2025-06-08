import { ObjectType, Style } from './types'
import { Point } from '../canvas/Point'
import { Size } from '../canvas/Size'

export interface CanvasObject {
  id: string
  type: ObjectType
  position: Point
  size: Size
  rotation: number
  style: Style
  zIndex: number
}