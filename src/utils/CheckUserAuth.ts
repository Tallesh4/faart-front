export const check = (dispatchTo: string) => {

    const a = document.createElement('a');

    if (!localStorage.getItem("user")) {
        a.href = "login";
    } else if(dispatchTo){
        a.href = dispatchTo
    }

    a.dispatchEvent(new MouseEvent('click'));

}