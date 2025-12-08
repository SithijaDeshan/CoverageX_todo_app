package com.example.todo_backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TaskDto {
    private Long id;

    @NotBlank(message = "Title is required")
    private String title;

    private String description;

    private boolean completed;
}
