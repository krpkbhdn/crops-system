package ua.crops.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.crops.entity.Research;
import ua.crops.entity.Result;

import java.util.List;

public interface ResearchRepo extends JpaRepository<Research, Long> {
}
