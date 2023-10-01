import { css } from "@emotion/react"
import { globalColor, zwebPrefix } from "@zweb-design/react"

export const actionEventHandlerStyle = css`
  border-top: 1px solid ${globalColor(`--${zwebPrefix}-grayBlue-08`)};
  height: 39px;
  padding-top: 16px;
  padding-left: 16px;
  font-size: 14px;
  font-weight: 500;
  text-align: left;
  color: ${globalColor(`--${zwebPrefix}-grayBlue-04`)};
`

export const actionEventHandlerWrapperStyle = css`
  width: 100%;
  display: flex;
  flex-direction: column;
`
