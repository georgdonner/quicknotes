import React from 'react';

const UserTags = props => props.users.length > 0 ? (
  <div style={{ margin: '1rem 0' }}>
    {props.users.map(user => (
      <span className="tag" key={user._id}>
        {user.username}
        <button
          className="delete"
          onClick={() => props.onDelete(user)}
        />
      </span>
    ))}
  </div>
) : null;

export default UserTags;
