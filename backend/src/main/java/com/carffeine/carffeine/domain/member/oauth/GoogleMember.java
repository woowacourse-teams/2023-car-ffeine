package com.carffeine.carffeine.domain.member.oauth;

import java.util.Map;

public class GoogleMember implements OAuthMember {

    private final String id;
    private final String name;
    private final String email;
    private final String imageUrl;

    public GoogleMember(Map<String, Object> attribute) {
        this.id = (String) attribute.get("id");
        this.name = (String) attribute.get("name");
        this.email = (String) attribute.get("email");
        this.imageUrl = (String) attribute.get("picture");
    }

    @Override
    public String id() {
        return id;
    }

    @Override
    public String nickname() {
        return name;
    }

    @Override
    public String email() {
        return email;
    }

    @Override
    public String imageUrl() {
        return imageUrl;
    }
}
