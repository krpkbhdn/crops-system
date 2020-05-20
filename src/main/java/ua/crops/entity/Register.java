package ua.crops.entity;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "register")
public class Register {
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    @Column(name = "register_id")
    private Long id;
    @Column(name = "register_name")
    private String name;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "sort_id")
    private Sort sort;
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "register_id")
    private Set<RegisterOfClimateZone> registersOfClimateZones;

    public Register() {
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

    public Sort getSort() {
        return sort;
    }

    public void setSort(Sort sort) {
        this.sort = sort;
    }

    public Set<RegisterOfClimateZone> getRegistersOfClimateZones() {
        return registersOfClimateZones;
    }

    public void setRegistersOfClimateZones(Set<RegisterOfClimateZone> registersOfClimateZones) {
        this.registersOfClimateZones = registersOfClimateZones;
    }
}
