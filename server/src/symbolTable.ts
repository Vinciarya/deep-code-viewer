import {Node} from '@babel/types';
import traverse from '@babel/traverse';
import * as babel from '@babel/traverse';

export interface SymbolInfo{
    name:string;
    declaration:{
        line: number;
        column: number;
    };
    
    reference: number;
}

export class SymbolTable{
    private symbols: Map<string, SymbolInfo> = new Map();

    add(name:string, node: Node){
        if(!this.symbols.has(name)){
            this.symbols.set(name,{
                name:name,
                declaration:{
                    line: node.loc?.start.line || 0,
                    column: node.loc?.start.column || 0,
                
                },
                reference: 0,
            });
    }
}

 use(name:string){
    if(this.symbols.has(name)){
        const symbol = this.symbols.get(name)!;
        symbol.reference++;
    
       
    }
 }

 getUnusedsymbols(): SymbolInfo[]{
    const unused = [];
    for(const symbol of this.symbols.values()){
        if(symbol.reference === 0){
            unused.push(symbol);
        }
    }
    return unused;

 }

}

export function buildSymbolTable(ast:Node): SymbolTable{
    const symbolTable = new SymbolTable();
    traverse(ast,{
        VariableDeclarator(path){
            if(path.node.id.type === 'Identifier'){
                symbolTable.add(path.node.id.name, path.node);

            }
        },
        FunctionDeclaration(path){
            if(path.node.id){
                symbolTable.add(path.node.id.name, path.node);
            }
           
        },


        Identifier(path){
            if(path.isReferenced()){
                symbolTable.use(path.node.name);
            }
            
        }

    });
    return symbolTable
}
