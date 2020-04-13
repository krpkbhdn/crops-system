package ua.crops.controller;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;
import ua.crops.entity.Unit;
import ua.crops.repo.UnitRepo;

import java.util.List;

@RestController
@RequestMapping("/api/unit")
public class UnitRestController {

    private UnitRepo unitRepo;

    @Autowired
    public UnitRestController(UnitRepo unitRepo) {
        this.unitRepo = unitRepo;
    }

    @GetMapping
    public List<Unit> listAll(@PageableDefault Pageable pageable) {
        return unitRepo.findAll();
    }

    @GetMapping("page")
    public Page<Unit> page(@PageableDefault Pageable pageable) {
        return unitRepo.findAll(pageable);
    }

    @GetMapping("{id}")
    public Unit getUnitById(@PathVariable("id") Unit unit) {
        return unit;
    }

    @PostMapping
    public Unit add(@RequestBody Unit unit) {
        return unitRepo.save(unit);
    }

    @PutMapping("{id}")
    public Unit update(@PathVariable("id") Unit dbUnit, @RequestBody Unit unit) {
        BeanUtils.copyProperties(unit, dbUnit, "id");
        return unitRepo.save(dbUnit);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable("id") Unit unit) {
        unitRepo.delete(unit);
    }
}
