import { css } from "@emotion/react"
import { FOOTER_MIN_HEIGHT } from "@/page/App/components/DotPanel/constant/canvas"

export const applyFooterSectionWrapperStyle = (
  height: string,
  left: string = "0px",
  width: string = "0px",
  dividerColor?: string,
  background: string = "transparent",
) => css`
  position: absolute;
  bottom: 0;
  left: var(--zweb-canvas-footer-left, ${left});
  width: var(--zweb-canvas-footer-width, ${width});
  height: ${height};
  display: flex;
  flex-direction: column-reverse;
  min-height: ${FOOTER_MIN_HEIGHT}px;
  border-top: ${dividerColor ? `1px solid ${dividerColor}` : "unset"};
  background: ${background};
`
