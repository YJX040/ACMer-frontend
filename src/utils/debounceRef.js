import { customRef } from "vue";

function debounceRef(value, delay = 500) {
    return customRef((track, trigger) => {
        let timeout;
        return {
            get() {
                track();
                return value;
            },
            set(_value) {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    trigger();
                    value = _value;
                }, delay);
            }
        }
    })
}

export default debounceRef;