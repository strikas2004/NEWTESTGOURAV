import { NextResponse } from 'next/server';
import OpenAI from 'openai';



// console.log("ENVE",process.env.OPENAI)
const openai = new OpenAI({
  apiKey: process.env.OPENAI
});

export async function POST(req) {
  try {
    const { text } = await req.json();
    console.log('Processing equation:', text);

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: 'system',
          content: `You are a mathematics solving assistant. Format your response in Markdown with the following structure:
          
          ### Step 1: [Step Description]
          [Explanation]
          \\[
          [Equation]
          \\]
          
          ### Step 2: [Step Description]
          [Explanation]
          \\[
          [Equation]
          \\]
          
          ### Final Answer
          \\[
          \\boxed{[Final Solution]}
          \\]`
        },
        {
          role: 'user',
          content: text,
        },
      ],
    
    });

    const content = response.choices[0].message.content;
    // const structuredResponse = parseMarkdownResponse(content);

    return NextResponse.json({
      success: true,
      data: content,
    });
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to analyze text',
        details: error instanceof Error ? error.message : 'Unknown error',
      }, 
      { status: 500 }
    );
  }
}



// function parseMarkdownResponse(markdown) {
//   const steps= [];
//   let solution = "";
  
//   // Split the markdown into lines
//   const lines = markdown.split('\n').filter(line => line.trim());
  
//   let currentStep= null;
  
//   for (const line of lines) {
//     // Match step headers (### Step 1: etc)
//     const stepMatch = line.match(/^###\s*Step\s*(\d+):\s*(.+)/i);
    
//     // Match solution (### Final Answer or similar)
//     const solutionMatch = line.match(/^###\s*Final\s*Answer/i);
    
//     if (stepMatch) {
//       // If we were building a previous step, save it
//       if (currentStep) {
//         steps.push(currentStep);
//       }
      
//       // Start a new step
//       currentStep = {
//         number: parseInt(stepMatch[1]),
//         content: stepMatch[2].trim(),
//         equation: ""
//       };
//     } else if (solutionMatch) {
//       // If we were building a step, save it before moving to solution
//       if (currentStep) {
//         steps.push(currentStep);
//         currentStep = null;
//       }
//       // We'll collect the solution in the next iterations
//     } else if (line.includes('\\[') || line.includes('\\]')) {
//       // This is an equation
//       const equation = line.replace('\\[', '').replace('\\]', '').trim();
//       if (currentStep) {
//         currentStep.equation = equation;
//       } else if (line.includes('\\boxed')) {
//         // This is likely the final solution
//         solution = equation;
//       }
//     } else if (currentStep) {
//       // Add to current step's content
//       currentStep.content += ' ' + line.trim();
//     }
//   }

//   // Don't forget to add the last step if we were building one
//   if (currentStep) {
//     steps.push(currentStep);
//   }

//   return {
//     steps,
//     solution: solution || "No solution provided"
//   };
// }

