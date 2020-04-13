package ua.crops.entity;

import javax.persistence.*;

@Entity
@Table(name = "parameter_value")
public class ParameterValue {
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    @Column(name = "parameter_value_id")
    private Long id;
    @Column(name = "parameter_value_value")
    private Double value;

    public ParameterValue() {
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
}
