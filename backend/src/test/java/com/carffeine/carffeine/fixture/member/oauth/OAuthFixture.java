package com.carffeine.carffeine.fixture.member.oauth;

import java.util.HashMap;
import java.util.Map;

public class OAuthFixture {

    public static Map<String, Object> 구글_회원_정보 = google();

    private static Map<String, Object> google() {
        Map<String, Object> attributes = new HashMap<>();
        attributes.put("id", "12345");
        attributes.put("email", "carffeine@gmail.com");
        attributes.put("name", "카페인");
        attributes.put("picture", "https://image.com");
        return attributes;
    }
}
