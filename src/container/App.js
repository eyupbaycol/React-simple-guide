import React, { Component } from 'react';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import classes from './App.css';
import withClass from '../hoc/withClass';
import Aux from '../hoc/Auxiliary';
import AuthContext from '../context/auth-context';

class App extends Component {
  constructor(props) {
    super(props);
    console.log('[App.js] constructor')

  }
  state = {
    persons: [
      { id: 'asfa1', name: 'Max', age: 28 },
      { id: 'vasdsad', name: 'Manu', age: 29 },
      { id: 'asdsd2', name: 'Stephanie', age: 26 }
    ],
    showPersons: false,
    showCocpit: true,
    changeCounter: 0,
    authenticated : false
  }

  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] getDerivedStateFromProps', props)
    return (state)
  }
  componentDidMount() {
    console.log('[App.js] componentDidMount')
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log('[App.js] shouldComponentUpdate')
    return true
  }
  componentWillUpdate() {
    console.log('[App.js] componentDidUpdate')
  }
  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons]
    persons.splice(personIndex, 1);
    this.setState({ persons })
  }
  nameChangeHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    })
    const person = {
      ...this.state.persons[personIndex]
    };

    // const person = Object.assign({}, this.state.persons[personIndex]) alternatif
    person.name = event.target.value
    const persons = [...this.state.persons];
    persons[personIndex] = person
    this.setState((prevState, props)=>{ 
      return { 
        persons: persons, 
        changeCounter: prevState.changeCounter +1
      } 
    })
  }
  togglePersonHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow })
  }
   loginHandler = () => {
      this.setState({authenticated: true})
   }
  render() {
    console.log('[App.js] render')
    let persons = null;
    if (this.state.showPersons) {
      persons = (
        <div>
          <Persons
            persons={this.state.persons}
            clicked={this.deletePersonHandler}
            changed={this.nameChangeHandler}
            isAuthenticated = {this.state.authenticated}
          />
        </div>
      )

    }
    return (
      <Aux>
        <button onClick={() => {
          this.setState({ showCocpit: false })
        }}>Remove Cockpit</button>
        <AuthContext.Provider value={{authenticated: this.state.authenticated, login : this.loginHandler}}>
        {this.state.showCocpit ? 
        <Cockpit
          title={this.props.appTitle}
          showPersons={this.state.showPersons}
          personsLength={this.state.persons.length}
          togglePersonHandler={this.togglePersonHandler}
        /> : null}
        {persons}
        </AuthContext.Provider>
      </Aux>
    );
  }
}

export default withClass(App, classes.App)



