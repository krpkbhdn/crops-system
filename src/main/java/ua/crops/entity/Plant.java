package ua.crops.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.List;

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
    @ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    @JoinColumn(name = "crop_id")
    private Crop crop;
    @OneToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE}, fetch = FetchType.LAZY)
    @JoinColumn(name = "plant_id")
    @JsonManagedReference
    private List<ExpectedParameter> expectedParameters;

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

    public Crop getCrop() {
        return crop;
    }

    public void setCrop(Crop crop) {
        this.crop = crop;
    }

    public List<ExpectedParameter> getExpectedParameters() {
        return expectedParameters;
    }

    public void setExpectedParameters(List<ExpectedParameter> expectedParameters) {
        this.expectedParameters = expectedParameters;
    }
}
