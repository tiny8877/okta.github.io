<template>
    <div class="page-content">
        <section class="Docs">
            <div class="Hero Hero--docs u-Justify u-alignCenter">
                <h1 class="Docs-title Hero-title">Get started in minutes</h1>
                <p class="Docs-subtitle Hero-subtitle">Add authentication, authorization, and user management to your apps and APIs.</p>
                <div id="docs-languages">
                    <div id="docs-page-titles">
                        <a
                                v-for="(lang, i) in $themeConfig.getStarted.languages"
                                :key="i"
                                :href="lang.link"
                        >
                            <i class="icon docsPage" :class="lang.icon"></i>
                            <br />
                            {{lang.name}}
                        </a>
                    </div>
                </div>
            </div>
            <div class="Wrap">
                <div class="Docs-container">
                    <div class="Docs-content">
                        <br/>
                        <GetStartedLinkGroup v-for="(section, i) in $themeConfig.getStarted.sections" :key="i" :section=section></GetStartedLinkGroup>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import GetStartedLinkGroup from '../components/GetStartedLinkGroup.vue'
  export default {
    components: {GetStartedLinkGroup}
  }
</script>

<style src="../styles/okta.scss" lang="scss"></style>
<!--<style src="../styles/master.css"></style>-->
