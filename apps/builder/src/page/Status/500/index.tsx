import {
  ZWEB_MIXPANEL_EVENT_TYPE,
  ZWEB_MIXPANEL_PUBLIC_PAGE_NAME,
} from "@zweb-public/mixpanel-utils"
import { FC, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { Button, Result500Icon } from "@zweb-design/react"
import { ErrorPage } from "@/page/Status/errorPage"
import { buttonStyle, iconStyle } from "@/page/Status/style"
import { track } from "@/utils/mixpanelHelper"

export const Page500: FC = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  useEffect(() => {
    track(
      ZWEB_MIXPANEL_EVENT_TYPE.VISIT,
      ZWEB_MIXPANEL_PUBLIC_PAGE_NAME.ERROR_PAGE,
      {
        parameter3: "500",
      },
    )
  }, [])
  return (
    <ErrorPage
      title="500"
      des={t("status.500.des")}
      img={<Result500Icon css={iconStyle} />}
    >
      <div css={buttonStyle}>
        <Button onClick={() => navigate("/")}>{t("status.back")}</Button>
      </div>
    </ErrorPage>
  )
}

export default Page500
