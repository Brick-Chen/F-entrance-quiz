import React, { Component } from 'react';

class Student extends Component {
  render() {
    return (
      <div className="student">
        {this.props.id}. {this.props.name}
      </div>
    );
  }
}

export default Student;
