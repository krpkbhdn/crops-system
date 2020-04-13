package ua.crops.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.crops.entity.Parameter;
import ua.crops.repo.ParameterRepo;

@RestController
@RequestMapping("/api/parameter")
public class ParameterRestController extends AbstractRestController<Parameter, ParameterRepo> {
    public ParameterRestController(ParameterRepo repo) {
        super(repo);
    }
}
