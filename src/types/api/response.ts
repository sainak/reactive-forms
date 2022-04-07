export type Page<T> = {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export type FromResponse = {
  /** ID */
  id: number
  /** Title */
  title: string
  /** Description */
  description?: string | null
  /** Is public */
  is_public: boolean
  /** Created by */
  created_by: number
  /**
   * Created date
   * @format date-time
   */
  created_date: string
  /**
   * Modified date
   * @format date-time
   */
  modified_date: string
}
