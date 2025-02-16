"use client";

import React from "react";

const ContentRenderer = ({ content }: { content: string }) => {
  const isHTML = (str: string) => /<\/?[a-z][\s\S]*>/i.test(str);

  return (
    <div>
      {isHTML(content) ? (
        <div dangerouslySetInnerHTML={{ __html: content }} />
      ) : (
        content
          .split("\n")
          .map((paragraph, index) => <p key={index}>{paragraph}</p>)
      )}
    </div>
  );
};

export default ContentRenderer;
