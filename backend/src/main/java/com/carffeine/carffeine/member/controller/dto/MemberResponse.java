package com.carffeine.carffeine.member.controller.dto;

import com.carffeine.carffeine.member.domain.personalization.Personalization;

public record MemberResponse(Long userId, CarPersonalizationResponse car) {

    public static MemberResponse of(Long userId, Personalization personalization) {
        return new MemberResponse(userId, CarPersonalizationResponse.from(personalization));
    }
}
