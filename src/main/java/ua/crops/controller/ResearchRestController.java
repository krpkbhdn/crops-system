package ua.crops.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;
import ua.crops.entity.Research;
import ua.crops.entity.Result;
import ua.crops.entity.Sort;
import ua.crops.entity.Station;
import ua.crops.repo.ParameterRepo;
import ua.crops.repo.ResearchRepo;

import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("api/research")
public class ResearchRestController {
    private final ResearchRepo researchRepo;
    private final ParameterRepo parameterRepo;

    @Autowired
    public ResearchRestController(ResearchRepo researchRepo, ParameterRepo parameterRepo) {
        this.researchRepo = researchRepo;
        this.parameterRepo = parameterRepo;
    }

    @GetMapping("page")
    public Page<Research> page(@PageableDefault Pageable pageable) {
        return researchRepo.findAll(pageable);
    }

    @GetMapping("{id}")
    public Research getResearchById(@PathVariable("id") Research research) {
        return research;
    }

    @GetMapping("count")
    public Long getCountOfResearches() {
        return researchRepo.count();
    }

    @PostMapping("{station}/{sort}")
    public Research add(@PathVariable("station") Station station, @PathVariable("sort") Sort sort) {
        Research research = new Research();
        research.setStation(station);
        research.setSort(sort);
        research.setStartDate(LocalDateTime.now());
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
