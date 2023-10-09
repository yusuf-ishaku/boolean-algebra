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
import { UsersList } from "./features/users/UsersList.js";
import { UserPage } from "./features/users/UserPage.js";
import { NotificationsList } from './features/notifications/NotificationsList';

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
          <Route exact path="/users" component={UsersList}/>
          <Route exact path="/users/:userId" component={UserPage} />
          <Route exact path="/notifications" component={NotificationsList} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default App
