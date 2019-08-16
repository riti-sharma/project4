import React from 'react';
import { Link } from 'react-router-dom';

const MyGroups = (props) => {

  return (
    <div className="MyGroups">
      {props.currentUser && props.currentUser.groups.map(group => (
        <div className="myGroup">
          <div key={group.id}>
            <h3>{group.name}</h3>
            <p>{group.description}</p>
            <button name={group.id} onClick={props.handleGroupDelete}>Leave Group</button>
            <Link to={`/currentgroup/${group.id}`}><button>View Group</button></Link>
          </div>
        </div>
      ))}
    </div>
  )
}


export default MyGroups
