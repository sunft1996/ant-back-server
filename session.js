// 用于存取session
module.exports = {
    storage: {},
    get(key, maxAge, { rolling }) {
        return this.storage[key]
    },
    set(key, sess, maxAge, { rolling, changed }) {
        this.storage[key] = sess;
    },
    destroy(key) {
        delete this.storage[key];
    }
}
