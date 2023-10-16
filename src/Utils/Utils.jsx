import { Link, List, ListItem, ListItemText, Table, TableBody, TableCell, TableHead, TableRow, styled, TableFooter } from '@mui/material';
import { domToReact } from 'html-react-parser';

// Function to replace characters like "-" with " " from a string and capitalize it
export const capitalizePhrase = (str) => {
  if (!str) return;
  const words = str.split(/[\s-]+/);
  const capitalizedWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
  const capitalizedString = capitalizedWords.join(' ');
  return capitalizedString;
};

const htmlOrderedListTypeToMUIListStyle = {
  1: 'decimal',
  '01': 'decimal-leading-zero',
  a: 'lower-alpha',
  A: 'upper-alpha',
  i: 'lower-roman',
  I: 'upper-roman',
  square: 'square',
  circle: 'circle',
  disc: 'disc'
};

const StyleListItem = styled(ListItem)(() => ({
  '::marker': {
    fontSize: '0.9rem'
  },
  display: 'list-item',
  paddingBottom: '0.125rem',
  paddingTop: 0,
  paddingLeft: '0.25rem'
}));

export const replacePlainHTMLWithMuiComponents = (node) => {
  if (node.type !== 'tag') return undefined;

  const options = {
    replace: replacePlainHTMLWithMuiComponents
  };
  const parseChildren = (children) => children.map((child) => domToReact([child], options));

  switch (node.name) {
    case 'a': {
      return (
        <Link
          href={node.attribs.href}
          target="_blank"
          rel="noopener noreferrer"
          underline="hover"
        >
          {parseChildren(node.children)}
        </Link>
      );
    }

    case 'ul': {
      return (
        <List dense sx={{ listStyleType: htmlOrderedListTypeToMUIListStyle.disc, paddingLeft: 4, paddingTop: '6px' }}>
          {parseChildren(node.children)}
        </List>
      );
    }

    case 'ol': {
      return (
        <List dense sx={{ listStyleType: htmlOrderedListTypeToMUIListStyle[node.attribs.type], paddingLeft: 4, paddingTop: '6px' }}>
          {parseChildren(node.children)}
        </List>
      );
    }

    case 'li': {
      return (
        <StyleListItem>
          <ListItemText primary={parseChildren(node.children)} />
        </StyleListItem>
      );
    }

    case 'table': {
      const thead = node.children.find((child) => child.name === 'thead');
      const tbody = node.children.find((child) => child.name === 'tbody');
      const tfoot = node.children.find((child) => child.name === 'tfoot');

      const headerCells = thead ? thead.children.find((child) => child.name === 'tr').children.filter((child) => child.name === 'th') : [];
      const rows = tbody ? tbody.children.filter((child) => child.name === 'tr') : [];
      const footerCells = tfoot ? tfoot.children.find((child) => child.name === 'tr').children.filter((child) => child.name === 'td') : [];

      return (
        <Table size="small" sx={{ mt: 1, width: 'fit-content' }}>
          <TableHead>
            <TableRow>
              {headerCells.map((child, index) => (
                <TableCell key={`headerCell-${index}`}>{domToReact(child.children)}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, rowIndex) => (
              <TableRow key={`row-${rowIndex}`}>
                {row.children.filter((child) => child.name === 'td').map((cell, cellIndex) => (
                  <TableCell key={`cell-${rowIndex}-${cellIndex}`}>{domToReact(cell.children)}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            {footerCells.map((child, index) => (
              <TableCell key={`footerCell-${index}`}>{domToReact(child.children)}</TableCell>
            ))}
          </TableFooter>
        </Table>
      );
    }

    default: {
      return undefined;
    }
  }
};
