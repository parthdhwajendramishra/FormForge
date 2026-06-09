import { Box } from '@mui/material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodePreviewProps {
  code: string;
}

export const CodePreview = ({ code }: CodePreviewProps) => (
  <Box
    sx={{
      height: '100%',
      overflow: 'auto',
      borderRadius: 1,
      border: '1px solid',
      borderColor: 'divider',
      '& pre': { margin: '0 !important' },
    }}
  >
    <SyntaxHighlighter
      language="tsx"
      style={oneDark}
      showLineNumbers
      wrapLongLines
      customStyle={{
        margin: 0,
        padding: '16px',
        fontSize: '0.75rem',
        lineHeight: 1.6,
        minHeight: '100%',
        background: '#1e1e1e',
      }}
      lineNumberStyle={{
        minWidth: '2.5em',
        paddingRight: '1em',
        color: '#6e7681',
        userSelect: 'none',
      }}
    >
      {code}
    </SyntaxHighlighter>
  </Box>
);
