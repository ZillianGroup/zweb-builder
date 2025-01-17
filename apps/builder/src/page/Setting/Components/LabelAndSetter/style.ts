import { css } from "@emotion/react"
import { globalColor, zwebPrefix } from "@zweb-design/react"

export const fullWidth = css`
  width: 100%;
`

export const publicInputMarginWrapperStyle = css`
  margin-top: 8px;
  ${fullWidth};
`

export const publicLabelAndInputWrapperStyle = css`
  margin-top: 24px;
  ${fullWidth};
`

export const errorTextStyle = css`
  display: inline-block;
  margin-left: 8px;
`

export const errorLineStyle = css`
  margin-top: 8px;
  color: ${globalColor(`--${zwebPrefix}-orange-03`)};
  display: flex;
  align-items: center;
  font-size: 12px;
`
