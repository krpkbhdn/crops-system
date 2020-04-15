package ua.crops.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.crops.repo.ResultRepo;

@RestController
@RequestMapping("api/result")
public class ResultRestController {
    private final ResultRepo resultRepo;

    @Autowired
    public ResultRestController(ResultRepo resultRepo) {
        this.resultRepo = resultRepo;
    }
}
