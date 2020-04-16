import React from "react";
import Table from "components/table.jsx";
import ModalWindow from "components/modal.jsx";
import ReactPaginate from 'react-paginate';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faPlus, faTrash} from '@fortawesome/free-solid-svg-icons';
import {addPlant, deletePlant, getAllCrops, getAllParameters, getPagePlants, updatePlant, updateResearch} from 'api/api'
import Select from "react-dropdown-select";

class PlantPage extends React.Component {
    constructor() {
        super();
        this._modal = React.createRef();
        this._selectCrop = React.createRef();
        this._selectParams = React.createRef();
        this.state = {
            modelIsOpen: true,
            plants: [],
            crops:[],
            control: [{type: "success", event: () => this.openModal(), content: <FontAwesomeIcon icon={faPlus}/>}
            ],
            column: ["#", "Назва", "Культура",""],
            activePage: 0,
            size: 4,
            pageCount: 0,
            name: '',
            description: '',
            modalModeIsEdit: false,
            selectedItem: null,
            selectedCrop: null,
        }
    }
    componentDidMount() {
        this.handlePageChange(this.state.activePage);
        this.getParameters();
    }

    getParameters() {
        getAllParameters().then(res => (
            this.setState({
                parameters: res
            })
        ))
    }

    handlerSelect(value, key) {
        this.state.tableItems[key].unit = value.unit.name + ", " + value.unit.shortName;
        this.setState({
            tableItems: this.state.tableItems
        });
    }

    handlePageChange(pageNumber) {
        getPagePlants(pageNumber.selected, this.state.size).then(res => res.data).then( data => (
            this.setState({
                plants: data.content,
                pageCount: data.totalPages,
                activePage: data.pageable.pageNumber
            })
        ));
    }

    addPlant() {
        let params = []
        if (this.state.name.length > 0 &&
            this.state.description.length > 0 &&
            this.state.selectedCrop !== null &&
            this._selectParams.current.state.values.length > 0
        ) {
            this._selectParams.current.state.values.map(item => params = params.concat(item.id))
            addPlant(
                this.state.name,
                this.state.description,
                this.state.selectedCrop.id,
                params.join(";")
            ).then(res => this.setState({
                plants: this.state.plants.concat(res)
            }));
            this._modal.current.closeModal();
        }
        console.log(this._selectParams.current.state.values)
    }

    removeItemTable(item) {
        let array = [...this.state.tableItems]; // make a separate copy of the array
        const index = array.indexOf(item)
        if (index !== -1) {
            delete array[index]
        }
        this.setState({tableItems: array})

    }

    editPlant() {
        if (this.state.name.length > 0 && this.state.description.length > 0) {
            updatePlant(this.state.selectedItem.id ,this.state.name, this.state.description).then(res => this.updateItem(res));
            this._modal.current.closeModal();
        }
    }

    deletePlant(item) {
        deletePlant(item.id).then(res => res.status === 200 ? this.removeItem(item) : null )
    }

    updateItem(item) {
        let array = [...this.state.plants];
        let index = array.indexOf(this.state.selectedItem)
        if (index !== -1) {
            array[index] = item;
            this.setState({
                plants: array
            });
        }
    }

    removeItem(item) {
        let array = [...this.state.plants]; // make a separate copy of the array
        let index = array.indexOf(item)
        if (index !== -1) {
            array.splice(index, 1);
            this.setState({ plants: array });
        }
    }

    openModal () {
        this._selectCrop.current.clearAll();
        getAllCrops().then(res => (this.setState({crops: res})));
        this.setState({
            name: '',
            description: '',
            selectedCrop: [{}],
            modalModeIsEdit: false,
        });
        this._modal.current.openModal();
    }

    openEditModel (item) {
        this._selectCrop.current.clearAll();
        getAllCrops().then(res => (this.setState({crops: res})));
        this.setState({
            selectedItem: item,
            selectedCrop: [item.crop],
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

    handlerSelectCrop(e) {
        this.setState({
            selectedCrop: e[0]
        });
    }

    render() {
        const {control, tableItems, selectedCrop, column, crops, plants, name, description, size, activePage, modalModeIsEdit} = this.state;
        let options = [];
        crops.map((item, index )=> (options.push({label: item.name })));
        return (
            <div>
                <div className="page-section">
                    <ModalWindow ref={this._modal}>
                        <div className="m-title">
                            Рослина
                        </div>
                        <div className="m-content">
                            <input type="text" placeholder={"Назва"} value={name} onChange={e => this.handlerName(e)}/>
                            {
                                !modalModeIsEdit ?
                                    <Select
                                        ref={this._selectCrop}
                                        placeholder={"Культура"}
                                        value={selectedCrop}
                                        searchBy={ "name"}
                                        labelField= {"name"}
                                        valueField= {"id"}
                                        dropdownHeight= {"300px" }
                                        options={crops}
                                        onChange={(values) => this.handlerSelectCrop(values)}
                                        multi={false} /> : null}
                            <Select
                                ref={this._selectParams}
                                placeholder={"Параметри"}
                                searchBy={ "name"}
                                labelField= {"name"}
                                valueField= {"id"}
                                dropdownHeight= {"300px" }
                                options={this.state.parameters}

                                multi={true} />
                            <textarea placeholder={"Опис"} value={description}  onChange={e => this.handlerDescription(e)} />
                        </div>
                        <div className="m-control">
                            <button className="m-btn danger" onClick={() => this._modal.current.closeModal()}>Відмінити</button>
                            {
                                modalModeIsEdit ?
                                    <button className="m-btn info" onClick={() => this.editPlant()}>Змінити</button> :
                                    <button className="m-btn success" onClick={() => this.addPlant()}>Добавити</button>
                            }

                        </div>

                    </ModalWindow>
                    <Table control={control} column={column} title={"Рослини"}>

                        <tbody>
                        {plants.map((item, index) =>
                            <tr key={index}>
                                <td>{index + 1 + (size * activePage)}</td>
                                <td>{item.name !== null ? item.name : null}</td>
                                <td>{item.crop.name !== null ? item.crop.name : null}</td>
                                <td style={{display: "flex", justifyContent: "flex-end"}}>
                                    <button onClick={() => this.openEditModel(item)} className="fab info"><FontAwesomeIcon icon={faEdit}/></button>
                                    <button onClick={() => this.deletePlant(item)} className="fab danger"><FontAwesomeIcon icon={faTrash}/></button>
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

export { PlantPage };
