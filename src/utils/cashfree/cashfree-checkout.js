import {load} from '@cashfreepayments/cashfree-js';

const cashfree = await load({
    mode: "sandbox" // or "production"
});

export default cashfree;