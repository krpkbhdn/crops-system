import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBuilding, faCaretDown, faCog, faFlask, faSeedling, faArchive, faCube} from '@fortawesome/free-solid-svg-icons';
import {Link} from "react-router-dom";

const sidebarMenu = [
    {
        title: '', sections: [
            // {title: 'Статистика', icon: faChartBar, links: [
            //         {name: 'Дослідження', href: '#'},
            //         {name: 'Культури', href: '#'},
            //         {name: 'Працівники', href: '#'},
            //     ]
            // },
            {
                title: 'Дослідження', icon: faFlask, links: [
                    {name: 'Розпочати нове', href: '/research/new'},
                    {name: 'Активні', href: '/research/active'},
                    {name: 'Завершені', href: '/research/completed'},
                ]
            },
            {
                title: 'Реєстр', icon: faCube, links: [
                    {name: 'Сорти', href: '/register'},
                ]
            },
            {
                title: 'Архів', icon: faArchive, links: [
                    {name: 'Сорти', href: '/archive'},
                ]
            },
            // {title: 'Заявки', icon: faThList, links: [
            //         {name: 'Нові', href: '#'},
            //         {name: 'Очікують', href: '#'},
            //         {name: 'Прийняті', href: '#'},
            //         {name: 'Відхиленні', href: '#'},
            //     ]
            // },
            {
                title: 'Рослиництво', icon: faSeedling, links: [
                    {name: 'Культури', href: '/crop'},
                    {name: 'Рослини', href: '/plant'},
                    {name: 'Сорти', href: '/sort'},
                ]
            },
            {
                title: 'Організація', icon: faBuilding, links: [
                    {name: 'Станції', href: '/station'},
                ]
            },
            {
                title: 'Загальні параметри', icon: faCog, links: [
                    {name: 'Кліматичні зони', href: '/climate-zone'},
                    {name: 'Параметри', href: '/parameter'},
                    {name: 'Одиниці вимірювання', href: '/unit'},
                ]
            },
            // {title: 'Працівники', icon: faUsers, links: [
            //         {name: 'Активність', href: '#'},
            //         {name: 'Працівники', href: '#'},
            //         {name: 'Посади', href: '#'},
            //     ]
            // },
            // {title: 'Блог', icon: faNewspaper, links: [
            //         {name: 'Статті', href: '#'},
            //         {name: 'Теги', href: '#'},
            //     ]
            // },
        ]
    }
];


class Sidebar extends React.Component {
    render() {
        return (
            <div id="sidebar">
                <div className="sidebar-header">
                    <h1>Research<b><i>Helper</i></b></h1>
                </div>
                <div className="sidebar-body">
                    {sidebarMenu.map((item, index) => (
                        <SidebarSection key={index} section={item}/>
                    ))}
                </div>

            </div>
        );
    }
}

class SidebarSection extends React.Component {

    render() {
        const {section} = this.props;
        return (
            <div className="sidebar-section">
                {section.title !== undefined ? (
                    <div className="section-title">
                        <h5>{section.title}</h5>
                    </div>
                ) : ""}
                {section.sections.map((item, index) => <SidebarCollapse key={index} section={item}/>)}
            </div>
        )
    }
}

class SidebarCollapse extends React.Component {
    constructor() {
        super();
        this.listRef = React.createRef();
        this.state = {
            isActive: false,
            componentHeight: 0,
        }
    }

    componentDidMount() {
        this.setState({
            componentHeight:
                (this.listRef.current !== null ? this.listRef.current.clientHeight : 0)
                + (this.props.section.links.length * 4) + 'px'
        })
    }

    handlerOnClickCollapse() {
        this.setState({
            isActive: !this.state.isActive
        });
    }

    render() {
        const {isActive, componentHeight} = this.state;
        const {section} = this.props;
        return (
            <div className="sidebar-collapse">
                {section.links.length === 1 ?
                    <div className="collapse-btn">
                        <Link to={section.links[0].href}>
                            {section.icon !== undefined ? <FontAwesomeIcon className="icon" icon={section.icon}/> : ''}
                            {section.title}
                        </Link>
                    </div> :
                    <div className="collapse-btn">

                        <a onClick={() => this.handlerOnClickCollapse()}>
                            {section.icon !== undefined ? <FontAwesomeIcon className="icon" icon={section.icon}/> : ''}
                            {section.title}
                            <FontAwesomeIcon className="icon-caret" icon={faCaretDown}
                                             style={isActive ? {transform: "rotate(180deg)"} : ""}
                            />
                        </a>
                    </div>}
                {section.links.length === 1 ? null :
                    <div className="collapse-container"
                         style={isActive ? {height: componentHeight} : {height: "0"}}>
                        <ul ref={this.listRef}>
                            {section.links.map((item, index) => <li key={index}><Link to={item.href}>{item.name}</Link>
                            </li>)}
                        </ul>

                    </div>}
            </div>
        )
    }
}

export default Sidebar;
