const API_URL = 'http://localhost:5000/api';
 export interface AnalysisResult{
    ast: any;
    issues: any[];
    callGraph: Record<string, string[]>;

 }
 export const analyzeCode = async (code: string): Promise<AnalysisResult> =>{
    const response = await fetch(`${API_URL}/analyze`,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json' },
            body: JSON.stringify({code}),
        });
        if(!response.ok){
            const errorData = await response.json();
            throw new Error(errorData.details || 'Failed to analyze code');
        }
        return response.json();

        };
        
        
        