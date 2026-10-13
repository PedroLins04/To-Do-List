package com.example.demo;

import com.example.demo.entity.Todo;
import com.example.demo.repository.TodoRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.springframework.test.web.servlet.MockMvc;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
class DemoApplicationTests {

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private TodoRepository todoRepository;

    @BeforeEach
    void setUp() {
        todoRepository.deleteAll();
    }

    @Test
    void testCreateTodoSuccess() throws Exception {
        var todo = new Todo("todo 1", "description 1", false, 1);

        mockMvc.perform(post("/todos")
                        .contentType("application/json")
                        .content("""
                                {
                                    "name": "todo 1",
                                    "description": "description 1",
                                    "done": false,
                                    "priority": 1
                                }
                                """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$.length()").value(1))
                .andExpect(jsonPath("$[0].name").value(todo.getName()))
                .andExpect(jsonPath("$[0].description").value(todo.getDescription()))
                .andExpect(jsonPath("$[0].done").value(todo.isDone()))
                .andExpect(jsonPath("$[0].priority").value(todo.getPriority()));
    }

    @Test
    void testCreateTodoFailure() throws Exception {
        mockMvc.perform(post("/todos")
                        .contentType("application/json")
                        .content("""
                                {
                                    "name": "todo 1",
                                    "description":
                                }
                                """))
                .andExpect(status().isBadRequest());
    }

    @Test
    void testFindTodoByIdSuccess() throws Exception {
        var result = mockMvc.perform(post("/todos")
                        .contentType("application/json")
                        .content("""
                                {
                                    "name": "Todo 2",
                                    "description": "Description 2",
                                    "done": false,
                                    "priority": 1
                                }
                                """))
                .andExpect(status().isOk())
                .andReturn();

        var objectMapper = new ObjectMapper();
        var response = objectMapper.readTree(
                result.getResponse().getContentAsString()
        );

        long id = response.get(0).get("id").asLong();

        mockMvc.perform(get("/todos/" + id))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(id))
                .andExpect(jsonPath("$.name").value("Todo 2"))
                .andExpect(jsonPath("$.description").value("Description 2"));
    }


    @Test
    void testUpdateTodoSuccess() throws Exception {

        var result = mockMvc.perform(post("/todos")
                        .contentType("application/json")
                        .content("""
                                {
                                    "name": "Todo",
                                    "description": "Description",
                                    "done": false,
                                    "priority": 1
                                }
                                """))
                .andExpect(status().isOk())
                .andReturn();


        var objectMapper = new ObjectMapper();
        var response = objectMapper.readTree(
                result.getResponse().getContentAsString()
        );
        long id = response.get(0).get("id").asLong();


        mockMvc.perform(put("/todos")
                        .contentType("application/json")
                        .content("""
                                {
                                    "id": %d,
                                    "name": "Todo 3",
                                    "description": "Description 3",
                                    "done": true,
                                    "priority": 2
                                }
                                """.formatted(id)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray());


        mockMvc.perform(get("/todos/" + id))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Todo 3"))
                .andExpect(jsonPath("$.description").value("Description 3"))
                .andExpect(jsonPath("$.done").value(true))
                .andExpect(jsonPath("$.priority").value(2));
    }

    @Test
    void testDeleteTodoSuccess() throws Exception {
        mockMvc.perform(delete("/todos/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray());
    }


}
