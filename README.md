# Text Decoration Remover

A web application that cleans text by removing Markdown formatting and special decorations. Built with Next.js and Tailwind CSS.

![Demo](public/favicon.svg) <!-- Add actual screenshot later -->

## Features

- Removes various Markdown formatting including:
  - Headers (`#`, `##`, etc.)
  - Bold/Italic (`**text**`, `_text_`)
  - Strikethrough (`~~text~~`)
  - Code blocks (`` `code` ``) and inline code (`code`)
  - Links (`[text](url)`) and images (`![alt](url)`)
  - Lists (`- item` or `1. item`)
  - Blockquotes (`> text`)
- Clean and intuitive UI with:
  - Input/output text areas
  - Copy to clipboard functionality
  - Clear all button
  - Responsive design
- Detailed formatting removal explanations
- Dark/light mode support

## Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/remove-text-decoration.git
```

2. Install dependencies

```bash
cd remove-text-decoration
bun install
```

3. Run the development server

```bash
bun run dev
```

## Usage

1. Paste your formatted text in the input area
2. Click "Clean Text" to remove decorations
3. Copy the cleaned text using the copy button
4. Use "Clear All" to reset both fields

## How It Works

The application uses regular expressions to identify and remove Markdown formatting patterns while preserving the raw text content. Key processing steps include:

- Removing heading markers
- Stripping bold/italic/strikethrough syntax
- Eliminating code blocks and inline code markers
- Extracting link text from markdown links
- Cleaning list indicators and blockquotes

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [TypeScript](https://www.typescriptlang.org/) - Type checking
- [ESLint](https://eslint.org/) - Code linting

## License

MIT License - see [LICENSE](LICENSE) for details

```

This README includes:
1. Project title and brief description
2. Key features list
3. Installation instructions
4. Usage guide
5. Technical implementation details
6. Technology stack
7. License information

You might want to:
1. Add actual screenshots of your interface
2. Customize the license file
3. Add deployment instructions if hosted
4. Include contribution guidelines if open source
5. Add links to live demo if available
```
