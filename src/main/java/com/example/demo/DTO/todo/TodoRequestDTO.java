package com.example.demo.DTO.todo;

public record TodoRequestDTO(
        String name,
        String description,
        boolean done,
        int priority) {
}
