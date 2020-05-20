package ua.crops.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.crops.entity.*;
import ua.crops.repo.ClimateZoneRepo;
import ua.crops.repo.ResearchRepo;
import ua.crops.repo.ResultRepo;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ResearchService {

    private final ClimateZoneRepo climateZoneRepo;
    private final ResearchRepo researchRepo;
    private final ResultRepo resultRepo;

    @Autowired
    public ResearchService(ClimateZoneRepo climateZoneRepo, ResearchRepo researchRepo, ResultRepo resultRepo) {
        this.climateZoneRepo = climateZoneRepo;
        this.researchRepo = researchRepo;
        this.resultRepo = resultRepo;
    }

    public List<Map<String, Object>> getAverageParametersByResearch(Research research) {
        List<Map<String, Object>> response = new ArrayList<>();
        List<ExpectedParameter> parameters = research.getSort().getPlant().getExpectedParameters();

        double sum = 0;
        int counter = 0;

        for (ExpectedParameter param : parameters) {
            List<Result> results = resultRepo.findAllByResearchAndAndParameter(research, param.getParameter());
            Map<String, Object> paramInfo = new HashMap<>();

            for (Result result : results) {
                sum += result.getValue();
                counter++;
            }

            if (counter != 0) {
                paramInfo.put("param", param.getParameter());
                paramInfo.put("value", sum/counter);
                paramInfo.put("expected", param.getValue() != null ? param.getValue() : 0);
                response.add(paramInfo);
            }

            sum = 0;
            counter = 0;
        }

        return response;
    }

    public List<Map<String, Object>> getArchivedResearchesBySort(Sort sort) {
        List<Map<String, Object>> archivedResearches = new ArrayList<>();

        List<Research> researches = researchRepo.getAllBySortAndCompletedIsAndArchiveIs(sort, true, true);

        for (Research research : researches) {
            Map<String, Object> map = new HashMap<>();
            Duration duration = Duration.between(research.getStartDate(), research.getEndDate());
            map.put("research", research);
            map.put("duration", duration.toDays());
            map.put("average", getAverageParametersByResearch(research));
            archivedResearches.add(map);
        }

        return archivedResearches;
    }

    public List<Map<String, Object>> getSummaryOfSortResearches(Sort sort) {

        List<Map<String, Object>> response = new ArrayList<>();
        List<ClimateZone> climateZones = climateZoneRepo.findAll();

        for (ClimateZone climateZone : climateZones) {

            List<List<Map<String, Object>>> averageResults = new ArrayList<>();
            List<Map<String, Object>> summaryAverage = new ArrayList<>();

            List<Research> researches =
                    researchRepo.getAllBySortAndStationClimateZoneAndCompletedIsAndArchiveIs(sort, climateZone, true, false);

            if (researches.size() > 0) {
                for (Research research : researches) {
                    averageResults.add(getAverageParametersByResearch(research));
                }
                for (ExpectedParameter expectedParameter : sort.getPlant().getExpectedParameters()) {
                    Map<String, Object> responseItem = new HashMap<>();
                    int counter = 0;
                    double sum = 0;
                    for (List<Map<String, Object>> average : averageResults) {
                        for (Map<String, Object> map : average) {
                            if (((Parameter) map.get("param")).getId().equals(expectedParameter.getParameter().getId())) {
                                sum += (double) map.get("value");
                                counter++;
                            }
                        }
                    }
                    if (counter != 0) {
                        responseItem.put("param", expectedParameter.getParameter());
                        responseItem.put("value", (sum / counter));
                        responseItem.put("expected",
                                expectedParameter.getValue() != null ? expectedParameter.getValue() : 0);
                        summaryAverage.add(responseItem);
                    }
                }

                Map<String, Object> map = new HashMap<>();
                map.put("climateZone", climateZone);
                map.put("average", summaryAverage);
                response.add(map);
            }
        }

        return response;
    }

}
