import { hexToHsva } from "@uiw/react-color"
import { debounce } from "lodash"
import { FC, useRef } from "react"
import { BindIcon, Trigger, globalColor, zwebPrefix } from "@zweb-design/react"
import { ColorPicker } from "@/components/ColorPicker"
import { colorSchemes } from "@/components/ColorPicker/constants"
import { ColorPickerSetterProps } from "./interface"
import {
  alphaContentStyle,
  applyCircleStyle,
  buttonContentWrapperStyle,
  circleHotSpotStyle,
  colorContentStyle,
  colorTipAndValueContainerStyle,
} from "./style"

const ColorPickerSetter: FC<ColorPickerSetterProps> = (props) => {
  const { handleUpdateColor, value } = props
  const currentColor = useRef<string>(value)
  const debounceOnChange = debounce(handleUpdateColor, 300)

  let c = value
  let isInnerColorScheme = false
  if (colorSchemes.includes(value)) {
    isInnerColorScheme = true
    c = globalColor(`--${zwebPrefix}-${value}-03`)
  }
  return (
    <Trigger
      trigger="click"
      withoutPadding
      clickOutsideToClose
      position="bottom-end"
      colorScheme="white"
      content={
        <ColorPicker
          selectedColor={value}
          onChange={(color) => {
            currentColor.current = color
            debounceOnChange(color)
          }}
        />
      }
    >
      <div css={buttonContentWrapperStyle}>
        <div css={colorTipAndValueContainerStyle}>
          <div css={circleHotSpotStyle}>
            <div css={applyCircleStyle(c)} />
          </div>
          <span css={colorContentStyle}>
            {value?.includes("#")
              ? value?.toLocaleUpperCase().slice(0, -2)
              : value}
          </span>
        </div>
        {isInnerColorScheme ? (
          <BindIcon />
        ) : (
          <span css={alphaContentStyle}>
            {parseInt(`${hexToHsva(c || "#fff").a * 100}`)}%
          </span>
        )}
      </div>
    </Trigger>
  )
}

ColorPickerSetter.displayName = "ColorPickerSetter"

export default ColorPickerSetter
