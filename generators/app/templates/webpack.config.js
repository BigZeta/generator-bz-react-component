
module.exports = env => {
    console.log(env);
    return require('./config/' + env + '.js')({env: env})
}

