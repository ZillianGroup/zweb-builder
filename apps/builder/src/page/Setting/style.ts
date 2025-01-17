import { css } from "@emotion/react"
import { globalColor, zwebPrefix } from "@zweb-design/react"

export const navBarStyle = css`
  padding: 0 16px;
  height: 48px;
  display: flex;
  align-items: center;
`

export const navBarLogoStyle = css`
  margin-right: 40px;
`

export const navBarTabStyle = css`
  font-size: 14px;
  color: ${globalColor(`--${zwebPrefix}-grayBlue-04`)};
  margin-right: 32px;
  cursor: pointer;
`

export const tabPrefixStyle = css`
  display: inline-flex;
  align-self: center;
  margin-left: 16px;
  padding: 0 16px;
  flex-grow: 1;
`
export const preIconStyle = css`
  display: inline-block;
  align-self: center;
  margin-right: 4px;
`
export const tabPreTextStyle = css`
  font-size: 14px;
`

export const backAreaStyle = css`
  cursor: pointer;
`
