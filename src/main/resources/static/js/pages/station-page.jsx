import React from "react";
import Table from "components/table.jsx";
import ModalWindow from "components/modal.jsx";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faPlus, faTrash} from '@fortawesome/free-solid-svg-icons';
import ReactPaginate from 'react-paginate';
import Select from "react-dropdown-select";
import {addStation, deleteStation, getAllZones, getPageStations, updateStation} from "api/api";

class StationPage extends React.Component {
    constructor() {
        super();
        this._modal = React.createRef();
        this._selectZone = React.createRef();
        this.state = {
            modelIsOpen: true,
            zones: [],
            stations:[],
            control: [{type: "success", event: () => this.openModal(), content: <FontAwesomeIcon icon={faPlus}/>}
            ],
            column: ["#", "Назва", "Телефон", "Поштовий індекс", "Адреса","Кліматична зона"],
            activePage: 0,
            size: 4,
            pageCount: 0,
            name: '',
            address: '',
            phone: '',
            zip: '',
            modalModeIsEdit: false,
            selectedItem: null,
            selectedZone: null,
        }
    }
    componentDidMount() {
        this.handlePageChange(this.state.activePage);
    }

    handlePageChange(pageNumber) {
        getPageStations(pageNumber.selected, this.state.size).then(res => res.data).then( data => (
            this.setState({
                stations: data.content,
                pageCount: data.totalPages,
                activePage: data.pageable.pageNumber
            })
        ));
    }

    addStation() {
        const {name, address, phone, zip, selectedZone} = this.state;
        if (name.length > 0 && address.length > 0 && phone.length > 0 && zip.length > 0 && selectedZone !== null) {
            addStation(name, address, phone, zip, selectedZone.id)
                .then(res => this.setState({
                    stations: this.state.stations.concat(res)
                }));
            this._modal.current.closeModal();
        }
    }

    editStation() {
        const {name, address, phone, zip, selectedItem} = this.state;
        if (name.length > 0 && address.length > 0 && phone.length > 0 && zip.length > 0 && selectedItem !== null) {
            updateStation(selectedItem.id, name, address, phone, zip).then(res => this.updateItem(res));
            this._modal.current.closeModal();
        }
    }

    deleteStation(item) {
        deleteStation(item.id).then(res => res.status === 200 ? this.removeItem(item) : null )
    }

    updateItem(item) {
        let array = [...this.state.stations];
        let index = array.indexOf(this.state.selectedItem)
        if (index !== -1) {
            array[index] = item;
            this.setState({
                stations: array
            });
        }
    }

    removeItem(item) {
        let array = [...this.state.stations];
        let index = array.indexOf(item)
        if (index !== -1) {
            array.splice(index, 1);
            this.setState({ stations: array });
        }
    }

    openModal () {
        this._selectZone.current.clearAll();
        getAllZones().then(res => (this.setState({zones: res})));
        this.setState({
            name: '',
            address: '',
            phone: '',
            zip: '',
            selectedZone: [{}],
            modalModeIsEdit: false,
        });
        this._modal.current.openModal();
    }

    openEditModel (item) {
        getAllZones().then(res => (this.setState({zones: res})));
        this.setState({
            selectedItem: item,
            name: item.name,
            address: item.address,
            phone: item.phone,
            zip: item.zip,
            selectedZone: [item.climateZone],
            modalModeIsEdit: true,
        });
        this._modal.current.openModal();
    }

    handlerName(e) {
        this.setState({
            name: e.target.value
        });
    }
    handlerAddress(e) {
        this.setState({
            address: e.target.value
        });
    }
    handlerPhone(e) {
        this.setState({
            phone: e.target.value
        });
    }
    handlerZip(e) {
        this.setState({
            zip: e.target.value
        });
    }

    handlerSelectZone(e) {
        this.setState({
            selectedZone: e[0]
        });
    }

    render() {
        const {
            control,
            selectedZone,
            column,
            stations,
            zones,
            name,
            address,
            phone,
            zip,
            size,
            activePage,
            modalModeIsEdit
        } = this.state;

        return (
            <div className="page-section">
                <ModalWindow ref={this._modal}>
                    <div className="m-title">
                        Станція
                    </div>
                    <div className="m-content">
                        <input type="text" placeholder={"Назва"}
                               value={name} onChange={e => this.handlerName(e)}/>
                        <input type="text" placeholder={"Адреса"}
                               value={address} onChange={e => this.handlerAddress(e)}/>
                        <input type="text" placeholder={"Телефон"}
                               value={phone} onChange={e => this.handlerPhone(e)}/>
                        <input type="text" placeholder={"Поштовий індекс"}
                               value={zip} onChange={e => this.handlerZip(e)}/>
                        {
                            !modalModeIsEdit ?
                                <Select
                                    ref={this._selectZone}
                                    placeholder={"Кліматична зона"}
                                    value={selectedZone}
                                    searchBy={ "name"}
                                    labelField= {"name"}
                                    valueField= {"id"}
                                    dropdownHeight= {"300px" }
                                    options={zones}
                                    onChange={(values) => this.handlerSelectZone(values)}
                                    multi={false} /> : null}
                    </div>
                    <div className="m-control">
                        <button className="m-btn danger" onClick={() => this._modal.current.closeModal()}>Відмінити</button>
                        {
                            modalModeIsEdit ?
                                <button className="m-btn info" onClick={() => this.editStation()}>Змінити</button> :
                                <button className="m-btn success" onClick={() => this.addStation()}>Добавити</button>
                        }

                    </div>

                </ModalWindow>
                <Table control={control} column={column} title={"Дослідні станції"}>

                    <tbody>
                    {stations.map((item, index) =>
                        <tr key={index}>
                            <td>{index + 1 + (size * activePage)}</td>
                            <td>{item.name !== null ? item.name : null}</td>
                            <td>{item.phone !== null ? item.phone : null}</td>
                            <td>{item.zip !== null ? item.zip : null}</td>
                            <td>{item.address !== null ? item.address : null}</td>
                            <td>{item.climateZone.name !== null ? item.climateZone.name : null}</td>
                            <td style={{display: "flex", justifyContent: "flex-end"}}>
                                <button onClick={() => this.openEditModel(item)} className="fab info"><FontAwesomeIcon icon={faEdit}/></button>
                                <button onClick={() => this.deleteStation(item)} className="fab danger"><FontAwesomeIcon icon={faTrash}/></button>
                            </td>
                        </tr>
                    )}
                    </tbody>
                    <div className="pagination"><ReactPaginate
                        pageCount={this.state.pageCount}
                        nextLabel='&#10095;'
                        previousLabel='&#10094;'
                        onPageChange={this.handlePageChange.bind(this)}
                    />

                    </div>
                </Table>
            </div>

        );
    }
}

export { StationPage };
