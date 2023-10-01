import { FC, memo } from "react"
import { Loading } from "@zweb-design/react"
import { widgetLoadingWrapperStyle } from "./style"

const WidgetLoading: FC = () => {
  return (
    <div css={widgetLoadingWrapperStyle}>
      <Loading colorScheme="techPurple" />
    </div>
  )
}

WidgetLoading.displayName = "WidgetLoading"

export default memo(WidgetLoading)
