export const capitalize = (str: string) =>{
    if(str){
        let string = str?.toLowerCase().trim()
        string = string[0].toUpperCase() + string.slice(1);
        return string;
    }
}