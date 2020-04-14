import React from "react";
import Table from "components/table.jsx";
import ModalWindow from "components/modal.jsx";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faPlus, faTrash} from '@fortawesome/free-solid-svg-icons';
import ReactPaginate from 'react-paginate';
import {addZone, deleteZone, getPageZones} from "api/api";
import {updateZone} from "../api/api-climate-zone";

class ClimateZonePage extends React.Component {
    constructor() {
        super();
        this._modal = React.createRef();
        this.state = {
            zones: [],
            modelIsOpen: false,
            control: [{type: "success", event: () => this.openModal(), content: <FontAwesomeIcon icon={faPlus}/>}],
            column: ["#", "Назва", ""],
            activePage: 0,
            size: 4,
            pageCount: 0,
            inputName: '',
            modalModeIsEdit: false,
            selectedItem: null,
        }
    }

    componentDidMount() {
        this.handlePageChange(this.state.activePage);
    }

    handlePageChange(pageNumber) {
        getPageZones(pageNumber.selected, this.state.size).then(res => res.data).then( data => (
            this.setState({
                zones: data.content,
                pageCount: data.totalPages,
                activePage: data.pageable.pageNumber
            })
        ));
    }

    addZone() {
        if (this.state.inputName.length) {
            addZone(this.state.inputName).then(res => this.setState({
                zones: this.state.zones.concat(res)
            }));
            this._modal.current.closeModal();
        }
    }

    editZone() {
        if (this.state.inputName.length) {
            updateZone(this.state.selectedItem.id, this.state.inputName)
                .then(res => this.updateItem(res));
            this._modal.current.closeModal();
        }
    }

    deleteZone(item) {
        deleteZone(item.id).then(res => res.status === 200 ? this.removeItem(item) : null )
    }

    updateItem(item) {
        let array = [...this.state.zones];
        let index = array.indexOf(this.state.selectedItem)
        if (index !== -1) {
            array[index] = item;
            this.setState({
                zones: array
            });
        }
    }

    removeItem(item) {
        let array = [...this.state.zones]; // make a separate copy of the array
        let index = array.indexOf(item)
        if (index !== -1) {
            array.splice(index, 1);
            this.setState({ zones: array });
        }
    }

    openModal () {
        this.setState({
            inputName: '',
            modalModeIsEdit: false,
        })
        this._modal.current.openModal()
    }

    openEditModel (item) {
        this.setState({
            selectedItem: item,
            inputName: item.name,
            modalModeIsEdit: true,
        });
        this._modal.current.openModal()
    }

    handlerInputName(e) {
        this.setState({
            inputName: e.target.value
        })
    }

    render() {
        const {control, column, zones, inputName, size, activePage, modalModeIsEdit} = this.state;
        return (
            <div className="page-section">
                <ModalWindow ref={this._modal}>
                    <div className="m-title">
                        Кліматична зона
                    </div>
                    <div className="m-content">
                        <input type="text" placeholder={"Назва"} value={inputName} onChange={e => this.handlerInputName(e)}/>
                    </div>
                    <div className="m-control">
                        <button className="m-btn danger" onClick={() => this._modal.current.closeModal()}>Відмінити</button>
                        {
                            modalModeIsEdit ?
                                <button className="m-btn info" onClick={() => this.editZone()}>Змінити</button> :
                                <button className="m-btn success" onClick={() => this.addZone()}>Добавити</button>
                        }

                    </div>

                </ModalWindow>
                <Table control={control} column={column} title={"Кліматичні зони"}>
                    <tbody>
                    {zones.map((item, index) =>
                        <tr key={index}>
                            <td>{index + 1 + (size * activePage)}</td>
                            <td>{item.name}</td>
                            <td style={{display: "flex", justifyContent: "flex-end"}}>
                                <button onClick={() => this.openEditModel(item)} className="fab info"><FontAwesomeIcon icon={faEdit}/></button>
                                <button onClick={() => this.deleteZone(item)} className="fab danger"><FontAwesomeIcon icon={faTrash}/></button>
                            </td>
                        </tr>
                    )}
                    </tbody>
                    <div className="pagination"><ReactPaginate
                        pageCount={this.state.pageCount}
                        nextLabel='&#10095;'
                        previousLabel='&#10094;'
                        onPageChange={this.handlePageChange.bind(this)}
                    /></div>
                </Table>
            </div>


        );
    }
}

export { ClimateZonePage };
