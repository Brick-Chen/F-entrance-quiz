import React, { Component } from 'react';
import './student.scss';

class Student extends Component {
  render() {
    return (
      <div className="student">
        <p>
          {this.props.id}. {this.props.name}
        </p>
      </div>
    );
  }
}

export default Student;
