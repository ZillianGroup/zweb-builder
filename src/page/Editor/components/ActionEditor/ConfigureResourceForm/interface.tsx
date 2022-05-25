import { ActionType } from "../FormContainer/interface"
import { ResourceType } from "@/page/Editor/components/ActionEditor/interface"

export interface ConfigureResourceFormProps {
  actionType: ActionType
  resourceId?: string
  resourceType?: ResourceType
  back?: () => void
  onSubmit?: () => void
}
