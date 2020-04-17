import React from "react";
import Select from "react-dropdown-select";
import {getAllStations, getAllSorts, addResearch} from "api/api";
import Table from "components/table.jsx";
import {Redirect} from "react-router-dom";

class ResearchNewPage extends React.Component {

    constructor() {
        super();
        this.state = {
            stations: [],
            sorts: [],
            selectedStation: null,
            selectedSort: null,
            redirect: false,
        }
    }

    componentDidMount() {
        getAllStations().then(res => this.setState({stations: res}));
        getAllSorts().then(res => this.setState({sorts: res}));
    }

    addResearch() {
        const {selectedStation, selectedSort} = this.state;
        if (selectedStation !== null && selectedSort !== null) {
            addResearch(selectedStation.id, selectedSort.id).then(this.setState({redirect: true}));
        }
    }

    handlerSelectStation(e) {
        this.setState({
            selectedStation: e[0]
        })
    }

    handlerSelectSort(e) {
        this.setState({
            selectedSort: e[0]
        })
    }

    render() {
        const {stations, sorts, selectedStation, selectedSort, redirect} = this.state;
        return (
            <div>
                {redirect ?  <Redirect to="/research/active" /> : null}
                <div className="page-section">
                    <div className="card">
                        <div className="card-title">
                            <h5>Нове дослідження</h5>
                        </div>
                        <div className="card-container">
                            <div className="card-item">
                                <Select
                                    placeholder={"Станція"}
                                    value={selectedStation}
                                    searchBy={ "name"}
                                    labelField= {"name"}
                                    valueField= {"id"}
                                    dropdownHeight= {"300px" }
                                    options={stations}
                                    onChange={(values) => this.handlerSelectStation(values)}
                                    multi={false}
                                />
                            </div>
                            <div className="card-item">
                                <Select
                                    placeholder={"Сорт"}
                                    value={selectedSort}
                                    searchBy={ "name"}
                                    labelField= {"name"}
                                    valueField= {"id"}
                                    dropdownHeight= {"300px" }
                                    options={sorts}
                                    onChange={(values) => this.handlerSelectSort(values)}
                                    multi={false}
                                />
                            </div>
                        </div>
                        <div className="card-bottom" style={{display: "flex", justifyContent: "flex-end"}}>
                            <button className="btn success" onClick={() => this.addResearch()}>Розпочати</button>
                        </div>
                    </div>
                </div>
                {selectedStation !== null || selectedSort !== null ?
                <div className="page-section">
                    <div className="card">
                        <div className="card-title">
                            <h5>Інформація про дослідження</h5>
                        </div>
                        <div className="card-section">
                            {selectedStation !== null ?
                        <div className="card-container">
                            <div className="card-item">
                                <span>Кліматична зона: </span>
                                <span> {selectedStation.climateZone.name}</span>
                            </div>
                            <div className="card-item">
                                <span>Станція: </span>
                                <span>{selectedStation.name}</span>
                            </div>
                        </div>
                                : "" }
                            {selectedSort !== null ?
                                <div className="card-container">

                                    <div className="card-item">
                                        <span>Культура: </span>
                                        <span>{selectedSort.plant.crop.name}</span>
                                    </div>
                                    <div className="card-item">
                                        <span>Рослина: </span>
                                        <span>{selectedSort.plant.name}</span>
                                    </div>
                                    <div className="card-item">
                                        <span>Сорт: </span>
                                        <span>{selectedSort.name}</span>
                                    </div>
                                </div> : ""
                            }
                        </div>
                    </div>
                </div>
                    : null}
                {selectedSort !== null ?
                <div className="page-section">

                    <Table title={"Досліджуванні параметри"} column={["#","Назва параметру", "Одиниця вимірювання", ""]}>
                            {selectedSort.plant.expectedParameters.map((item, index) => (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{item.parameter.name}</td>
                                    <td>{item.parameter.unit.name}</td>
                                    <td>{item.parameter.unit.shortName}</td>
                                </tr>
                            ))}
                            <div></div>
                    </Table>



                </div> : null }
            </div>
        );
    }
}

export {ResearchNewPage};
