import { FormInputType } from "../FormInput";

export interface FormType {
  id: number;
  label: string;
  fields: FormInputType[];
}
