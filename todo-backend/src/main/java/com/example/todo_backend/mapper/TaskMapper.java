package com.example.todo_backend.mapper;

import com.example.todo_backend.dto.TaskDto;
import com.example.todo_backend.model.Task;

public final class TaskMapper {

    private TaskMapper() {}

    public static TaskDto toDto(Task task) {
        if (task == null) return null;
        return TaskDto.builder()
                .id(task.getId())
                .title(task.getTitle())
                .description(task.getDescription())
                .completed(task.isCompleted())
                .build();
    }

    public static Task toEntity(TaskDto dto) {
        if (dto == null) return null;
        return Task.builder()
                .id(dto.getId())
                .title(dto.getTitle())
                .description(dto.getDescription())
                .completed(dto.isCompleted())
                .build();
    }
}
