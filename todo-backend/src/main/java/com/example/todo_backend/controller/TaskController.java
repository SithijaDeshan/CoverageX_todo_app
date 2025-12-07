package com.example.todo_backend.controller;

import com.example.todo_backend.dto.TaskDto;
import com.example.todo_backend.service.TaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:5173") // allow vite dev server
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    @PostMapping
    public ResponseEntity<TaskDto> createTask(@Valid @RequestBody TaskDto dto) {
        TaskDto created = taskService.createTask(dto);
        URI location = Objects.requireNonNull(URI.create("/api/tasks/" + created.getId()));
        return ResponseEntity.created(location).body(created);
    }

    @GetMapping("/recent")
    public ResponseEntity<List<TaskDto>> getRecent() {
        return ResponseEntity.ok(taskService.getRecentTasks());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> completeTask(@PathVariable Long id) {
        taskService.markAsCompleted(id);
        return ResponseEntity.noContent().build();
    }
}
