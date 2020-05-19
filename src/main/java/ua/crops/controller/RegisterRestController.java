package ua.crops.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ua.crops.entity.Register;
import ua.crops.entity.Sort;
import ua.crops.repo.RegisterRepo;
import ua.crops.service.RegisterService;

import java.util.Map;

@RestController
@RequestMapping("/api/register")
public class RegisterRestController {

    private final RegisterService registerService;
    private final RegisterRepo registerRepo;

    @Autowired
    public RegisterRestController(RegisterService registerService, RegisterRepo registerRepo) {
        this.registerService = registerService;
        this.registerRepo = registerRepo;
    }

    @PostMapping("{id}")
    public Register add(@PathVariable("id") Sort sort, @RequestBody Map<String, String> request) {
        Register register = registerService.createRegister(sort);
        register.setName(request.get("name"));
        return register;
    }

}
