import React, { Component } from 'react';
import './App.scss';
import http from '../http-client';
import Student from '../Components/Student';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      group: [],
      showGroup: false,
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

  getGroupStudents = () => {
    http
      .get('/group-students')
      .then((res) => {
        this.setState({
          showGroup: true,
          group: this.GroupStudents(res.data),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  GroupStudents = (data) => {
    const num = parseInt(data.length / 6, 10);
    const remain = data.length % 6;
    const groupStu = [];
    for (let i = 0; i < num * 6; i += num) {
      groupStu.push(data.slice(i, i + num));
    }
    for (let j = 0; j < remain; j += 1) {
      groupStu[j].push(data[6 * num + j]);
    }
    return groupStu;
  };

  render() {
    return (
      <div data-testid="app" className="App">
        <h2>分组列表</h2>
        <button type="button" className="group-student" onClick={this.getGroupStudents}>
          分组学员
        </button>
        {this.state.showGroup ? (
          <div>
            {this.state.group.map((item, index) => (
              <div>
                <div>第{index + 1}组</div>
                {item.map((student) => (
                  <Student key={student.id} id={student.id} name={student.name} />
                ))}
              </div>
            ))}
          </div>
        ) : (
          ''
        )}
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
