package ua.crops.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.crops.entity.Crop;
import ua.crops.repo.CropRepo;

@RestController
@RequestMapping("/api/crop")
public class CropRestController extends AbstractRestController<Crop, CropRepo> {
    public CropRestController(CropRepo repo) {
        super(repo);
    }
}
