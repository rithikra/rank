import React, { Component } from 'react';
import axios from 'axios';


class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            companies: [{}]
        };
        this.componentDidMount = this.componentDidMount.bind(this);
    }
    componentDidMount(){
        axios.get('http://localhost:4000/company/sorted')
        .then(response => {
            this.setState({companies: response.data});
        })
        .catch(function (error){
        })
    }
    render(){
        console.log(this.state.companies);
        return(
            <div>
                <h2>Internship Rankings</h2>
                {this.state.companies.map((company, index) => <h6>{index + 1}. {company.company_name}</h6>)}
            </div>
        );
    };
}

export default Home