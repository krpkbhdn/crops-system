import React from "react";
import Table from "components/table.jsx";
import ModalWindow from "components/modal.jsx";
import ReactPaginate from 'react-paginate';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faPlus, faTrash} from '@fortawesome/free-solid-svg-icons';
import {addSort, deleteSort, getAllPlants, getPageSorts, updateSort} from 'api/api'
import Select from "react-dropdown-select";

class SortPage extends React.Component {
    constructor() {
        super();
        this._modal = React.createRef();
        this.state = {
            modelIsOpen: true,
            plants: [],
            sorts: [],
            control: [{type: "success", event: () => this.openModal(), content: <FontAwesomeIcon icon={faPlus}/>}
            ],
            column: ["#", "Назва", "Рослина","Культура",""],
            activePage: 0,
            size: 4,
            pageCount: 0,
            name: '',
            description: '',
            img: null,
            modalModeIsEdit: false,
            selectedItem: null,
            selectedPlant: null,
            selectPlantIsDisabled: true,
        }
    }
    componentDidMount() {
        this.handlePageChange(this.state.activePage);
    }

    handlePageChange(pageNumber) {
        getPageSorts(pageNumber.selected, this.state.size).then(res => res.data).then( data => (
            this.setState({
                sorts: data.content,
                pageCount: data.totalPages,
                activePage: data.pageable.pageNumber
            })
        ));
    }

    addSort() {
        if (this.state.name.length > 0 &&
            this.state.description.length > 0 &&
            this.state.selectedPlant !== null
        ) {
            addSort(
                this.state.name,
                this.state.description,
                this.state.img,
                this.state.selectedPlant.id
            ).then(res => this.setState({
                sorts: this.state.sorts.concat(res)
            }));
            this._modal.current.closeModal();
        }
    }

    editSort() {
        if (this.state.name.length > 0 &&
            this.state.description.length > 0 &&
            this.state.selectedItem !== null
        ) {
            updateSort(
                this.state.selectedItem.id,
                this.state.name,
                this.state.description,
                this.state.img
            ).then(res => this.updateItem(res));
            this._modal.current.closeModal();
        }
    }

    deleteSort(item) {
        deleteSort(item.id).then(res => res.status === 200 ? this.removeItem(item) : null )
    }

    updateItem(item) {
        let array = [...this.state.sorts];
        let index = array.indexOf(this.state.selectedItem)
        if (index !== -1) {
            array[index] = item;
            this.setState({
                sorts: array
            });
        }
    }

    removeItem(item) {
        let array = [...this.state.sorts]; // make a separate copy of the array
        let index = array.indexOf(item)
        if (index !== -1) {
            array.splice(index, 1);
            this.setState({ sorts: array });
        }
    }

    openModal () {
        getAllPlants().then(res => (this.setState({plants: res})));
        this.setState({
            name: '',
            description: '',
            selectedPlant: [],
            modalModeIsEdit: false,
        });
        this._modal.current.openModal();
    }

    openEditModel (item) {
        this.setState({
            selectedItem: item,
            plant: [item.plant],
            name: item.name,
            description: item.description,
            modalModeIsEdit: true,
        });
        this._modal.current.openModal();
    }

    handlerName(e) {
        this.setState({
            name: e.target.value
        });
    }

    handlerDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    handlerSelectPlant(e) {
        this.setState({
            selectedPlant: e[0]
        });
    }

    render() {
        const {control, selectedPlant, column, plants, sorts, name, description, size, activePage, modalModeIsEdit} = this.state;
        return (
            <div>

                <div className="page-section">
                    <ModalWindow ref={this._modal}>
                        <div className="m-title">
                            Сорти
                        </div>
                        <div className="m-content">
                            <input type="text" placeholder={"Назва"} value={name} onChange={e => this.handlerName(e)}/>
                            {
                                !modalModeIsEdit ?
                                    <Select
                                        placeholder={"Рослина"}
                                        value={selectedPlant}
                                        searchBy={ "name"}
                                        labelField= {"name"}
                                        valueField= {"id"}
                                        dropdownHeight= {"300px" }
                                        options={plants}
                                        onChange={(values) => this.handlerSelectPlant(values)}
                                        multi={false}
                                    />

                                    : null}
                            <textarea placeholder={"Опис"} value={description}  onChange={e => this.handlerDescription(e)} />
                        </div>
                        <div className="m-control">
                            <button className="m-btn danger" onClick={() => this._modal.current.closeModal()}>Відмінити</button>
                            {
                                modalModeIsEdit ?
                                    <button className="m-btn info" onClick={() => this.editSort()}>Змінити</button> :
                                    <button className="m-btn success" onClick={() => this.addSort()}>Добавити</button>
                            }

                        </div>

                    </ModalWindow>
                    <Table control={control} column={column} title={"Сорти"}>

                        <tbody>
                        {sorts.map((item, index) =>
                            <tr key={index}>
                                <td>{index + 1 + (size * activePage)}</td>
                                <td>{item.name}</td>
                                <td>{item.plant.name}</td>
                                <td>{item.plant.crop.name}</td>
                                <td style={{display: "flex", justifyContent: "flex-end"}}>
                                    <button onClick={() => this.openEditModel(item)} className="fab info"><FontAwesomeIcon icon={faEdit}/></button>
                                    <button onClick={() => this.deleteSort(item)} className="fab danger"><FontAwesomeIcon icon={faTrash}/></button>
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
            </div>
        );
    }


}



export { SortPage };
