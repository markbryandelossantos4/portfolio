const fs = require('fs');

try {
    // 1. Update style.css
    let css = fs.readFileSync('style.css', 'utf8');

    // Update :root
    css = css.replace(/:root\s*\{[^}]+\}/, `:root {
    --bg-base: #2B213A;
    --text-primary: #FFFFFF;
    --text-secondary: #B8B2C1;
    
    --color-pink: #E1306C;
    --color-cyan: #00E5FF;
    
    --glass-bg: rgba(255, 255, 255, 0.05);
    --glass-border: rgba(255, 255, 255, 0.1);
    
    --brand-gradient: linear-gradient(135deg, var(--color-pink), var(--color-cyan));
    --secondary-gradient: linear-gradient(135deg, var(--color-cyan), var(--color-pink));
    --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}`);

    // Replace dark colors
    css = css.replace(/#000000|#0a0a0a|#141414/g, 'var(--bg-base)');
    css = css.replace(/rgba\(0,\s*0,\s*0,\s*(0\.[0-9]+)\)/g, 'rgba(43, 33, 58, $1)');
    css = css.replace(/rgba\(20,\s*20,\s*20,\s*(0\.[0-9]+)\)/g, 'rgba(43, 33, 58, $1)');

    // Replace pink/magenta
    css = css.replace(/#ff007a/gi, 'var(--color-pink)');
    css = css.replace(/rgba\(255,\s*0,\s*122/g, 'rgba(225, 48, 108'); // ~ #E1306C

    // Replace cyan
    css = css.replace(/#00f0ff/gi, 'var(--color-cyan)');

    // Replace text colors
    css = css.replace(/#ededed/gi, 'var(--text-primary)');

    // Replace old gradient glow colors
    css = css.replace(/rgba\(0,\s*112,\s*243/g, 'rgba(0, 229, 255'); // cyan
    css = css.replace(/rgba\(245,\s*166,\s*35/g, 'rgba(225, 48, 108'); // pink

    // Missing vars
    css = css.replace(/var\(--neon-blue\)/g, 'var(--color-cyan)');
    css = css.replace(/var\(--neon-pink\)/g, 'var(--color-pink)');

    fs.writeFileSync('style.css', css);

    // 2. Update index.html
    let html = fs.readFileSync('index.html', 'utf8');

    // Replace inline icon colors with alternating pink and cyan to fit the strict 3-color rule
    let isPink = true;
    html = html.replace(/style="color:\s*#[a-zA-Z0-9]+;"/g, (match) => {
        let replacement = isPink ? `style="color: var(--color-pink);"` : `style="color: var(--color-cyan);"`;
        isPink = !isPink;
        return replacement;
    });

    fs.writeFileSync('index.html', html);

    console.log("Theme successfully updated!");
} catch (e) {
    console.error("Error:", e);
}
