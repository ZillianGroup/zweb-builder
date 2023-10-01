import { getCurrentId } from "@zweb-public/user-data"
import { ZWEBRoute } from "@/router"
import store from "../store"

export const getCurrentTeamID = () => {
  return getCurrentId(store.getState())
}

// maybe not same as current team
export const getCurrentTeamIdentifier = () => {
  return ZWEBRoute.state.matches[0].params.teamIdentifier
}
