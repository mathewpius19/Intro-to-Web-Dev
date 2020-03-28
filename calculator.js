let runningTotal=0;
let buffer="0";
let previousOperator;
const screen=document.querySelector('.screen');

document.querySelector(".calc-buttons").addEventListener("click",function(event){

    buttonClick(event.target.innerText);//returns the inner text i.e.the number or symbol on button as value
});

function buttonClick(value){
    if(isNaN(parseInt(value))){//if its not a number
        handleSymbol(value);
    }
    else{
        handleNumber(value);
    }
    rerender();

}
function handleSymbol(value){
    switch(value){
        case "C":
            buffer="0";
            runningTotal=0;
            break;
    
    case '=':
        if(previousOperator===null){
            return
        }
        flusOperation(parseInt(buffer));
        previousOperator=null;
        buffer=""+runningTotal;//running total is stored in the buffer and used for next operation
        runningTotal=0;
        break;
        
        case '←':
            if(buffer.length===1){
            buffer="0";
            }
            else{
                buffer=buffer.substring(0,buffer.length-1)//reduces the length by 1 everytime you press it
            }
            break;
        default:
            handleMath(value);
            break;
}
}

function handleMath(value){
    const intBuffer=parseInt(buffer);//buffer value is converted from string to integer and then stored in intBuffer
    if(runningTotal===0){
        runningTotal=intBuffer;
    }
    else{
        flusOperation(intBuffer);
    }
    previousOperator=value;
    buffer="0";//after a symbol is pressed buffer becomes 0 to store the next value to operate upon 5+6 buffer stores 6
}
function flusOperation(intBuffer){
    if(previousOperator==="+"){
        runningTotal+=intBuffer;
    }
    else if(previousOperator==="-"){
        runningTotal-=intBuffer;
    }
    else if(previousOperator==="÷"){
        runningTotal/=intBuffer;
    }
    else{
        runningTotal*=intBuffer;
    }
}
function handleNumber(value){
    if(buffer==="0"){
        buffer=value;
    }
    else{
        buffer+=value;
    }
}

function rerender()
{
    screen.innerText=buffer;//the text on the screen is stored inside buffer everytime a button is clicked
}