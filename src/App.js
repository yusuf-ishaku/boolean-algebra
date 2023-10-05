import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { SinglePostPage } from './features/posts/SinglePostPage';
import { EditPostForm } from './features/posts/EditPostForm';

import { Navbar } from './app/Navbar';
import { PostList } from './features/posts/postList';
import { AddPostForm } from './features/posts/AddPostsForm';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <>
              <section>
                <h2>Welcome to the Redux Essentials example app!</h2>
              </section>
              <AddPostForm></AddPostForm>
              <PostList></PostList>
              </>
              
            )}
          />
          <Route
          exact
          path="/posts/:postId"
          component={SinglePostPage}/>
          <Route
          exact
          path="/editPost/:postId"
          component={EditPostForm}
          >

          </Route>
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default App
