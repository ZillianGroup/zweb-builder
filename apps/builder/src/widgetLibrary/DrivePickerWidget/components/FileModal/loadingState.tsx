import { FC } from "react"
import { Spin } from "@zweb-design/react"
import { loadingContainerStyle } from "./style"

export const LoadingState: FC<{ colorScheme: string }> = ({ colorScheme }) => {
  return (
    <div css={loadingContainerStyle}>
      <Spin colorScheme={colorScheme} />
    </div>
  )
}
