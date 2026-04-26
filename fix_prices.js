const fs = require('fs');
const files = [
  'src/pages/ProductDetail.tsx',
  'src/components/molecules/ProductItem.tsx',
  'src/pages/Cart.tsx',
  'src/pages/Checkout.tsx'
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/\$\{([^}]+)\.toFixed\(\d+\)\}/g, '{$1.toLocaleString("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 })}');
    fs.writeFileSync(file, content);
  }
});
console.log('Prices updated');
