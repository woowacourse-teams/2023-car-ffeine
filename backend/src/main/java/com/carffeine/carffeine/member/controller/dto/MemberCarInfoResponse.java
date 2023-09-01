package com.carffeine.carffeine.member.controller.dto;

import com.carffeine.carffeine.car.infrastructure.dto.CarResponse;
import com.carffeine.carffeine.member.domain.MemberCar;

public record MemberCarInfoResponse(
        Long memberId,
        CarResponse car
) {

    public static MemberCarInfoResponse from(MemberCar memberCar) {
        if (memberCar.getCar() == null) {
            return new MemberCarInfoResponse(memberCar.getMember().getId(), null);
        }

        return new MemberCarInfoResponse(memberCar.getMember().getId(), CarResponse.from(memberCar.getCar()));
    }
}
