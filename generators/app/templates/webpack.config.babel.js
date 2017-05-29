export default (env, options) => {
    return require('./config/' + env + '.js').default({ env, options })
}
