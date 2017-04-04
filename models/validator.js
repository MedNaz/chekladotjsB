/**
 * Created by kissi on 22/03/17.
 */
function isValid (id) {
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        return true}
    else{
        return false}
}

function  paramIsValid(array) {

    if(array.length===1){
        var callback =array[0]
        return(callback==='function')
    }
    else
        return false
}
function params2AreValid (array) {
    if(array.length===2){
        var id=array[0];
        var callback=array[1];

        return(isValid(id)&& typeof callback === 'function')

    }
    else
        return false;

}


function params3AreValid (array) {
    if(array.length===3){
        var id=array[0];
        var fields=array[1];
        var callback=array[2];

        return(isValid(id)&& typeof fields ==='object' && typeof callback === 'function')

    }
    else
        return false

}
function params3IdAreValid (array) {
    if(array.length===3){
        var id=array[0];
        var fields=array[1];
        var callback=array[2];

        return(isValid(id)&& isValid(fields) && typeof callback === 'function')

    }
    else
        return false

}
module.exports={
    IdisValid:isValid,
    paramIsValid:paramIsValid,
    params2AreValid:params2AreValid,
    params3AreValid:params3AreValid,
    params3IdAreValid:params3IdAreValid


}