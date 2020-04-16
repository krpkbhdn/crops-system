package ua.crops.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.crops.entity.Crop;
import ua.crops.entity.ExpectedParameter;
import ua.crops.entity.Parameter;
import ua.crops.entity.Plant;
import ua.crops.repo.CropRepo;
import ua.crops.repo.ParameterRepo;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class PlantService {

    private final ParameterRepo parameterRepo;
    private final CropRepo cropRepo;

    @Autowired
    public PlantService(ParameterRepo parameterRepo, CropRepo cropRepo) {
        this.parameterRepo = parameterRepo;
        this.cropRepo = cropRepo;
    }

    public Plant parsePlant(Map<String, String> map) {
        Plant plant = new Plant();

        String parametersString = "";
        String crop = "";

        List<ExpectedParameter> parameters = new ArrayList<>();

        for(String key : map.keySet()) {
            switch (key) {
                case "name": {plant.setName(map.get(key)); break;}
                case "description": {plant.setDescription(map.get(key)); break;}
                case "crop": {crop = map.get(key); break;}
                case "params": {parametersString = map.get(key); break;}
            }
        }

        for (String id : parametersString.split(";")) {
            ExpectedParameter expectedParameter = new ExpectedParameter();
            expectedParameter.setParameter( parameterRepo.findById(Long.parseLong(id)).get());
            parameters.add(expectedParameter);
        }

        plant.setCrop(cropRepo.findById(Long.parseLong(crop)).get());
        plant.setExpectedParameters(parameters);

        return plant;
    }

}
