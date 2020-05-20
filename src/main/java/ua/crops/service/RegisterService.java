package ua.crops.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.crops.entity.*;
import ua.crops.repo.ResearchRepo;

import java.util.*;

@Service
public class RegisterService {

    private final ResearchService researchService;
    private final ResearchRepo researchRepo;

    @Autowired
    public RegisterService(
            ResearchService researchService,
            ResearchRepo researchRepo
    ) {
        this.researchService = researchService;
        this.researchRepo = researchRepo;
    }

    public Register createRegister(Sort sort) {
        Register register = new Register();
        Set<RegisterOfClimateZone> registersOfClimateZones = parseSummary(researchService.getSummaryOfSortResearches(sort));
        register.setSort(sort);
        register.setRegistersOfClimateZones(registersOfClimateZones);
        return register;
    }

    public void transferToArchive(Sort sort) {
        List<Research> researches = researchRepo.getAllBySortAndCompletedIsAndArchiveIs(sort, true, false);
        for (Research research : researches) {
            research.setArchive(true);
            researchRepo.save(research);
        }
    }

    private Set<RegisterOfClimateZone> parseSummary(List<Map<String, Object>> summary) {
        Set<RegisterOfClimateZone> registersOfClimateZones = new HashSet<>();

        for (Map<String, Object> record : summary) {
            RegisterOfClimateZone registerOfClimateZone = new RegisterOfClimateZone();
            List<ParameterValue> parameterValues = new ArrayList<>();
            for(Map<String, Object> param : ((List<Map<String, Object>>) record.get("average"))) {
                ParameterValue parameterValue = new ParameterValue();
                parameterValue.setParameter((Parameter) param.get("param"));
                parameterValue.setValue((double) param.get("value"));
                parameterValues.add(parameterValue);
            }
            registerOfClimateZone.setClimateZone((ClimateZone) record.get("climateZone"));
            registerOfClimateZone.setParametersValue(parameterValues);
            registersOfClimateZones.add(registerOfClimateZone);
        }

        return registersOfClimateZones;
    }

}
