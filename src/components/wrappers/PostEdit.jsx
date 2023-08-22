import propTypes from 'prop-types';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { getPost, updatePost, clearPost } from '../../store/blog';
import PostForm from '../visual/PostForm';
import Error from '../visual/Error';

const PostEdit = ({ match, history, user, authorized, postData, getPost, updatePost, clearPost, disabled }) => {
  const { slug } = match.params;
  useEffect(() => {
    getPost(slug);
    return clearPost;
  }, [slug]);
  if (
    JSON.stringify(user) !== '{}' &&
    JSON.stringify(postData) !== '{}' &&
    user.username !== postData.author.username
  ) {
    return <Error />;
  }

  const onFinish = (postData) => {
    if (postData.tagList.length === 1 && postData.tagList[0].length === 0) {
      postData.tagList = [];
    }
    updatePost({ ...postData, slug: slug });
    clearPost();
    history.push(`/articles/${slug}`);
  };

  if (!authorized) return <Redirect to="/sign-in" />;

  return <PostForm {...postData} isNew={false} onFinish={onFinish} disabled={disabled} />;
};
PostEdit.defaultProps = {
  match: {},
  history: [],
  authorized: false,
  postData: {},
  getPost: () => {},
  updatePost: () => {},
  clearPost: () => {},
  disabled: false,
};
PostEdit.propTypes = {
  match: propTypes.object,
  history: propTypes.object,
  authorized: propTypes.bool,
  postData: propTypes.object,
  getPost: propTypes.func,
  updatePost: propTypes.func,
  clearPost: propTypes.func,
  disabled: propTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    postData: state.currentPost,
    user: state.user,
    authorized: state.authorized,
    disabled: state.disabled,
  };
};

export default connect(mapStateToProps, { getPost, updatePost, clearPost })(PostEdit);
