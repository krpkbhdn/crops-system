package ua.crops.controller;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;
import ua.crops.entity.ClimateZone;
import ua.crops.entity.Station;
import ua.crops.repo.StationRepo;

import java.util.List;

@RestController
@RequestMapping("api/station")
public class StationRestController {

    private final StationRepo stationRepo;

    @Autowired
    public StationRestController(StationRepo stationRepo) {
        this.stationRepo = stationRepo;
    }

    @GetMapping
    public List<Station> listAll() {
        return stationRepo.findAll();
    }

    @GetMapping("count")
    public Long getCount() {
        return stationRepo.count();
    }

    @GetMapping("page")
    public Page<Station> page(@PageableDefault Pageable pageable) {
        return stationRepo.findAll(pageable);
    }

    @GetMapping("{id}")
    public Station getCropById(@PathVariable("id") Station station) {
        return station;
    }

    @PostMapping("{id}")
    public Station add(@PathVariable("id")ClimateZone climateZone, @RequestBody Station station) {
        station.setClimateZone(climateZone);
        return stationRepo.save(station);
    }

    @PutMapping("{id}")
    public Station update(@PathVariable("id") Station dbStation, @RequestBody Station station) {
        BeanUtils.copyProperties(station, dbStation, "id");
        return stationRepo.save(dbStation);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable("id") Station station) {
        stationRepo.delete(station);
    }
}
