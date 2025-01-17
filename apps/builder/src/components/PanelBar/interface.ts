import { ReactNode } from "react"

export interface PanelBarProps {
  title: string
  size?: "default" | "small"
  children?: ReactNode
  isOpened?: boolean
  saveToggleState?: (value: boolean) => void
  onZWebFocus?: () => void
  destroyChildrenWhenClose?: boolean
  customIcon?: ReactNode
}
