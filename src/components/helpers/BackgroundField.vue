<template>
  <div>
    <svg id="field" v-if="screenWidth > 750">
      <!-- Sidelines -->
      <line :x1=sw*5 :y1=sh*5 :x2=svgWidth-sw*5 :y2=sh*5 />
      <line :x1=sw*5 :y1=svgHeight-sh*5 :x2=svgWidth-sw*5 :y2=svgHeight-sh*5 />

      <!-- Endlines -->
      <line :x1=sw*5 :y1=sh*5 :x2=sw*5 :y2=svgHeight-sh*5 />
      <line :x1=sw*4 :y1=sh*14 :x2=sw*5 :y2=sh*14 />
      <line :x1=sw*4 :y1=svgHeight-sh*14 :x2=sw*5 :y2=svgHeight-sh*14 />
      <line :x1=svgWidth-sw*5 :y1=sh*5 :x2=svgWidth-sw*5 :y2=svgHeight-sh*5 />
      <line :x1=svgWidth-sw*5 :y1=sh*14 :x2=svgWidth-sw*4 :y2=sh*14 />
      <line :x1=svgWidth-sw*5 :y1=svgHeight-sh*14 :x2=svgWidth-sw*4 :y2=svgHeight-sh*14 />

      <!-- Corner areas -->
      <path :d="corner(sw*6, sh*5, sw*6, sh*6, sw*5, sh*6)" />
      <path :d="corner(svgWidth-sw*6, sh*5, svgWidth-sw*6, sh*6, svgWidth-sw*5, sh*6)" />
      <path :d="corner(sw*6, svgHeight-sh*5, sw*6, svgHeight-sh*6, sw*5, svgHeight-sh*6)" />
      <path :d="corner(svgWidth-sw*6, svgHeight-sh*5, svgWidth-sw*6, svgHeight-sh*6, svgWidth-sw*5, svgHeight-sh*6)" />

      <!-- Penalty areas -->
      <line :x1=sw*5 :y1=sh*21 :x2=sw*23 :y2=sh*21 />
      <line :x1=sw*5 :y1=svgHeight-sh*21 :x2=sw*23 :y2=svgHeight-sh*21 />
      <line :x1=sw*23 :y1=svgHeight-sh*21 :x2=sw*23 :y2=sh*21 />
      <circle :cx=sw*17 :cy=svgHeight/2 :r=2 />
      <path :d="corner(sw*23, svgHeight-sh*30, sw*27, svgHeight/2, sw*23, sh*30)" />

      <line :x1=svgWidth-sw*5 :y1=sh*21 :x2=svgWidth-sw*23 :y2=sh*21 />
      <line :x1=svgWidth-sw*5 :y1=svgHeight-sh*21 :x2=svgWidth-sw*23 :y2=svgHeight-sh*21 />
      <line :x1=svgWidth-sw*23 :y1=svgHeight-sh*21 :x2=svgWidth-sw*23 :y2=sh*21 />
      <circle :cx=svgWidth-sw*17 :cy=svgHeight/2 :r=2 />
      <path :d="corner(svgWidth-sw*23, svgHeight-sh*30, svgWidth-sw*27, svgHeight/2, svgWidth-sw*23, sh*30)" />

      <!-- 5 Meter area -->
      <line :x1=sw*5 :y1=sh*28 :x2=sw*11 :y2=sh*28 />
      <line :x1=sw*5 :y1=svgHeight-sh*28 :x2=sw*11 :y2=svgHeight-sh*28 />
      <line :x1=sw*11 :y1=svgHeight-sh*28 :x2=sw*11 :y2=sh*28 />

      <line :x1=svgWidth-sw*5 :y1=sh*28 :x2=svgWidth-sw*11 :y2=sh*28 />
      <line :x1=svgWidth-sw*5 :y1=svgHeight-sh*28 :x2=svgWidth-sw*11 :y2=svgHeight-sh*28 />
      <line :x1=svgWidth-sw*11 :y1=svgHeight-sh*28 :x2=svgWidth-sw*11 :y2=sh*28 />

      <!-- Goals -->
      <line :x1=sw*3 :y1=sh*31 :x2=sw*5 :y2=sh*31 />
      <line :x1=sw*3 :y1=svgHeight-sh*31 :x2=sw*5 :y2=svgHeight-sh*31 />
      <line :x1=sw*3 :y1=svgHeight-sh*31 :x2=sw*3 :y2=sh*31 />

      <line :x1=svgWidth-sw*3 :y1=sh*31 :x2=svgWidth-sw*5 :y2=sh*31 />
      <line :x1=svgWidth-sw*3 :y1=svgHeight-sh*31 :x2=svgWidth-sw*5 :y2=svgHeight-sh*31 />
      <line :x1=svgWidth-sw*3 :y1=svgHeight-sh*31 :x2=svgWidth-sw*3 :y2=sh*31 />

      <!-- Half-way line and circle -->
      <line :x1=sw*60 :y1=sh*5 :x2=sw*60 :y2=svgHeight-sh*5 />
      <circle :cx=svgWidth/2 :cy=svgHeight/2 :r=(sw+sh)/2*9 />
      <circle :cx=svgWidth/2 :cy=svgHeight/2 :r=2 />
    </svg>
    <svg id="field" v-if="screenWidth < 750">
      <!-- Sidelines -->
      <line :x1=sw*2.5 :y1=sh*5 :x2=sw*2.5 :y2=svgHeight-sh*5 />
      <line :x1=svgWidth-sw*2.5 :y1=sh*5 :x2=svgWidth-sw*2.5 :y2=svgHeight-sh*5 />

      <!-- Endlines -->
      <line :x1=sw*2.5 :y1=sh*5 :x2=svgWidth-sw*2.5 :y2=sh*5 />
      <line :x1=sw*11.5 :y1=sh*4 :x2=sw*11.5 :y2=sh*5 />
      <line :x1=svgWidth-sw*11.5 :y1=sh*4 :x2=svgWidth-sw*11.5 :y2=sh*5 />

      <line :x1=sw*2.5 :y1=svgHeight-sh*5 :x2=svgWidth-sw*2.5 :y2=svgHeight-sh*5 />
      <line :x1=sw*11.5 :y1=svgHeight-sh*4 :x2=sw*11.5 :y2=svgHeight-sh*5 />
      <line :x1=svgWidth-sw*11.5 :y1=svgHeight-sh*4 :x2=svgWidth-sw*11.5 :y2=svgHeight-sh*5 />

      <!-- Corner areas -->
      <path :d="corner(sw*3.5, sh*5, sw*3.5, sh*6, sw*2.5, sh*6)" />
      <path :d="corner(svgWidth-sw*3.5, sh*5, svgWidth-sw*3.5, sh*6, svgWidth-sw*2.5, sh*6)" />
      <path :d="corner(sw*3.5, svgHeight-sh*5, sw*3.5, svgHeight-sh*6, sw*2.5, svgHeight-sh*6)" />
      <path :d="corner(svgWidth-sw*3.5, svgHeight-sh*5, svgWidth-sw*3.5, svgHeight-sh*6, svgWidth-sw*2.5, svgHeight-sh*6)" />

      <!-- Penalty areas -->
      <line :x1=sw*21 :y1=sh*5 :x2=sw*21 :y2=sh*23 />
      <line :x1=svgWidth-sw*21 :y1=sh*5 :x2=svgWidth-sw*21 :y2=sh*23 />
      <line :x1=svgWidth-sw*21 :y1=sh*23 :x2=sw*21 :y2=sh*23 />
      <circle :cx=svgWidth/2 :cy=sh*17 :r=2 />
      <path :d="corner(svgWidth-sw*30, sh*23, svgWidth/2, sh*27, sw*30, sh*23)" />

      <line :x1=sw*21 :y1=svgHeight-sh*5 :x2=sw*21 :y2=svgHeight-sh*23 />
      <line :x1=svgWidth-sw*21 :y1=svgHeight-sh*5 :x2=svgWidth-sw*21 :y2=svgHeight-sh*23 />
      <line :x1=svgWidth-sw*21 :y1=svgHeight-sh*23 :x2=sw*21 :y2=svgHeight-sh*23 />
      <circle :cx=svgWidth/2 :cy=svgHeight-sw*17 :r=2 />
      <path :d="corner(svgWidth-sw*30, svgHeight-sh*23, svgWidth/2, svgHeight-sw*27, sw*30, svgHeight-sh*23)" />

      <!-- 5 Meter area -->
      <line :x1=sw*28 :y1=sh*5 :x2=sw*28 :y2=sh*11 />
      <line :x1=svgWidth-sw*28 :y1=sh*5 :x2=svgWidth-sw*28 :y2=sh*11 />
      <line :x1=sw*28 :y1=sh*11 :x2=svgWidth-sw*28 :y2=sh*11 />

      <line :x1=sw*28 :y1=svgHeight-sh*5 :x2=sw*28 :y2=svgHeight-sh*11 />
      <line :x1=svgWidth-sw*28 :y1=svgHeight-sh*5 :x2=svgWidth-sw*28 :y2=svgHeight-sh*11 />
      <line :x1=sw*28 :y1=svgHeight-sh*11 :x2=svgWidth-sw*28 :y2=svgHeight-sh*11 />

      <!-- Goals -->
      <line :x1=sw*31 :y1=sh*3 :x2=sw*31 :y2=sh*5 />
      <line :x1=svgWidth-sw*31 :y1=sh*3 :x2=svgWidth-sw*31 :y2=sh*5 />
      <line :x1=svgWidth-sw*31 :y1=sh*3 :x2=sw*31 :y2=sh*3 />

      <line :x1=sw*31 :y1=svgHeight-sh*3 :x2=sw*31 :y2=svgHeight-sh*5 />
      <line :x1=svgWidth-sw*31 :y1=svgHeight-sh*3 :x2=svgWidth-sw*31 :y2=svgHeight-sh*5 />
      <line :x1=svgWidth-sw*31 :y1=svgHeight-sh*3 :x2=sw*31 :y2=svgHeight-sh*3 />

      <!-- Half-way line and circle -->
      <line :x1=sw*2.5 :y1=svgHeight/2 :x2=svgWidth-sw*2.5 :y2=svgHeight/2 />
      <circle :cx=svgWidth/2 :cy=svgHeight/2 :r=(sw+sh)/2*9 />
      <circle :cx=svgWidth/2 :cy=svgHeight/2 :r=2 />
    </svg>
  </div>
</template>

<script>
export default {
  name: 'BackgroundImage',
  data: () => {
    return {
      screenWidth: document.documentElement.clientWidth,
      screenHeight: document.documentElement.clientHeight,
      svgWidth: 0,
      svgHeight: 0
    }
  },
  mounted () {
    this.svgWidth = document.getElementById('field').getBoundingClientRect().width
    this.svgHeight = document.getElementById('field').getBoundingClientRect().height
    window.addEventListener('resize', () => {
      this.screenWidth = document.documentElement.clientWidth
      this.screenHeight = document.documentElement.clientHeight
      this.svgWidth = document.getElementById('field').getBoundingClientRect().width
      this.svgHeight = document.getElementById('field').getBoundingClientRect().height
    })
  },
  methods: {
    corner: function (x, y, x1, y1, x2, y2) {
      let corner = ['m']
      corner.push([x, y].join(' '))
      corner.push(['C', x, y].join(' '))
      corner.push([x1, y1].join(' '))
      corner.push([x2, y2].join(' '))
      return corner.join(' ')
    }
  },
  computed: {
    sw: function () {
      if (this.screenWidth > 750) {
        return Math.round(this.svgWidth / 120)
      } else {
        return Math.round(this.svgWidth / 70)
      }
    },
    sh: function () {
      if (this.screenWidth < 750) {
        return Math.round(this.svgHeight / 120)
      } else {
        return Math.round(this.svgHeight / 70)
      }
    }
  }
}
</script>

<style>
  svg {
    position: fixed;
    z-index: -1;
    top: -15px;
    width: 98vw;
    height: 98vh;
    background-color: green;
  }

  line {
    stroke: white;
    stroke-width: 2px;
  }

  circle {
    stroke: white;
    stroke-width: 2px;
    fill: none;
  }

  path {
    stroke: white;
    stroke-width: 2px;
    fill: none;
  }

</style>
