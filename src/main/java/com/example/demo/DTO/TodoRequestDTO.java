package com.example.demo.DTO;

public record TodoRequestDTO(String name, String description, boolean done, int priority) {
}
