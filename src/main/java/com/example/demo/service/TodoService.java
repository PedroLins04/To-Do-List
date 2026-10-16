package com.example.demo.service;

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

    public List<Todo> create(Todo todo) {
        todoRepository.save(todo);
        return list();
    }

    public List<Todo> list() {
        Sort sort = Sort.by(Sort.Direction.DESC, "priority")
                .and(Sort.by(Sort.Direction.ASC, "name"));
        return todoRepository.findAll(sort);
    }

    public Todo findById(Long id) {
        return getTodoOrThrow(id);
    }

    public List <Todo> update(Long id, Todo todo) {
        Todo obj = getTodoOrThrow(id);
        obj.setName(todo.getName());
        obj.setDescription(todo.getDescription());
        obj.setDone(todo.isDone());
        obj.setPriority(todo.getPriority());
        todoRepository.save(obj);
        return list();
    }

    public List<Todo> delete(Long id) {
        getTodoOrThrow(id);
        todoRepository.deleteById(id);
        return list();
    }

    private Todo getTodoOrThrow(Long id) {
        return todoRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Id not found"));
    }

}
