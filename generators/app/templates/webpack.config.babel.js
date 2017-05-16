export default env => {
    return require('./config/' + env + '.js')({env: env})
}

