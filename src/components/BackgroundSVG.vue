<template>
  <div class="background_container">
    <div class="background_font_color">
      <div v-for="(path, i) in paths" :key="'svg-' + i"
        class="background_elem"
        :style="{
          backgroundColor: color[i],
          maskImage: `url(${path})`
        }"
      >
      {{logi()}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'background-svg',
  props: {
    color: Array,
    paths: Array
  },
  methods: {
    logi () {
      // console.log(this.paths)
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
  background-color: green;
}

.background_elem {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  mask-size: auto 100%;
  mask-repeat: repeat-x;
  mask-mode: alpha;
}
</style>
