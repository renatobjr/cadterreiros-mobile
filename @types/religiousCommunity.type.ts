import { ECensusStep } from "@/enums/censusStep.enum";
import { EReligiousSpaceStatus } from "@/enums/religiousSpaceStatus.enum";

export interface IReligiousCommunity {
  id: string;
  authorization: number;
  communityGoogleApiLocalization: IGeoLocation;
  communityAddress: ICommunityAddress;
  communityType: string;
  religiousSpaceYearFoundation: number;
  religiousSpaceLeaderFoundation: string;
  religiousSpaceNation: string;
  religiousSpacePraticalLanguages: string;
  religiousSpaceName: string;
  religiousSpaceLeaderName: string;
  religiousSpacePositionName: string;
  religiousSpaceStartedBy: string;
  religiousSpaceNameDateStartedBy: Date | string;
  leaderContacts: IContacts;
  leaderEthnicity: string;
  leaderSexOrientation: string;
  leaderEducationalLevel: string;
  leaderSocialProgram: string | null;
  leaderSufferedRacism: boolean;
  religiousSpaceMainPicture: string;
  religiousSpaceStatus: EReligiousSpaceStatus;
  bio?: string | undefined;
  censusStep: ECensusStep;
  censusTaker: string;
  createdAt: Date | string;
}
export interface ICommunityAddress {
  fullAddress: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  zipcode: string;
}

export interface IGeoLocation {
  lat: number;
  long: number;
}

export interface IContacts {
  phone?: string | number | undefined;
  mobile?: string | number | undefined;
  email?: string | undefined;
}
