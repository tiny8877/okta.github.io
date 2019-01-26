# Okta VuePress Theme Playground

This theme is a work-in-progress update to Okta's developer docs layouts, components, and styles.

## Contributing
Contributions are welcome!

### Requirements
First, you'll need the site running locally. Start with the `okta.github.io` root readme.

### Dependencies
Okta's design system, [Nim](https://github.com/okta/okta-ui/tree/master/packages/nim) is imported as a foundation. Today, the theme does not use much of Nim – but it's included for future components and adoption.

This theme uses [stylelint](https://stylelint.io) for SCSS linting. A plugin is likely available for your favorite text editor! Linting rules (duplicated from Nim) are defined in `.stylelintrc`, and require standard configs to be installed. (Most files fail linting today, please clean as you go!)

These dependencies should automatically be installed by a root `yarn install`. If not:
- Open a Terminal in this package (`vuepress-theme-oktadev`)
- Run `yarn install`

## SCSS
- `styles/` is the source SCSS directory.
- `styles/okta.scss` is the root file that is compiled to CSS. Nim abstracts are available in any file imported here.
- `styles/legacy/` includes a lot of legacy CSS. Avoid using legacy styles, and remove legacy files when possible.
- `styles/okta/` contains SCSS currently in use. Some should be migrated to Vue components over time; all should adopt Nim over time.
- `styles/vendors/` contains original CSS styles from plugins and third-parties. 
- `styles/vendors-ext/` contains our extensions and customizations to third-party styles.

### Vue Components
Vue components, like `ApiOperation`, can include styles scoped to the component. To use abstracts in a scoped context, import the Nim files you need:
```
<style scoped lang="scss">
  @import '~@okta/nim/src/scss/abstracts/functions';
  @import '~@okta/nim/src/scss/abstracts/colors';
  span {
    color: cv('warning', 'base');
  }
</style>
```
