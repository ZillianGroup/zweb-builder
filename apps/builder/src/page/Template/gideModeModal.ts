import {
  ZWEB_MIXPANEL_BUILDER_PAGE_NAME,
  ZWEB_MIXPANEL_EVENT_TYPE,
} from "@zweb-public/mixpanel-utils"
import { createModal } from "@zweb-design/react"
import i18n from "@/i18n/config"
import { ZWEBRoute } from "@/router"
import { updateTutorialViewed } from "@/services/users"
import { track } from "@/utils/mixpanelHelper"

const modal = createModal()

export const openGuideModal = async (teamIdentifier: string) => {
  const { t } = i18n
  await updateTutorialViewed(true)
  modal.show({
    id: "openGuide",
    title: t("tutorial.modal.tutorial.first_time.title"),
    children: t("tutorial.modal.tutorial.first_time.description"),
    cancelText: t("tutorial.modal.tutorial.first_time.cancel"),
    okText: t("tutorial.modal.tutorial.first_time.take"),
    okButtonProps: {
      colorScheme: "techPurple",
    },
    onOk: () => {
      track(
        ZWEB_MIXPANEL_EVENT_TYPE.CLICK,
        ZWEB_MIXPANEL_BUILDER_PAGE_NAME.APP,
        { element: "before_onboarding_modal_confirm" },
      )
      ZWEBRoute.navigate(`/${teamIdentifier}/guide`)
    },
    onCancel: () => {
      track(
        ZWEB_MIXPANEL_EVENT_TYPE.CLICK,
        ZWEB_MIXPANEL_BUILDER_PAGE_NAME.APP,
        { element: "before_onboarding_modal_close" },
      )
    },
    afterOpen: () => {
      track(
        ZWEB_MIXPANEL_EVENT_TYPE.SHOW,
        ZWEB_MIXPANEL_BUILDER_PAGE_NAME.APP,
        { element: "before_onboarding_modal" },
      )
    },
  })
}
