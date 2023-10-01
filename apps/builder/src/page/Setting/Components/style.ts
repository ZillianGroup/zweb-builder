import { css } from "@emotion/react"
import { globalColor, zwebPrefix } from "@zweb-design/react"

export const labelStyles = css`
  font-size: 14px;
  font-weight: 500;
  color: ${globalColor(`--${zwebPrefix}-grayBlue-02`)};
`

export const labelExtInfoStyles = css`
  font-size: 14px;
  font-weight: 400;
  color: ${globalColor(`--${zwebPrefix}-grayBlue-04`)};
`
