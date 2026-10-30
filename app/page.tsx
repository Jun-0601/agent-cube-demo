'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef, useState, useCallback } from 'react';
import type { Group } from 'three';

export default function Home() {
  const [charProps, setCharProps] = useState({
    bodyColor: '#ff6600',
    scale: 1,
    walking: false,
  });
  const [input, setInput] = useState('');
  const [logs, setLogs] = useState<string[]>([]);

  const handleCommand = useCallback((text: string) => {
    const cmd = text.toLowerCase();
    const newLogs: string[] = [];

    if (cmd.includes('走') || cmd.includes('前进') || cmd.includes('踏步')) {
      setCharProps((p) => ({ ...p, walking: true }));
      newLogs.push('🧠 Agent 解析：用户要求"行走"，角色开始原地踏步');
    }
    if (cmd.includes('停') || cmd.includes('站') || cmd.includes('停止')) {
      setCharProps((p) => ({ ...p, walking: false }));
      newLogs.push('🧠 Agent 解析：用户要求"停止"，角色站立不动');
    }
    if (cmd.includes('变大') || cmd.includes('大')) {
      setCharProps((p) => ({ ...p, scale: p.scale + 0.3 }));
      newLogs.push('🧠 Agent 解析：用户要求"变大"，增加 scale 0.3');
    }
    if (cmd.includes('变小') || cmd.includes('小')) {
      setCharProps((p) => ({ ...p, scale: Math.max(0.4, p.scale - 0.3) }));
      newLogs.push('🧠 Agent 解析：用户要求"变小"，减少 scale 0.3');
    }
    if (cmd.includes('红')) {
      setCharProps((p) => ({ ...p, bodyColor: '#ff3333' }));
      newLogs.push('🧠 Agent 解析：用户要求"红色"，设置身体颜色为 #ff3333');
    }
    if (cmd.includes('蓝')) {
      setCharProps((p) => ({ ...p, bodyColor: '#3333ff' }));
      newLogs.push('🧠 Agent 解析：用户要求"蓝色"，设置身体颜色为 #3333ff');
    }
    if (cmd.includes('绿')) {
      setCharProps((p) => ({ ...p, bodyColor: '#33aa33' }));
      newLogs.push('🧠 Agent 解析：用户要求"绿色"，设置身体颜色为 #33aa33');
    }
    if (cmd.includes('重置')) {
      setCharProps({ bodyColor: '#ff6600', scale: 1, walking: false });
      newLogs.push('🧠 Agent 解析：用户要求"重置"，恢复初始状态');
    }

    if (newLogs.length === 0) {
      newLogs.push('❌ Agent 无法理解指令，请尝试：行走/停止/变大/变小/红色/蓝色/绿色/重置');
    }

    setLogs((prev) => [...prev.slice(-9), ...newLogs]);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setLogs((prev) => [...prev, `👤 用户：${input}`]);
    handleCommand(input);
    setInput('');
  };

  return (
    <main className="flex h-screen">
      {/* 左侧：3D 场景 */}
      <div className="flex-1 bg-gradient-to-b from-sky-400 to-sky-200 relative">
        <Canvas camera={{ position: [3, 2.5, 4], fov: 50 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 8, 3]} intensity={1.2} castShadow />
          {/* 地面 */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
            <planeGeometry args={[30, 30]} />
            <meshStandardMaterial color="#90c695" />
          </mesh>
          {/* 角色 */}
          <Character
            bodyColor={charProps.bodyColor}
            scale={charProps.scale}
            walking={charProps.walking}
          />
          <OrbitControls enablePan={false} minDistance={2} maxDistance={15} />
          <gridHelper args={[20, 20]} position={[0, 0, 0]} />
        </Canvas>
        {/* 左上角标题 */}
        <div className="absolute top-4 left-4 text-white">
          <h1 className="text-xl font-bold drop-shadow">🎓 Agent 课件界面 Demo</h1>
          <p className="text-sm drop-shadow">用指令控制 3D 角色</p>
        </div>
      </div>

      {/* 右侧：控制面板 */}
      <div className="w-80 bg-white p-4 flex flex-col border-l overflow-auto">
        <h2 className="text-lg font-bold mb-2">🎮 Agent 控制台</h2>

        {/* 当前状态 */}
        <div className="mb-4 p-3 bg-gray-50 rounded text-sm space-y-1 border">
          <p><span className="font-medium">🎨 衣服颜色：</span><span style={{ color: charProps.bodyColor }}>{charProps.bodyColor}</span></p>
          <p><span className="font-medium">📐 身高：</span>{charProps.scale.toFixed(1)}x</p>
          <p><span className="font-medium">🏃 状态：</span>{charProps.walking ? '🚶 行走中' : '🧍 站立'}</p>
        </div>

        {/* 输入框 */}
        <form onSubmit={handleSubmit} className="mb-4">
          <label className="block text-sm font-medium mb-1">输入指令：</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="例如：行走、变红色、变大..."
              className="flex-1 px-3 py-2 border rounded text-sm focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
            >
              发送
            </button>
          </div>
        </form>

        {/* 快捷指令 */}
        <div className="mb-4">
          <p className="text-sm font-medium mb-1">快捷指令：</p>
          <div className="flex flex-wrap gap-1">
            {['行走', '停止', '变大', '变小', '红色', '蓝色', '绿色', '重置'].map((cmd) => (
              <button
                key={cmd}
                onClick={() => {
                  setLogs((prev) => [...prev, `👤 用户：${cmd}`]);
                  handleCommand(cmd);
                }}
                className="px-2 py-1 bg-gray-100 text-xs rounded hover:bg-gray-200 border"
              >
                {cmd}
              </button>
            ))}
          </div>
        </div>

        {/* 日志 */}
        <div className="flex-1">
          <p className="text-sm font-medium mb-1">交互日志：</p>
          <div className="space-y-1 border rounded p-2 bg-gray-50 min-h-32">
            {logs.length === 0 ? (
              <p className="text-xs text-gray-400">在上方输入指令开始体验...</p>
            ) : (
              logs.map((log, i) => (
                <p key={i} className="text-xs text-gray-600 break-words">{log}</p>
              ))
            )}
          </div>
        </div>

        {/* 底部说明 */}
        <div className="mt-4 p-2 bg-blue-50 rounded text-xs text-blue-800">
          <p>💡 试试输入"行走"让角色原地踏步，"停止"让它停下来。</p>
        </div>
      </div>
    </main>
  );
}

// ======================================
// 程序化角色组件：头 + 身体 + 双臂 + 双腿
// 关节处用 <group> 包裹，旋转中心就在关节
// ======================================
function Character({
  bodyColor,
  scale,
  walking,
}: {
  bodyColor: string;
  scale: number;
  walking: boolean;
}) {
  // 四个肢体的关节 group ref
  const leftLegJoint = useRef<Group>(null!);
  const rightLegJoint = useRef<Group>(null!);
  const leftArmJoint = useRef<Group>(null!);
  const rightArmJoint = useRef<Group>(null!);
  const timeRef = useRef(0);

  useFrame((_, delta) => {
    if (walking) {
      timeRef.current += delta;
      const t = timeRef.current * 8; // 步频，数字越大越快

      // 左腿向前摆，右腿向后摆（反相）
      leftLegJoint.current.rotation.x = Math.sin(t) * 0.5;
      rightLegJoint.current.rotation.x = Math.sin(t + Math.PI) * 0.5;

      // 手臂和腿反向摆动（左腿前→右臂前，自然行走姿态）
      leftArmJoint.current.rotation.x = Math.sin(t + Math.PI) * 0.4;
      rightArmJoint.current.rotation.x = Math.sin(t) * 0.4;
    } else {
      // 回到站立姿态，平滑过渡
      const damping = 0.2;
      [leftLegJoint, rightLegJoint, leftArmJoint, rightArmJoint].forEach((ref) => {
        ref.current.rotation.x *= damping;
      });
    }
  });

  return (
    <group scale={scale} position={[0, 0, 0]}>
      {/* ==== 头 ==== */}
      <mesh position={[0, 1.65, 0]} castShadow>
        <sphereGeometry args={[0.28, 16, 16]} />
        <meshStandardMaterial color="#ffdbac" />
      </mesh>
      {/* 眼睛 */}
      <mesh position={[-0.09, 1.68, 0.24]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#222" />
      </mesh>
      <mesh position={[0.09, 1.68, 0.24]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#222" />
      </mesh>
      {/* 头发 */}
      <mesh position={[0, 1.85, 0]}>
        <sphereGeometry args={[0.29, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#333" />
      </mesh>

      {/* ==== 身体（躯干） ==== */}
      <mesh position={[0, 1.1, 0]} castShadow>
        <boxGeometry args={[0.55, 0.75, 0.3]} />
        <meshStandardMaterial color={bodyColor} />
      </mesh>

      {/* ==== 左臂 ==== */}
      {/* 关节点在肩膀位置 (x=-0.3, y=1.45)，mesh 从关节向下延伸 */}
      <group ref={leftArmJoint} position={[-0.32, 1.45, 0]}>
        <mesh position={[0, -0.32, 0]} castShadow>
          <boxGeometry args={[0.15, 0.65, 0.15]} />
          <meshStandardMaterial color={bodyColor} />
        </mesh>
      </group>

      {/* ==== 右臂 ==== */}
      <group ref={rightArmJoint} position={[0.32, 1.45, 0]}>
        <mesh position={[0, -0.32, 0]} castShadow>
          <boxGeometry args={[0.15, 0.65, 0.15]} />
          <meshStandardMaterial color={bodyColor} />
        </mesh>
      </group>

      {/* ==== 左腿 ==== */}
      {/* 关节点在髋部 (x=-0.15, y=0.7)，mesh 从关节向下延伸 */}
      <group ref={leftLegJoint} position={[-0.15, 0.7, 0]}>
        <mesh position={[0, -0.38, 0]} castShadow>
          <boxGeometry args={[0.2, 0.75, 0.2]} />
          <meshStandardMaterial color="#444" />
        </mesh>
      </group>

      {/* ==== 右腿 ==== */}
      <group ref={rightLegJoint} position={[0.15, 0.7, 0]}>
        <mesh position={[0, -0.38, 0]} castShadow>
          <boxGeometry args={[0.2, 0.75, 0.2]} />
          <meshStandardMaterial color="#444" />
        </mesh>
      </group>
    </group>
  );
}
