package com.example.demo;

import com.example.demo.entity.Todo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.springframework.test.web.servlet.MockMvc;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
class DemoApplicationTests {

    @Autowired
    private MockMvc mockMvc;

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
    void testCreateTodoFailure() {
    }

}
