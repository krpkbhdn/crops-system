package ua.crops.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.crops.entity.Plant;

public interface PlantRepo extends JpaRepository<Plant, Long> {
}
