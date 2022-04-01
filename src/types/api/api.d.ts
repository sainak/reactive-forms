export type Errors<T> = Partial<Record<keyof T, string>>

export interface Form {
  /** ID */
  id?: number
  /** Title */
  title: string
  /** Description */
  description?: string | null
  /** Is public */
  is_public?: boolean
  /** Created by */
  created_by?: number
  /**
   * Created date
   * @format date-time
   */
  created_date?: string
  /**
   * Modified date
   * @format date-time
   */
  modified_date?: string
}

export interface Field {
  /** ID */
  id?: number

  /** Label */
  label: string

  /** Kind */
  kind: "TEXT" | "DROPDOWN" | "RADIO" | "GENERIC"

  /** Dropdown Options */
  options?: object | null

  /** Value */
  value?: string | null

  /**
   * Meta
   * Additional data for the field
   */
  meta?: object | null
}

export interface DummyForm {
  /** Id */
  id: number

  /** Title */
  title: string
}
