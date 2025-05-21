import { Observer } from "rxjs";

export const observatorAny: Observer<any> = {
    next(res) {
        console.log(res)
    },
    error(err) {
        console.error(err)
    }, 
    complete() {
        console.info("se logro")
    },
}