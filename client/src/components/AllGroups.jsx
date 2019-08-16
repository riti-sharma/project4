import React from 'react';

const AllGroups = (props) => {
  return (
    <div className="AllGroups">
      {props.groups && props.groups.map(group => (
        <div className="aGroup" key={group.id}>
          <h3>{group.name}</h3>
          <p>{group.description}</p>
          {group.users[0].id !== props.currentUser.id && <button onClick={() => props.joinGroup(group)}>Join Group</button>}
          {group.users[0].id === props.currentUser.id && <button>Delete</button>}


        </div>
      ))}
    </div>
  )
}


export default AllGroups

