package com.example.todo_backend.service.impl;

import com.example.todo_backend.dto.TaskDto;
import com.example.todo_backend.exception.ResourceNotFoundException;
import com.example.todo_backend.mapper.TaskMapper;
import com.example.todo_backend.model.Task;
import com.example.todo_backend.repository.TaskRepository;
import com.example.todo_backend.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;
import lombok.NonNull;

@Service
@RequiredArgsConstructor
@Transactional
public class TaskServiceImpl implements TaskService {

    private final TaskRepository repository;

    @Override
    public TaskDto createTask(TaskDto dto) {
        Task entity = TaskMapper.toEntity(dto);
        entity.setCompleted(false);
        Task saved = repository.save(entity);
        return TaskMapper.toDto(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public List<TaskDto> getRecentTasks() {
        return repository.findTop5ByCompletedFalseOrderByCreatedAtDesc()
                .stream()
                .map(TaskMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public void markAsCompleted(@NonNull Long id) {
        Task task = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found with id: " + id));
        task.setCompleted(true);
        repository.save(task);
    }
}
