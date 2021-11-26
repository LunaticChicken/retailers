package com.itechart.retailers.model;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.List;
import java.util.stream.Collectors;

public enum Role_TEST {
    SYSTEM_ADMIN(List.of(Permission.READ, Permission.WRITE)),
    RETAIL_ADMIN(List.of(Permission.READ));

    private final List<Permission> permissions;

    Role_TEST(List<Permission> permissions) {
        this.permissions = permissions;
    }

    public List<Permission> getPermissions() {
        return permissions;
    }

    public List<SimpleGrantedAuthority> getAuthorities() {
        return getPermissions().stream()
                .map(permission -> new SimpleGrantedAuthority(permission.name()))
                .collect(Collectors.toList());
    }
}
