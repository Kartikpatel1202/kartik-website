// Loaded asynchronously by <LazyMotion>: keeps Motion's animation engine out of the first-load JS.
// domMax (not domAnimation) because the nav's active pill uses layoutId.
import { domMax } from "motion/react";

export default domMax;
