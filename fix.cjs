const fs = require('fs');
const files = [
  'src/components/layout/AccountMenu.tsx',
  'src/components/layout/Footer.tsx',
  'src/components/layout/Navbar.tsx',
  'src/components/layout/RiskDigestModal.tsx',
  'src/context/AppContext.tsx',
  'src/pages/Dashboard.tsx',
  'src/pages/Documents.tsx',
  'src/pages/Landing.tsx',
  'src/pages/Library.tsx',
  'src/pages/SignIn.tsx',
  'src/pages/Workspace.tsx'
];

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  content = content.replace(/import React(?:,\s*\{\s*([^}]+)\s*\})?\s*from\s*'react';\n/g, (match, p1) => {
    return p1 ? `import { ${p1} } from 'react';\n` : '';
  });
  content = content.replace(/import React from 'react';\n/g, '');
  
  if (f.includes('Navbar.tsx')) {
    content = content.replace(/const { isAuthenticated } = useAppContext\(\);\n/, '');
  }
  if (f.includes('AppContext.tsx')) {
    content = content.replace(/import { createContext, useContext, useState, ReactNode }/g, 'import { createContext, useContext, useState } from \'react\';\nimport type { ReactNode }');
  }
  if (f.includes('Dashboard.tsx')) {
    content = content.replace(/BarChart, /g, '');
  }
  if (f.includes('SignIn.tsx')) {
    content = content.replace(/import { Pill } from '\.\.\/components\/ui\/Pill';\n/, '');
  }
  if (f.includes('Workspace.tsx')) {
    content = content.replace(/import { Stepper, Step }/g, 'import { Stepper } from \'../components/ui/Stepper\';\nimport type { Step }');
  }

  fs.writeFileSync(f, content);
});
console.log('Fixed imports');
