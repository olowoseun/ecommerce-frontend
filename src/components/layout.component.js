import React from 'react';
import Menu from './menu.component';

const Layout = ({ title = "Title", description = "Description", className, children}) => (
  <div>
    <Menu />
    <div className="jumbotron" style={{ borderRadius: '0px' }}>
      <h2>{ title }</h2>
      <p className="lead">{ description }</p>
    </div>
    <div className={ className }>
      { children }
    </div>
  </div>
);

export default Layout;