import React, { useState } from 'react';
import { authService } from 'fbase';
import { useHistory } from 'react-router-dom';

const Profile = ({ userObj, updateUser }) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const onSignOutClick = () => {
    authService.signOut();
    history.push("/");
  };
  // const getMyTweets = async () => {
  //   const tweets = await dbService.collection("tweets")
  //     .where("creatorId", "==", userObj.uid)
  //     .orderBy("createAt")
  //     .get();
  // };
  // useEffect(() => {
  //   getMyTweets();
  // }, []);
  
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({ displayName: newDisplayName })
    };
    updateUser();
  }
  return (
    <>
      <form onSubmit={onSubmit}>
        <input 
          input={newDisplayName}
          onChange={onChange} 
          type="text" 
          placeholder="Display Name"
        />
        <input type="submit" value="Update" />
      </form>
      <button onClick={onSignOutClick}>Sign out</button>
    </>
  )
};

export default Profile;