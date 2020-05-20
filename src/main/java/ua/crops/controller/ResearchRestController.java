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

import java.time.Duration;
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

    @GetMapping("page/{isCompleted}")
    public Page<Research> page(@PathVariable("isCompleted") boolean isCompleted, @PageableDefault Pageable pageable) {
        return researchRepo.getAllByCompletedIsAndArchiveIs(isCompleted, false, pageable);
    }

    @GetMapping("page/archive")
    public Page<Research> pageArchive(@PageableDefault Pageable pageable) {
        return researchRepo.getAllByCompletedIsAndArchiveIs(true, true, pageable);
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
        return researchService.getAverageParametersByResearch(research);
    }

    @GetMapping("duration/{id}")
    public long getDuration(@PathVariable("id") Research research) {
        Duration duration = Duration.between(research.getStartDate(), LocalDateTime.now());
        return duration.toDays();
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

    @PutMapping("complete/{id}")
    public Research complete(@PathVariable("id")  Research research) {
        research.setCompleted(true);
        research.setEndDate(LocalDateTime.now());
        return researchRepo.save(research);
    }
}
