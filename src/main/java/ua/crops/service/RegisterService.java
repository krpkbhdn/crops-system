package ua.crops.service;

import org.springframework.stereotype.Service;
import ua.crops.entity.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class RegisterService {

    private final ResearchService researchService;

    public RegisterService(ResearchService researchService) {
        this.researchService = researchService;
    }

    public Register createRegister(Sort sort) {
        Register register = new Register();
        List<ParameterValue> parameterValues =
                parseSummary(researchService.getSummaryOfSortResearches(sort));

        register.setSort(sort);
        register.setParametersValue(parameterValues);


        return register;
    }

    private List<ParameterValue> parseSummary(List<Map<String, Object>> summary) {
        List<ParameterValue> parameterValues = new ArrayList<>();

        for (Map<String, Object> record : summary) {
            for(Map<String, Object> param : ((List<Map<String, Object>>) record.get("average"))) {
                ParameterValue parameterValue = new ParameterValue();
                parameterValue.setClimateZone((ClimateZone) record.get("climateZone"));
                parameterValue.setParameter((Parameter) param.get("param"));
                parameterValue.setValue((double) param.get("value"));
                parameterValues.add(parameterValue);
            }
        }

        return parameterValues;
    }

}
