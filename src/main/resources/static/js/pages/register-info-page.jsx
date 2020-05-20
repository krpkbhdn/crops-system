import React from "react";
import {getRegisterById} from "api/api";

class RegisterInfoPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            register: null
        }
    }

    componentDidMount() {
        getRegisterById(this.props.match.params.id).then(res => (
            console.log(res), this.setState({register: res})
        ));
    }

    buildDataForView() {
        let data = [];
        const {register} = this.state;

        if (register !== null) {
            register.sort.plant.expectedParameters.map(item => (
                data.push({
                    param: item.parameter,
                    expected: item.value,
                        values: []

                })
            ));
            let isAdded = false;
            data.map(item => (
                register.registersOfClimateZones.map(itm => (
                    itm.parametersValue.map(i => (
                            item.param.id === i.parameter.id ? (
                                                    isAdded = true,
                                                        item.values.push({
                                                            value: i.value.toFixed(1)
                                                        })
                                                ) : null
                    )),
                    (!isAdded ? item.values.push({value: "-"}) : isAdded = false)
                        ))

                ));
            console.log(data);
            return data;
        }
    }

    render() {
        const {register} = this.state;
        const viewData = this.buildDataForView();
        return (
            <div>
                <div className="page-section">
                    { register !== null ? (
                <div className="card">
                    <div className="card-title">
                        <h5>Реєстр. Запис № {register.name}</h5>
                    </div>
                    <div className="card-container">
                        <div className="card-item">
                            <span>Результати дослідження сорту: </span>
                            <span><b>{" " + register.sort.name + ", "}</b></span>
                            <span>культури: </span>
                            <span><b>{" " + register.sort.plant.crop.name + ", "}</b></span>
                            <span>рослини: </span>
                            <span><b>{" " + register.sort.plant.name + " "}</b></span>
                        </div>

                        {viewData !== undefined ? (
                            <div className="card-item">
                                <table className="card-table">
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Параметр</th>
                                        <th>Очікувалось</th>
                                        {register.registersOfClimateZones.length > 0 ?
                                            register.registersOfClimateZones.map((item, index) => (
                                            <th key={index}>{item.climateZone.name}</th>)) : null}
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        viewData.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.param.name}</td>
                                                <td>{item.expected !== null ? item.expected : 0}</td>
                                                {item.values.map((itm, idx) => (
                                                    <td key={idx} className={
                                                        itm.value >= item.expected ? "text-success" :
                                                            itm.value < item.expected - item.expected * 0.2 || itm.value === '-'?
                                                                "text-danger" : "text-warning"
                                                    }>
                                                        {itm.value}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))
                                    }
                                    </tbody>
                                </table>
                            </div>
                        ) : null}
                    </div>
                </div>) : null}
                </div>
            </div>
        );
    }
}

export {RegisterInfoPage}
