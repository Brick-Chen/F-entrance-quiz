import React, { Component } from 'react';
import './App.scss';
import http from '../http-client';
import Student from '../Components/Student';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
    };
  }

  componentDidMount() {
    this.getAllStudents();
  }

  getAllStudents = () => {
    http
      .get('/students')
      .then((res) => {
        this.setState({
          students: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div data-testid="app" className="App">
        <h2>分组列表</h2>
        <h2>学员列表</h2>
        <div className="students-list">
          {this.state.students.map((student) => (
            <Student key={student.id} id={student.id} name={student.name} />
          ))}
        </div>
        <button type="button" className="add-student">
          +添加学员
        </button>
      </div>
    );
  }
}

export default App;
