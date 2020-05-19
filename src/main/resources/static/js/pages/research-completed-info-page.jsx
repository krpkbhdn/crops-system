import React from "react";
import {getSortById, getSummaryOfSort, addRegisterRecord} from "api/api";
import ModalWindow from "components/modal.jsx";

class ResearchCompletedInfoPage extends React.Component {

    constructor() {
        super();
        this.state = {
            sort: null,
            summaryData: [],
        }
    }

    componentDidMount() {
        getSortById(this.props.match.params.id).then(data => this.setState({sort: data}));
        getSummaryOfSort(this.props.match.params.id).then(res => this.setState({summaryData: res.data}));
    }

    parseSummaryData() {
        let data = [];
        const {summaryData, sort} = this.state;

        if (summaryData.length > 0 && sort !== null) {
            sort.plant.expectedParameters.map(item => (
                data.push({
                    param: item.parameter,
                    expected: item.value,
                    values: []
                })
            ));
            let isAdded = false;
            let climateZone;
            data.map(i => (
                summaryData.map(itm => (
                    climateZone = itm.climateZone.name,
                        itm.average.map(item => (
                            i.param.id === item.param.id ? (
                                isAdded = true,
                                    i.values.push({
                                        climateZone: itm.climateZone.name,
                                        value: item.value.toFixed(1)
                                    })
                            ) : null
                        )),
                        (!isAdded ? i.values.push({climateZone: itm.climateZone.name, value: "-"}) : isAdded = false)
                ))
            ));

            return data;
        }
    }

    handlerClickAddToRegister() {

        addRegisterRecord(this.state.sort, "name12").then(res => console.log(res));
    }

    render() {
        const {summaryData, sort} = this.state;
        const parseData = this.parseSummaryData();
        return (
            <div>
                <div className="page-section">
                    <div className="card">
                        <div className="card-title">
                            <h5>Результати досліджень сорту</h5>
                        </div>
                        <div className="card-container">

                            <div className="card-item">
                                <span>Дослідження проводилось у кліматичних зонах: </span>
                                {summaryData.map((item, index) => (
                                    <span key={index}><b>{" " + item.climateZone.name +
                                    (index + 1 !== summaryData.length ? ", " : "")}
                                            </b></span>
                                ))}
                            </div>
                            {sort !== null ? (
                            <div className="card-item">
                                <span>Досліджувався сорт: </span>
                                <span><b>{" " + sort.name + ", "}</b></span>
                                <span>культури: </span>
                                <span><b>{" " + sort.plant.crop.name + ", "}</b></span>
                                <span>рослини: </span>
                                <span><b>{" " + sort.plant.name + " "}</b></span>
                            </div>
                            ) : null}

                            {parseData !== undefined ? (
                                <div className="card-item">
                                    <table className="card-table">

                                        <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Параметр</th>
                                            <th>Очікувалось</th>
                                            {summaryData.map((item, index) => (
                                                <th key={index}>{item.climateZone.name}</th>))}
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            parseData.map((item, index) => (
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
                            <div className="card-item">
                            </div>
                        </div>
                        <div className="card-bottom" style={{display: "flex", justifyContent: "flex-end"}}>
                            <button className="btn danger">
                                Не добавляти в реєстр
                            </button>
                            <button className="btn success" onClick={() => this.handlerClickAddToRegister()}>Добавити в реєстр</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export {ResearchCompletedInfoPage}
