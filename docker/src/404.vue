<template>
  <div class="fallback-page">
    <div class="fallback-page-pad">
      <div class="title">{{ title }}</div>
      <div class="sub-title">{{ subTitle }}</div>
      <img v-if="subImage" :src="subImage" />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "Four04",
  metaInfo() {
    return {
      title: `${this.errorText} Error`,
      description: `Looks like you've hit a ${this.errorText} error.`,
      meta: [{ name: "robots", content: "noindex" }],
    }
  },
  computed: {
    errorText(this: any) {
      return this.$route.meta.error || 404
    },
    title(this: any) {
      return this.details.title
    },
    subTitle(this: any) {
      return this.details.subTitle
    },
    subImage(this: any) {
      return this.details.image
    },
    details(this: any) {
      let out

      if (this.$route.meta.error == 403) {
        out = {
          title: "403 Error",
          subTitle: "Hier gibt's nix für dich zu sehen",
          //image: require("./static/img/rick_roll.jpg"),
        }
      } else {
        out = {
          title: "404 Error",
          subTitle: "Never gonna give you up",
          //image: require("./static/img/rick_roll.jpg"),
        }
      }

      return out
    },
  },
  created() {
    if (process) {
      process.env.factorServerStatus = "404"
    }
  },
}
</script>

<style lang="less">
.fallback-page {
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .fallback-page-pad {
    max-width: 450px;
    margin: 0 auto;
    line-height: 1;
    text-align: center;
    padding: 1em;
  }
  .title {
    font-size: 3em;
  }
  .sub-title {
    font-size: 1.5em;
    opacity: 0.3;
    margin: 0.5em 0 1.5em;
  }
  .description {
    font-weight: 500;
    font-size: 1.2em;
    margin: 1em 0 2em;
  }
}
</style>
