import {File, Node} from '@babel/types';

export interface Issue{
    type: string;
    message: string;
    loc:{
        start: {line: number; column: number;};
        end: {line:number; column: number;};
    };
}

type Visitor = {
    [key: string]: (node: Node, state?: any)=> void;
};

export function walkAST(node: Node, visitors: Visitor, state?:any){
    if(!node || typeof node !== 'object' || !node.type){
        return;
    }
    if(visitors[node.type]){
        visitors[node.type](node, state);
    }
    for(const key in node){
        if(node.hasOwnProperty(key)){
            const value = (node as any)[key];
            if(Array. isArray(value)){
                for(const item of value){
                    walkAST(item, visitors, state);
                }
            }else if(value && typeof value === 'object' && value.type){
                walkAST(value, visitors, state);
            }

            
        }
    }
}