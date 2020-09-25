import React from 'react';
import { authService } from 'fbase';

const Profile = () => {
  const onSignOutClick = () => authService.signOut();
  return (
    <>
      <button onClick={onSignOutClick}>Sign out</button>
    </>
  )
};

export default Profile;