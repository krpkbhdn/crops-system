import React from "react";
import Table from "components/table.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faSyncAlt, faTrash, faCheck, faExclamation, faTimes} from "@fortawesome/free-solid-svg-icons";
import Select from "react-dropdown-select";
import ReactPaginate from "react-paginate";
import ModalWindow from "components/modal.jsx";
import {
    getAverageResults,
    getDurationOfResearch,
    getResearchById,
    getResearchParameters,
    updateResearch
} from "api/api";

class ResultsPage extends React.Component{
    constructor() {
        super();
        this._modal = React.createRef();
        this.state = {
            tableTitle: "Активні дослідження",
            column: ["#", "Назва параметру", "Значення", "Одиниця вимірювання", ""],
            control: [
                {type: "success", event: () => this.addRecord(), content: <FontAwesomeIcon icon={faPlus}/>},
            ],
            tableItems: [],
            parameters: [],
            research: null,
            averageResults: [],
            results: [],
            duration: '',
            notResearched: [],
            size: 10,
            currentPage: 0,
        }
    }

    componentDidMount() {
        this.getParameters();
        this.getResearch();
        this.getAverageResults();
        this.getDurationOfResearch()
    }

    addRecord() {
        const _select = React.createRef();
        const _input = React.createRef();
        const key = this.state.tableItems.length;
        this.setState({
            tableItems: this.state.tableItems.concat(
                {
                    _select: _select,
                    _input: _input,
                    parameter:
                        <Select
                            ref={_select}
                            placeholder={"Параметр"}
                            searchBy={ "name"}
                            labelField= {"name"}
                            valueField= {"id"}
                            dropdownHeight= {"300px" }
                            options={this.state.parameters}
                            onChange={(value) => this.handlerSelect(value[0], key)}
                            multi={false} />,
                    input: <input type="number" ref={_input} />,
                    unit: ""
                }
            )
        })
    }

    save() {
        this.state.tableItems.map(item =>
            item !== undefined
            && item._select.current.state.values[0] !== undefined
            && item._input.current.value.length > 0 ? (
                updateResearch(this.props.match.params.id, {
                    parameter: item._select.current.state.values[0].id,
                    value: item._input.current.value
                })) : null );
        this.setState({tableItems: []});
    }

    getAverageResults() {
        getAverageResults(this.props.match.params.id).then(res => (
            this.setState({
                averageResults: res
            })));
    }

    getParameters() {
        getResearchParameters(this.props.match.params.id).then(res => (
            this.setState({
                parameters: res
            })
        ))
    }

    getResearch() {
        getResearchById(this.props.match.params.id).then(res =>
            this.setState({
                research: res
            }));
    }

    getDurationOfResearch() {
        getDurationOfResearch(this.props.match.params.id).then(res =>
            this.setState({
                duration: res
            })
        )
    }

    notResearchedParams() {
        this._modal.current.openModal();
        let isExist = false;
        let el = [];
        const {parameters, averageResults} = this.state;
        parameters.map(param => (
            averageResults.map( aParam => param.id === aParam.param.id ? isExist = true : null),
            !isExist ? el = el.concat(param.name) : null,
            isExist = false
        ));
        return el;
    }

    openModal() {
        let arr = [];
        this.setState({
            notResearched: this.notResearchedParams()
        });
        this._modal.current.openModal();
    }


    handlerSelect(value, key) {
        this.state.tableItems[key].unit = value.unit.name + ", " + value.unit.shortName;
        this.setState({
            tableItems: this.state.tableItems
        });
    }

    removeItem(item) {
        let array = [...this.state.tableItems]; // make a separate copy of the array
        const index = array.indexOf(item)
        if (index !== -1) {
            delete array[index]
        }
        this.setState({tableItems: array})

    }

    getPageOfResults(page) {
        this.getResearch();
        let tr = [];
        const { research, size } = this.state;
        const start = size * page.selected;
        const end = size * (page.selected + 1);
        for( let index = start ; index < research.results.length && index < end ; index++) {
            const item = research.results[index];
            if (item !== undefined ) {
                tr.push(
                    <tr key={index} >
                        <td style={{width: "5rem"}}>{index + 1}</td>
                        <td style={{width: "30%"}}>{item.parameter.name}</td>
                        <td style={{width: "15rem"}}>{item.value}</td>
                        <td style={{width: "30%"}}>{item.parameter.unit.name} </td>
                        <td> </td>
                    </tr>
                )
            }
        }

        this.setState({
            results: tr
        })

    }

    render() {
        const {
            column,
            control,
            tableItems,
            research,
            results,
            size,
            duration,
            averageResults,
            notResearched
        } = this.state;
        return (
            <div>
                <div className="m-large">
                    <ModalWindow ref={this._modal}>
                        <div className="m-title">
                            Завершення дослідження
                        </div>
                        {research !== null ?
                            <div className="m-content">
                                <div className="m-item">
                                    <h5>
                                        Дослідження тривало (діб):
                                    </h5>
                                    <span>{duration}</span>
                                </div>
                                <div className="m-item">
                                    <h5>
                                        Дослідження проходило у кліматичній зоні
                                    </h5>
                                    <span>{research.station.climateZone.name}</span>
                                    <h5>
                                        на станції
                                    </h5>
                                    <span>{research.station.name}</span>
                                </div>

                                <div className="m-item">
                                    <h5>
                                        Досліджувався сорт
                                    </h5>
                                    <span>{research.sort.name}</span>
                                    <h5>
                                        рослини
                                    </h5>
                                    <span>{research.sort.plant.name}</span>
                                    <h5>
                                        культури
                                    </h5>
                                    <span>{research.sort.plant.crop.name}</span>
                                </div>

                                <div className="m-item" style={{flexDirection: "column"}}>
                                    <h4 className="m-subtitle">
                                        Результати дослідження
                                    </h4>
                                    <table className="m-table">
                                        <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Параметер</th>
                                            <th>Значення</th>
                                            <th>Очікувалось</th>
                                            <th> </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {averageResults.length > 0 ? averageResults.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.param.name + " (" + item.param.unit.shortName + ")"}</td>
                                                <td>{item.value.toFixed(1)}</td>
                                                <td>{item.expected}</td>
                                                <td>
                                                    {item.value > item.expected * 1.1 ?
                                                        <span className="indicator indicator-success">
                                                            <FontAwesomeIcon icon={faCheck}/>
                                                        </span> :
                                                        item.value < item.expected - item.expected * 0.1 ?
                                                            <span className="indicator indicator-danger">
                                                                <FontAwesomeIcon icon={faTimes}/>
                                                            </span> :
                                                            <span className="indicator indicator-warning">
                                                                <FontAwesomeIcon icon={faExclamation}/>
                                                            </span>}
                                                </td>
                                            </tr>
                                        )) : null}
                                        </tbody>
                                    </table>
                                </div>
                                {notResearched.length > 0 ?
                                <div className="m-item" >
                                    <h5>Параметри які не були дослідженні: </h5>
                                    {notResearched.join(", ")}
                                </div> : null}
                            </div>
                            : null}
                        <div className="m-control">
                            <button className="m-btn danger">Скасувати</button>
                            <button className="m-btn warning">Завершити</button>
                            <button className="m-btn success">Завершити та добавити в реєстр</button>
                        </div>
                    </ModalWindow>
                </div>

                <div className="page-section">
                    <div className="page-section">
                        <div className="card">
                            <div className="card-title">
                                <h5>Інформація про дослідження</h5>
                            </div>
                            <div className="card-section" style={{fontSize: "1.3rem"}}>

                                {research !== null ?
                                    <div className="card-container">
                                        <div className="card-item">
                                            <span>Кліматична зона: </span>
                                            <span> {research.station.climateZone.name}</span>
                                        </div>
                                        <div className="card-item">
                                            <span>Станція: </span>
                                            <span>{research.station.name}</span>
                                        </div>

                                        <div className="card-item">
                                            <span>Культура: </span>
                                            <span>{research.sort.plant.crop.name}</span>
                                        </div>
                                        <div className="card-item">
                                            <span>Рослина: </span>
                                            <span>{research.sort.plant.name}</span>
                                        </div>
                                        <div className="card-item">
                                            <span>Сорт: </span>
                                            <span>{research.sort.name}</span>
                                        </div>
                                        <div className="card-item">
                                            <span>Дата початку: </span>
                                            <span>{research.startDate}</span>
                                        </div>
                                        <div className="card-item">
                                            <span>Дослідження триває (діб): </span>
                                            <span>{duration}</span>
                                        </div>
                                        <div className="card-item" style={{textAlign: "end"}}>
                                            <button
                                                className="btn info"
                                                onClick={() => this.openModal()}
                                            >
                                                Завершити
                                            </button>
                                        </div>
                                    </div> : ""
                                }
                            </div>
                        </div>
                    </div>
                    <div className="page-section" style={{flexWrap: "wrap", justifyContent: "flex-end"}}>

                        {averageResults.map((item, index) =>

                            <div key={index} className="info-card" style={{
                                maxWidth: "43%",
                                borderBottom:
                                    item.value > item.expected * 1.1 ?  ".3rem solid #0fa55a" :
                                        item.value < item.expected - item.expected * 0.1 ?  ".3rem solid #bf393b" :
                                            ".3rem solid #d99234"
                            }}>
                                <div  className="card-title">
                                    <h5>{item.param.name}</h5>
                                </div>
                                <div className="card-info">
                                    <span>{item.value.toFixed(1)}</span>
                                    {item.param.unit.shortName}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="page-section">
                    <Table title={"Внести результати дослідження"} column={column} control={control}>
                        <tbody >
                        {tableItems !== undefined ? tableItems.map((item, index) =>
                            item !== undefined ?
                                <tr key={index} >
                                    <td style={{width: "5rem"}}>{index + 1}</td>
                                    <td style={{width: "30%"}}>{item.parameter}</td>
                                    <td style={{width: "15rem"}}>{item.input}</td>
                                    <td style={{width: "30%"}}>{item.unit} </td>
                                    <td style={{textAlign: "-webkit-right"}}>

                                        <button onClick={() => this.removeItem(item)} className="fab danger"><FontAwesomeIcon icon={faTrash}/></button>
                                    </td>
                                </tr> : null
                        ) : null}

                        </tbody>
                        <div style={{display: "flex", justifyContent: "flex-end"}}>
                            <button className="btn success" onClick={() => this.save()}>Зберегти</button>
                        </div>
                    </Table>
                </div>

                <div className="page-section">
                    <Table title={"Результати дослідження"} column={results.length > 0 ? column : undefined}
                           control={[
                               {type: "info rotate", event: () => this.getPageOfResults({selected: 0}), content: <FontAwesomeIcon icon={faSyncAlt}/>},
                           ]}
                    >

                        <tbody >
                        {results.length > 0 ? results.map(item => item) : null}
                        </tbody>
                        <div className="pagination" style={results.length <= 0 ? {display: "none"} : null}>
                            <ReactPaginate
                                pageCount={research !== null ? research.results.length/size : 0}
                                onPageChange={(page => this.getPageOfResults(page))}
                                nextLabel='&#10095;'
                                previousLabel='&#10094;'

                            />
                        </div>
                    </Table>
                </div>
            </div>
        );
    }
}

export {ResultsPage}
