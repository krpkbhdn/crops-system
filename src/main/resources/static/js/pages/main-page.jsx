import React from "react";
import InfoCard from "components/card.jsx";
import { getCountOfCrops, getCountOfSorts, getCountOfPlants } from 'api/api'
class MainPage extends React.Component {
    constructor() {
        super();
        this.state = {
            items: []
        }
    }

    componentDidMount() {
        getCountOfCrops().then(res =>
            this.setState({items: this.state.items.concat({
                    title: "Культур", count: res.data
                })}));
        getCountOfPlants().then(res =>
            this.setState({items: this.state.items.concat({
                    title: "Рослин", count: res.data
                })}));
        getCountOfSorts().then(res =>
            this.setState({items: this.state.items.concat({
                    title: "Сортів", count: res.data
                })}));
    }

    render() {
        const {items} = this.state;
        return (
            <div>
                <div className="page-section">
                    {items.map((item, index) => <InfoCard key={index} item={item}/>)}
                </div>
            </div>
        );
    }
}

export  { MainPage };
