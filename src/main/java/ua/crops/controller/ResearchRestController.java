package ua.crops.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;
import ua.crops.entity.*;
import ua.crops.repo.ParameterRepo;
import ua.crops.repo.ResearchRepo;
import ua.crops.service.ResearchService;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/research")
public class ResearchRestController {
    private final ResearchRepo researchRepo;
    private final ParameterRepo parameterRepo;
    private final ResearchService researchService;

    @Autowired
    public ResearchRestController(
            ResearchRepo researchRepo,
            ParameterRepo parameterRepo,
            ResearchService researchService
    ) {
        this.researchRepo = researchRepo;
        this.parameterRepo = parameterRepo;
        this.researchService = researchService;
    }

    @GetMapping("page")
    public Page<Research> page(@PageableDefault Pageable pageable) {
        return researchRepo.findAll(pageable);
    }

    @GetMapping("{id}")
    public Research getResearchById(@PathVariable("id") Research research) {
        return research;
    }

    @GetMapping("parameters/{id}")
    public List<Parameter> getParametersByResearch(@PathVariable("id") Research research) {
        List<ExpectedParameter> expectedParameters = research.getSort().getPlant().getExpectedParameters();
        List<Parameter> parameters = new ArrayList<>();

        for(ExpectedParameter parameter : expectedParameters) {
            parameters.add(parameter.getParameter());
        }

        return parameters;
    }

    @GetMapping("count")
    public Long getCountOfResearches() {
        return researchRepo.count();
    }

    @GetMapping("average/{id}")
    public List<Map<String, Object>> getAverageResults(@PathVariable("id") Research research) {
        List<Map<String, Object>> maps = researchService.getAverageParametersByResearch(research);
        return maps;
    }

    @PostMapping("{station}/{sort}")
    public Research add(@PathVariable("station") Station station, @PathVariable("sort") Sort sort) {
        Research research = new Research();
        research.setStation(station);
        research.setSort(sort);
        research.setStartDate(LocalDateTime.now());
        research.setCompleted(false);
        return researchRepo.save(research);
    }

    @PutMapping("{id}")
    public Research update(@PathVariable("id")  Research research, @RequestBody Map<String ,String> body) {

        Result result = new Result();
        Long id = Long.parseLong(body.get("param"));
        result.setParameter(parameterRepo.findById(id).get());
        result.setValue(Double.parseDouble(body.get("value")));
        research.getResults().add(result);
        return researchRepo.save(research);
    }
}
