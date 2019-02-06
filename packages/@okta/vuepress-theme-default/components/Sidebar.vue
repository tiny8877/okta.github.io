<template>

  <aside class="Sidebar">

    <h2 class="Sidebar-location Sidebar-toggle h6">Navigation</h2>
    <div class="Sidebar-close Sidebar-toggle"></div>
    <div>
      <div v-for="section in navigation" :key="section.title" class="Sidebar-group">
        <h3 class="Sidebar-title">{{section.title | capitalize}}</h3>
        <ul class="Sidebar-nav">
          <li v-for="link in section.links" :key="link.title" :class="{'is-active': $page.path === link.path}">
            <a :href="link.link">{{link.title}}</a>
            <CategoryLinks category="authentication" :showExcerpt="false" id="Sidebar_References" v-if="link.link.includes('/docs/api/resources/oidc/') && $page.path.includes('/docs/api/resources/oidc/')"/>
            <CategoryLinks linkPrefix="/docs/api/getting_started" :showExcerpt="false" id="Sidebar_GettingStarted" v-if="link.link.includes('/docs/api/getting_started') && $page.path.includes('/docs/api/getting_started/')"/>
            <CategoryLinks category="management" where_exp="deprecated" sort="title" :showExcerpt="false" id="Sidebar_Resources" v-if="link.link.includes('/docs/api/resources') && !link.link.includes('/docs/api/resources/oidc') && !$page.path.includes('/docs/api/resources/oidc/') && $page.path.includes('/docs/api/resources')"/>
          </li>
        </ul>
      </div>
    </div>

  </aside>

</template>

<script>
  export default {
    name: 'Sidebar',
    computed: {
      resourceLinks() {
        let nav = [];
        this.$site.pages
          .filter(page => page.path.includes('/api/resources/'))
          .filter(page => !page.path.includes('.html'))
          .forEach(function (page) {
            nav.push({
              "title": page.frontmatter.title,
              "link": page.path
            })
          });
        return nav

      },

      navigation() {
        if (this.$page.path.includes('/code/')) {
          let nav = {};
          this.$site.pages
            .filter(page => page.path.includes('/code/'))
            .filter(page => !page.path.includes('.html'))
            .forEach(function (page) {
              let type = page.frontmatter.integration;
              if ( !nav.hasOwnProperty(type) ) {
                nav[type] = { "title": type, "links": [] };
              }
              nav[type]["links"].push({
                "title": page.frontmatter.language,
                "link": page.path
              })
            });
          return nav
        }
        return this.$site.pages
          .filter(pages => pages.path.startsWith( "/documentation/"))[0]
          .frontmatter.sections
      }
    },
    filters: {
      capitalize: function (value) {
        if (!value) return ''
        value = value.toString()
        return value.charAt(0).toUpperCase() + value.slice(1)
      }
    }
  }
</script>

<style src="../styles/okta.scss" lang="scss"></style>
<style scoped>
  .Sidebar-group {
    margin: 0 0 60px
  }
</style>
