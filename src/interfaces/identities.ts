export type Identites = Identity[]

export interface Identity {
  id: string
  name: string
  alias: string
  email: string
  status: string
  identityState: string
  manager: Manager
  attributes: Attribute[]
}

export interface Manager {
  type: string
  id: string
  name: string
}

export interface Attribute {
  key: string
  name: string
  value: string
}
