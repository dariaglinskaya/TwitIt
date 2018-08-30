export default function square(arr)  {
    if(!Array.isArray(arr) || arr.includes(undefined)){
        throw new Error();
    } else {
        return arr.map((item) => Math.pow(item,2));
    }    
  }  