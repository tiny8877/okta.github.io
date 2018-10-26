<template>

  <div class="Page okta-api-products-change-log Page--docs-page">

    <TopNavigation/>

    <PromoBanner/>

    <section class="PageContent DynamicSidebar has-tableOfContents">
      <Sidebar/>

      <div class="PageContent-main" id="docs-body">
        <Content />
        <Content v-for="page in changelogPages" :key="page.key" :pageKey="page.key" :site="site"/>
      </div>

      <div class="TableOfContents" style="bottom: 0px; top: 100px;"></div>
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
      site: {
        contact_support_lc: '<a href="https://support.okta.com/help/open_case?_ga=2.35087137.18686933.1540307948-1734068328.1494253825" target="_blank">Support</a>'
      }
    }
  }
}
</script>

<style src="../styles/okta.scss" lang="scss"></style>

