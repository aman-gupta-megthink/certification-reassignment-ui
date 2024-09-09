export type StagedCampaigns = StagedCampaign[]

export interface StagedCampaign {
  id: string
  name: string
  description: string
  deadline: string
  type: string
  status: string
  correlatedStatus: string
  emailNotificationEnabled: boolean
  autoRevokeAllowed: boolean
  recommendationsEnabled: boolean
  created: string
  totalCertifications: number
  completedCertifications: number
  alerts: any
}
