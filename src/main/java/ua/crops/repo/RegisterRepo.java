package ua.crops.repo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ua.crops.entity.Plant;
import ua.crops.entity.Register;

import java.util.List;

public interface RegisterRepo extends JpaRepository<Register, Long> {
    @Query( "SELECT r FROM Register r WHERE UPPER(r.name) LIKE UPPER(CONCAT('%', :name, '%')) " +
            "AND r.sort.plant IN :plants " +
            "OR UPPER(r.sort.name) LIKE UPPER(CONCAT('%', :name, '%')) " +
            "AND r.sort.plant IN :plants")
    Page<Register> filteredRegister(@Param("name") String name, @Param("plants") List<Plant> plants, Pageable pageable);
    @Query( "SELECT r FROM Register r WHERE UPPER(r.name) LIKE UPPER(CONCAT('%', :name, '%')) " +
            "OR UPPER(r.sort.name) LIKE UPPER(CONCAT('%', :name, '%')) ")
    Page<Register> filteredRegister(@Param("name") String name, Pageable pageable);
}
