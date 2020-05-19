package ua.crops.entity;

import javax.persistence.*;
import java.util.List;

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
    private List<ParameterValue> parametersValue;

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

    public List<ParameterValue> getParametersValue() {
        return parametersValue;
    }

    public void setParametersValue(List<ParameterValue> parametersValue) {
        this.parametersValue = parametersValue;
    }
}
