import React, { Component } from 'react';
// import { Router, Route, IndexRoute, hashHistory, browserHistory } from 'react-router';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { render } from 'react-dom';

import AppCmpt from '../App.jsx';
import homeCmpt from './views/home.jsx';
import userCmpt from './views/user.jsx';
import loginCmpt from './views/login.jsx';
import IndexnavCmpt from './mixin/nav.jsx';

import { getCookie } from '@/utils/client';
// import jQuery from 'jquery';
import config from 'config/config';

require('@/assets/sass/base.scss');
require('@/assets/sass/index.scss');

// global.jQuery = global.$ = jQuery;
// const historyModel = config.end === 'cs' ? hashHistory : browserHistory;

class Index extends React.Component {
  // constructor (props) {
  //   super(props);
  // }
  // 1.创建阶段( getDefaultProps )
  // getDefaultProps() {
  //   console.log("getDefaultProps");
  //   return {};
  // }
  // 2.实例化阶段
  // getInitialState() {
  //   console.log("getInitialState");
  //   return {};
  // }

  // render之前调用，业务逻辑都应该放在这里，如对state的操作等
  componentWillMount () {
    console.log('init');
  }
  // 渲染并返回一个虚拟DOM
  render () {
    return (
      <div className="index-wrap">
        <IndexnavCmpt />
        {this.props.children}
      </div>
    );
  }
};

// 权限判断
const requireAuth = (nextState, replace) => {
  if (config.end !== 'cs' && !getCookie('session')) {
    replace({ pathname: '/login' });
  }
};

const routers = (
  <Router>
    <AppCmpt>
      <Route exact path="/" component={ homeCmpt } onEnter={ requireAuth }/>
      <Route exact path="/login" component={ loginCmpt }/>
      <Route exact path="/redux" component={ userCmpt }/>
    </AppCmpt>
  </Router>
);

render(
  routers,
  document.getElementById('page_index')
);
