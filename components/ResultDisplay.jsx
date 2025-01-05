'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SolutionDisplay({ result }) {
  if (!result) return null;

  console.log("RESULT ", result);

  // Process and clean the result
  const formattedSteps = result
    ?.split("\n") // Split the result into lines
    ?.map((line) => {
      if (!line) return null;

      // Clean and format each line
      return line
        ?.replace(/^###\s*/, "") // Remove "###"
        ?.replace(/\\\[/g, "") // Remove "\["
        ?.replace(/\\\]/g, "") // Remove "\]"
        ?.replace(/\\\(/g, "") // Remove "\("
        ?.replace(/\\\)/g, "") // Remove "\)"
        ?.replace(/\\frac{([^}]+)}{([^}]+)}/g, "$1/$2") // Convert LaTeX fractions to inline fractions
        ?.replace(/\\boxed{([^}]+)}/g, "Answer: $1") // Replace \boxed{} with Answer:
        ?.trim();
    })
    ?.filter((line) => line && line.match(/[a-zA-Z0-9]/)); // Filter out empty or irrelevant lines

  return (
    <Card className="w-full max-w-2xl bg-gradient-to-br from-slate-900 to-slate-800">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-slate-50">
          Solution Steps
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {formattedSteps.map((step, index) => {
          // Check if the line is marked as an answer
          const isAnswer = step.startsWith("Answer:");
          return (
            <div
              key={index}
              className={`text-lg ${
                isAnswer ? "text-green-400 font-bold" : "text-slate-200"
              }`}
            >
              {isAnswer ? (
                <span>{step}</span>
              ) : (
                <>
                  <strong>Step {index + 1}:</strong> {step}
                </>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
