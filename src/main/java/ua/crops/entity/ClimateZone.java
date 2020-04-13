package ua.crops.entity;

import javax.persistence.*;

@Entity
@Table(name = "climate_zone")
public class ClimateZone {
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    @Column(name = "climate_zone_id")
    private Long id;
    @Column(name = "climate_zone_name")
    private String name;

    public ClimateZone() {
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
