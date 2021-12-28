import ReactMarkdown from "react-markdown";

import PostHeader from "../post-header";

import classes from "./post-content.module.css";

function PostContent(props) {
  const {
    post: { slug, title, image, content },
  } = props;

  const imagePath = `/images/posts/${slug}/${image}`;

  return (
    <article className={classes.content}>
      <PostHeader title={title} image={imagePath} />
      <ReactMarkdown>{content}</ReactMarkdown>
    </article>
  );
}

export default PostContent;
