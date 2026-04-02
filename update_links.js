const fs = require('fs');

const path = 'c:\\xampp\\htdocs\\EXPLORE\\index.html';
let content = fs.readFileSync(path, 'utf8');

// Regex to capture: <a href="#" [class declarations]><i [icon data]></i>[District Name]</a>
const regex = /<a href="#"([^>]*?)><i([^>]*?)><\/i>([^<]+)<\/a>/g;

let matchesCount = 0;
content = content.replace(regex, (match, classAttr, iconAttr, townNameRaw) => {
    matchesCount++;
    const name = townNameRaw.trim();
    // Using simple replacements for correct linking
    return `<a href="districts.html?name=${encodeURIComponent(name)}"${classAttr}><i${iconAttr}></i>${name}</a>`;
});

fs.writeFileSync(path, content, 'utf8');
console.log(`Update complete. Replaced ${matchesCount} links.`);
