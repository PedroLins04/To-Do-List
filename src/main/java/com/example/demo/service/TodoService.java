package com.example.demo.service;

import com.example.demo.entity.Todo;
import com.example.demo.repository.TodoRepository;
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

    List<Todo> list() {
        Sort sort = Sort.by(Sort.Direction.DESC, "priority")
                .and(Sort.by(Sort.Direction.ASC, "name"));
        return todoRepository.findAll(sort);
    }

    List<Todo> update(Todo todo) {
        todoRepository.save(todo);
        return list();
    }

    List<Todo> delete(Long id) {
        todoRepository.deleteById(id);
        return list();
    }

}
