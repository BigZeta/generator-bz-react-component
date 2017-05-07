import React from 'react';
import './static/scss/<%= slug %>.scss';


export default React.createClass({
  render: function() {
    return <div className="<%= slug %>">Hello World</div>;
  }
});
