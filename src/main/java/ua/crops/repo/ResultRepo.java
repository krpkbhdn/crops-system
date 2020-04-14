package ua.crops.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.crops.entity.Result;

public interface ResultRepo extends JpaRepository<Result, Long> {
}
