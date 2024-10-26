import {load} from '@cashfreepayments/cashfree-js';


const cashfree = load({
    mode: "sandbox" // or "production"
});

export default cashfree;