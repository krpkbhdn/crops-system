package ua.crops.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.crops.entity.ExpectedParameter;

import java.util.List;

public interface ExpectedParameterRepo extends JpaRepository<ExpectedParameter, Long> {
    Iterable<ExpectedParameter> findAllByPlantIsNull();
}
