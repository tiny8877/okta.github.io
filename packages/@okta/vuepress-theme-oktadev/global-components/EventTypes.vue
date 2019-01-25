<template>
  <div class="event-types">
    <p>
    <input type="text" id="event-type-search" name="filter" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" placeholder="Search event types for..." v-model="search"/>
    </p>
    <div id="event-type-count">Found <b>{{resultCount}}</b> matches</div>
    <div class="event-type" v-for="eventType in filteredEventTypes" :key="eventType.id">
      <h4 :id="eventType.id | titleAsId" v-html="$options.filters.title(eventType.id)"></h4>

      <div class="event-type-mappings" v-if="eventType.mappings.length > 0">
        <b>Legacy event types: </b> {{ eventType.mappings.join(', ') }}
      </div>

      <p class="event-type-description" v-if="eventType.description">{{ eventType.description}}</p>
      <p class="event-type-description" v-else>No Description</p>

      <div class="event-type-tags">
        <code class="event-type-tag" v-for="tag in eventType.tags" :key="tag">{{ tag }}</code>
      </div>
      <div class="event-type-release">
        Since: <a href="/docs/change-log/">{{ eventType.info.release }}</a>
      </div>
    </div>
  </div>
</template>

<script>
  import eventTypes from './../../vuepress-site/data/event-types.json'
  export default {
    created() {
      this.eventTypes = eventTypes.versions[1].eventTypes
    },
    data() {
      return {
        search: '',
        eventTypes: null
      }
    },
    computed: {
      filteredEventTypes:function()
      {
        if( this.search == '' ) {
          return this.eventTypes
        }

        return this.eventTypes.filter((eventType) => {
          console.log(this.search.toLowerCase())
          return eventType.id.toLowerCase().indexOf(this.search.toLowerCase())>=0
        });


      },

      resultCount: function() {
        return  this.filteredEventTypes.length
      }
    },
    filters: {
      title: function (value) {
        const parts = value.split('.')
        let res = "<b>" + parts[0] + "</b>."
        parts.shift()
        return res + parts.join('.')
      },
      titleAsId: function (value) {
        return value.replace(/[\s_.]/g, '');
      }
    }
  }
</script>

<style scoped lang="scss">
  .event-types {
    .PageContent-main {
      padding-right: 0 !important;
    }

    #event-type-search {
      width: 100%;
      border: 2px solid #d2d2d6;
    }
    #event-type-search::placeholder {
      color: #d2d2d6;
    }
    #event-type-count {
      font-size: 0.9em;
      color: #888;
      margin-left: 0.3em;
      margin-top: -1em;
    }

    .event-type {
      h4 {
        margin: 25px 0 0 0 !important;
        color: #007dc1 !important;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        clear: left;
        border-left: 3px solid #007dc1;
        padding: 6px 10px;    
      }
      h4:before {
        content: "\f0a2";
        font-family: fontawesome;
        margin-right: 8px;
      }
      
      .event-type-mappings {
        margin: -1em 0 !important;
        color: #888 !important;
        font-size: 0.9em;
        padding: 10px 15px;    
      }
      .event-type-description {
        margin-top: 10px !important;
        margin-bottom: 5px !important;
      }
      .event-type-tag:before {
        content: "\f02b";
        padding: 2px 4px;
        font-family: fontawesome;
      }
      .event-type-tag {
        font-size: 0.7em;
        display: block;
        float: left;
        background-color: white;
        border-radius: 3px;
        padding: 1px 3px 1px 3px;
        margin: 2px;
      }
      .event-type-release {
        clear: both;
        font-size: 0.8em;
        opacity: 0.7;
      }
    }
  }
</style>
