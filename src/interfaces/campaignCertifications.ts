export type CampaignCertifications = CampaignCertification[]

export interface CampaignCertification {
  campaign: Campaign
  completed: boolean
  decisionsMade: number
  decisionsTotal: number
  due: string
  signed: any
  reviewer: Reviewer
  reassignment?: Reassignment
  hasErrors: boolean
  errorMessage: any
  phase: string
  identitiesCompleted: number
  identitiesTotal: number
  id: string
  name: string
  created: string
  modified: string
}

export interface Campaign {
  campaignType: string
  description: string
  correlatedStatus: string
  mandatoryCommentRequirement: string
  type: string
  id: string
  name: string
}

export interface Reviewer {
  email: string
  type: string
  id: string
  name: string
}

export interface Reassignment {
  from: From
  comment: string
  reassignmentTrailDTOs: ReassignmentTrailDto[]
}

export interface From {
  reviewer: Reviewer2
  type: string
  id: string
  name: string
}

export interface Reviewer2 {
  email: string
  type: string
  id: string
  name: string
}

export interface ReassignmentTrailDto {
  previousOwner: string
  newOwner: string
  reassignmentType: string
}
