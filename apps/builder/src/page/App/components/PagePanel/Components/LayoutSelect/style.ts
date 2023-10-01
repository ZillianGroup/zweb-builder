import { css } from "@emotion/react"
import { globalColor, zwebPrefix } from "@zweb-design/react"

export const layoutSelectWrapperStyle = css`
  display: flex;
  align-items: center;
  height: 22px;
  gap: 4px;
  cursor: pointer;
`

export const layoutOptionsPanelWrapperStyle = css`
  padding: 16px;
  background-color: ${globalColor(`--${zwebPrefix}-white-01`)};
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(3, 88px);
`

export const layoutOptionItemWrapperStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
`

export const applyLayoutOptionItemIconStyle = (isSelected: boolean) => {
  return css`
    padding: 8px;
    background-color: ${isSelected
      ? globalColor(`--${zwebPrefix}-techPurple-07`)
      : globalColor(`--${zwebPrefix}-grayBlue-09`)};
    border-radius: 4px;
    flex: none;
    border: 1px solid
      ${isSelected
        ? globalColor(`--${zwebPrefix}-techPurple-01`)
        : "transparent"};
    cursor: pointer;
    transition: all 0.2s ease-in-out 0s;
    :hover {
      border: 1px solid ${globalColor(`--${zwebPrefix}-techPurple-01`)};
      box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.08);
      background-color: ${globalColor(`--${zwebPrefix}-techPurple-07`)};
    }
    :active {
      border: 1px solid ${globalColor(`--${zwebPrefix}-techPurple-01`)};
      background-color: ${globalColor(`--${zwebPrefix}-techPurple-07`)};
    }
  `
}

export const layoutOptionItemLabelStyle = css`
  color: ${globalColor(`--${zwebPrefix}-grayBlue-02`)};
  font-size: 14px;
`
