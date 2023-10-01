import { css } from "@emotion/react"
import { getColor } from "@zweb-design/react"
import { ZWebMode } from "@/redux/config/configState"

export const applyCanvasContainerWrapperStyle = (
  width: string,
  mode: ZWebMode,
) => {
  const borderStyle =
    mode === "edit" && width !== "100%"
      ? css`
          border-left: 1px solid ${getColor("grayBlue", "09")};
          border-right: 1px solid ${getColor("grayBlue", "09")};
        `
      : null
  return css`
    width: ${width};
    height: 100%;
    position: relative;
    background-color: ${getColor("white", "01")};
    flex: none;
    margin: 0 auto;
    ${borderStyle};
  `
}

export const pageContainerWrapperStyle = css`
  width: 100%;
  height: 100%;
`

export const emptyContainerStyle = css`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${getColor("grayBlue", "04")};
  font-size: 14px;
  padding: 0 16px;
`
