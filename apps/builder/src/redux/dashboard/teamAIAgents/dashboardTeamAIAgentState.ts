import { Agent } from "@zweb-public/market-agent"

export interface DashboardTeamAIAgentState {
  list: Agent[]
}

export const TeamAgentInitial: DashboardTeamAIAgentState = {
  list: [],
}
