import React from 'react';
import { Link } from 'react-router-dom';

const checkGroup = (group, userGroups) => {
  let result = false;
  userGroups.forEach(myGroup => {
    if (myGroup.id === group.id) {
      result = true
    }
  })
  return result
}

const MyGroups = (props) => {
  return (
    <div className="MyGroups">
      {/* <h3>My Groups</h3> */}
      {props.currentUser && props.currentUser.groups.map(group => (
        <div className="myGroup">
          <div key={group.id}>
            <h3>{group.name}</h3>
            <p>{group.description}</p>
            <Link to={`/currentgroup/${group.id}`}><button>View Group</button></Link>
            {checkGroup(group, props.currentUser.myGroups)
              ?
              <button onClick={(e) => {
                e.preventDefault()
                props.handleDelete(group.id)
              }}>Delete</button>
              :
              <button name={group.id} onClick={props.handleGroupDelete}>Leave Group</button>
            }
          </div>
        </div>
      ))}
    </div>
  )
}


export default MyGroups
