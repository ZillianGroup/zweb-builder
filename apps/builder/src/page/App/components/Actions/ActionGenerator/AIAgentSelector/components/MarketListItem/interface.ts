import { Agent, MarketAIAgent } from "@zweb-public/market-agent"
import { CSSProperties } from "react"

export interface MarketListItemProps {
  item: MarketAIAgent
  onSelected: (item: Agent) => void
  style?: CSSProperties
}
