type Env = string;
function getEnv(env: string): Env {
    const _env = process.env[env];
    if(typeof _env != 'string'){
        throw new Error();
    }
    return `${process.env[env]}`;
}
export { Env,getEnv }