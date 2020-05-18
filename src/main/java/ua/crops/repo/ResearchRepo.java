package ua.crops.repo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import ua.crops.entity.Research;

import java.util.List;

public interface ResearchRepo extends JpaRepository<Research, Long> {
    List<Research> getAllByCompletedIs(boolean isCompleted);
    Page<Research> getAllByCompletedIs(Pageable pageable, boolean isCompleted);
}
