import { SerializedStyles, css } from "@emotion/react"
import { getColor, globalColor, zwebPrefix } from "@zweb-design/react"

export const actionIconContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  flex-shrink: 0;
  width: 16px;
  height: 16px;
`

export const actionItemDotStyle = css`
  flex-shrink: 0;
  width: 8px;
  margin-left: 9px;
  height: 8px;
  margin-right: 9px;
  box-sizing: border-box;
  border-radius: 50%;
  background: ${globalColor(`--${zwebPrefix}-blue-03`)};
`

export function applyActionItemTitleStyle(error: boolean): SerializedStyles {
  return css`
    flex-shrink: 1;
    font-weight: 500;
    margin-left: 8px;
    overflow: hidden;
    color: ${error
      ? globalColor(`--${zwebPrefix}-red-03`)
      : globalColor(`--${zwebPrefix}-grayBlue-02`)};
    text-overflow: ellipsis;
    white-space: nowrap;
  `
}

export const timeStyle = css`
  color: ${globalColor(`--${zwebPrefix}-grayBlue-04`)};
`

export const warningCircleStyle = css`
  position: absolute;
  color: ${globalColor(`--${zwebPrefix}-red-03`)};
  font-size: 8px;
  bottom: 0;
  right: 0;
`

export function applyActionItemContainerStyle(
  selected: boolean,
): SerializedStyles {
  return css`
    background: ${selected
      ? globalColor(`--${zwebPrefix}-techPurple-07`)
      : "transparent"};
    width: 100%;
    align-items: center;
    display: flex;
    flex-direction: row;
    padding-left: 16px;
    padding-right: 16px;
    height: 40px;
    font-size: 14px;

    &:hover {
      background: ${selected
        ? globalColor(`--${zwebPrefix}-techPurple-07`)
        : globalColor(`--${zwebPrefix}-grayBlue-09`)};
    }
  `
}

export const actionItemLeftStyle = css`
  color: ${globalColor(`--${zwebPrefix}-grayBlue-02`)};
  display: flex;
  overflow: hidden;
  flex-direction: row;
  align-items: center;
  flex-grow: 1;
`

export const runningTimeStyle = css`
  font-size: 12px;
  font-weight: 400;
  color: ${getColor("grayBlue", "04")};
`
