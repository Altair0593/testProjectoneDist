 function checkOnlyNumbers(){
     this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
 checkValueLength(this, 3);
}

function checkValueLength(input, maxLength) {
     if(input.value.length >= maxLength)  {
         input.value = input.value.substr(0, maxLength);
     }
}

 export {checkOnlyNumbers, checkValueLength}

