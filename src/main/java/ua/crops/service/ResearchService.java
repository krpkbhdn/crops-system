package ua.crops.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.crops.entity.ExpectedParameter;
import ua.crops.entity.Parameter;
import ua.crops.entity.Research;
import ua.crops.entity.Result;
import ua.crops.repo.ResearchRepo;
import ua.crops.repo.ResultRepo;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ResearchService {

    private final ResearchRepo researchRepo;
    private final ResultRepo resultRepo;

    @Autowired
    public ResearchService(ResearchRepo researchRepo, ResultRepo resultRepo) {
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

}
