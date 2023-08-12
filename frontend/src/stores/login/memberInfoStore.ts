import { store } from '@utils/external-state';

export interface MemberCar {
  name: string;
  year: string;
}

export interface MemberInfo {
  memberId: number;
  car: MemberCar;
}

export const memberInfoStore = store<MemberInfo>(null);

export const memberInfoAction = {
  setMemberInfo(memberInfo: MemberInfo) {
    memberInfoStore.setState(memberInfo);
  },
  setMemberId(memberId: number) {
    memberInfoStore.setState((prev) => ({
      ...prev,
      memberId,
    }));
  },
  setMemberCar(car: MemberCar) {
    memberInfoStore.setState((prev) => ({
      ...prev,
      car,
    }));
  },
};
