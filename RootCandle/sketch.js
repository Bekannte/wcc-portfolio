let particles; // 新建粒子
let Sound, amp, fft; // 音乐文件
const n = 120; // 粒子数量


// //预读器
// function preload() {
//   Sound = loadSound("Lavender Haze.mp3");
// }

function setup() {
  createCanvas(500, 500); // 设置画布大小
  pixelDensity(2); // 设置像素密度
  colorMode(HSB, 360, 100, 100, 100); // 设置颜色模式
  newParticles(); // 创建一个新粒子

  // amp = new p5.Amplitude();
  // fft = new p5.FFT();
  // frameRate(20);
}

function draw() {
  //粒子系统原型
  for (let i in particles) {
    let p = particles[i];
    p.run();
    if (p.isDead()) {
      particles.splice(i, 1);
    }
  }
}

function forms() {
  //嵌入一个for循环
  for (let j = 0; j < n; j++) {
    // 变化次数小于粒子数量
    let x = random(width),
      y = random(height); // 设置随机宽和高
    let s = random(20, 50); // 设置圆形大小随机范围
    let hs = s; // 新建随机长度/2
    let c = getCol(); // 获取Col值
    noStroke(); // 设置不描边
    fill(c); // 填充c值

    if (random(1) > 0.5) {
      // 新建if条件语句，随机值大于0.5
      // 嵌入一个for循环，i小于随机长度s/2
      for (let i = -s / 2; i < s / 2; i++) {
        particles.push(new Particle(x + i * sin(i), y - i * cos(i), c));
        particles.push(new Particle(x - i * cos(i), y + i * sin(i), c));
      }
    } else {
      // 否则语句
      // 如果a < TAU = TWO_PI，形状为圆形的粒子变化的函数值
      for (let a = 0; a < TAU; a += TAU / 360) {
        particles.push(new Particle(x + hs * cos(a), y + hs * sin(a), c));
      }
    }
  }
}

// 创建一个新功能命名为newParticles()
function newParticles() {
  // particles = new ArrayList<Particle>();
  particles = new Array(); // 给粒子设置一个新列阵
  background("#000000"); // 设置背景颜色
  forms();
  noiseSeed(random(100000)); // 定义 noise() 使用的随机种子值
}

// 设置颜色值
function getCol() {
  // let colors = [
  //   "#80dcea","#defcf4","#085763","#f7f9fe","#669bbc","#2A89F1"];
  let colors = ["#9C27B0", "#673AB7", "#8A3DFD", "#AE59D4", "#EDCBF3"];
  // 插入parseInt函数，解析一个字符串并返回一个颜色
  let idx = parseInt(random(colors.length));
  console.log(idx + colors[idx]);
  return colors[idx];
}

// 定义一个名为Particle的类，这个类定义了Particle的一些属性
class Particle {
  constructor(x, y, col) {
    // 嵌入一个构造函数，通过它可以定义和设置类的一些属性
    this.pos = createVector(x, y); // 定义并创建一个类的变量位置
    this.step = 1; // 定义类的步骤
    this.angle = random(10); // 定义类的随机角度
    this.lifeSpan = 100; // 定义粒子的成长周期
    this.noiseScale = 800; // 定义噪声的范围
    this.noiseStrength = 90; // 定义噪声的强度
    this.col = col; // 定义类的颜色
  }

  show() {
    // 定义粒子类的显示方式
    noStroke(); // 不描边
    // fill(this.col, this.lifeSpan);
    fill(this.col); // 填充定义的颜色
    rect(this.pos.x, this.pos.y, 0.5); // 画面初始图形为随机位置的圆形
  }

  move() {
    // 定义粒子类的移动方法
    this.angle =
      noise(this.pos.x / this.noiseScale, this.pos.y / this.noiseScale) *
      this.noiseStrength;
    this.pos.x += cos(this.angle) * this.step;
    this.pos.y += sin(this.angle) * this.step;
    this.lifeSpan -= 0.2;
  }

  isDead() {
    // 定义粒子类的回归方法
    return this.lifeSpan < 0.0;
  }

  run() {
    // 定义粒子类的运行方式
    this.show();
    this.move();
  }
}

// 创建新功能，单击鼠标会刷新页面
function mousePressed() {
  if (Sound.isPlaying()) {
    Sound.pause();
  } else {
    newParticles();
    Sound.play();
    background(0);
  }
}