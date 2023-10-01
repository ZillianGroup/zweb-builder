import { css } from "@emotion/react"

export const bodySectionWrapperStyle = (background: string) => css`
  position: absolute;
  width: var(--zweb-canvas-body-width, 100%);
  left: var(--zweb-canvas-body-left, 0);
  top: var(--zweb-canvas-body-top, 0);
  height: var(--zweb-canvas-body-height);
  background: ${background};
`
