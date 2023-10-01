import {
  ZWEB_MIXPANEL_EVENT_TYPE,
  ZWEB_MIXPANEL_PUBLIC_PAGE_NAME,
} from "@zweb-public/mixpanel-utils"
import { FC, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { Button, Result403Icon } from "@zweb-design/react"
import { ErrorPage } from "@/page/Status/errorPage"
import { buttonStyle, iconStyle } from "@/page/Status/style"
import { track } from "@/utils/mixpanelHelper"

export const Page403: FC = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  useEffect(() => {
    track(
      ZWEB_MIXPANEL_EVENT_TYPE.VISIT,
      ZWEB_MIXPANEL_PUBLIC_PAGE_NAME.ERROR_PAGE,
      {
        parameter3: "403",
      },
    )
  }, [])
  return (
    <ErrorPage
      title="403"
      des={t("status.403.des")}
      img={<Result403Icon css={iconStyle} />}
    >
      <div css={buttonStyle}>
        <Button onClick={() => navigate("/")}>{t("status.back")}</Button>
      </div>
    </ErrorPage>
  )
}

export default Page403
