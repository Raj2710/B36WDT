export const validate = ()=>{
    if(window.sessionStorage.getItem('token') && window.sessionStorage.getItem('role'))
    {
        return true
    }
    else
    {
        return false
    }
}