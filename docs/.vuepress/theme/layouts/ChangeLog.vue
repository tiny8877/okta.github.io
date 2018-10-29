<template>

  <div class="Page okta-api-products-change-log Page--docs-page">

    <TopNavigation/>

    <PromoBanner/>

    <section class="PageContent DynamicSidebar has-tableOfContents">
      <Sidebar/>

      <div class="PageContent-main" id="docs-body">
        <Content />
        <Content v-for="page in changelogPages" :key="page.key" :pageKey="page.key" :site="$site" :class="page.title"/>
      </div>

      <TableOfContents :pages="changelogPages" :pageTitle="$page.frontmatter.title"/>
    </section>

    <Footer/>

  </div>

</template>

<script>
import _ from "lodash"
export default {
  name: 'ChangeLog',
  computed: {
    changelogPages: function () {
      let pages = this.$site.pages
        .filter(pages => pages.path.startsWith("/change-log/2"))

      return _.orderBy(pages, 'path').reverse()
    }
  },
  data: function () {
    return {

    }
  }
}
</script>

<style src="../styles/okta.scss" lang="scss"></style>

