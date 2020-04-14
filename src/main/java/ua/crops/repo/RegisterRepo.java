package ua.crops.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.crops.entity.Register;

public interface RegisterRepo extends JpaRepository<Register, Long> {
}
