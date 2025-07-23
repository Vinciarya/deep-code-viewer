import {Node, CallExpression, MemberExpression, Identifier, callExpression} from '@babel/types'
import { Issue } from '../astWalker';

export const noConsoleLog = {
    CallExpression(node: Node, issues: Issue[]){
        if(node.type !== 'CallExpression'){
            return;
        }

         const callNode = node as CallExpression;
        const callee = callNode.callee;

        if(callee.type === 'MemberExpression'){
            const object = callee.object;
            const property = callee.property;


            if(object.type === 'Identifier' && object.name === 'console' && property.type === 'Identifier' && property.name === 'log'){
                issues.push({
                    type: 'Linting',
                    message: 'Avoid using Console.Log in production code',
                    loc:{
                        start: {line: node.loc?.start.line || 0, column: node.loc?.start.column || 0},
                        end: {line: node.loc?.end.line || 0, column:node.loc?.end.line || 0}
                    }

                });
            }
        }
    }
};