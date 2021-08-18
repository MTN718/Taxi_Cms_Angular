const less = require('less');
const LessPluginCleanCSS = require('less-plugin-clean-css');
const fs = require('fs');
const darkThemeVars = require('ng-zorro-antd/dark-theme');
const appStyles = `src/theme.less`;
const themeContent = `@import '${appStyles}';`

less.render(themeContent, {
  javascriptEnabled: true,
  plugins: [new LessPluginCleanCSS({ advanced: true })],
  modifyVars: {
    'hack': `true;@import "${require.resolve('ng-zorro-antd/style/color/colorPalette.less')}";`,
    ...darkThemeVars
  }
}).then(data => {
  fs.writeFileSync(
    'src/theme.dark.css',
    data.css
  )
}).catch(x => {
    console.log(x);
});