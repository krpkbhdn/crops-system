package ua.crops.controller;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;
import ua.crops.entity.Parameter;
import ua.crops.entity.Unit;
import ua.crops.repo.ParameterRepo;

import java.util.List;

@RestController
@RequestMapping("/api/parameter")
public class ParameterRestController {

    private ParameterRepo parameterRepo;

    @Autowired
    public ParameterRestController(ParameterRepo parameterRepo) {
        this.parameterRepo = parameterRepo;
    }

    @GetMapping
    public List<Parameter> listAll(@PageableDefault Pageable pageable) {
        return parameterRepo.findAll();
    }

    @GetMapping("page")
    public Page<Parameter> page(@PageableDefault Pageable pageable) {
        return parameterRepo.findAll(pageable);
    }

    @GetMapping("{id}")
    public Parameter getUnitById(@PathVariable("id") Parameter parameter) {
        return parameter;
    }

    @PostMapping("{id}")
    public Parameter add(@PathVariable("id") Unit unit, @RequestBody Parameter parameter) {
        parameter.setUnit(unit);
        return parameterRepo.save(parameter);
    }

    @PutMapping("{id}")
    public Parameter update(@PathVariable("id") Parameter dbParameter, @RequestBody Parameter parameter) {
        BeanUtils.copyProperties(parameter, dbParameter, "id", "unit");
        return parameterRepo.save(dbParameter);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable("id") Parameter parameter) {
        parameterRepo.delete(parameter);
    }
}
