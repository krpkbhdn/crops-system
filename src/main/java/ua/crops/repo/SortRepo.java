package ua.crops.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.crops.entity.Sort;

public interface SortRepo extends JpaRepository<Sort, Long> {
}
