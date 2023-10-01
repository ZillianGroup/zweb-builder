import {
  ZWEB_MIXPANEL_BUILDER_PAGE_NAME,
  ZWEB_MIXPANEL_EVENT_TYPE,
} from "@zweb-public/mixpanel-utils"
import { getCurrentUserID } from "@zweb-public/user-data"
import { sendTagEvent } from "@zweb-public/utils"
import { FC, useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { Input, Modal, useMessage } from "@zweb-design/react"
import { BASIC_APP_CONFIG } from "@/config/newAppConfig"
import { dashboardAppActions } from "@/redux/dashboard/apps/dashboardAppSlice"
import { fetchCreateApp } from "@/services/apps"
import { track } from "@/utils/mixpanelHelper"
import { CreateNewModalProps } from "./interface"

export const CreateNewModal: FC<CreateNewModalProps> = (props) => {
  const { visible, onVisibleChange, onCreateSuccess } = props

  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { teamIdentifier } = useParams()
  const currentUserID = useSelector(getCurrentUserID)

  const [loading, setLoading] = useState(false)
  const message = useMessage()
  const newAppNameRef = useRef<string>()

  useEffect(() => {
    visible &&
      track(
        ZWEB_MIXPANEL_EVENT_TYPE.SHOW,
        ZWEB_MIXPANEL_BUILDER_PAGE_NAME.APP,
        { element: "create_new_app_modal" },
      )
  }, [visible])

  return (
    <Modal
      w="496px"
      closable
      autoFocus
      footerAlign="right"
      okButtonProps={{
        colorScheme: "techPurple",
      }}
      visible={visible}
      okLoading={loading}
      onCancel={() => {
        onVisibleChange(false)
        track(
          ZWEB_MIXPANEL_EVENT_TYPE.CLICK,
          ZWEB_MIXPANEL_BUILDER_PAGE_NAME.APP,
          {
            element: "create_new_app_modal_close",
            parameter3: newAppNameRef.current?.length ?? 0,
          },
        )
      }}
      cancelText={t("dashboard.common.cancel")}
      onOk={() => {
        track(
          ZWEB_MIXPANEL_EVENT_TYPE.CLICK,
          ZWEB_MIXPANEL_BUILDER_PAGE_NAME.APP,
          { element: "create_new_app_modal_save" },
        )
        if (
          newAppNameRef.current === undefined ||
          newAppNameRef.current === "" ||
          newAppNameRef.current.trim() === ""
        ) {
          message.error({
            content: t("dashboard.app.name_empty"),
          })
          track(
            ZWEB_MIXPANEL_EVENT_TYPE.VALIDATE,
            ZWEB_MIXPANEL_BUILDER_PAGE_NAME.APP,
            {
              element: "create_new_app_modal_save",
              parameter2: "failed",
              parameter3: t("dashboard.app.name_empty"),
            },
          )
          return
        }
        track(
          ZWEB_MIXPANEL_EVENT_TYPE.VALIDATE,
          ZWEB_MIXPANEL_BUILDER_PAGE_NAME.APP,
          {
            element: "create_new_app_modal_save",
            parameter2: "suc",
            parameter3: newAppNameRef.current?.length,
          },
        )
        setLoading(true)
        const requestData = {
          appName: newAppNameRef.current,
          initScheme: BASIC_APP_CONFIG,
        }
        fetchCreateApp(requestData)
          .then(
            (response) => {
              onCreateSuccess()
              sendTagEvent("create_app", currentUserID)
              dispatch(
                dashboardAppActions.addDashboardAppReducer({
                  app: response.data,
                }),
              )
              navigate(`/${teamIdentifier}/app/${response.data.appId}`)
            },
            () => {
              message.error({ content: t("create_fail") })
            },
          )
          .finally(() => {
            setLoading(false)
          })
      }}
      title={t("dashboard.app.create_app")}
      okText={t("save")}
    >
      <Input
        colorScheme="techPurple"
        onChange={(res) => {
          newAppNameRef.current = res
        }}
      />
    </Modal>
  )
}
