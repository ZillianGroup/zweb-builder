import { MARKET_AGENT_SORTED_OPTIONS } from "@zweb-public/market-agent"
import { PRODUCT_SORT_BY } from "@zweb-public/market-app/service/interface"

export interface SortSelectorProps {
  onSortChange: (sort: MARKET_AGENT_SORTED_OPTIONS | PRODUCT_SORT_BY) => void
  sort: MARKET_AGENT_SORTED_OPTIONS | PRODUCT_SORT_BY
}
