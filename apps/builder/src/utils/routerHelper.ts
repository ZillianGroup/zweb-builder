import { ZWEBRoute } from "@/router"

export const getParamsFromZWebRoute = (key: string) => {
  const routerParams = ZWEBRoute.state.matches[0].params
  return routerParams[key]
}
