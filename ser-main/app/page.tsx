'use client';

import { useState } from 'react';
import { ExternalLink, Github, Menu, X } from 'lucide-react';

interface App {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  links: {
    demo?: string;
    github?: string;
    other?: { label: string; url: string }[];
  };
  color: string;
}

const apps: App[] = [
  {
    id: 'voting-app',
    name: 'リアルタイム投票アプリ',
    description: 'WebSocketを使用したリアルタイム投票システム。複数ユーザーが同時に投票でき、結果がリアルタイムで更新されます。',
    techStack: ['Next.js 14', 'React', 'TypeScript', 'Tailwind CSS', 'FastAPI', 'WebSocket', 'AWS EC2', 'PostgreSQL'],
    links: {
      demo: 'https://your-voting-app.com',
      github: 'https://github.com/yourusername/voting-app',
    },
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'karaoke-app',
    name: 'カラオケWebアプリ',
    description: 'Supabase Realtimeを活用したカラオケ管理アプリ。曲の予約や順番管理をリアルタイムで同期します。',
    techStack: ['Next.js', 'React', 'TypeScript', 'Supabase', 'Realtime Subscription'],
    links: {
      demo: 'https://your-karaoke-app.com',
      github: 'https://github.com/yourusername/karaoke-app',
    },
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'hackathon-project',
    name: 'ハッカソンプロジェクト',
    description: 'AWSハッカソンで開発したプロジェクト。クラウドインフラを活用した実践的なアプリケーションです。',
    techStack: ['FastAPI', 'Python', 'AWS Lambda', 'DynamoDB', 'API Gateway'],
    links: {
      github: 'https://github.com/yourusername/hackathon-project',
    },
    color: 'from-orange-500 to-red-500',
  },
];

export default function Home() {
  const [selectedApp, setSelectedApp] = useState<App>(apps[0]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* モバイルメニューボタン */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* サイドバー */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-80 bg-white shadow-xl
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="h-full flex flex-col">
          {/* ヘッダー */}
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-800">Portfolio</h1>
            <p className="text-sm text-gray-500 mt-1">My Applications</p>
          </div>

          {/* アプリ一覧 */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            {apps.map((app) => (
              <button
                key={app.id}
                onClick={() => {
                  setSelectedApp(app);
                  setIsSidebarOpen(false);
                }}
                className={`
                  w-full text-left p-4 rounded-xl transition-all duration-200
                  ${selectedApp.id === app.id
                    ? 'bg-gradient-to-r ' + app.color + ' text-white shadow-lg scale-105'
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                  }
                `}
              >
                <div className="font-semibold">{app.name}</div>
                <div className={`text-sm mt-1 line-clamp-2 ${
                  selectedApp.id === app.id ? 'text-white/90' : 'text-gray-500'
                }`}>
                  {app.description}
                </div>
              </button>
            ))}
          </nav>

          {/* フッター */}
          <div className="p-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              © 2025 aa's Portfolio
            </p>
          </div>
        </div>
      </aside>

      {/* オーバーレイ（モバイル） */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* メインコンテンツ */}
      <main className="flex-1 overflow-y-auto p-8 lg:p-12">
        <div className="max-w-4xl mx-auto">
          {/* アプリヘッダー */}
          <div className="mb-8">
            <div className={`inline-block px-6 py-3 rounded-full bg-gradient-to-r ${selectedApp.color} text-white font-bold text-2xl mb-4 shadow-lg`}>
              {selectedApp.name}
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              {selectedApp.description}
            </p>
          </div>

          {/* 技術スタック */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full mr-3"></span>
              技術スタック
            </h2>
            <div className="flex flex-wrap gap-2">
              {selectedApp.techStack.map((tech, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-white rounded-lg shadow-md text-gray-700 font-medium hover:shadow-lg transition-shadow"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* リンク */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="w-1 h-6 bg-gradient-to-b from-green-500 to-blue-500 rounded-full mr-3"></span>
              リンク
            </h2>
            <div className="space-y-3">
              {selectedApp.links.demo && (
                <a
                  href={selectedApp.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-md hover:shadow-xl transition-all hover:scale-105"
                >
                  <ExternalLink className="text-blue-500" size={20} />
                  <span className="font-medium text-gray-700">デモサイトを見る</span>
                </a>
              )}
              {selectedApp.links.github && (
                <a
                  href={selectedApp.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-md hover:shadow-xl transition-all hover:scale-105"
                >
                  <Github className="text-gray-800" size={20} />
                  <span className="font-medium text-gray-700">GitHubリポジトリ</span>
                </a>
              )}
              {selectedApp.links.other?.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-md hover:shadow-xl transition-all hover:scale-105"
                >
                  <ExternalLink className="text-purple-500" size={20} />
                  <span className="font-medium text-gray-700">{link.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}