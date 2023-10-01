import { FC, memo } from "react"
import { Trigger } from "@zweb-design/react"
import { ZWEBMarkdown } from "@/components/ZWEBMarkdown"
import { PanelLabelProps } from "./interface"
import { applyLabelTipsStyle } from "./style"

export const PanelLabel: FC<PanelLabelProps> = memo(
  (props: PanelLabelProps) => {
    const { labelDesc, labelName, size = "medium" } = props

    return !labelDesc ? (
      <span css={applyLabelTipsStyle(!!labelDesc, size)}>{labelName}</span>
    ) : (
      <Trigger
        content={<ZWEBMarkdown textString={labelDesc} />}
        trigger="hover"
        position="left"
        maxW="240px"
        disabled={!labelDesc}
      >
        <span css={applyLabelTipsStyle(!!labelDesc, size)}>{labelName}</span>
      </Trigger>
    )
  },
)

PanelLabel.displayName = "PanelLabel"
