import React from 'react';

const checkGroup = (group, userGroups) => {
  let result = false;
  userGroups.forEach(myGroup => {
    if (myGroup.id === group.id) {
      result = true
    }
  })
  return result
}


const AllGroups = (props) => {
  return (
    <div className="AllGroups">
      {props.groups && props.currentUser && props.groups.filter(group => !checkGroup(group, props.currentUser.groups)).map(group => (
        <div className="aGroup" key={group.id}>
          <h3>{group.name}</h3>
          <p>{group.description}</p>
          {group.users[0].id !== props.currentUser.id && <button onClick={() => props.joinGroup(group)}>Join Group</button>}
        </div>
      ))}
    </div>
  )
}


export default AllGroups

