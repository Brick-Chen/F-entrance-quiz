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
      showInput: false,
      newStudent: '',
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

  handleAddStudent = () => {
    this.setState({
      showInput: true,
    });
  };

  handelInput = (event) => {
    this.setState({
      newStudent: event.target.value,
    });
  };

  handleSubmit = () => {
    http
      .post('/student', {
        id: null,
        name: this.state.newStudent,
      })
      .then(() => {
        alert('添加成功');
      })
      .catch((err) => {
        console.log(err);
      });
    this.setState({
      showInput: false,
      newStudent: '',
    });
    this.getAllStudents();
  };

  render() {
    return (
      <div data-testid="app" className="App">
        <div className="students-group">
          <div className="stu-group-header">
            <h2>分组列表</h2>
            <button type="button" className="group-student" onClick={this.getGroupStudents}>
              分组学员
            </button>
          </div>
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
        </div>
        <div className="student-list">
          <h2 className="stu-list-header">学员列表</h2>
          <div className="students">
            {this.state.students.map((student) => (
              <Student key={student.id} id={student.id} name={student.name} />
            ))}
          </div>
          {this.state.showInput ? (
            <form>
              <div className="new-stu-info">
                <label htmlFor="stu-name">
                  请输入学生姓名:
                  <input
                    type="text"
                    id="stu-name"
                    value={this.state.newStudent}
                    onChange={this.handelInput}
                  />
                </label>
              </div>
              <div>
                <button
                  type="submit"
                  className="submit-stu-info"
                  disabled={!this.state.newStudent}
                  onClick={this.handleSubmit}
                >
                  提交
                </button>
              </div>
            </form>
          ) : (
            <button type="button" className="add-student" onClick={this.handleAddStudent}>
              +添加学员
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default App;
