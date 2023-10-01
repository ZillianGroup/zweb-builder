import {
  ZWEB_WEBSOCKET_CONTEXT,
  ZWEB_WEBSOCKET_STATUS,
} from "@/api/ws/interface"

export interface UpdateCanvasShapePayload {
  canvasWidth: number
  canvasHeight: number
}

export interface UpdateWSStatusPayload {
  context: ZWEB_WEBSOCKET_CONTEXT
  wsStatus: ZWEB_WEBSOCKET_STATUS
}
