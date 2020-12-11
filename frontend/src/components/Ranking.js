import React, { Component } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';

class Ranking extends Component {
    constructor(props){
        super(props);
        this.state = {
            count: -1,
            company1: {
                _id: 0,
                company_name: "",
                company_logo: "",
                company_information: "",
                company_traits: "",
                company_eloscore: 0,
                company_ranking: 0,
                past_rankings: []
            },
            company2: {
                _id: 0,
                company_name: "",
                company_logo: "",
                company_information: "",
                company_traits: "",
                company_eloscore: 0,
                company_ranking: 0,
                past_rankings: []
            },
        };
        this.getRandomIntInclusive = this.getRandomIntInclusive.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.generateRandomNumbers = this.generateRandomNumbers.bind(this);
        this.addCompanies = this.addCompanies.bind(this);
        this.probability = this.probability.bind(this);
        this.eloScore = this.eloScore.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount() {
        //get number of companies
        axios.get('http://localhost:4000/company/count')
            .then(response => {
                this.setState({ count: response.data });
            })
            .catch(function (error){
                console.log(error);
        })

        //initialize company1 and 2
        axios.get('http://localhost:4000/company/1')
            .then(response => {
                let currCompany = response.data;
                this.setState({
                    company1: {
                        _id: currCompany._id,
                        company_name: currCompany.company_name,
                        company_logo: currCompany.company_logo,
                        company_information: currCompany.company_information,
                        company_traits: currCompany.company_traits,
                        company_eloscore: currCompany.company_eloscore,
                        company_ranking: currCompany.company_ranking,
                        past_rankings: currCompany.past_rankings
                    }
                });
            })
            .catch(function (error){
                console.log(error);
        })
        axios.get('http://localhost:4000/company/2')
            .then(response => {
                let currCompany = response.data;
                this.setState({
                    company2: {
                        _id: currCompany._id,
                        company_name: currCompany.company_name,
                        company_logo: currCompany.company_logo,
                        company_information: currCompany.company_information,
                        company_traits: currCompany.company_traits,
                        company_eloscore: currCompany.company_eloscore,
                        company_ranking: currCompany.company_ranking,
                        past_rankings: currCompany.past_rankings
                    }
                });
            })
            .catch(function (error){
                console.log(error);
        })
    }

    addCompanies(count) {
        let arr = this.generateRandomNumbers(1, count);
        console.log(arr);
        axios.get('http://localhost:4000/company/' + arr[0])
            .then(response => {
                let currCompany = response.data;
                this.setState({
                    company1: {
                        _id: currCompany._id,
                        company_name: currCompany.company_name,
                        company_logo: currCompany.company_logo,
                        company_information: currCompany.company_information,
                        company_traits: currCompany.company_traits,
                        company_eloscore: currCompany.company_eloscore,
                        company_ranking: currCompany.company_ranking,
                        past_rankings: currCompany.past_rankings
                    }
                });
            })
            .catch(function (error){
                console.log(error);
        })
        axios.get('http://localhost:4000/company/' + arr[1])
            .then(response => {
                let currCompany = response.data;
                this.setState({
                    company2: {
                        _id: currCompany._id,
                        company_name: currCompany.company_name,
                        company_logo: currCompany.company_logo,
                        company_information: currCompany.company_information,
                        company_traits: currCompany.company_traits,
                        company_eloscore: currCompany.company_eloscore,
                        company_ranking: currCompany.company_ranking,
                        past_rankings: currCompany.past_rankings
                    }
                });
    
            })
            .catch(function (error){
                console.log(error);
        })
    }
    generateRandomNumbers(min, max){
        var id1 = this.getRandomIntInclusive(min, max);
        var id2 = this.getRandomIntInclusive(min, max);
        while(id1 === id2){
            id1 = this.getRandomIntInclusive(1, max);
            id2 = this.getRandomIntInclusive(1, max);
        }
        let arr = []
        arr[0] = id1;
        arr[1] = id2;
        return arr;
    }
    getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive 
    }

    probability(r1, r2){
        return 1.0 * 1.0 / (1 + 1.0 * Math.pow(10, 1.0 * (r1 - r2) / 400))
    }

    eloScore(aScore, bScore, K, d){

        let probabilityB = this.probability(aScore, bScore);
        let probabilityA = this.probability(bScore, aScore);
        
        //if company A is ranked higher
        if(d){
            aScore = aScore + K * (1 - probabilityA)
            bScore = bScore + K * (0 - probabilityB)
        }
        //if company B is ranked higher
        else{
            aScore = aScore + K * (0 - probabilityA)
            bScore = bScore + K * (1 - probabilityB)
        }

        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
        };

        //update eloscores in db
        let companyA = this.state.company1
        companyA.company_eloscore = aScore;
        console.log(companyA)
        axios.post('http://localhost:4000/company/update/' + companyA._id,  companyA)
        .then(res => {
            console.log(res.data);
        })
        

        let companyB = this.state.company2
        companyB.company_eloscore = bScore;
        console.log(companyB)
        axios.post('http://localhost:4000/company/update/' + companyB._id, companyB) 
        .then((res) => {
            console.log(res.data);
        });
    }
    handleClick(d){
        //update elo scores
        this.eloScore(this.state.company1.company_eloscore, this.state.company2.company_eloscore, 1, d);

        //get new companies
        this.addCompanies(this.state.count);
    }

    render() {
      return (
          <div>
              <Button variant="outlined" color="secondary" onClick={(e) => this.handleClick(true, e)}><h2>{this.state.company1.company_name}</h2></Button>
              <Button variant="outlined" color="secondary" onClick={(e) => this.handleClick(false, e)}><h2>{this.state.company2.company_name}</h2></Button>
          </div>
      );
    }
}

export default Ranking