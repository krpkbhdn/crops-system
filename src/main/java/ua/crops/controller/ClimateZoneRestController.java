package ua.crops.controller;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;
import ua.crops.entity.ClimateZone;
import ua.crops.repo.ClimateZoneRepo;

import java.util.List;

@RestController
@RequestMapping("api/climate-zone")
public class ClimateZoneRestController {

    private final ClimateZoneRepo climateZoneRepo;

    @Autowired
    public ClimateZoneRestController(ClimateZoneRepo climateZoneRepo) {
        this.climateZoneRepo = climateZoneRepo;
    }

    @GetMapping
    public List<ClimateZone> listAll() {
        return climateZoneRepo.findAll();
    }

    @GetMapping("count")
    public Long getCount() {
        return climateZoneRepo.count();
    }

    @GetMapping("page")
    public Page<ClimateZone> page(@PageableDefault Pageable pageable) {
        return climateZoneRepo.findAll(pageable);
    }

    @GetMapping("{id}")
    public ClimateZone getObjById(@PathVariable("id") ClimateZone climateZone) {
        return climateZone;
    }

    @PostMapping
    public ClimateZone add(@RequestBody ClimateZone climateZone) {
        return climateZoneRepo.save(climateZone);
    }

    @PutMapping("{id}")
    public ClimateZone update(
            @PathVariable("id") ClimateZone dbClimateZone,
            @RequestBody ClimateZone climateZone
    ) {
        BeanUtils.copyProperties(climateZone, dbClimateZone, "id");
        return climateZoneRepo.save(dbClimateZone);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable("id") ClimateZone climateZone) {
        climateZoneRepo.delete(climateZone);
    }


}
