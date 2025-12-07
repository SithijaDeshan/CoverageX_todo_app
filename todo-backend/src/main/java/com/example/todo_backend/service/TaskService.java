package com.example.todo_backend.service;

import com.example.todo_backend.dto.TaskDto;

import java.util.List;

public interface TaskService {
    TaskDto createTask(TaskDto dto);
    List<TaskDto> getRecentTasks();
    void markAsCompleted(Long id);
}
