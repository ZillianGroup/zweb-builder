export type ZWEBPanelType =
  | "none"
  | "data_component"
  | "data_action"
  | "data_page"
  | "data_global_state"
  | "action"
  | "canvas"
  | "widget_picker"
  | "components_config"
  | "page_config"
export interface ClickPosition {
  displayName: string
  type: "inner_container" | "component" | "group"
  clickPosition: number[]
}

export class FocusManager {
  private static currentFocus: ZWEBPanelType = "none"
  private static currentClickPosition?: ClickPosition

  static switchFocus(
    zwebPanelType: ZWEBPanelType,
    clickPosition?: ClickPosition,
  ) {
    this.currentFocus = zwebPanelType
    this.currentClickPosition = clickPosition
  }

  static getClickPosition(): ClickPosition | undefined {
    return this.currentClickPosition
  }

  static getFocus(): ZWEBPanelType {
    return this.currentFocus
  }
}
