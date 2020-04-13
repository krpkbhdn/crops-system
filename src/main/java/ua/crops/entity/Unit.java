package ua.crops.entity;

import javax.persistence.*;

@Entity
@Table(name = "unit")
public class Unit {
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    @Column(name = "unit_id")
    private Long id;
    @Column(name = "unit_name")
    private String name;
    @Column(name = "unit_short_name")
    private String shortName;

    public Unit() {
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

    public String getShortName() {
        return shortName;
    }

    public void setShortName(String shortName) {
        this.shortName = shortName;
    }
}
