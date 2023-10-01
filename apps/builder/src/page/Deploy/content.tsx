import { Unsubscribe } from "@reduxjs/toolkit"
import {
  ZWEB_MIXPANEL_BUILDER_PAGE_NAME,
  ZWEB_MIXPANEL_EVENT_TYPE,
} from "@zweb-public/mixpanel-utils"
import { AxiosResponse } from "axios"
import { FC, useEffect } from "react"
import { useDispatch } from "react-redux"
import { useAsyncValue, useBeforeUnload } from "react-router-dom"
import { TriggerProvider } from "@zweb-design/react"
import { useDestroyApp } from "@/hooks/useDestoryExecutionTree"
import { fixedActionToNewAction } from "@/hooks/utils/fixedAction"
import { fixedComponentsToNewComponents } from "@/hooks/utils/fixedComponents"
import { WaterMark } from "@/page/Deploy/Watermark"
import { configActions } from "@/redux/config/configSlice"
import { actionActions } from "@/redux/currentApp/action/actionSlice"
import { appInfoActions } from "@/redux/currentApp/appInfo/appInfoSlice"
import { setupComponentsListeners } from "@/redux/currentApp/editor/components/componentsListener"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { setupExecutionListeners } from "@/redux/currentApp/executionTree/executionListener"
import { executionActions } from "@/redux/currentApp/executionTree/executionSlice"
import { startAppListening } from "@/store"
import {
  track,
  trackPageDurationEnd,
  trackPageDurationStart,
} from "@/utils/mixpanelHelper"
import { CanvasPanel } from "../App/components/CanvasPanel"
import { CurrentAppResp } from "../App/resp/currentAppResp"

interface IDeployContentAsyncValue {
  isPublic: boolean
  appInfo: Promise<AxiosResponse<CurrentAppResp>>
}

export const DeployContent: FC = () => {
  const asyncValue = useAsyncValue() as IDeployContentAsyncValue
  const dispatch = useDispatch()

  useEffect(() => {
    const subscriptions: Unsubscribe[] = [
      setupComponentsListeners(startAppListening),
      setupExecutionListeners(startAppListening),
    ]
    return () => subscriptions.forEach((unsubscribe) => unsubscribe())
  }, [])

  useEffect(() => {
    const initApp = async () => {
      const appInfo = await asyncValue.appInfo
      document.title = appInfo.data.appInfo.appName
      dispatch(configActions.updateZWebMode("production"))
      dispatch(appInfoActions.updateAppInfoReducer(appInfo.data.appInfo))
      const fixedComponents = fixedComponentsToNewComponents(
        appInfo.data.components,
      )
      dispatch(componentsActions.initComponentReducer(fixedComponents))
      const fixedActions = fixedActionToNewAction(appInfo.data.actions)
      dispatch(actionActions.initActionListReducer(fixedActions))
      dispatch(executionActions.startExecutionReducer())
    }
    initApp()
  }, [asyncValue, dispatch])

  useDestroyApp()

  useEffect(() => {
    track(
      ZWEB_MIXPANEL_EVENT_TYPE.VISIT,
      ZWEB_MIXPANEL_BUILDER_PAGE_NAME.DEPLOY,
    )
    trackPageDurationStart()
    return () => {
      trackPageDurationEnd(ZWEB_MIXPANEL_BUILDER_PAGE_NAME.DEPLOY)
    }
  }, [])

  useBeforeUnload(() => {
    trackPageDurationEnd(ZWEB_MIXPANEL_BUILDER_PAGE_NAME.DEPLOY)
  })

  return (
    <TriggerProvider renderInBody zIndex={10}>
      {<CanvasPanel />}
      {<WaterMark />}
    </TriggerProvider>
  )
}
