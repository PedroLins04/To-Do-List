package com.example.demo.DTO.login;

public record LoginRequestDTO(
        String name,
        String email,
        String password) {
}
