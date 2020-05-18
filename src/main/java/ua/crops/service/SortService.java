package ua.crops.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.crops.entity.Research;
import ua.crops.entity.Sort;
import ua.crops.repo.ResearchRepo;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class SortService {

    private final ResearchRepo researchRepo;

    @Autowired
    public SortService(ResearchRepo researchRepo) {
        this.researchRepo = researchRepo;
    }

    public Set<Sort> getAllByCompletedResearches() {
        List<Research> completedResearch = researchRepo.getAllByCompletedIs(true);
        Set<Sort> sortsWhereIsCompletedResearch = new HashSet<>();

        for (Research research : completedResearch) {
            sortsWhereIsCompletedResearch.add(research.getSort());
        }

        return sortsWhereIsCompletedResearch;
    }
}
