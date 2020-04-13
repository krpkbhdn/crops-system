package ua.crops.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.crops.entity.Unit;
import ua.crops.repo.UnitRepo;

@RestController
@RequestMapping("/api/unit")
public class UnitRestController extends AbstractRestController<Unit, UnitRepo> {
    public UnitRestController(UnitRepo repo) {
        super(repo);
    }
}
