# @<%= answers['module:scope'] %>/<%= answers['module:name'] %>

![Build Status](https://travis-ci.com/<%= answers['module:scope'] %>/<%= answers['module:name'] %>.svg?token=xspRNxj7F3F5Q6MhN88G&branch=master)

<%= answers['module:description'] %>

## Getting Started

Install it via npm:

```shell
npm install @<%= answers['module:scope']%>/<%= slug %>
```

And include in your project:

```javascript
var localvar = require('<%= slug %>');
import <%= libname %> from '<%= slug %>';
```

## License

<%= answers['module:license'] %>
