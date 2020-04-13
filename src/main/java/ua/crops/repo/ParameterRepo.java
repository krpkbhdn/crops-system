package ua.crops.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.crops.entity.Parameter;

public interface ParameterRepo extends JpaRepository<Parameter, Long> {
}
