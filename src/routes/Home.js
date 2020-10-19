import React, { useState, useEffect } from "react";
import { dbService } from "fbase";
import Tweet from "../components/Tweet";
import TweetForm from "components/TweetForm"

const Home = ({ userObj }) => {
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
  
  return (
    <div>
      <TweetForm userObj={userObj} />
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