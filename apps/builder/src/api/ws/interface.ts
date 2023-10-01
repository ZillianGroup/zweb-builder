import { TextSignal, TextTarget } from "@/api/ws/textSignal"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"

export type RoomType = "dashboard" | "app" | "ai-agent"

export interface Room {
  wsURL: string
}

export interface Broadcast {
  type: string
  payload: any
}

export interface Callback<T> {
  broadcast: Broadcast
  // extra data
  data: T
  // string
  errorMessage: string
  // 0 success, not zero error
  errorCode: number
  target: TextTarget
  signal: TextSignal
}

export interface ZWEBWebSocketComponentPayload {
  before: {
    displayName: string
  }
  after: ComponentNode
}

export enum ZWEB_WEBSOCKET_STATUS {
  INIT = "INIT",
  CONNECTING = "CONNECTING",
  CONNECTED = "CONNECTED",
  CLOSED = "CLOSED",
  FAILED = "FAILED",
  LOCKING = "LOCKING",
}

export enum ZWEB_WEBSOCKET_CONTEXT {
  DASHBOARD = "DASHBOARD",
  APP = "APP",
  APP_BINARY = "APP_BINARY",
  AI_AGENT = "AI_AGENT",
}
