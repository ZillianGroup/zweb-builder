import {
  ZWEB_WEBSOCKET_CONTEXT,
  ZWEB_WEBSOCKET_STATUS,
} from "@/api/ws/interface"
import {
  ActionContent,
  ActionItem,
} from "@/redux/currentApp/action/actionState"

export type ZWebMode = "preview" | "edit" | "production" | "template-edit"

export interface ConfigState {
  openLeftPanel: boolean
  openBottomPanel: boolean
  openRightPanel: boolean
  openDebugger: boolean
  showDot: boolean
  scale: number
  selectedComponents: string[]
  selectedAction: ActionItem<ActionContent> | null
  cachedAction: ActionItem<ActionContent> | null
  expandedKeys: string[]
  mode: ZWebMode
  canvasHeight: number
  canvasWidth: number
  isOnline: boolean
  wsStatus: Record<ZWEB_WEBSOCKET_CONTEXT, ZWEB_WEBSOCKET_STATUS>
  hoveredComponents: string[]
}

export const ConfigInitialState: ConfigState = {
  openLeftPanel: true,
  mode: "edit",
  openBottomPanel: true,
  openRightPanel: true,
  openDebugger: false,
  scale: 100,
  selectedComponents: [],
  selectedAction: null,
  cachedAction: null,
  showDot: false,
  expandedKeys: [],
  canvasHeight: 1080,
  canvasWidth: 1920,
  isOnline: true,
  hoveredComponents: [],
  wsStatus: {
    [ZWEB_WEBSOCKET_CONTEXT.DASHBOARD]: ZWEB_WEBSOCKET_STATUS.INIT,
    [ZWEB_WEBSOCKET_CONTEXT.APP]: ZWEB_WEBSOCKET_STATUS.INIT,
    [ZWEB_WEBSOCKET_CONTEXT.APP_BINARY]: ZWEB_WEBSOCKET_STATUS.INIT,
    [ZWEB_WEBSOCKET_CONTEXT.AI_AGENT]: ZWEB_WEBSOCKET_STATUS.INIT,
  },
}
