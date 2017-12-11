import React from 'react';

class CompanyFinder extends React.Component {
    constructor() {
        super();
        this.state = { current_company: "27844838",
                       degree: 1,
                       country_filter: 'Any',
                       last_shipment_filter: '36',
                       expertise_filter: '' };
    }

    componentDidMount() {
        fetch(`http://yellow.panjiva.com:8990/profile/listviz?degree=${this.state.degree}&country_filter=${this.state.country_filter}&last_shipment_date=${this.state.last_shipment_filter}&expertise_filter=${this.state.expertise_filter}&permanent_id=${this.state.current_company}`)
            .then(res => res.json()
            ).then(r => console.log(r));
    }

    render() {
        return (
            <div></div>
        );
    }
}

export default CompanyFinder;

