import React from "react";
import {getArchiveResearchesBySort} from "api/api";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faExclamation, faTimes} from "@fortawesome/free-solid-svg-icons";

class ArchiveInfoPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: ["#","Параметер","Очікувалось","Значення",""],
            researches: []
        }
    }

    componentDidMount() {
        getArchiveResearchesBySort(this.props.match.params.id).then(res => this.setState({researches: res.data}));
    }

    render() {
        const {columns, researches} = this.state;
        console.log(researches);
        return (
            <div>
                <div className="page-content">
                    {researches.length > 0 && researches[0] !== undefined ?
                        <div className="card">
                            <div className="card-title">
                                <h5>Результати дослідженнь сорту {researches[0].research.sort.name}</h5>
                            </div>
                            <div className="card-container">
                                <div className="card-item">
                                    <span>Культура: </span>
                                    <span><b>{researches[0].research.sort.plant.crop.name}</b></span>
                                    <span>, Рослина: </span>
                                    <span><b>{researches[0].research.sort.plant.name}</b></span>
                                    <span>, Сорт: </span>
                                    <span><b>{researches[0].research.sort.name}</b></span>
                                </div>
                                <div className="card-item">
                                    <span>Кількість проведених досліджень: </span>
                                    <span><b>{researches.length}</b></span>
                                </div>
                            </div>
                        </div>
                        : null}

                    {researches.map((item, index) => (
                        <div className="card" key={index}>
                            <div className="card-title">
                                <h5>{item.research.station.name}</h5>
                            </div>
                            <div className="card-container">
                                <div className="card-item">

                                </div>
                                <div className="card-item">
                                    <span>Кліматична зона: </span>
                                    <span><b>{item.research.station.climateZone.name}</b></span>
                                </div>
                                <div className="card-item">
                                    <span>Дата початку/кінця: </span>
                                    <span><b>{item.research.startDate} - {item.research.endDate}</b></span>
                                </div>
                                <div className="card-item" style={{marginBottom: "1.5rem"}}>
                                    <span>Тривалість (днів): </span>
                                    <span><b>{item.duration}</b></span>
                                </div>
                                <div className="card-item">
                                    <table className="card-table">
                                        <thead>
                                        <tr>
                                            {columns.map((itm, idx) => (<th key={idx}>{itm}</th>))}
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {item.average.map((itm, idx) => (
                                            <tr key={idx}>
                                                <td>{idx + 1}</td>
                                                <td>{itm.param.name}</td>
                                                <td>{itm.expected}</td>
                                                <td>{itm.value.toFixed(1)}</td>
                                                <td>
                                                    {itm.value > itm.expected ?
                                                        <span className="indicator indicator-success">
                                                            <FontAwesomeIcon icon={faCheck}/>
                                                        </span> :
                                                        itm.value < itm.expected - itm.expected * 0.2 ?
                                                            <span className="indicator indicator-danger">
                                                                <FontAwesomeIcon icon={faTimes}/>
                                                            </span> :
                                                            <span className="indicator indicator-warning">
                                                                <FontAwesomeIcon icon={faExclamation}/>
                                                            </span>}
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        );
    }
}

export {ArchiveInfoPage}
