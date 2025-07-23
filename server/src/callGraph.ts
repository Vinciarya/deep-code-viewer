
import { Node } from '@babel/types';
import traverse, { NodePath } from '@babel/traverse';


export type CallGraph = Record<string, string[]>;

function getFunctionName(path: NodePath): string | null {
  const parent = path.parent;
  if (path.isFunctionDeclaration()) {
    return path.node.id?.name || null;
  }
  if (path.isFunctionExpression() || path.isArrowFunctionExpression()) {
    if (parent.type === 'VariableDeclarator' && parent.id.type === 'Identifier') {
      return parent.id.name;
    }
  }
  return null; 
}

export function buildCallGraph(ast: Node): CallGraph {
  const callGraph: CallGraph = {};

  traverse(ast, {
   
    Function(path) {
      const callerName = getFunctionName(path);

      if (!callerName) {
        return;
      }

      if (!callGraph[callerName]) {
        callGraph[callerName] = [];
      }

      path.get('body').traverse({
        CallExpression(callPath) {
         
          if (callPath.node.callee.type === 'Identifier') {
            const calleeName = callPath.node.callee.name;
           
            if (!callGraph[callerName].includes(calleeName)) {
              callGraph[callerName].push(calleeName);
            }
          }
        }
      });
      
      path.skip();
    }
  });

  return callGraph;
}