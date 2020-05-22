package ua.crops.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.crops.entity.Plant;
import ua.crops.repo.PlantRepo;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class FilterService {
    private final PlantRepo plantRepo;

    @Autowired
    public FilterService(PlantRepo plantRepo) {
        this.plantRepo = plantRepo;
    }

    public List<Plant> parseFilterPlant(List<Map<String, Object>> filters) {
        List<Plant> plants = new ArrayList<>();
        for (Map<String, Object> filter : filters) {
            if (filter.containsKey("plants")) {
                List<Map<String, Object>> plantsOfCrop = (List<Map<String, Object>>) filter.get("plants");
                for (Map<String, Object> plantMap : plantsOfCrop) {
                    int plantId = (int) plantMap.get("id");
                    plants.add(plantRepo.findById((long) plantId).get());
                }
            } else {
                int plantId = (int) filter.get("id");
                plants.add(plantRepo.findById((long) plantId).get());
            }
        }
        return plants;
    }
}
