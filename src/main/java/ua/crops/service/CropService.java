package ua.crops.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.crops.entity.Crop;
import ua.crops.repo.CropRepo;
import ua.crops.repo.PlantRepo;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CropService {
    private final CropRepo cropRepo;
    private final PlantRepo plantRepo;

    @Autowired
    public CropService(CropRepo cropRepo, PlantRepo plantRepo) {
        this.cropRepo = cropRepo;
        this.plantRepo = plantRepo;
    }

    public List<Map<String, Object>> getCropsWithPlants() {
        List<Map<String, Object>> cropWithPlants = new ArrayList<>();

        List<Crop> crops = cropRepo.findAll();
        for (Crop crop : crops) {
            Map<String, Object> cropMap = new HashMap<>();
            cropMap.put("crop", crop);
            cropMap.put("plants", plantRepo.findAllByCrop(crop));
            cropWithPlants.add(cropMap);
        }

        return cropWithPlants;
    }
}
