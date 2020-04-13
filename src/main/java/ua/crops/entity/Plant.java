package ua.crops.entity;

import javax.persistence.*;

@Entity
@Table(name = "plant")
public class Plant {
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    @Column(name = "plant_id")
    private Long id;
    @Column(name = "plant_name")
    private String name;
    @Column(name = "plant_description")
    private String description;

    public Plant() {
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
