import React from 'react'

const Home = (props) => {
  return (
    <div className="homeForm">
      <h3>Create a new study group</h3>
      <form onSubmit={props.newGroup}>
        <p>Subject:</p>
        <input
          name="name"
          type="text"
          value={props.groupForm.subject}
          onChange={props.handleGroupFormChange}
        />
        <p>Description:</p>
        <input
          name="description"
          type="text"
          value={props.groupForm.description}
          onChange={props.handleGroupFormChange}
        />
        <button>+ Add Study Group</button>
      </form>
    </div>
  )
}

export default Home
