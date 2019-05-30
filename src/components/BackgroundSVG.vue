<template>
  <div class="background_container">
    <div class="background_font_color" :style="{
      backgroundColor: backgroundColor
    }">
      <div v-for="(path, i) in paths" :key="'svg-' + i"
        class="background_elem"
        :style="{
          ...backgroundElemStyle(path)
        }"
      >
      </div>
    </div>
  </div>
</template>

<script>

const defaultColor = '#000'

export default {
  name: 'background-svg',
  props: {
    paths: {
      type: Array,
      required: true,
      validator: function (paths) {
        return (
          paths.reduce((acc, v, i) => acc && (typeof v === 'object' &&
            'link' in v && 'style' in v && typeof v.link ==='string' &&
            typeof v.style === 'object'
          ), true)
        )
      }
    },
  },
  data: () => ({
    backgroundColor: 'transparent',
    formattedPaths : []
  }),
  methods: {
    backgroundElemStyle (path) {
      return path.link !== ''
      ? {
        maskImage: `url(${path.link})`,
        maskSize: 'auto 100%',
        maskRepeat: 'repeat round',
        maskMode: 'alpha',
        ...path.style,
      }
      : path.style
    },
  },
  created () {
    if (this.paths.length && this.paths[0].link === '') {
      this.backgroundColor = this.paths[0].style.backgroundColor || defaultColor
      this.formattedPaths = this.paths.slice(1)
    }
  }
}
</script>

<style lang="scss" scoped>
.background_container {
  position: absolute;
  z-index: -10;
  top:0;
  left:0;
  bottom:0;
  right:0;
  display: flex;
  flex-direction: column;
  & > div {
    flex: 1;
    width: 100%;
  }
}
.background_font_color {
  position: relative;
  height: 100%;
  width: 100%;
}

.background_elem {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
