import React from 'react'

export default function CurrentGroup(props) {
  return (
    <div className="currentGroup">

      <div className="grouptitle">
        <h3>{props.currentGroup.name}</h3>
        <p>{props.currentGroup.description}</p>
      </div>

      <form >
        <p>Title</p>
        <input
          name="title"
          type="text"
        />
        <p>Message</p>
        <input
          name="message"
          type="text"
        />
        <button>Add a post</button>
      </form>
    </div>
  )
}
