export function authGuard(from, to, next) {
    if (localStorage.getItem('CURRENT_USER')) {
        next()
    } else {
        next({
            name: 'login'
        })
    }
}