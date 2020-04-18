package ua.crops.repo;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import ua.crops.entity.Parameter;
import ua.crops.entity.Research;
import ua.crops.entity.Result;

import java.util.List;

public interface ResultRepo extends JpaRepository<Result, Long> {
    List<Result> findAllByResearchAndAndParameter(Research research, Parameter parameter);
}
