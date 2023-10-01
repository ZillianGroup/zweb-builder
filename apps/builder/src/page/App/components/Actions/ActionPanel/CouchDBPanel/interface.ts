import { SelectValue } from "@zweb-design/react"
import { CouchDBOptionsType } from "@/redux/currentApp/action/couchDBAction"

export interface CouchDBSubPanelProps {
  onInputValueChange: (name: string | string[]) => (value: SelectValue) => void
  onBooleanValueChange: (name: string | string[]) => (value: boolean) => void
  opts: CouchDBOptionsType
}
