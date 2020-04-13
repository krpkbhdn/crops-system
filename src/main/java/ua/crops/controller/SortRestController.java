package ua.crops.controller;

import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;
import ua.crops.entity.Plant;
import ua.crops.entity.Sort;
import ua.crops.repo.SortRepo;

import java.util.List;

@RestController
@RequestMapping("/api/sort")
public class SortRestController {
    private SortRepo sortRepo;

    public SortRestController(SortRepo sortRepo) {
        this.sortRepo = sortRepo;
    }

    @GetMapping
    public List<Sort> listAll() {
        return sortRepo.findAll();
    }

    @GetMapping("count")
    public Long getCount() {
        return sortRepo.count();
    }

    @GetMapping("page")
    public Page<Sort> page(@PageableDefault Pageable pageable) {
        return sortRepo.findAll(pageable);
    }

    @GetMapping("{id}")
    public Sort getObjById(@PathVariable("id") Sort sort) {
        return sort;
    }

    @PostMapping("{id}")
    public Sort add(@PathVariable("id")Plant plant, @RequestBody Sort sort) {
        sort.setPlant(plant);
        return sortRepo.save(sort);
    }


    @PutMapping("{id}")
    public Sort update(@PathVariable("id") Sort dbSort, @RequestBody Sort sort) {
        BeanUtils.copyProperties(sort, dbSort, "id", "plant");
        return sortRepo.save(dbSort);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable("id") Sort sort) {
        sortRepo.delete(sort);
    }
}
