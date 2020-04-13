package ua.crops.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.crops.entity.Crop;
import ua.crops.entity.Plant;

import java.util.List;

public interface PlantRepo extends JpaRepository<Plant, Long> {
    public List<Plant> findAllByCrop(Crop crop);
}
