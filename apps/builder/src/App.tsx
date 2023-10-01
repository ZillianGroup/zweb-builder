import createCache from "@emotion/cache"
import { CacheProvider, Global } from "@emotion/react"
import {
  ZWEB_MIXPANEL_EVENT_TYPE,
  ZWEB_MIXPANEL_PUBLIC_PAGE_NAME,
} from "@zweb-public/mixpanel-utils"
import { UpgradeModalGroup } from "@zweb-public/upgrade-modal"
import { getCurrentTranslateLanguage } from "@zweb-public/user-data"
import { useEffect, useMemo } from "react"
import { DndProvider } from "react-dnd"
import { TouchBackend } from "react-dnd-touch-backend"
import { HelmetProvider } from "react-helmet-async"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { RouterProvider } from "react-router-dom"
import {
  ConfigProvider,
  MessageGroup,
  ModalGroup,
  NotificationGroup,
  enUS,
  jaJP,
  koKR,
  zhCN,
} from "@zweb-design/react"
import { zwebCodeMirrorTooltipStyle } from "@/components/CodeEditor/CodeMirror/theme"
import { getIsZWEBProductMode } from "@/redux/config/configSelector"
import { ZWEBRoute } from "@/router"
import { px2Rem } from "@/utils/stylis-plugin/px2rem"
import { globalStyle } from "./style"
import { track } from "./utils/mixpanelHelper"

const dragOptions = {
  enableTouchEvents: true,
  enableMouseEvents: true,
}

function App() {
  const currentUserLanguage = useSelector(getCurrentTranslateLanguage)
  const configLanguage = useMemo(() => {
    switch (currentUserLanguage) {
      case "en-US":
        return enUS
      case "zh-CN":
        return zhCN
      case "ja-JP":
        return jaJP
      case "ko-KR":
        return koKR
      default:
        return enUS
    }
  }, [currentUserLanguage])
  const { i18n } = useTranslation()
  const isProductMode = useSelector(getIsZWEBProductMode)

  useEffect(() => {
    if (!!currentUserLanguage) {
      i18n.changeLanguage(currentUserLanguage)
    }
  }, [currentUserLanguage, i18n])

  useEffect(() => {
    track(
      ZWEB_MIXPANEL_EVENT_TYPE.ZWEB_ACTIVE,
      ZWEB_MIXPANEL_PUBLIC_PAGE_NAME.PLACEHOLDER,
    )
  }, [])

  let cache = createCache({
    key: "css",
    stylisPlugins: [
      px2Rem({
        unit: "rem",
        remSize: 100,
      }),
    ],
  })

  return (
    <CacheProvider value={cache}>
      <HelmetProvider>
        <DndProvider backend={TouchBackend} options={dragOptions}>
          <ConfigProvider locale={configLanguage}>
            <Global styles={globalStyle} />
            <MessageGroup pt={!isProductMode ? "46px" : "0"} />
            <UpgradeModalGroup />
            <NotificationGroup pt={!isProductMode ? "46px" : "0"} />
            <ModalGroup />
            <RouterProvider router={ZWEBRoute} />
            <div
              className="zwebCodeMirrorWrapper"
              css={zwebCodeMirrorTooltipStyle}
            />
          </ConfigProvider>
        </DndProvider>
      </HelmetProvider>
    </CacheProvider>
  )
}

export default App
