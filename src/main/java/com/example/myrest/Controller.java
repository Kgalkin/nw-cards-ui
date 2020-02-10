package com.example.myrest;

import com.example.myrest.datacollector.DataUtils;
import com.example.myrest.model.Order;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Paths;

@RestController
public class Controller {
    @GetMapping("/site")
    public String index() throws IOException, URISyntaxException {
        return Files.readString(Paths.get(Controller.class.getResource("/public/index.html").toURI()));
    }

    @PostMapping("/newOrder")
    public String newOrder(Order order) throws IOException {
        DataUtils.saveOrder(order);
        return String.format("Order [%s] created", order.getId());
    }
}
