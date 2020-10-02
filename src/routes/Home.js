import React, { useState, useEffect } from "react";
import { dbService } from "fbase";
import Tweet from "../components/Tweet";

const Home = ({ userObj }) => {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);
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
    await dbService.collection("tweets").add({
      text: tweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    setTweet("");
  };
  const onChange = (event) => {
    const { target: {value} } = event;
    setTweet(value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={tweet} onChange={onChange} type="text" maxLength={120} placeholder="What's on your mind?" />
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