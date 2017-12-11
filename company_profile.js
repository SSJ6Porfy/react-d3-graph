import React from 'react';
import { Graph, Node } from 'react-d3-graph';

class CompanyProfile extends React.Component {
    constructor() {
        super();
        this.state = { current_company: "Company C",
                       degree: 1,
                       country_filter: 'Any',
                       last_shipment_filter: '36',
                       expertise_filter: '',
                       company_name: '',
                       data: {
                        nodes: [
                          { id: 'Company A' },
                          { id: 'Company B' },
                          { id: 'Company C', color: 'red', symbolType: 'diamond' },
                          { id: 'Company D' },
                          { id: 'Company E' },
                          { id: 'Company F' },
                          { id: 'Company G' },
                          { id: 'Company H' },
                          { id: 'Company I' },
                          { id: 'Company J' },
                          { id: 'Company K' },
                          { id: 'Company L' }
                        ],
                        links: [
                            { source: 'Company A', target: 'Company B', degree: 2 },
                            { source: 'Company B', target: 'Company C', degree: 2 },
                            { source: 'Company C', target: 'Company D', degree: 1, stroke: 'red' },
                            { source: 'Company C', target: 'Company E', degree: 1 },
                            { source: 'Company C', target: 'Company F', degree: 1 },
                            { source: 'Company D', target: 'Company E', degree: 2 },
                            { source: 'Company F', target: 'Company H', degree: 2 },
                            { source: 'Company G', target: 'Company I' },
                            { source: 'Company F', target: 'Company D' },
                            { source: 'Company B', target: 'Company J' , degree: 2 },
                            { source: 'Company J', target: 'Company H' },
                            { source: 'Company L', target: 'Company A', degree: 3 },
                            { source: 'Company K', target: 'Company C', degree: 1 },
                            { source: 'Company I', target: 'Company F', degree: 3 },
                            { source: 'Company I', target: 'Company D', degree: 3 },
                            { source: 'Company I', target: 'Company E', degree: 3 }
                        ]
                    }
                    };
        this.update = this.update.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.randomColor = this.randomColor.bind(this);
    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    handleSubmit(e) {
        // requesting new company data from API
        e.preventDefault();
        fetch("API Call Here")
        .then(res => res.json()
        ).then(r => this.setState({ companies: r.companies, connections: r.connections}));      
    }

    randomColor() {
        // panjiva colors
        let colorList = [
            { color: '#2ECC71' },
            { color: '#15BDED' },
            { color: '#00A1CF' },
            { color: '#00A1CF' },
            { color: '#2ECC71' },
            { color: '#27AE60' },
            { color: '#FCF3D0' },
            { color: '#F1C40F' },
            { color: '#F39C12' },
            { color: '#E67E22' },
            { color: '#D35400' },
            { color: '#E74C3C' },
            { color: '#C0392B' },
            { color: '#9B59B6' },
            { color: "#7a6ff0" },
            { color: "#1ccca2" },
            { color: "#ff0000" },
            { color: "#4ca9ef" },
            { color: "#f97a02" },
            { color: "#42a32f" },
            { color: "#d73388" } ];
        
        this.state.data.nodes.forEach((node) => {
            let idx = Math.floor(Math.random() * 21);
            node.color = colorList[idx].color;
        });
        return;
    }

    render() {
        // configuration for graph
        const myConfig = {
            nodeHighlightBehavior: true,
            node: {
                color: this.randomColor(),
                size: 1000,
                highlightStrokeColor: 'blue'
            },
            link: {
                highlightColor: 'lightblue',
            },
            height: 600,
            width: 800,
            automaticRearrangeAfterDropNode: true
        };
        return (
            <div className="company-graph-show">
                <div className="header-container">
                    <img className="logo" src="http://logosandbrands.directory/wp-content/themes/directorypress/thumbs/Panjiva-logo.jpg"></img>
                </div>
                <div className="company-name-banner">
                    <h1 className="banner">{this.state.current_company + "\'s Business Relationships" }</h1>
                </div>
                <div className="main-container">
                    <div className="form-container">
                        <h3 className="form-header">Search Companies</h3>
                        <form className="company-form" onSubmit={this.handleSubmit}>
                            <input className="form-input" type="text" placeholder="Company ID"/>
                            <input className="form-input" type="text" placeholder="Last Shipment Date"/>
                            <input className="form-input" type="text" placeholder="Expertise Filter"/>
                            <button className="company-form-btn">New Graph</button>
                        </form>
                    </div>
                    <div className="graph">
                        <Graph
                        id='mygraph' // id is mandatory, if no id is defined rd3g will throw an error
                        data={this.state.data}
                        config={myConfig}
                        >
                        </Graph>
                    </div>
                </div>
            </div>
        );
    }
}

export default CompanyProfile;

