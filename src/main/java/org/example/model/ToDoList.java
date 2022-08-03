package org.example.model;

import lombok.Data;

@Data
public class ToDoList {

    private String title;
    private String description;
    private String status;

    public ToDoList(String title, String description, String status) {
        this.title = title;
        this.description = description;
        this.status = status;
    }
}
