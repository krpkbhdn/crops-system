package ua.crops.entity;

import javax.persistence.*;

@Entity
@Table(name = "crop")
public class Crop {
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    @Column(name = "crop_id")
    private Long id;
    @Column(name = "crop_name")
    private String name;

    public Crop() {
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
