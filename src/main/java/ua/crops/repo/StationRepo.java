package ua.crops.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.crops.entity.Station;

public interface StationRepo extends JpaRepository<Station, Long> {
}
