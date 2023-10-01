import { Global } from "@emotion/react"
import {
  MixpanelTrackProvider,
  ZWEB_MIXPANEL_PUBLIC_PAGE_NAME,
} from "@zweb-public/mixpanel-utils"
import { LoginPage } from "@zweb-public/sso-module"
import { isCloudVersion } from "@zweb-public/utils"
import { ERROR_FLAG } from "@zweb-public/zweb-net/errorFlag"
import { FC, useState } from "react"
import { SubmitHandler } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useLocation, useNavigate } from "react-router-dom"
import { useMessage } from "@zweb-design/react"
import { translateSearchParamsToURLPathWithSelfHost } from "@/router/utils/translateQS"
import { fetchSignIn } from "@/services/auth"
import { mobileAdaptationStyle } from "@/style"
import { track } from "@/utils/mixpanelHelper"
import { ZWEBBuilderStorage } from "@/utils/storage"
import { isZWEBAPiError } from "@/utils/typeHelper"
import { LoginFields } from "./interface"

const UserLogin: FC = () => {
  const [submitLoading, setSubmitLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState({ email: "", password: "" })
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()

  const message = useMessage()
  const onSubmit: SubmitHandler<LoginFields> = async (requestBody) => {
    setSubmitLoading(true)
    try {
      const res = await fetchSignIn(requestBody)
      const token = res.headers["zweb-token"]
      if (!token) {
        return
      }
      ZWEBBuilderStorage.setLocalStorage("token", token, -1)
      if (!isCloudVersion) {
        const urlSearchParams = new URLSearchParams(location.search)
        const path = translateSearchParamsToURLPathWithSelfHost(urlSearchParams)
        navigate(`${path}`)
      } else {
        navigate(location.state?.from ?? "/", {
          replace: true,
        })
      }
      message.success({
        content: t("user.sign_in.tips.success"),
      })
    } catch (error) {
      if (isZWEBAPiError(error)) {
        switch (error.data.errorFlag) {
          case ERROR_FLAG.ERROR_FLAG_SIGN_IN_FAILED:
            setErrorMsg({
              ...errorMsg,
              password: t("user.sign_in.error_message.password.incorrect"),
            })
            break
          default:
            message.error({
              content: t("user.sign_in.tips.fail"),
            })
        }
      } else {
        message.warning({
          content: t("network_error"),
        })
      }
    }
    setSubmitLoading(false)
  }

  return (
    <MixpanelTrackProvider
      basicTrack={track}
      pageName={ZWEB_MIXPANEL_PUBLIC_PAGE_NAME.LOGIN}
    >
      <Global styles={mobileAdaptationStyle} />
      <LoginPage
        loading={submitLoading}
        errorMsg={errorMsg}
        onSubmit={onSubmit}
      />
    </MixpanelTrackProvider>
  )
}

export default UserLogin

UserLogin.displayName = "UserLogin"
