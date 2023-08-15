import { store } from '@utils/external-state';
import { getSessionStorage } from '@utils/storage';

import { SESSION_KEY_MEMBER_INFO } from '@constants/storageKeys';

export interface MemberCar {
  carId: number;
  name: string;
  year: string;
}

export interface MemberInfo {
  memberId: number;
  car: MemberCar;
}

export const memberInfoStore = store<MemberInfo>(
  JSON.parse(getSessionStorage(SESSION_KEY_MEMBER_INFO, '{}'))
);

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
