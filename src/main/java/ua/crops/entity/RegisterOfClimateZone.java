package ua.crops.entity;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "register_of_climate_zone")
public class RegisterOfClimateZone {
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    @Column(name = "register_of_climate_zone_id")
    private Long id;
    @ManyToOne(cascade = CascadeType.PERSIST, fetch = FetchType.EAGER)
    @JoinColumn(name = "climate_zone_id")
    private ClimateZone climateZone;
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "register_of_climate_zone_id")
    private List<ParameterValue> parametersValue;

    public RegisterOfClimateZone() {
    }

    public Long getId() {
        return id;
    }

    public ClimateZone getClimateZone() {
        return climateZone;
    }

    public void setClimateZone(ClimateZone climateZone) {
        this.climateZone = climateZone;
    }

    public List<ParameterValue> getParametersValue() {
        return parametersValue;
    }

    public void setParametersValue(List<ParameterValue> parametersValue) {
        this.parametersValue = parametersValue;
    }
}
