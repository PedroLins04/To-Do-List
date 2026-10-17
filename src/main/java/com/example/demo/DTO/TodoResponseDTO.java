package com.example.demo.DTO;

public record TodoResponseDTO(Long id, String name, String description, boolean done, int priority) {
}
