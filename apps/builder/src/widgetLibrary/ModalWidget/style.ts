import { css } from "@emotion/react"
import { globalColor, zwebPrefix } from "@zweb-design/react"

export const formContainerStyle = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
`

export const formHeaderStyle = css`
  width: 100%;
  height: 100%;
  overflow: hidden;
`
export const formBodyStyle = css`
  width: 100%;
  height: 100%;
  min-height: 100px;
  flex: 1;
  overflow-y: auto;
  position: relative;
`
export const resizeLineStyle = css`
  width: 100%;
  height: 100%;
  cursor: row-resize;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const resizeBarStyle = css`
  fill: ${globalColor(`--${zwebPrefix}-white-01`)};
  stroke: ${globalColor(`--${zwebPrefix}-techPurple-01`)};
  :hover {
    fill: ${globalColor(`--${zwebPrefix}-techPurple-01`)};
    stroke: ${globalColor(`--${zwebPrefix}-white-01`)};
  }
  :active {
    fill: ${globalColor(`--${zwebPrefix}-techPurple-01`)};
    stroke: ${globalColor(`--${zwebPrefix}-white-01`)};
  }
`
