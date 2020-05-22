package ua.crops.entity;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import java.time.LocalDateTime;
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
    @Column(name = "register_date")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd.MM.yyyy")
    private LocalDateTime date;

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

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
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
