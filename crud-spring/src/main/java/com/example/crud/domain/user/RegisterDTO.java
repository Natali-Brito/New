package com.example.crud.domain.user;

public record RegisterDTO(String nome, String email, String username, String password, UserRole role) {
}
