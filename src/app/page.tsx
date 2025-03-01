"use client";
import { useState } from "react";

const HomePage = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  // Function to remove Markdown formatting
  const removeMarkdown = (text: string) => {
    // Remove headings (# Heading)
    let cleanText = text.replace(/^#+\s+/gm, "");

    // Remove bold/italic formatting (* and _)
    cleanText = cleanText.replace(/(\*\*|__)(.*?)\1/g, "$2"); // Bold
    cleanText = cleanText.replace(/(\*|_)(.*?)\1/g, "$2"); // Italic

    // Remove code blocks and inline code
    cleanText = cleanText.replace(/```[\s\S]*?```/g, ""); // Code blocks
    cleanText = cleanText.replace(/`([^`]+)`/g, "$1"); // Inline code

    // Remove links [text](url)
    cleanText = cleanText.replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1");

    // Remove images ![alt](url)
    cleanText = cleanText.replace(/!\[([^\]]+)\]\([^\)]+\)/g, "");

    // Remove horizontal rules
    cleanText = cleanText.replace(/^\s*[-*_]{3,}\s*$/gm, "");

    // Remove blockquotes
    cleanText = cleanText.replace(/^\s*>\s+/gm, "");

    // Remove list markers
    cleanText = cleanText.replace(/^\s*[-*+]\s+/gm, "");
    cleanText = cleanText.replace(/^\s*\d+\.\s+/gm, "");

    // Remove strikethrough
    cleanText = cleanText.replace(/~~(.*?)~~/g, "$1");

    // Remove excessive line breaks
    cleanText = cleanText.replace(/\n{3,}/g, "\n\n");

    return cleanText;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  const handleCleanText = () => {
    const cleaned = removeMarkdown(inputText);
    setOutputText(cleaned);
  };

  const handleCopy = () => {
    if (outputText) {
      navigator.clipboard.writeText(outputText);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const handleClear = () => {
    setInputText("");
    setOutputText("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-3">
            Text Decoration Remover
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Clean your text by removing markdown formatting like{" "}
            <span className="font-mono bg-gray-100 px-1 rounded">*</span>,
            <span className="font-mono bg-gray-100 px-1 rounded">_</span>,
            <span className="font-mono bg-gray-100 px-1 rounded">#</span> and
            other symbols
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Input Panel */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:shadow-xl">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-4">
              <h2 className="text-white font-medium text-lg">Input Text</h2>
              <p className="text-indigo-100 text-sm">
                Paste your markdown-formatted text below
              </p>
            </div>
            <div className="p-6">
              <textarea
                className="w-full h-64 p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 resize-none"
                placeholder="Paste your text with markdown here...

For example:
# Heading
**Bold text**
_Italic text_
[Link](https://example.com)
- List item"
                value={inputText}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Output Panel */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:shadow-xl">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-4 flex justify-between items-center">
              <div>
                <h2 className="text-white font-medium text-lg">Cleaned Text</h2>
                <p className="text-indigo-100 text-sm">
                  Your text without markdown formatting
                </p>
              </div>
              {outputText && (
                <button
                  onClick={handleCopy}
                  className={`text-sm px-3 py-1 rounded-full transition-all ${
                    isCopied
                      ? "bg-green-500 text-white"
                      : "bg-white text-indigo-600 hover:bg-indigo-100"
                  }`}
                >
                  {isCopied ? "Copied!" : "Copy"}
                </button>
              )}
            </div>
            <div className="p-6">
              <textarea
                className="w-full h-64 p-4 rounded-lg bg-gray-50 border border-gray-200 text-gray-700 resize-none focus:outline-none"
                value={outputText}
                readOnly
                placeholder="Cleaned text will appear here..."
              />
            </div>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={handleCleanText}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-full hover:shadow-lg transform transition-all hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Clean Text
          </button>
          <button
            onClick={handleClear}
            className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 font-medium rounded-full hover:shadow hover:bg-gray-50 transform transition-all focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            Clear All
          </button>
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-indigo-600 mb-6 text-center">
            Formatting Removed
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-indigo-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <div className="w-10 h-10 flex items-center justify-center bg-indigo-500 text-white rounded-full mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-indigo-700">Headers</h3>
              </div>
              <p className="text-sm text-gray-600">
                Removes # heading1, ## heading2, etc.
              </p>
            </div>

            <div className="bg-indigo-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <div className="w-10 h-10 flex items-center justify-center bg-indigo-500 text-white rounded-full mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-indigo-700">Styling</h3>
              </div>
              <p className="text-sm text-gray-600">
                Removes **bold**, _italic_ and ~~strikethrough~~
              </p>
            </div>

            <div className="bg-indigo-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <div className="w-10 h-10 flex items-center justify-center bg-indigo-500 text-white rounded-full mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-indigo-700">Links</h3>
              </div>
              <p className="text-sm text-gray-600">
                Removes [link text](url) but keeps the text
              </p>
            </div>

            <div className="bg-indigo-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <div className="w-10 h-10 flex items-center justify-center bg-indigo-500 text-white rounded-full mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 10h16M4 14h16M4 18h16"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-indigo-700">Lists</h3>
              </div>
              <p className="text-sm text-gray-600">
                Removes - bullets and 1. numbered lists
              </p>
            </div>

            <div className="bg-indigo-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <div className="w-10 h-10 flex items-center justify-center bg-indigo-500 text-white rounded-full mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-indigo-700">Blockquotes</h3>
              </div>
              <p className="text-sm text-gray-600">
                Removes {">"} quote formatting
              </p>
            </div>

            <div className="bg-indigo-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <div className="w-10 h-10 flex items-center justify-center bg-indigo-500 text-white rounded-full mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-indigo-700">Code</h3>
              </div>
              <p className="text-sm text-gray-600">
                Removes `inline code` and code blocks
              </p>
            </div>

            <div className="bg-indigo-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <div className="w-10 h-10 flex items-center justify-center bg-indigo-500 text-white rounded-full mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-indigo-700">Images</h3>
              </div>
              <p className="text-sm text-gray-600">
                Removes ![alt text](image url)
              </p>
            </div>

            <div className="bg-indigo-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <div className="w-10 h-10 flex items-center justify-center bg-indigo-500 text-white rounded-full mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-indigo-700">Other</h3>
              </div>
              <p className="text-sm text-gray-600">
                Removes horizontal rules, excessive line breaks, etc.
              </p>
            </div>
          </div>
        </div>

        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>
            Text Decoration Remover - A simple tool to clean your markdown text
          </p>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;
