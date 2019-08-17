import React from "react";

interface Props {
  feedback: string;
}

export function AccessibilityFeedback({ feedback }: Props) {
  return (
    <div className="vh" role="status">
      {feedback}
    </div>
  );
}
