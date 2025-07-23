import * as parser from '@babel/parser';
import { File } from '@babel/types';


export function parseJsCode(code:string): File | null{
    try{
        const ast = parser.parse(code,{
            sourceType:'module',
            plugins:['jsx','typescript']
        });
        return ast;

    }catch(error){
        console.error("Error parsing code:", error);
        return null;
    }
}
