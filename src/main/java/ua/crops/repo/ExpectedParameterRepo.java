package ua.crops.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.crops.entity.ExpectedParameter;

public interface ExpectedParameterRepo extends JpaRepository<ExpectedParameter, Long> {
}
