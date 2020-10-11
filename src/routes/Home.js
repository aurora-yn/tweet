import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { dbService, storageService } from "fbase";
import Tweet from "../components/Tweet";

const Home = ({ userObj }) => {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);
  const [attachment, setAttachment] = useState();
  useEffect(() => {
    dbService.collection("tweets").onSnapshot((snapshot) => {
      const tweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTweets(tweetArray);
    });
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = "";
    if (attachment !== undefined) {
      const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }
    const tweetObj = {
      text: tweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    }
    console.log(tweetObj);
    await dbService.collection("tweets").add(tweetObj);
    setTweet("");
    setAttachment("");
  };
  const onChange = (event) => {
    const { 
      target: { value }, 
    } = event;
    setTweet(value);
  };
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      // console.log(finishedEvent);
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    }
    reader.readAsDataURL(theFile);
  };
  const onClearAttachmentClick = () => {setAttachment(null)}
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={tweet} onChange={onChange} type="text" maxLength={120} placeholder="What's on your mind?" />
        <input type="file" accept="image/*" onChange={onFileChange} />
        {attachment && (
          <div>
            <img src={attachment} alt="" width="50px" height="auto" />
            <button onClick={onClearAttachmentClick}>Clear</button>
          </div>
        )}
        <input type="submit" value="Submit" />
      </form>
      <div>
        {tweets.map((tweet) => (
          <Tweet 
            key={tweet.id} 
            tweetObj={tweet} 
            isOwner={tweet.creatorId === userObj.uid} 
          />
        ))}
      </div>
    </div>
  );
};

export default Home;