
export enum View {
  DASHBOARD,
  RESOURCE_HUB,
  MIX_MASTER,
  SITE_LOG,
  AI_COPILOT,
  BUILDING_INTERIORS,
  FULL_CONTRACT,
}

export interface Vendor {
  id: number;
  name: string;
  rating: number;
  materials: { name: string; price: string }[];
  contactPerson: string;
  phoneNumber: string;
}

export interface Equipment {
  id: number;
  name: string;
  rate: string;
  specs: string[];
  operatorIncluded: boolean;
}

export interface LaborTeam {
  id: number;
  trade: string;
  teamSize: number;
  rate: string;
  rating: number;
  teamLeader: string;
  contactNumber: string;
}

export interface Contractor {
  id: number;
  name: string;
  rating: number;
  specialties: string[];
}

export interface InteriorDesigner {
  id: number;
  name: string;
  rating: number;
  specialties: string[];
  imageUrl: string;
}