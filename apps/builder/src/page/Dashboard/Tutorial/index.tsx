import {
  ZWEB_MIXPANEL_BUILDER_PAGE_NAME,
  ZWEB_MIXPANEL_EVENT_TYPE,
} from "@zweb-public/mixpanel-utils"
import { getCurrentTeamInfo } from "@zweb-public/user-data"
import { FC, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { useBeforeUnload, useNavigate } from "react-router-dom"
import { NextIcon, Spin } from "@zweb-design/react"
import { ReactComponent as CardCover } from "@/assets/tutorial/card-cover.svg"
import { Templates } from "@/config/template"
import { appsContainerStyle } from "@/page/Dashboard/DashboardApps/style"
import { TemplateList } from "@/page/Dashboard/Tutorial/TemplateList"
import {
  cardBgStyle,
  cardDescStyle,
  cardFooterStyle,
  cardStyle,
  cardTitleStyle,
  contentStyle,
  titleStyle,
} from "@/page/Dashboard/Tutorial/style"
import {
  track,
  trackPageDurationEnd,
  trackPageDurationStart,
} from "@/utils/mixpanelHelper"

const Tutorial: FC = () => {
  const { t } = useTranslation()
  let navigate = useNavigate()

  const teamInfo = useSelector(getCurrentTeamInfo)!!

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    track(
      ZWEB_MIXPANEL_EVENT_TYPE.VISIT,
      ZWEB_MIXPANEL_BUILDER_PAGE_NAME.TUTORIAL,
    )
    trackPageDurationStart()
    return () => {
      trackPageDurationEnd(ZWEB_MIXPANEL_BUILDER_PAGE_NAME.TUTORIAL)
    }
  }, [])

  useBeforeUnload(() => {
    trackPageDurationEnd(ZWEB_MIXPANEL_BUILDER_PAGE_NAME.TUTORIAL)
  })

  return (
    <Spin css={appsContainerStyle} colorScheme="techPurple" loading={loading}>
      <div css={contentStyle}>
        <div css={titleStyle}>
          {t("editor.tutorial.panel.tutorial.tab.title")}
        </div>
        <div
          css={cardStyle}
          onClick={() => {
            track(
              ZWEB_MIXPANEL_EVENT_TYPE.CLICK,
              ZWEB_MIXPANEL_BUILDER_PAGE_NAME.TUTORIAL,
              { element: "tutorial_onboarding_app" },
            )
            navigate(`/${teamInfo.identifier}/guide`)
          }}
        >
          <CardCover css={cardBgStyle} />
          <div css={cardTitleStyle}>
            {t("editor.tutorial.panel.tutorial.onboarding_app.name")}
          </div>
          <div css={cardDescStyle}>
            {t("editor.tutorial.panel.tutorial.onboarding_app.description")}
          </div>
          <div css={cardFooterStyle}>
            {t("editor.tutorial.panel.tutorial.onboarding_app.action")}{" "}
            <NextIcon />
          </div>
        </div>

        <div css={[titleStyle]}>
          {t("editor.tutorial.panel.tutorial.title.templates")}
        </div>
        <TemplateList
          data={Templates}
          loading={loading}
          setLoading={setLoading}
        />
      </div>
    </Spin>
  )
}

export default Tutorial

Tutorial.displayName = "Tutorial"
