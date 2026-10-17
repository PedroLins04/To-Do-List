package com.example.demo.service;

import com.example.demo.DTO.todo.TodoRequestDTO;
import com.example.demo.DTO.todo.TodoResponseDTO;
import com.example.demo.entity.Todo;
import com.example.demo.repository.TodoRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoService {

    private final TodoRepository todoRepository;

    public TodoService(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    TodoResponseDTO responseDTO(Todo todo) {
        return new TodoResponseDTO(
                todo.getId(),
                todo.getName(),
                todo.getDescription(),
                todo.isDone(),
                todo.getPriority()
        );
    }

    public List<TodoResponseDTO> create(TodoRequestDTO requestDTO) {
        Todo todo = new Todo(requestDTO.name(), requestDTO.description(), requestDTO.done(), requestDTO.priority());

        todoRepository.save(todo);
        return list();
    }

    public List<TodoResponseDTO> list() {
        Sort sort = Sort.by(Sort.Direction.DESC, "priority")
                .and(Sort.by(Sort.Direction.ASC, "name"));

        return todoRepository.findAll(sort).stream().map(this::responseDTO).toList();
    }

    public Todo findById(Long id) {
        return getTodoOrThrow(id);
    }

    public List<TodoResponseDTO> update(Long id, TodoRequestDTO requestDTO) {

        Todo obj = getTodoOrThrow(id);

        obj.setName(requestDTO.name());
        obj.setDescription(requestDTO.description());
        obj.setDone(requestDTO.done());
        obj.setPriority(requestDTO.priority());

        todoRepository.save(obj);
        return list();
    }

    public List<TodoResponseDTO> delete(Long id) {
        getTodoOrThrow(id);
        todoRepository.deleteById(id);
        return list();
    }

    private Todo getTodoOrThrow(Long id) {
        return todoRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Id not found"));
    }

}
