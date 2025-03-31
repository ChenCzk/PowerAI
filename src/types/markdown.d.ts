declare module 'markdown-it-katex';
declare module 'highlight.js' {
  export function highlight(str: string, options: { language: string }): { value: string };
  export function getLanguage(name: string): any;
} 