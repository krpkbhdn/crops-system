package ua.crops.service;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.crops.entity.ExpectedParameter;
import ua.crops.entity.Plant;
import ua.crops.repo.CropRepo;
import ua.crops.repo.ExpectedParameterRepo;
import ua.crops.repo.ParameterRepo;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class PlantService {

    private final ParameterRepo parameterRepo;
    private final CropRepo cropRepo;
    private final ExpectedParameterRepo expectedParameterRepo;

    @Autowired
    public PlantService(ParameterRepo parameterRepo, CropRepo cropRepo, ExpectedParameterRepo expectedParameterRepo) {
        this.parameterRepo = parameterRepo;
        this.cropRepo = cropRepo;
        this.expectedParameterRepo = expectedParameterRepo;
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

    public Plant copyPlantProperties(Plant target, Plant source) {
        BeanUtils.copyProperties(source, target, "id", "expectedParameters");
        List<ExpectedParameter> sourceParameters = source.getExpectedParameters();
        List<ExpectedParameter> targetParameters = target.getExpectedParameters();
        List<ExpectedParameter> uniqParams = new ArrayList<>();

        if (targetParameters == null) {
            target.setExpectedParameters(sourceParameters);
            return target;
        }

        for(ExpectedParameter sourceParam : sourceParameters) {
            boolean isExist = false;
            for(ExpectedParameter targetParam : targetParameters) {
                if (sourceParam.getParameter().getId().equals(targetParam.getParameter().getId())) {
                    uniqParams.add(targetParam);
                    isExist = true;
                    break;
                }
            }
            if (!isExist) {
                uniqParams.add(sourceParam);
            }
        }

        target.setExpectedParameters(uniqParams);
        return target;
    }

}
