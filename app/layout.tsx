import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Agent 3D Cube Demo',
  description: '用自然语言控制 3D 物体 - 课件 Agent 界面 Demo',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
