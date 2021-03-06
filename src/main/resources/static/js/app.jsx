import React from 'react';
import Header from 'components/header.jsx';
import Sidebar from 'components/sidebar.jsx';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {
    ClimateZonePage,
    CropPage,
    MainPage,
    ParameterPage,
    PlantPage,
    ResultsPage,
    ResearchNewPage,
    SortPage,
    StationPage,
    UnitPage,
    ResearchActivePage,
    ResearchCompletedPage,
    ResearchCompletedInfoPage,
    RegisterPage,
    RegisterInfoPage,
    ArchivePage,
    ArchiveInfoPage, PlantEditorPage
} from "pages/pages";

class App extends React.Component{
    render() {
        return(
            <div className="app">
                <Router>
                <div className="sidebar-container">
                    <Sidebar/>
                </div>
                <div className="main-container">
                    <div className="header-container">
                        <Header/>
                    </div>
                    <div className="page-container">

                            <Switch>
                                <Route exact path="/" component={MainPage}/>
                                <Route path="/crop" component={CropPage}/>
                                <Route exact path="/plant" component={PlantPage}/>
                                <Route exact path="/plant/:mode/:id?" component={PlantEditorPage}/>
                                <Route path="/sort" component={SortPage}/>
                                <Route path="/climate-zone" component={ClimateZonePage}/>
                                <Route path="/station" component={StationPage}/>
                                <Route path="/unit" component={UnitPage}/>
                                <Route path="/parameter" component={ParameterPage}/>
                                <Route path="/research/new" component={ResearchNewPage}/>
                                <Route exact path="/research/active" component={ResearchActivePage}/>
                                <Route path="/research/active/:id" component={ResultsPage}/>
                                <Route exact path="/research/completed" component={ResearchCompletedPage}/>
                                <Route path="/research/completed/:id" component={ResearchCompletedInfoPage}/>
                                <Route exact path="/register" component={RegisterPage}/>
                                <Route path="/register/:id" component={RegisterInfoPage}/>
                                <Route exact path="/archive" component={ArchivePage}/>
                                <Route path="/archive/:id" component={ArchiveInfoPage}/>
                                <Route path="**" component={MainPage}/>
                            </Switch>
                    </div>
                </div>
                </Router>
            </div>

        );
    }
}

export default App;
