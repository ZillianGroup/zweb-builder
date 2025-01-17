import { css } from "@emotion/react"
import { RIGHT_MIN_WIDTH } from "@/page/App/components/DotPanel/constant/canvas"

export const applyRightSectionWrapperStyle = (
  width: string,
  top: string = "0px",
  isFold: boolean,
  dividerColor?: string,
  background: string = "transparent",
) => css`
  position: absolute;
  top: var(--zweb-canvas-right-top, ${top});
  right: 0;
  height: var(--zweb-canvas-right-height, 100%);
  width: ${width};
  display: flex;
  flex-direction: row-reverse;
  min-width: ${isFold ? 0 : `${RIGHT_MIN_WIDTH}px`};
  border-left: ${dividerColor ? `1px solid ${dividerColor}` : "unset"};
  background: ${background};
`
