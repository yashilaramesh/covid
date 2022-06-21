// @ts-nocheck
import { useSelector } from 'react-redux';
import { page, lastPage } from 'api/post';

import Post from './Post';
import PrevPageButton from '../PrevPageButton';
import NextPageButton from '../NextPageButton';

const Posts = () => {
  const posts = useSelector((state) => state.posts);
  if (posts.length > 0) {
    return (
      <div className="flex flex-row overflow-auto" id="Posts">
        {page > 0 ? <PrevPageButton /> : ''}

        {posts.map((post) => (
          <Post data={post} key={post.url} />
        ))}

        {!lastPage ? <NextPageButton /> : ''}
      </div>
    );
  } else {
    return (
      <div className="grid place-items-center" id="NoResults">
        <p class="bold text-lg">No results found.</p>
      </div>
    );
  }
};

export default Posts;
