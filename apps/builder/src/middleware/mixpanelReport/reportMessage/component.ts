import { PayloadAction } from "@reduxjs/toolkit"
import { ZWEB_MIXPANEL_EVENT_TYPE } from "@zweb-public/mixpanel-utils"
import {
  getCanvas,
  searchDsl,
} from "@/redux/currentApp/editor/components/componentsSelector"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import { RootState } from "@/store"
import { trackInEditor } from "@/utils/mixpanelHelper"

export const componentsOperationReport = (
  reduxAction: string,
  currentAppID: string,
  action: PayloadAction<any>,
  teamID: string,
  uid: string,
  prevRootState: RootState,
  _nextRootState: RootState,
) => {
  switch (reduxAction) {
    case "addComponentReducer": {
      const payload = action.payload as ComponentNode[]
      trackInEditor(ZWEB_MIXPANEL_EVENT_TYPE.ADD, {
        element: "component",
        parameter1: payload.map((node) => node.type),
      })
      break
    }
    case "deleteComponentNodeReducer": {
      const payload = action.payload.displayNames as string[]
      const source = action.payload.source
      const prevCanvas = getCanvas(prevRootState)
      const nodes = payload
        .map((id) => searchDsl(prevCanvas, id))
        .filter((node) => node) as ComponentNode[]
      const types = nodes.map((node) => node.type)
      trackInEditor(ZWEB_MIXPANEL_EVENT_TYPE.DELETE, {
        element: "component",
        parameter1: types,
        parameter3: source,
      })
      break
    }
  }
}
