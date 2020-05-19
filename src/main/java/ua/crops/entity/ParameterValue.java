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
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "parameter_id")
    private Parameter parameter;
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "climate_zone_id")
    private ClimateZone climateZone;

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

    public Parameter getParameter() {
        return parameter;
    }

    public void setParameter(Parameter parameter) {
        this.parameter = parameter;
    }

    public ClimateZone getClimateZone() {
        return climateZone;
    }

    public void setClimateZone(ClimateZone climateZone) {
        this.climateZone = climateZone;
    }
}
