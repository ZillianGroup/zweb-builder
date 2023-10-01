import { Agent } from "@zweb-public/market-agent"
import { MARKET_AGENT_SORTED_OPTIONS } from "@zweb-public/market-agent"

export interface MarketAgentListProps {
  onSelect: (item: Agent) => void
  search: string
  sortBy: MARKET_AGENT_SORTED_OPTIONS
}
