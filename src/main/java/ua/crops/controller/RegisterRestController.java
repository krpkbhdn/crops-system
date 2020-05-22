package ua.crops.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;
import ua.crops.entity.Crop;
import ua.crops.entity.Plant;
import ua.crops.entity.Register;
import ua.crops.entity.Sort;
import ua.crops.repo.PlantRepo;
import ua.crops.repo.RegisterRepo;
import ua.crops.service.FilterService;
import ua.crops.service.RegisterService;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/register")
public class RegisterRestController {

    private final RegisterService registerService;
    private final RegisterRepo registerRepo;
    private final FilterService filterService;

    @Autowired
    public RegisterRestController(RegisterService registerService, RegisterRepo registerRepo, FilterService filterService) {
        this.registerService = registerService;
        this.registerRepo = registerRepo;
        this.filterService = filterService;
    }

    @GetMapping("page")
    public Page<Register> page(@PageableDefault Pageable pageable) {
        return registerRepo.findAll(pageable);
    }

    @PostMapping("filter")
    public Page<Register> filterPage(@RequestBody Map<String, Object> request) {
        Pageable pageable = PageRequest.of(
                ((Map<String, Integer>) request.get("pageable")).get("page"),
                ((Map<String, Integer>) request.get("pageable")).get("size")
        );
        String name = request.get("name").toString();
        List<Map<String, Object>> requestFilters = (List<Map<String, Object>>) request.get("filters");
        List<Plant> filters = filterService.parseFilterPlant((List<Map<String, Object>>) request.get("filters"));
        if (requestFilters.size() > 0 ) {
            return registerRepo.filteredRegister(name, filters, pageable);
        } else {
            return registerRepo.filteredRegister(name, pageable);
        }
    }

    @GetMapping("{id}")
    public Register getById(@PathVariable("id") Register register) {
        return registerRepo.findById(register.getId()).get();
    }

    @PostMapping("{id}")
    public Register add(@PathVariable("id") Sort sort, @RequestBody Map<String, String> request) {
        Register register = registerService.createRegister(sort);
        register.setName(request.get("name"));
        register.setDate(LocalDateTime.now());
        registerService.transferToArchive(sort);
        return registerRepo.save(register);
    }

    @PostMapping("archive/{id}")
    public void transferToArchive(@PathVariable("id") Sort sort) {
        registerService.transferToArchive(sort);
    }

}
