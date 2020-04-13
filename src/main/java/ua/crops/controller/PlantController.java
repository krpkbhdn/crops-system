package ua.crops.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.crops.entity.Plant;
import ua.crops.repo.PlantRepo;

@RestController
@RequestMapping("/api/plant")
public class PlantController extends AbstractRestController<Plant, PlantRepo> {
    public PlantController(PlantRepo repo) {
        super(repo);
    }
}
