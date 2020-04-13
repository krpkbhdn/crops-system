package ua.crops.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.crops.entity.Crop;

public interface CropRepo extends JpaRepository<Crop, Long> {
}
