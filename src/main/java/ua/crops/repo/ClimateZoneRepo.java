package ua.crops.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.crops.entity.ClimateZone;

public interface ClimateZoneRepo extends JpaRepository<ClimateZone, Long> {
}
