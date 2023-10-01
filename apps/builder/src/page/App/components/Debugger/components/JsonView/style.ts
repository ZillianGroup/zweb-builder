import { SerializedStyles, css } from "@emotion/react"
import { globalColor, zwebPrefix } from "@zweb-design/react"

export const jsonStyle = css`
  font-family: "Fira Code", monospace;
  padding-top: 4px;
  padding-bottom: 6px;
  font-size: 14px;
  line-height: 22px;
`

export const itemDescStyle: SerializedStyles = css`
  display: inline-block;
  vertical-align: bottom;
  color: ${globalColor(`--${zwebPrefix}-grayBlue-04`)};
  margin-left: 8px;
`

export const jsonExpandStyle = css`
  margin-right: 8px;
`

export function applyLevelStyle(level: number): SerializedStyles {
  return css`
    margin-left: ${level * 16}px;
  `
}
