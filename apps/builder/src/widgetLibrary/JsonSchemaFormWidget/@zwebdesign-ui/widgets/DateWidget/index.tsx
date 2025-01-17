import {
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
  WidgetProps,
  ariaDescribedByIds,
} from "@rjsf/utils"
import { SingleDatePicker } from "@zweb-design/react"
import { LabelWrapper } from "@/widgetLibrary/JsonSchemaFormWidget/@zwebdesign-ui/labelWrapper"

export default function DateWidget<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = FormContextType,
>(props: WidgetProps<T, S, F>) {
  const {
    id,
    readonly,
    disabled,
    label,
    value,
    onChange,
    rawErrors,
    required,
    formContext,
  } = props

  const _onChange = (value: undefined | string) => onChange(value)

  return (
    <LabelWrapper required={required} label={label}>
      <SingleDatePicker
        colorScheme={formContext?.themeColor}
        error={rawErrors && rawErrors.length > 0}
        disabled={disabled || readonly}
        value={value ?? ""}
        onChange={_onChange}
        aria-describedby={ariaDescribedByIds<T>(id)}
      />
    </LabelWrapper>
  )
}
