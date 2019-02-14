<template>
  <div class="page-content">
    <section class="Docs">
      <div class="Wrap">
        <div class="Docs-container">
          <div class="Docs-content">
            <h1 class="docs-title Hero-title">Documentation</h1>
            <div class="docs-languages">
              <h2>Languages &amp; SDKs</h2>
              <p>Code and resources for your platform</p>
              <div class="docs-page-tiles">
                <a
                  v-for="(lang, i) in $page.frontmatter.languages"
                  :key="i"
                  :href="lang.link"
                >
                  <i class="icon docsPage" :class="lang.icon"></i>
                  <br />
                  {{lang.name}}
                </a>
              </div>
            </div>
            <br/>
            <div class="Row">
              <GetStartedLinkGroup v-for="(section, i) in $page.frontmatter.sections" :key="i" :section=section></GetStartedLinkGroup>
            </div>
            <div class="docs-changelog">
              <a href="/docs/change-log/">
                <i class="icon time-alt-16"></i>API Products Change Log
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="docs-elsewhere">
      <div class="Wrap">
        <div class="Row">
          <div class="docs-elsewhere-block Column--6 Column--small-12">
            <img :src="'/assets/img/icons/icon--docs-forum.svg'">
            <h4>We&rsquo;re Here to Help</h4>
            <p>Get help from Okta engineers and community developers in our forum.</p>
            <a href="https://devforum.okta.com/">Go to Developer Forum</a>
          </div>
          <div class="docs-elsewhere-block Column--6 Column--small-12">
            <img :src="'/assets/img/icons/icon--docs-users.svg'">
            <h4>Bring Your App to Okta Customers</h4>
            <p>Learn how to integrate Okta SSO and make your apps available to millions of enterprise users.</p>
            <a href="https://www.okta.com/integrate/">Go to okta.com/integrate</a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  components: {
    GetStartedLinkGroup: () => import('./GetStartedLinkGroup.vue')
  }
}
</script>

