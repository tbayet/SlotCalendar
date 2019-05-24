<template>
  <div class="background_container">
    <div class="background_elem" :style="{backgroundColor: color[0]}"></div>
    <div class="background_elem" :style="{backgroundColor: color[0]}">
      <svg
        v-for="i in 50"
        :key="i"
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 64 20'
        :fill="color[1]"
      >
        <path :d="(paths && paths.sky) || 'M0 20 L64 20 L64 0 C62 0 62 2 52 2 C48 4 42 4 38 2 C36 4 34 6 26 6 C14 4 18 0 0 0 Z'" />
      </svg>
    </div>
    <div class="background_elem" :style="{backgroundColor: color[1]}">
      <svg
        v-for="i in 50"
        :key="i"
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 64 20'
        :fill="color[2]"
      >
        <path :d="(paths && paths.city) || 'M0 10 L0 20 L64 20 L64 10 L62 10 L62 8 L60 8 L60 12 L58 12 L58 4 L56 4 L56 14 L52 12 L50 14 L50 8 L46 8 L46 16 L42 16 L42 14 L38 14 L38 8 L36 6 L36 14 L34 14 L34 8 L30 8 L26 14 L26 16 L22 16 L22 14 L20 12 L18 14 L18 18 L16 18 L16 4 L12 6 L12 12 L8 12 L8 0 L2 0 L2 10 Z'" />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'background-svg',
  props: {
    color: Array,
    paths: Object
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

.background_elem {
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  svg {
    height: 100%;
    width: auto;
  }
}
</style>
