package com.carffeine.carffeine.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.containsString;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest
@AutoConfigureRestDocs
class TestControllerTest {

    @Autowired
    private MockMvc mockMvc;


    @Test
    void shouldReturnDefaultMessage() throws Exception {
        mockMvc.perform(get("/test"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("message").value(containsString("Hello, world!")))
                .andDo(document("test"));
    }

    @Test
    void shouldReturnTestMessage() throws Exception {
        mockMvc.perform(get("/test/query")
                        .queryParam("query", "test"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("query").value(containsString("test")))
                .andDo(document("test/query"));
    }

    @Test
    void shouldReturnTestBody() throws Exception {
        mockMvc.perform(get("/test/body")
                        .content("{\"body\": \"test\"}")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("body").value(containsString("test")))
                .andDo(document("test/body"));
    }
}
