package ua.crops.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
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

    @GetMapping("page")
    public Page<Register> page(@PageableDefault Pageable pageable) {
        return registerRepo.findAll(pageable);
    }

    @GetMapping("{id}")
    public Register getById(@PathVariable("id") Register register) {
        return registerRepo.findById(register.getId()).get();
    }

    @PostMapping("{id}")
    public Register add(@PathVariable("id") Sort sort, @RequestBody Map<String, String> request) {
        Register register = registerService.createRegister(sort);
        register.setName(request.get("name"));
        registerService.transferToArchive(sort);
        return registerRepo.save(register);
    }

    @PostMapping("archive/{id}")
    public void transferToArchive(@PathVariable("id") Sort sort) {
        registerService.transferToArchive(sort);
    }

}
