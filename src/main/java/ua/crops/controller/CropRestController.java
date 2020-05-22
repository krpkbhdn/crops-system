package ua.crops.controller;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;
import ua.crops.entity.Crop;
import ua.crops.repo.CropRepo;
import ua.crops.service.CropService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/crop")
public class CropRestController {

    private final CropRepo cropRepo;
    private final CropService cropService;

    @Autowired
    public CropRestController(CropRepo cropRepo, CropService cropService) {
        this.cropRepo = cropRepo;
        this.cropService = cropService;
    }

    @GetMapping
    public List<Crop> listAll() {
        return cropRepo.findAll();
    }

    @GetMapping("plants")
    public List<Map<String, Object>> getCropsWithPlants() {
        return cropService.getCropsWithPlants();
    }

    @GetMapping("count")
    public Long getCount() {
        return cropRepo.count();
    }

    @GetMapping("page")
    public Page<Crop> page(@PageableDefault Pageable pageable) {
        return cropRepo.findAll(pageable);
    }

    @GetMapping("{id}")
    public Crop getObjById(@PathVariable("id") Crop crop) {
        return crop;
    }

    @PostMapping
    public Crop add(@RequestBody Crop obj) {
        return cropRepo.save(obj);
    }

    @PutMapping("{id}")
    public Crop update(@PathVariable("id") Crop dbCrop, @RequestBody Crop crop) {
        BeanUtils.copyProperties(crop, dbCrop, "id");
        return cropRepo.save(dbCrop);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable("id") Crop crop) {
        cropRepo.delete(crop);
    }
}
