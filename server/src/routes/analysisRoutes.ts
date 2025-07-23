import {Router, Request, Response} from 'express';
import {parseJsCode} from '../parser/jsParser';
import * as parser from '@babel/parser';
import { buildSymbolTable } from '../symbolTable';
import { buildCallGraph } from '../callGraph';
import { walkAST, Issue } from '../analyzers/astWalker';
import { noConsoleLog } from '../analyzers/rules/noConsole';

const router = Router();

router.post('/analyze', (req, res)=>{
    const {code} = req.body;
    if(!code){
        return res.status(400).json({error: 'Code not provided'});
    }
    try{
        const ast = parser.parse(code,{
            sourceType: 'module',
            plugins: ['jsx', 'typescript'],

        });
        const symbolTable = buildSymbolTable(ast);
        const unusedSymbols = symbolTable.getUnusedsymbols();
        const issues = unusedSymbols.map(symbol=> ({
            type:'warning',
            message: `Unused symbol: '${symbol.name}' declared but never used.`,
            line: symbol.declaration.line,
            
        }));
        const callGraph = buildCallGraph(ast);
        return res.json({
            ast:ast,
            issues: issues,
            callGraph: callGraph,

        });

    
    }
    catch(error: any){
        return res.status(400).json({error: 'Failed to parse code', details: error.message});
    }
});
    
export default router;