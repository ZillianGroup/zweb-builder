import { ZWEB_MIXPANEL_EVENT_TYPE } from "@zweb-public/mixpanel-utils"
import { FC } from "react"
import { Switch } from "@zweb-design/react"
import { dynamicWidthStyle } from "@/page/App/components/InspectPanel/PanelSetters/style"
import { trackInEditor } from "@/utils/mixpanelHelper"
import { PanelLabel } from "../../components/Label"
import { BaseSwitchProps } from "./interface"
import { setterContainerStyle } from "./style"

const BaseSwitchSetter: FC<BaseSwitchProps> = (props) => {
  const {
    value,
    attrName,
    handleUpdateDsl,
    widgetType,
    isSetterSingleRow,
    labelDesc,
    labelName,
    size,
  } = props

  return (
    <div css={setterContainerStyle(isSetterSingleRow)}>
      {labelName && (
        <span>
          <PanelLabel labelName={labelName} labelDesc={labelDesc} size={size} />
        </span>
      )}
      <div css={dynamicWidthStyle}>
        <Switch
          onChange={(value) => {
            handleUpdateDsl(attrName, value)
            trackInEditor(ZWEB_MIXPANEL_EVENT_TYPE.CLICK, {
              element: "component_inspect_radio",
              parameter1: widgetType,
              parameter2: attrName,
            })
          }}
          checked={value}
          colorScheme="techPurple"
        />
      </div>
    </div>
  )
}

BaseSwitchSetter.displayName = "BaseSwitchSetter"

export default BaseSwitchSetter
