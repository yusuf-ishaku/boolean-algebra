import React from 'react'
import {Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotifications, selectAllNotifications } from '../features/notifications/notificationsSlice';
export const Navbar = () => {
  const dispatch = useDispatch();
  const fetchNewNotifications = () =>{
    dispatch(fetchNotifications());
  }
  const notifications = useSelector(selectAllNotifications);
  const numUnReadNotifications = notifications.filter(n => !n.read).length;

  let unreadNotificationsBadge;
  if(numUnReadNotifications > 0){
    unreadNotificationsBadge = (
      <span className='badge'>{numUnReadNotifications}</span>
    )
  }
  return (
    <nav>
      <section>
        <h1>Redux Essentials Example</h1>

        <div className="navContent">
          <div className="navLinks">
            <Link to="/">Posts</Link>
            <Link to="/users">Users</Link>
            <Link to="/notifications">Notifications{unreadNotificationsBadge}</Link>
          </div>
          <button className="button" onClick={fetchNewNotifications}>
            Refresh Notifications
          </button>
        </div>
      </section>
    </nav>
  )
}
