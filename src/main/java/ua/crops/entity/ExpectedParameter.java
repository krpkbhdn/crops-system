package ua.crops.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;

@Entity
@Table(name = "expected_parameter")
public class ExpectedParameter {
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    @Column(name = "expected_parameter_id")
    private Long id;
    @Column(name = "expected_parameter_value")
    private Double value;
    @ManyToOne
    @JoinColumn(name = "plant_id")
    @JsonBackReference
    private Plant plant;
    @ManyToOne(cascade = CascadeType.PERSIST, fetch = FetchType.EAGER)
    @JoinColumn(name = "parameter_id")
    private Parameter parameter;

    public ExpectedParameter() {
    }

    public Long getId() {
        return id;
    }

    public Double getValue() {
        return value;
    }

    public void setValue(Double value) {
        this.value = value;
    }

    public Plant getPlant() {
        return plant;
    }

    public void setPlant(Plant plant) {
        this.plant = plant;
    }

    public Parameter getParameter() {
        return parameter;
    }

    public void setParameter(Parameter parameter) {
        this.parameter = parameter;
    }
}
