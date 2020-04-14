package ua.crops.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.crops.entity.ParameterValue;

public interface ParameterValueRepo extends JpaRepository<ParameterValue, Long> {
}
