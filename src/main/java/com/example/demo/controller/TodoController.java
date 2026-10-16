package com.example.demo.controller;

import com.example.demo.entity.Todo;
import com.example.demo.service.TodoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/todos")
public class TodoController {
    private final TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @PostMapping
    List<Todo> create(@RequestBody Todo todo) {
        return todoService.create(todo);
    }

    @GetMapping
    List<Todo> list() {
        return todoService.list();
    }

    @GetMapping("{id}")
    Todo findById(@PathVariable Long id) {
        return todoService.findById(id);
    }

    @PutMapping("{id}")
    List<Todo> update(@PathVariable Long id, @RequestBody Todo todo) {
        return todoService.update(id, todo);
    }

    @DeleteMapping("{id}")
    List<Todo> delete(@PathVariable Long id) {
        return todoService.delete(id);
    }

}
