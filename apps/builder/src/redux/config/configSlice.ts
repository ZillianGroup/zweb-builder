import { createSlice } from "@reduxjs/toolkit"
import {
  changeSelectedAction,
  clearSelectedComponent,
  minusScale,
  plusScale,
  removeExpandedKey,
  resetConfig,
  resetSelectedActionReducer,
  setExpandedKey,
  updateBottomPanel,
  updateCachedAction,
  updateCachedActionAdvancedConfigReducer,
  updateCanvasShapeReducer,
  updateDebuggerVisible,
  updateDevicesOnlineStatusReducer,
  updateHoveredComponent,
  updateLeftPanel,
  updateRightPanel,
  updateSelectedComponent,
  updateShowDot,
  updateWSStatusReducer,
  updateZWebMode,
} from "@/redux/config/configReducer"
import { ConfigInitialState } from "@/redux/config/configState"

const configSlice = createSlice({
  name: "config",
  initialState: ConfigInitialState,
  reducers: {
    resetConfig,
    updateZWebMode,
    updateLeftPanel,
    updateRightPanel,
    updateBottomPanel,
    updateDebuggerVisible,
    updateShowDot,
    updateSelectedComponent,
    clearSelectedComponent,
    changeSelectedAction,
    updateCachedAction,
    updateCachedActionAdvancedConfigReducer,
    plusScale,
    minusScale,
    setExpandedKey,
    removeExpandedKey,
    updateCanvasShapeReducer,
    updateDevicesOnlineStatusReducer,
    updateWSStatusReducer,
    updateHoveredComponent,
    resetSelectedActionReducer,
  },
})

export const configActions = configSlice.actions
export default configSlice.reducer
