import { getCurrentTeamInfo } from "@zweb-public/user-data"
import { isCloudVersion } from "@zweb-public/utils"
import { HTTP_REQUEST_PUBLIC_BASE_URL } from "@zweb-public/zweb-net/constant"
import { TextSignal, TextTarget } from "@/api/ws/textSignal"
import {
  ReduxMessageListener,
  WSMessageListener,
  ZWEBWebsocket,
} from "@/api/ws/zwebWS"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import store from "@/store"
import { MovingMessageBin, Signal, Target } from "./ZWEB_PROTO"
import {
  Broadcast,
  RoomType,
  ZWEBWebSocketComponentPayload,
  ZWEB_WEBSOCKET_CONTEXT,
} from "./interface"
import { ZWEBBinaryWebsocket } from "./zwebBinaryWS"

export function transformComponentReduxPayloadToWsPayload(
  componentNodes: ComponentNode[] | ComponentNode,
): ZWEBWebSocketComponentPayload[] {
  if (Array.isArray(componentNodes)) {
    return componentNodes.map((node) => {
      return {
        before: {
          displayName: node.displayName,
        },
        after: node,
      }
    })
  }
  if (!componentNodes) return []
  return [
    {
      before: {
        displayName: componentNodes.displayName,
      },
      after: componentNodes,
    },
  ]
}

export function getTextMessagePayload<T>(
  signal: TextSignal,
  target: TextTarget,
  broadcast: boolean,
  reduxBroadcast: Broadcast | null,
  teamID: string,
  uid: string,
  payload: T[],
): string {
  return JSON.stringify({
    signal,
    target,
    option: broadcast ? 1 : 0,
    broadcast: reduxBroadcast,
    payload,
    teamID,
    uid,
  })
}

export const getBinaryMessagePayload = (
  signal: Signal,
  target: Target,
  needBroadcast: boolean,
  userID: string,
  nickname: string,
  status: number,
  parentDisplayName: string,
  displayNames: string,
  cursorXInteger: number,
  cursorYInteger: number,
  cursorXMod: number,
  cursorYMod: number,
  widgetX: number,
  widgetY: number,
  widgetW: number,
  widgetH: number,
) => {
  const payloadObject: MovingMessageBin = {
    signal,
    target,
    clientID: "",
    needBroadcast,
    userID,
    nickname,
    status,
    parentDisplayName,
    displayNames,
    cursorXInteger,
    cursorYInteger,
    cursorXMod,
    cursorYMod,
    widgetX,
    widgetY,
    widgetW,
    widgetH,
  }
  return MovingMessageBin.toBinary(payloadObject)
}

export const fixedWsURL = (wsURL: string) => {
  const protocol = isCloudVersion
    ? location.protocol
    : new URL(HTTP_REQUEST_PUBLIC_BASE_URL).protocol
  const wsProtocol = protocol === "https:" ? "wss://" : "ws://"

  if (!isCloudVersion) {
    const wsPREFIX = `${wsProtocol}${
      new URL(HTTP_REQUEST_PUBLIC_BASE_URL).host
    }`
    wsURL = `${wsPREFIX}${wsURL}`
  }
  return wsURL
}

export class Connection {
  static roomMap: Map<string, ZWEBWebsocket | ZWEBBinaryWebsocket> = new Map()

  static enterDashboardRoom(wsURL: string) {
    let ws = generateTextMessageWs(wsURL, ZWEB_WEBSOCKET_CONTEXT.DASHBOARD)
    ws.registerListener(ReduxMessageListener)
    ws.initWebsocket()
    this.roomMap.set("dashboard/", ws)
  }

  static enterAppRoom(wsURL: string, binaryWsURL: string, appID: string) {
    let ws = generateTextMessageWs(wsURL, ZWEB_WEBSOCKET_CONTEXT.APP)
    ws.registerListener(ReduxMessageListener)
    ws.initWebsocket()
    let binaryWs = generateBinaryMessageWs(binaryWsURL)
    this.roomMap.set(`app/${appID}`, ws)
    this.roomMap.set(`app/${appID}/binary`, binaryWs)
  }

  static enterAgentRoom(wsURL: string, messageListener: WSMessageListener) {
    let ws = generateTextMessageWs(wsURL, ZWEB_WEBSOCKET_CONTEXT.AI_AGENT)
    ws.registerListener(messageListener)
    ws.initWebsocket()
    this.roomMap.set("ai-agent/", ws)
  }

  static getTextRoom(
    type: RoomType,
    roomId: string,
  ): ZWEBWebsocket | undefined {
    return this.roomMap.get(`${type}/${roomId}`) as ZWEBWebsocket
  }

  static getBinaryRoom(
    type: RoomType,
    roomId: string,
  ): ZWEBBinaryWebsocket | undefined {
    return this.roomMap.get(`${type}/${roomId}/binary`) as ZWEBBinaryWebsocket
  }

  static leaveRoom(type: RoomType, roomId: string) {
    const { id: teamID = "", uid = "" } =
      getCurrentTeamInfo(store.getState()) ?? {}
    let textWS = this.roomMap.get(`${type}/${roomId}`) as ZWEBWebsocket
    let binaryWS = this.roomMap.get(`app/${roomId}/binary`)
    if (textWS != undefined) {
      textWS.send(
        getTextMessagePayload(
          TextSignal.LEAVE,
          TextTarget.NOTHING,
          false,
          {
            type: "leave",
            payload: [],
          },
          teamID,
          uid,
          [],
        ),
      )
      textWS.close()
    }
    if (binaryWS != undefined) {
      binaryWS.close()
    }
  }
}

export function generateTextMessageWs(
  url: string,
  context: ZWEB_WEBSOCKET_CONTEXT,
) {
  return new ZWEBWebsocket(url, context)
}

export function generateBinaryMessageWs(url: string) {
  return new ZWEBBinaryWebsocket(url, ZWEB_WEBSOCKET_CONTEXT.APP_BINARY)
}
