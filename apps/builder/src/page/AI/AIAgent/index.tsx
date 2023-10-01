import { Agent } from "@zweb-public/market-agent"
import {
  ZWEB_MIXPANEL_BUILDER_PAGE_NAME,
  ZWEB_MIXPANEL_EVENT_TYPE,
} from "@zweb-public/mixpanel-utils"
import { FC, useEffect } from "react"
import {
  Await,
  redirect,
  useBeforeUnload,
  useLoaderData,
} from "react-router-dom"
import { AIAgent } from "@/page/AI/AIAgent/aiagent"
import {
  track,
  trackPageDurationEnd,
  trackPageDurationStart,
} from "@/utils/mixpanelHelper"

export const AIAgentDefer: FC = () => {
  const data = useLoaderData() as {
    data: Promise<Agent>
  }

  useEffect(() => {
    track(
      ZWEB_MIXPANEL_EVENT_TYPE.VISIT,
      ZWEB_MIXPANEL_BUILDER_PAGE_NAME.AI_AGENT_EDIT,
    )
    trackPageDurationStart()
    return () => {
      trackPageDurationEnd(ZWEB_MIXPANEL_BUILDER_PAGE_NAME.AI_AGENT_EDIT)
    }
  }, [])

  useBeforeUnload(() => {
    trackPageDurationEnd(ZWEB_MIXPANEL_BUILDER_PAGE_NAME.AI_AGENT_EDIT)
  })

  return (
    <Await resolve={data.data} errorElement={<>{redirect("404")}</>}>
      <AIAgent />
    </Await>
  )
}

AIAgentDefer.displayName = "AIAgentRun"
export default AIAgentDefer
