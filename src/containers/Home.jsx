import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Body from "../components/Body";
import Footer from "../components/Footer";
import axios from "axios";

const Home = () => {
  const [step, setStep] = useState(1);
  const [posts, setPosts] = useState([]);
  const [image, setImage] = useState("");
  const [filter, setFilter] = useState("");
  const handleGoHome = () => setStep(1);
  const handleNext = () => setStep(step + 1);
  const handleShare = () => {
    const post = {
      username: "ngm",
      postImage: image,
      filter: filter
    };
    savePost(post);
    setStep(1);
    setTimeout(() => getPosts());
  };
  const handleUploadImage = ev => {
    const files = ev.target.files;
    if (files.lenght) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = ev => {
        setImage(ev.target.result);
        setStep(2);
      };
    }
  };

  const getPosts = async () => {
    const res = await axios.get("http://localhost:3000/api/posts");
    setPosts(res.data);
  };
  useEffect(() => {
    getPosts();
  }, []);

  // const savePost = async post => {
  //   const config = {
  //     url: ""
  //   };
  // };

  return (
    <>
      <Header
        step={step}
        handleShare={handleShare}
        handleGoHome={handleGoHome}
        handleNext={handleNext}
      />
      <Body step={step} posts={posts} image={image} setFilter={setFilter} />
      <Footer
        step={step}
        handleGoHome={handleGoHome}
        handleUploadImage={handleUploadImage}
      />
    </>
  );
};

export default Home;
