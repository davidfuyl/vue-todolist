const MY_STORAGE_KEY = 'my-vue-todo-list';

export default {
    fetch () {
        return JSON.parse(window.localStorage.getItem(MY_STORAGE_KEY));
    },
    save (items) {
        window.localStorage.setItem(MY_STORAGE_KEY, JSON.stringify(items));
    }
}