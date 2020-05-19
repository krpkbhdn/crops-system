package ua.crops.repo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import ua.crops.entity.ClimateZone;
import ua.crops.entity.Research;
import ua.crops.entity.Sort;

import java.util.List;

public interface ResearchRepo extends JpaRepository<Research, Long> {
    List<Research> getAllByCompletedIsAndArchiveIs(boolean isCompleted, boolean isArchive);
    Page<Research> getAllByCompletedIsAndArchiveIs(boolean isCompleted, boolean isArchive, Pageable pageable);
    List<Research> getAllBySortAndStationClimateZoneAndCompletedIsAndArchiveIs(Sort sort, ClimateZone climateZone, boolean isCompleted, boolean isArchive);
    List<Research> getAllBySortAndCompletedIsAndArchiveIs(Sort sort, boolean isCompleted, boolean isArchive);
}
