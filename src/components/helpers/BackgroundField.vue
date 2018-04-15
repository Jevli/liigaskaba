<template>
  <div>
    <svg id="field" v-if="screenWidth > screenHeight">
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
    <svg id="field" v-if="screenWidth < screenHeight">
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
  },
  methods: {
    corner: function (x, y, x1, y1, x2, y2) {
      let corner = ['m']
      corner.push([x, y].join(' '))
      corner.push(['C', x, y].join(' '))
      corner.push([x1, y1].join(' '))
      corner.push([x2, y2].join(' '))
      return corner.join(' ')
    }, 
    test: function () {
      return 'm ' + this.sw * 6 + ' ' + this.sh * 5 + ' C ' + this.sw * 6 + ' ' + this.sh * 5 + ' ' + this.sw * 6 + ' ' + this.sh * 6 + ' ' + this.sw * 5 + ' ' + this.sh * 6
    }
  },
  computed: {
    sw: function () {
      if (this.screenWidth > this.screenHeight) {
        return this.svgWidth / 120
      } else {
        return this.svgWidth / 70
      }
    },
    sh: function () {
      if (this.screenWidth < this.screenHeight) {
        return this.svgHeight / 120
      } else {
        return this.svgHeight / 70
      }
    }
  }
}
</script>

<style>
  svg {
    width: 90%;
    height: 90vh;
    z-index: -1;
    margin: 1% 5%;
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

  @media screen and (min-height: 400px) {
    #svg {
    }
  }

  @media screen and (max-height: 400px) {
    #svg {
    }
  }

  @media screen and (min-width: 750px){
    #svg {
    }
  }

  @media screen and (max-width: 750px) {
    #svg {
    }
  }

</style>
