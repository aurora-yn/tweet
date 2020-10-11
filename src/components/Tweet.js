import React, { useState } from "react";
import { dbService, storageService } from "fbase";

const Tweet = ({ tweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(tweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure to delete this?");
    if (ok) {
      await dbService.doc(`tweets/${tweetObj.id}`).delete();
      if (tweetObj.attachmentUrl !== "") {
        await storageService.refFromURL(tweetObj.attachmentUrl).delete();
      }
    }
  };
  const toggleEditing = () => setEditing(prev => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`tweets/${tweetObj.id}`).update({
      text: newTweet,
    });
    setEditing(false);
  };
  const onChange = (event) => {
    const { target: {value} } = event;
    setNewTweet(value);
  };
  return (
    <div>
      {
        editing ? (
          <>
            {isOwner && (
              <>
                <form onSubmit={onSubmit}> 
                  <input 
                    type="text" 
                    value={newTweet}
                    onChange={onChange}
                    required 
                  />
                  <input type="submit" value="Submit" />
                </form>
                <button onClick={toggleEditing}>Cancel</button>
              </>
            )}
          </>
        ) : (
          <>
            <h4>{tweetObj.text}</h4>
            {tweetObj.attachmentUrl && <img src={tweetObj.attachmentUrl} alt={""} width="50px" />}
            {isOwner && (
              <>
                <button onClick={onDeleteClick}>Delete</button>
                <button onClick={toggleEditing}>Edit</button>
              </>
            )}
          </>
        )
      }
    </div>
  )
};

export default Tweet;

