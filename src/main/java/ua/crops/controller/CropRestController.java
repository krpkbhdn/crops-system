package ua.crops.controller;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;
import ua.crops.entity.Crop;
import ua.crops.repo.CropRepo;

import java.util.List;

@RestController
@RequestMapping("/api/crop")
public class CropRestController {

    private final CropRepo cropRepo;

    @Autowired
    public CropRestController(CropRepo cropRepo) {
        this.cropRepo = cropRepo;
    }

    @GetMapping
    public List<Crop> listAll() {
        return cropRepo.findAll();
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
