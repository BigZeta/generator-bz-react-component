# @<%= answers['module:scope'] %>/<%= answers['module:name'] %>

![Build Status](https://travis-ci.com/<%= answers['module:scope'] %>/<%= answers['module:name'] %>.svg?token=xspRNxj7F3F5Q6MhN88G&branch=master)

<%= answers['module:description'] %>

## Getting Started

Install it via npm:

```shell
npm install @<%= answers['module:scope']%>/<%= answers['module:name'] %>
```

And include in your project:

```javascript
var localvar = require('<%= answers['module:name'] %>');
import <%= answers['module:name'] %> from '<%= answers['module:name'] %>';
```

## License

<%= answers['module:license'] %>
