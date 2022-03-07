import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost, getPosts } from "../../actions/post.actions";
import { isEmpty } from "../Utils";

const PostContainer = () => {
  const [postContent, setPostContent] = useState("");
  const [postImage, setPostImage] = useState(null);
  const [postVideo, setPostVideo] = useState("");
  const [file, setFile] = useState();
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const postValidationError = document.querySelector(".postvalidation.error");

  const handleImage = (e) => {
    setPostImage(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
    setPostVideo("");
  };

  const handlePost = async (e) => {
    e.preventDefault();
    if (postContent || postImage || postVideo) {
      const data = new FormData();
      data.append("post_author", userData.id_user);
      data.append("post_content", postContent);
      data.append("post_video", postVideo);
      if (file) {
        data.append("post_image", file);
        if (
          file.type !== "image/jpg" &&
          file.type !== "image/png" &&
          file.type !== "image/jpeg"
        ) {
          postValidationError.innerHTML =
            "Format Invalide, format compatible : .jpg, .jpeg, ou .png";
        } else if (file.size > 1000000) {
          postValidationError.innerHTML =
            "Ficher trop volumineux, veuillez choisir un fichier d'une taille inférieure a 1 Mo";
        } else {
          postValidationError.innerHTML = "";
          await dispatch(addPost(data));
          dispatch(getPosts());
          cancelPost();
        }
      } else {
        dispatch(addPost(data));
        dispatch(getPosts());
        cancelPost();
      }
      // await dispatch(addPost(data)).then((res) => {
      //   if (res.message) {
      //     if (res.message.includes("format")) {
      //       return (postValidationError.innerHTML = res.message);
      //     } else if (res.message.includes("taille")) {
      //       return (postValidationError.innerHTML = res.message);
      //     }
      //   } else {
      //     postValidationError.innerHTML = "";
      //     dispatch(getPosts());
      //     cancelPost();
      //   }
      // });
    } else {
      alert("pas de contenu");
    }
  };

  const cancelPost = () => {
    setPostContent("");
    setPostImage("");
    setPostVideo("");
    setFile("");
    postValidationError.innerHTML = "";
  };

  useEffect(() => {
    const handleVideo = () => {
      let findLink = postContent.split(" ");
      for (let i = 0; i < findLink.length; i++) {
        if (findLink[i].includes("https://www.yout")) {
          let embed = findLink[i].replace("watch?v=", "embed/");
          setPostVideo(embed.split("&")[0]);
          findLink.splice(i, 1);
          setPostContent(findLink.join(" "));
          setPostImage("");
        } else if (findLink[i].includes("https://yout")) {
          let nameVid = findLink[i].split(".be/")[1];
          setPostVideo("https://www.youtube.com/embed/" + nameVid);
          findLink.splice(i, 1);
          setPostContent(findLink.join(" "));
          setPostImage("");
        }
      }
    };
    handleVideo();
  }, [postContent, postVideo]);

  return (
    <div className="post-container">
      <div className="user-part">
        <div className="user-pic">
          <img src={userData.user_picture} alt="user-pic" />
        </div>
        <h3>{userData.user_name}</h3>
      </div>
      <div className="form-part">
        <textarea
          name="postContent"
          id="postContent"
          placeholder="Message"
          onChange={(e) => setPostContent(e.target.value)}
          value={postContent}
        />
      </div>
      <div className="check-part">
        <p>{postContent}</p>
        {postImage && <img src={postImage} alt="post-pic" />}
        {postVideo && (
          <iframe
            src={postVideo}
            title={postVideo}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
      </div>
      <div className="file-part">
        <div className="file-input">
          {isEmpty(postVideo) && (
            <input
              type="file"
              id="file-image"
              name="file"
              accept=".jpg, .jpeg, .png"
              onChange={(e) => handleImage(e)}
            />
          )}
          {postVideo && (
            <button onClick={() => setPostVideo("")}>Suppr vid</button>
          )}
          <div className="send-part">
            {postContent || postImage || postVideo > 10 ? (
              <button className="cancel" onClick={cancelPost}>
                Annuler
              </button>
            ) : null}
            <button className="send" onClick={handlePost}>
              Envoyer
            </button>
            <div className="postvalidation error"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostContainer;
