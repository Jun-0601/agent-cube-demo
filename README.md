# Agent 3D Cube Demo - 课件 Agent 界面演示

这是一个用 Next.js + React Three Fiber 实现的 Demo，展示如何用自然语言指令控制 3D 物体。

## 🚀 运行步骤

### 1. 确认环境

确保你的电脑已安装 Node.js 18 或更高版本。打开命令行输入：

```bash
node -v
```

如果显示 `v18.x.x` 或更高版本，说明环境正常。如果没有安装 Node.js，请先到 https://nodejs.org 下载安装 LTS 版本。

### 2. 解压项目

将 demo.zip 解压到任意目录，例如桌面。

### 3. 进入项目目录

打开命令行（终端），进入解压后的目录：

```bash
cd 你解压的路径/agent-cube-demo
```

例如 Windows 用户：
```bash
cd C:\Users\你的用户名\Desktop\agent-cube-demo
```

### 4. 安装依赖

```bash
npm install
```

等待安装完成，这可能需要 2-5 分钟。

### 5. 启动项目

```bash
npm run dev
```

看到类似 `Ready in ...` 和 `http://localhost:3000` 的提示后，说明启动成功。

### 6. 打开浏览器

打开 Chrome 或 Edge 浏览器，访问：

```
http://localhost:3000
```

## 🎮 使用说明

- 在右侧输入框输入指令，如"变大"、"变红色"、"旋转"
- 也可以直接点击快捷指令按钮
- 左侧 3D 场景会实时响应你的指令
- 右侧面板会显示 Agent 的解析过程和执行日志

## 📁 项目结构

```
agent-cube-demo/
├── app/
│   ├── layout.tsx      # 页面布局
│   ├── page.tsx        # 主页面（核心代码在这里）
│   └── globals.css     # 全局样式
├── package.json         # 项目依赖配置
├── next.config.js       # Next.js 配置
├── tsconfig.json        # TypeScript 配置
├── tailwind.config.ts   # Tailwind CSS 配置
├── postcss.config.js    # PostCSS 配置
└── README.md            # 说明文档
```

## ❓ 常见问题

**Q: npm install 很慢或失败？**
A: 可以尝试使用国内镜像：`npm install --registry=https://registry.npmmirror.com`

**Q: 端口 3000 被占用？**
A: 换一个端口：`npm run dev -- -p 3001`，然后访问 http://localhost:3001

**Q: 3D 场景不显示？**
A: 请确保使用的是 Chrome 或 Edge 最新版，并尝试刷新页面。
