
import React from 'react';
import propTypes from 'prop-types';
import {fetchRepos} from '../utils/api'
import { FaUser, FaStar, FaCodeBranch, FaExclamationTriangle } from 'react-icons/fa'

function LangvageNav({selected, onUpdateLanguage}){
    const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'Css', 'Python'];
        return(
            <React.Fragment>
                <ul className="flex-center">
               {languages.map((language)=>(
                <li key={language}>
                  <button className='btn-clear nav-link'
                  style={language === selected?{color:'red'}:null}
                  onClick = {()=>onUpdateLanguage(language)}
                  >
                  {language}
                </button>
                </li>
                ))
               }
               </ul>
            </React.Fragment>
        );
}

LangvageNav.propTypes = {
    selected:propTypes.string.isRequired,
    onUpdateLanguage:propTypes.func.isRequired
}

function ReposGrid ({ repos }) {
    return (
      <ul className='grid space-around'>
        {repos.map((repo, index) => {
          const { name, owner, html_url, stargazers_count, forks, open_issues } = repo
          const { login, avatar_url } = owner
  
          return (
            <li key={html_url} className='repo bg-light'>
              <h4 className='header-lg center-text'>
                #{index + 1}
              </h4>
              <img
                className='avatar'
                src={avatar_url}
                alt={`Avatar for ${login}`}
              />
              <h2 className='center-text'>
                <a className='link' href={html_url}>{login}</a>
              </h2>
              <ul className='card-list'>
                <li>
                  <FaUser color='rgb(255, 191, 116)' size={22} />
                  <a href={`https://github.com/${login}`}>
                    {login}
                  </a>
                </li>
                <li>
                  <FaStar color='rgb(255, 215, 0)' size={22} />
                  {stargazers_count.toLocaleString()} stars
                </li>
                <li>
                  <FaCodeBranch color='rgb(129, 195, 245)' size={22} />
                  {forks.toLocaleString()} forks
                </li>
                <li>
                  <FaExclamationTriangle color='rgb(241, 138, 147)' size={22} />
                  {open_issues.toLocaleString()} open
                </li>
              </ul>
            </li>
          )
        })}
      </ul>
    )
  }

export default class Popular extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selectedLang :'All',
            repos:{},
            error:null,
        }
        this.updateLanguage = this.updateLanguage.bind(this);
        this.isLoading = this.isLoading.bind(this);
    }
    componentDidMount(){
        this.updateLanguage(this.state.selectedLang);
    }
    updateLanguage(selectedLang){
        this.setState({
            selectedLang,
            error:null,
        });

        if(!this.state.repos[selectedLang]){
            fetchRepos(selectedLang)
                .then((data)=>{
                    this.setState(({repos})=>({
                      repos:  {
                          ...repos,
                        [selectedLang]:data
                    }
                    }))
                })
                .catch(()=>{
                    console.warn("there was an error while fetching a repos");
                    this.setState({
                    error:"there was an a error"
                    })
             })
   
        }

    }
    isLoading() {
        const { selectedLang, repos, error} = this.state;
        return !repos[selectedLang] && error === null;
    } 
    render() {
        const {selectedLang, repos, error} = this.state;
        return(        
        <React.Fragment>
            <LangvageNav
              selected = {selectedLang}
              onUpdateLanguage = {this.updateLanguage}
              />

            {this.isLoading() && <p>loading</p>}

            {error && <p>{error}</p>}

            {repos[selectedLang] && <ReposGrid repos={repos[selectedLang]} />}
        </React.Fragment>
        )
        
    }
}