package ua.crops.entity;

import javax.persistence.*;

@Entity
@Table(name = "station")
public class Station {
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    @Column(name = "station_id")
    private Long id;
    @Column(name = "station_name")
    private String name;
    @Column(name = "station_address")
    private String address;
    @Column(name = "station_phone")
    private String phone;
    @Column(name = "station_zip")
    private String zip;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "climate_zone_id")
    private ClimateZone climateZone;

    public Station() {
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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getZip() {
        return zip;
    }

    public void setZip(String zip) {
        this.zip = zip;
    }

    public ClimateZone getClimateZone() {
        return climateZone;
    }

    public void setClimateZone(ClimateZone climateZone) {
        this.climateZone = climateZone;
    }
}
