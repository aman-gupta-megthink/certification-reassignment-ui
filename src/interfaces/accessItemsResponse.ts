export interface IdentitySummary {
    id: string;
    name: string;
    identityId: string;
    completed: boolean;
  }
  


export type AccessItems = AccessItem[]

export interface AccessItem {
  id: string
  completed: boolean
  newAccess: boolean
  decision: any
  comments: any
  accessSummary: AccessSummary
  identitySummary: IdentitySummary
}

export interface AccessSummary {
  access: Access
  entitlement?: Entitlement
  accessProfile?: AccessProfile
  role?: Role
}

export interface Access {
  type: string
  id: string
  name: string
}

export interface Entitlement {
  id: string
  name: string
  description?: string
  privileged: boolean
  owner: any
  attributeName: string
  attributeValue: string
  sourceSchemaObjectType: string
  sourceId: string
  sourceName: string
  sourceType: string
  hasPermissions: boolean
  isPermission: boolean
  revocable: boolean
  cloudGoverned: boolean
  account: Account
  dataAccess: any
  containsDataAccess: boolean
}

export interface Account {
  nativeIdentity: string
  disabled: boolean
  locked: boolean
  type: string
  activityInsights: any
  description: any
  owner: any
  governanceGroupId: any
  id: string
  name: string
  created: string
  modified: string
}

export interface AccessProfile {
  id: string
  name: string
  description: string
  privileged: boolean
  cloudGoverned: boolean
  endDate: any
  owner: Owner
  entitlements: Entitlement[]
  created: string
  modified: string
}

export interface Owner {
  email: string
  type: string
  id: string
  name: string
}


export interface Role {
  id: string
  name: string
  description: string
  privileged: boolean
  owner: Owner
  revocable: boolean
  endDate: any
  accessProfiles: AccessProfile[]
  entitlements: any[]
}



export interface IdentitySummary {
  id: string
  name: string
  identityId: string
  completed: boolean
}
