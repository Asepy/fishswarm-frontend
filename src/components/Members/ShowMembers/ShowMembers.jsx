import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './index.css';

class ProductCategoryRow extends React.Component {
    render() {
      const id = this.props.id;
      return (
        <tr>
          <th colSpan="3">
            {id}
          </th>
        </tr>
      );
    }
  }
  
  class ProductRow extends React.Component {
    render() {
      const member = this.props.members;
      const name = member.membership ?
        member.name :
        <span style={{color: 'red'}}>
          {member.name}
        </span>;
      const membership = member.membership ?
        <span style={{color: 'blue'}}>
          Normal
        </span> :
          <span style={{color: 'red'}}>
            Plus
          </span>;
      return (
        <tr>
          <td scope="row">{member.id}</td>
          <td>{name}</td>
          <td>{membership}</td>
        </tr>
      );
    }
  }
  
  class TableOfMembers extends React.Component
  {
    render() {
      const rows = [];
      let lastId = null;
      
      this.props.members.forEach((members) => {
        if (members.id !== lastId) {
          rows.push(
            <ProductCategoryRow
              category={members.id}
              key={members.id} />
          );
        }
        rows.push(
          <ProductRow
            members={members}
            key={members.name} />
        );
        lastId = members.id;
      });
  
      return (
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Membership</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      );
    }
  }
  class ShowMembers extends React.Component {
    render() {
      return (
        <div>
          <TableOfMembers members={this.props.members}/>
        </div>
      );
    }
  }
  
  const MEMBERS = [
    {id: '1', name: 'Tobias Tach',  membership: true},
    {id: '2', name: 'Hugo Lemon', membership: false},
    {id: '3', name: 'Pam Berry',  membership: false},
    {id: '4', name: 'Dani Cricco',  membership: true}  
  ];