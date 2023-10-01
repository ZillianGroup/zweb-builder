import { FC, memo } from "react"
import { Trigger } from "@zweb-design/react"
import { ZWEBMarkdown } from "@/components/ZWEBMarkdown"
import { TooltipWrapperProps } from "./interface"

export const TooltipWrapper: FC<TooltipWrapperProps> = memo(
  (props: TooltipWrapperProps) => {
    const { children, tooltipText, tooltipDisabled } = props

    return (
      <Trigger
        content={<ZWEBMarkdown textString={tooltipText} />}
        colorScheme="grayBlue"
        disabled={tooltipDisabled}
        position="top"
        autoFitPosition={false}
        trigger="hover"
      >
        {children}
      </Trigger>
    )
  },
)

TooltipWrapper.displayName = "TooltipWrapper"
