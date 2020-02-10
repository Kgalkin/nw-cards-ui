package com.example.myrest.datacollector;

import com.example.myrest.model.Order;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class DataUtils {
    private static ObjectMapper mapper;

    public static Order saveOrder(Order order) throws IOException {
        if (order.getId() == null) {
            order.setId(1);
        }
        Path path = Files.createFile(Paths.get("orders/" + order.getId()));
        Files.writeString(path, mapper.writeValueAsString(order));
        return order;
    }
}
