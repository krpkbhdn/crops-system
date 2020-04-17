package ua.crops.controller;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;
import ua.crops.entity.Crop;
import ua.crops.entity.ExpectedParameter;
import ua.crops.entity.Plant;
import ua.crops.repo.ExpectedParameterRepo;
import ua.crops.repo.PlantRepo;
import ua.crops.service.PlantService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/plant")
public class PlantController {

    private final PlantRepo plantRepo;
    private final PlantService plantService;
    private final ExpectedParameterRepo expectedParameterRepo;

    @Autowired
    public PlantController(
            PlantRepo plantRepo,
            PlantService plantService,
            ExpectedParameterRepo expectedParameterRepo
    ) {
        this.plantRepo = plantRepo;
        this.plantService = plantService;
        this.expectedParameterRepo = expectedParameterRepo;
    }

    @GetMapping
    public List<Plant> listAll(@PageableDefault Pageable pageable) {
        return plantRepo.findAll();
    }

    @GetMapping("count")
    public Long getCount() {
        return plantRepo.count();
    }

    @GetMapping("crop/{id}")
    public List<Plant> getPlantsByCrop(@PathVariable("id") Crop crop) {
        return plantRepo.findAllByCrop(crop);
    }

    @GetMapping("page")
    public Page<Plant> page(@PageableDefault Pageable pageable) {
        return plantRepo.findAll(pageable);
    }

    @GetMapping("{id}")
    public Plant getObjById(@PathVariable("id") Plant obj) {
        return obj;
    }

    @PostMapping
    public Plant add(@RequestBody Map<String, String> request) {
        return plantRepo.save(plantService.parsePlant(request));
    }

    @PutMapping("{id}")
    public Plant update(@PathVariable("id") Plant dbPlant, @RequestBody Map<String, String> request) {
        Plant plant = plantService.parsePlant(request);
        dbPlant = plantService.copyPlantProperties(dbPlant, plant);
        dbPlant = plantRepo.save(dbPlant);
        expectedParameterRepo.deleteAll(expectedParameterRepo.findAllByPlantIsNull());
        return dbPlant;
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable("id") Plant obj) {
        plantRepo.delete(obj);
    }


}
