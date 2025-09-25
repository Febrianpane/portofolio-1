<template>
  <div class="liquid-text" ref="container" :style="{ width: width + 'px', height: height + 'px' }" role="img" :aria-label="text">
    <canvas ref="gl" :width="width" :height="height"></canvas>
    <!-- Fallback text for non-WebGL environments -->
    <span class="fallback" v-if="!ready">{{ text }}</span>
  </div>
</template>

<script>
export default {
  name: 'LiquidText',
  props: {
    text: { type: String, required: true },
    fontFamily: { type: String, default: 'EB Garamond, serif' },
    fontWeight: { type: String, default: '600' },
    fontSize: { type: Number, default: 22 },
    color: { type: String, default: '#ffdb70' },
    hoverColor: { type: String, default: '#ffe08a' },
    midColor: { type: String, default: '' },
    strokeColor: { type: String, default: '' },
    strokeWidth: { type: Number, default: 0 },
    width: { type: Number, default: 220 },
    height: { type: Number, default: 36 }
  },
  data() {
    return {
      gl: null,
      program: null,
      tex: null,
      posBuf: null,
      uvBuf: null,
      uLoc: {},
      mouse: { x: 0.5, y: 0.5 },
      tStart: 0,
      animId: 0,
      ready: false,
    };
  },
  mounted() {
    this.init();
  },
  beforeUnmount() {
    cancelAnimationFrame(this.animId);
  },
  methods: {
    init() {
      const canvas = this.$refs.gl;
      const gl = canvas.getContext('webgl', { alpha: true, antialias: true });
      if (!gl) return; // fallback will show
      this.gl = gl;

      // Create a text texture via 2D canvas
      const texCanvas = document.createElement('canvas');
      texCanvas.width = this.width * 2; // hi-dpi texture for crisper text
      texCanvas.height = this.height * 2;
      const ctx = texCanvas.getContext('2d');
      ctx.scale(2, 2);
      ctx.clearRect(0, 0, this.width, this.height);
      ctx.font = `${this.fontWeight} ${this.fontSize}px ${this.fontFamily}`;
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'left';
      // center vertically
      const y = this.height / 2;
      // gradient for subtle depth
      const grad = ctx.createLinearGradient(0, 0, 0, this.height);
      grad.addColorStop(0, this.color);
      if (this.midColor && typeof this.midColor === 'string' && this.midColor.length > 0) {
        grad.addColorStop(0.5, this.midColor);
      }
      grad.addColorStop(1, this.hoverColor);
      // Optional stroke for stronger contrast
      if (this.strokeColor && this.strokeWidth > 0) {
        ctx.lineJoin = 'round';
        ctx.miterLimit = 2;
        ctx.strokeStyle = this.strokeColor;
        ctx.lineWidth = this.strokeWidth;
        ctx.strokeText(this.text, 0, y);
      }
      ctx.fillStyle = grad;
      ctx.fillText(this.text, 0, y);

      // Upload texture
      const tex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      // Flip the source canvas on Y so text isn't upside down
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texCanvas);
      this.tex = tex;

      // Shaders
      const vs = `
        attribute vec2 a_pos;
        attribute vec2 a_uv;
        varying vec2 v_uv;
        void main() {
          v_uv = a_uv;
          gl_Position = vec4(a_pos, 0.0, 1.0);
        }
      `;
      const fs = `
        precision mediump float;
        varying vec2 v_uv;
        uniform sampler2D u_tex;
        uniform vec2 u_mouse;   // 0..1
        uniform float u_time;   // seconds
        uniform float u_amp;    // amplitude
        uniform float u_sigma;  // falloff
        // simple radial ripple + swirl displacement
        void main(){
          vec2 uv = v_uv;
          vec2 m = u_mouse;
          float d = distance(uv, m);
          float ripple = sin(12.0*d - u_time*4.0);
          float fall = exp(-pow(d/u_sigma, 2.0));
          vec2 dir = normalize(uv - m + 1e-5);
          // combine radial push + tangential swirl for liquid feel
          float swirl = sin(8.0*d - u_time*3.0);
          vec2 disp = dir * ripple * fall * u_amp * 0.015 + vec2(-dir.y, dir.x) * swirl * fall * u_amp * 0.01;
          vec4 col = texture2D(u_tex, uv + disp);
          // soft fade outside text bounds
          gl_FragColor = col;
        }
      `;

      const program = this.createProgram(vs, fs);
      if (!program) return;
      this.program = program;
      gl.useProgram(program);

      // Fullscreen quad
      const pos = new Float32Array([
        -1, -1,  1, -1,  -1, 1,
         1, -1,  1,  1,  -1, 1
      ]);
      const uv = new Float32Array([
         0, 0,  1, 0,  0, 1,
         1, 0,  1, 1,  0, 1
      ]);

      const posBuf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
      gl.bufferData(gl.ARRAY_BUFFER, pos, gl.STATIC_DRAW);
      const a_pos = gl.getAttribLocation(program, 'a_pos');
      gl.enableVertexAttribArray(a_pos);
      gl.vertexAttribPointer(a_pos, 2, gl.FLOAT, false, 0, 0);
      this.posBuf = posBuf;

      const uvBuf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, uvBuf);
      gl.bufferData(gl.ARRAY_BUFFER, uv, gl.STATIC_DRAW);
      const a_uv = gl.getAttribLocation(program, 'a_uv');
      gl.enableVertexAttribArray(a_uv);
      gl.vertexAttribPointer(a_uv, 2, gl.FLOAT, false, 0, 0);
      this.uvBuf = uvBuf;

      this.uLoc.time = gl.getUniformLocation(program, 'u_time');
      this.uLoc.mouse = gl.getUniformLocation(program, 'u_mouse');
      this.uLoc.amp = gl.getUniformLocation(program, 'u_amp');
      this.uLoc.sigma = gl.getUniformLocation(program, 'u_sigma');

      // Texture uniform
      const u_tex = gl.getUniformLocation(program, 'u_tex');
      gl.uniform1i(u_tex, 0);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, this.tex);

      // Mouse events
      const rect = () => this.$refs.container.getBoundingClientRect();
      const onMove = (e) => {
        const r = rect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        this.mouse.x = Math.min(Math.max(x, 0), 1);
        this.mouse.y = Math.min(Math.max(1 - y, 0), 1); // flip Y for GL
      };
      const onLeave = () => {
        // relax towards center when leaving
        this.mouse.x = 0.5;
        this.mouse.y = 0.5;
      };
      this.$refs.container.addEventListener('mousemove', onMove);
      this.$refs.container.addEventListener('mouseleave', onLeave);

      this.tStart = performance.now();
      this.ready = true;
      const loop = () => {
        const t = (performance.now() - this.tStart) / 1000;
        gl.viewport(0, 0, this.width, this.height);
        gl.clearColor(0,0,0,0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.useProgram(program);
        gl.uniform1f(this.uLoc.time, t);
        gl.uniform2f(this.uLoc.mouse, this.mouse.x, this.mouse.y);
        gl.uniform1f(this.uLoc.amp, 1.0);
        gl.uniform1f(this.uLoc.sigma, 0.35);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        this.animId = requestAnimationFrame(loop);
      };
      loop();
    },

    createProgram(vsSource, fsSource) {
      const gl = this.gl;
      const vs = this.compile(gl.VERTEX_SHADER, vsSource);
      const fs = this.compile(gl.FRAGMENT_SHADER, fsSource);
      if (!vs || !fs) return null;
      const prog = gl.createProgram();
      gl.attachShader(prog, vs);
      gl.attachShader(prog, fs);
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
        console.error('Program link error:', gl.getProgramInfoLog(prog));
        return null;
      }
      return prog;
    },

    compile(type, src) {
      const gl = this.gl;
      const sh = gl.createShader(type);
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(sh));
        console.log(src);
        return null;
      }
      return sh;
    }
  }
}
</script>

<style scoped>
.liquid-text {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.liquid-text canvas {
  display: block;
}
.fallback {
  position: absolute;
  inset: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: 'EB Garamond', serif;
  font-weight: 600;
  font-size: 22px;
  color: #ffdb70;
}
</style>
