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
    // TODO GTB-完成度: - 应该同时请求分组和学员列表，不然每次刷新页面后，没办法显示分组
    this.getAllStudents();
  }

  getAllStudents = () => {
    // TODO GTB-工程实践: * 建议进一步把数据请求按照业务提取到单独的service
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
          group: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // TODO GTB-完成度: * 分组逻辑应该在后端实现，然后再返回到前端

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
      // TODO GTB-知识点: * div嵌套过深
      // TODO GTB-知识点: * 没有使用语义标签
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
                <div className="group">
                  <div className="group-title">{index + 1} 组</div>
                  <div className="group-member">
                    {item.map((student) => (
                      <Student key={student.id} id={student.id} name={student.name} />
                    ))}
                  </div>
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
