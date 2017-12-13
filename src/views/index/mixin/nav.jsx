import React, { Component } from 'react';
import { Link, IndexLink } from 'react-router';
import { getCookie, signOut } from 'tools/client';

class nav extends Component {
  signOut () {
    signOut();
    window.location.href = '/';
  }
  render () {
    const LoginButton = !getCookie('session') ? (<Link className="nav-item nav-login" to="/login">login</Link>) : (<Link className="nav-item nav-login" onClick={ this.signOut }>sign out</Link>);
    return (
      <nav className="nav-index">
        <IndexLink className="nav-item" activeClassName="active" to="/">home</IndexLink>
        <Link className="nav-item" activeClassName="active" to="/redux">user</Link>
        { LoginButton }
      </nav>
    );
  }
};

export default nav;
