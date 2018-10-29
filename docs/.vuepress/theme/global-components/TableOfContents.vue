<template>
    <div class="TableOfContents" style="bottom: 0px; top: 100px;">
      <div class="TableOfContents-item is-level1">
        {{title}}
      </div>
      <div v-for="page in pages" :key="page.title">
        <a
          v-for="header in page.headers"
          :href="'#'+header.title"
          :class="'TableOfContents-item is-level'+header.level"
          :style="'display:block;'">
          {{header.title}}
        </a>

      </div>
    </div>
</template>

<script>
  export default {
    props: ['pageTitle', 'pages'],

    data: function () {
      return {
        title: this.pageTitle.split('|')[0].trim(),
        currentSection
      }
    }
  }
</script>
