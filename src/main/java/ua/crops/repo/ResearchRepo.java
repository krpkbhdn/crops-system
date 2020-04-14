package ua.crops.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.crops.entity.Research;

public interface ResearchRepo extends JpaRepository<Research, Long> {
}
