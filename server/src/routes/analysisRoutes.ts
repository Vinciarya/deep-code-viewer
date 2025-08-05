
import { Router } from 'express';
import * as parser from '@babel/parser';
import { Linter } from 'eslint';
import { buildCallGraph } from '../callGraph';

const router = Router();
const linter = new Linter();

router.post('/analyze', (req, res) => {
    const { code } = req.body;
    if (!code) {
        return res.status(400).json({ error: 'Code not provided' });
    }

    let ast;
    try {
        ast = parser.parse(code, { 
            sourceType: 'module', 
            plugins: ['jsx', 'typescript'],
        });
    } catch (error: any) {
        return res.status(400).json({ 
            issues: [{ 
                type: 'Error', 
                message: `Syntax Error: ${error.reasonCode || error.message}`, 
                line: error.loc?.line || 0 
            }] 
        });
    }
    
   
    const lintingMessages = linter.verify(code, {
        
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module'
        },
        rules: {
            'no-undef': 'error',
            'no-unreachable': 'error',
            'no-unused-vars': 'warn',
        }
    });

    const issues = lintingMessages.map(msg => ({
        type: msg.severity === 2 ? 'Error' : 'Warning',
        message: msg.message,
        line: msg.line,
    }));

    const callGraph = buildCallGraph(ast);

    return res.json({
        ast: ast,
        issues: issues,
        callGraph: callGraph
    });
});

export default router;