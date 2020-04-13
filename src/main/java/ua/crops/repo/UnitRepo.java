package ua.crops.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.crops.entity.Unit;

public interface UnitRepo extends JpaRepository<Unit, Long> {
}
