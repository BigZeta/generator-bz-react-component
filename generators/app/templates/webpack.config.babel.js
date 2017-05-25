export default (env) => {
    // Let's check if the --env has a serve string
    // this is one way we can activate devserve
    const serve = env.includes('serve')

    if (!serve) {
        return require('./config/' + env + '.js').default({ env: env })
    }

    env = env.split('-')[0]

    return require('./config/' + env + '.js').default({ env, serve })
}
