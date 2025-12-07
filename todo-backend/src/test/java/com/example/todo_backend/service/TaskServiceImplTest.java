package com.example.todo_backend.service;

import com.example.todo_backend.dto.TaskDto;
import com.example.todo_backend.model.Task;
import com.example.todo_backend.repository.TaskRepository;
import com.example.todo_backend.service.impl.TaskServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class TaskServiceImplTest {

    @Mock
    private TaskRepository repository;

    @InjectMocks
    private TaskServiceImpl service;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    // createTask test
    @Test
    void createTask_savesAndReturnsDto() {
        TaskDto dto = TaskDto.builder().title("T").description("D").build();
        Task saved = Task.builder().id(1L).title("T").description("D").completed(false).build();

        when(repository.save(any(Task.class))).thenReturn(saved);

        TaskDto result = service.createTask(dto);

        assertNotNull(result);
        assertEquals(1L, result.getId());
        verify(repository, times(1)).save(any(Task.class));
    }

    // markAsCompleted test
    void markAsCompleted_existingTask_marksCompleted() {
        Task t = Task.builder().id(1L).title("x").completed(false).build();
        when(repository.findById(1L)).thenReturn(Optional.of(t));
        when(repository.save(any())).thenReturn(t);

        service.markAsCompleted(1L);

        assertTrue(t.isCompleted());
        verify(repository).findById(1L);
    }

    // getRecentTasks tests
    @Test
    void getRecentTasks_returnsTasksWhenExist() {
        Task t1 = Task.builder().id(1L).title("Task 1").completed(false).build();
        Task t2 = Task.builder().id(2L).title("Task 2").completed(false).build();
        when(repository.findTop5ByCompletedFalseOrderByCreatedAtDesc())
                .thenReturn(List.of(t1, t2));

        List<TaskDto> result = service.getRecentTasks();

        assertEquals(2, result.size());
        assertEquals("Task 1", result.get(0).getTitle());
        assertEquals("Task 2", result.get(1).getTitle());
        verify(repository, times(1)).findTop5ByCompletedFalseOrderByCreatedAtDesc();
    }

    @Test
    void getRecentTasks_returnsEmptyListWhenNoTasks() {
        when(repository.findTop5ByCompletedFalseOrderByCreatedAtDesc())
                .thenReturn(List.of());

        List<TaskDto> result = service.getRecentTasks();

        assertTrue(result.isEmpty());
        verify(repository, times(1)).findTop5ByCompletedFalseOrderByCreatedAtDesc();
    }
}
