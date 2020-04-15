import React from "react";
import Select from "react-dropdown-select";
import {getAllStations, getAllSorts, addResearch} from "api/api";

class ResearchNewPage extends React.Component {

    constructor() {
        super();
        this.state = {
            stations: [],
            sorts: [],
            selectedStation: null,
            selectedSort: null,
        }
    }

    componentDidMount() {
        getAllStations().then(res => this.setState({stations: res}));
        getAllSorts().then(res => this.setState({sorts: res}));
    }

    addResearch() {
        const {selectedStation, selectedSort} = this.state;
        if (selectedStation !== null && selectedSort !== null) {
            addResearch(selectedStation.id, selectedSort.id).then(res => console.log(res))
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
        const {stations, sorts, selectedStation, selectedSort} = this.state;
        return (
            <div>
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
            </div>
        );
    }
}

export {ResearchNewPage};
